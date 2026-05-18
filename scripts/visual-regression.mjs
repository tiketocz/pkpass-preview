#!/usr/bin/env node
/**
 * Visual regression report for the storybook fixtures.
 *
 * For every story listed below (one fixture per story in this repo, unlike
 * the predecessor pkpass-builder-ui where stories grouped multiple
 * fixtures), the script:
 *   - screenshots the rendered PKPassPreview (#passCard inside Comparison)
 *   - loads the iOS reference image (img alt^="iOS Wallet screenshot")
 *   - resizes the iOS reference to match the screenshot dimensions
 *   - computes pixelmatch %-diff and SSIM
 *   - writes per-fixture diff PNG + aggregate report.{json,md}
 *
 * Stories without an iOS reference (placeholder render) are skipped with a
 * warning — they show up in the report count but not in the metrics.
 *
 * Run with the storybook static build pre-built:
 *   bun run storybook:build
 *   bun run vrt
 *
 * Env overrides:
 *   STORYBOOK_DIR   directory of built storybook
 *                   (default: packages/storybook/storybook-static)
 *   STORYBOOK_PORT  port for the local static server (default: 9700)
 *   OUT_DIR         output directory (default: visual-regression-output)
 *   DPR             devicePixelRatio for screenshots (default: 2)
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import pixelmatch from "pixelmatch";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import sharp from "sharp";
import { ssim } from "ssim.js";

const STORYBOOK_DIR = process.env.STORYBOOK_DIR ?? "packages/storybook/storybook-static";
const PORT = Number(process.env.STORYBOOK_PORT ?? 9700);
const OUT_DIR = process.env.OUT_DIR ?? "visual-regression-output";
const DPR = Number(process.env.DPR ?? 2);

// One story per fixture. Stories without an iOS reference (Examples) are
// listed for parity but skipped at metric time.
const STORIES = [
  "boarding-pass--boarding-pass-1",
  "boarding-pass--boarding-pass-2",
  "boarding-pass--boarding-pass-3",
  "barcode--code-128-1",
  "barcode--code-128-2",
  "barcode--code-128-3",
  "barcode--code-128-4",
  "barcode--code-128-5",
  "barcode--pdf-417-1",
  "barcode--pdf-417-2",
  "barcode--pdf-417-3",
  "barcode--pdf-417-4",
  "barcode--large-barcode",
  "event-ticket--event-ticket-1",
  "event-ticket--event-ticket-2",
];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function waitForServer(port) {
  for (let i = 0; i < 30; i++) {
    const ok = await new Promise((resolve) => {
      const req = http.get(
        { host: "127.0.0.1", port, path: "/iframe.html", timeout: 500 },
        (res) => {
          res.resume();
          resolve(res.statusCode === 200);
        },
      );
      req.on("error", () => resolve(false));
      req.on("timeout", () => {
        req.destroy();
        resolve(false);
      });
    });
    if (ok) return;
    await sleep(200);
  }
  throw new Error(`Storybook server on :${port} did not become ready`);
}

function startServer(dir, port) {
  if (!existsSync(dir)) {
    throw new Error(
      `Storybook build dir "${dir}" not found — run \`bun run storybook:build\` first.`,
    );
  }
  const proc = spawn("python3", ["-m", "http.server", String(port)], {
    cwd: dir,
    stdio: ["ignore", "ignore", "pipe"],
  });
  proc.on("exit", (code) => {
    if (code && code !== 0 && code !== null) {
      console.error(`http.server exited with code ${code}`);
    }
  });
  return () => proc.kill("SIGTERM");
}

async function captureStory(page, storyId) {
  const url = `http://127.0.0.1:${PORT}/iframe.html?id=${storyId}&viewMode=story`;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector("#passCard", { timeout: 10_000 });
  // Let use-fit-text + dynamic styles settle.
  await page.waitForTimeout(400);

  const cardHandle = await page.$("#passCard");
  if (!cardHandle) return null;

  // Comparison renders the iOS img with alt starting "iOS Wallet screenshot
  // of <name>". If the file is missing, the component swaps to a placeholder
  // <div>; querying for the <img> here returns null and we skip the story.
  const imgHandle = await page.$('img[alt^="iOS Wallet screenshot"]');
  const iosSrc = imgHandle ? await imgHandle.getAttribute("src") : null;

  const ourBuf = await cardHandle.screenshot({ omitBackground: false });
  return { storyId, iosSrc, ourBuf };
}

async function compareOne({ ourBuf, iosPath, outDir, slug }) {
  const iosOriginal = await fs.readFile(iosPath);
  const ourPng = PNG.sync.read(ourBuf);
  const { width, height } = ourPng;

  const iosResizedBuf = await sharp(iosOriginal)
    .resize(width, height, { fit: "fill" })
    .removeAlpha()
    .ensureAlpha()
    .png()
    .toBuffer();

  const ourFlatBuf = await sharp(ourBuf)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .ensureAlpha()
    .png()
    .toBuffer();
  const iosFlatBuf = await sharp(iosResizedBuf)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .ensureAlpha()
    .png()
    .toBuffer();
  const ourFlat = PNG.sync.read(ourFlatBuf);
  const iosFlat = PNG.sync.read(iosFlatBuf);

  const diff = new PNG({ width, height });
  const numDiff = pixelmatch(ourFlat.data, iosFlat.data, diff.data, width, height, {
    threshold: 0.1,
    includeAA: false,
  });
  const pixelmatchDiffPct = (numDiff / (width * height)) * 100;

  let ssimMean = null;
  try {
    const r = ssim(
      { data: ourFlat.data, width, height },
      { data: iosFlat.data, width, height },
      { downsample: "fast" },
    );
    ssimMean = r.mssim;
  } catch (e) {
    console.warn(`SSIM failed for ${slug}: ${e.message}`);
  }

  await fs.writeFile(path.join(outDir, "ours", `${slug}.png`), ourBuf);
  await fs.writeFile(path.join(outDir, "ref", `${slug}.png`), iosResizedBuf);
  await fs.writeFile(path.join(outDir, "diff", `${slug}.png`), PNG.sync.write(diff));

  return { width, height, pixelmatchDiffPct, ssim: ssimMean };
}

function buildMarkdown(results, generatedAt, storybookDir) {
  const lines = [];
  lines.push("# Visual regression report");
  lines.push("");
  lines.push(`- Generated: \`${generatedAt}\``);
  lines.push(`- Storybook build: \`${storybookDir}\``);
  lines.push(`- Fixtures: ${results.length}`);
  lines.push("");
  lines.push("Lower pixelmatch %-diff and higher SSIM (closer to 1.0) = closer match.");
  lines.push("");
  lines.push("| Story | iOS ref | Pixelmatch diff % | SSIM | Diff |");
  lines.push("|---|---|---:|---:|---|");
  for (const r of results) {
    const ssimCell = r.ssim == null ? "—" : r.ssim.toFixed(4);
    lines.push(
      `| \`${r.story}\` | \`${r.iosSrc}\` | ${r.pixelmatchDiffPct.toFixed(2)} | ${ssimCell} | \`diff/${r.slug}.png\` |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  await fs.mkdir(path.join(OUT_DIR, "diff"), { recursive: true });
  await fs.mkdir(path.join(OUT_DIR, "ours"), { recursive: true });
  await fs.mkdir(path.join(OUT_DIR, "ref"), { recursive: true });

  const stopServer = startServer(STORYBOOK_DIR, PORT);
  try {
    await waitForServer(PORT);
    const browser = await chromium.launch();
    const ctx = await browser.newContext({
      viewport: { width: 1200, height: 1600 },
      deviceScaleFactor: DPR,
    });
    const page = await ctx.newPage();

    const results = [];
    for (const story of STORIES) {
      const captured = await captureStory(page, story).catch((e) => {
        console.warn(`  ${story}: capture failed — ${e.message}`);
        return null;
      });
      if (!captured) continue;
      if (!captured.iosSrc) {
        console.log(`  ${story.padEnd(40)} skip (no iOS reference)`);
        continue;
      }

      // staticDirs serves packages/storybook/public/ at root, so an img src
      // of "screenshots/foo.jpg" maps to <STORYBOOK_DIR>/screenshots/foo.jpg.
      const iosPath = path.join(STORYBOOK_DIR, captured.iosSrc);
      if (!existsSync(iosPath)) {
        console.warn(`  ${story}: iOS ref missing on disk: ${iosPath}`);
        continue;
      }

      const slug = slugify(story);
      const metrics = await compareOne({
        ourBuf: captured.ourBuf,
        iosPath,
        outDir: OUT_DIR,
        slug,
      });
      results.push({ story, iosSrc: captured.iosSrc, slug, ...metrics });

      const ssimStr = metrics.ssim == null ? "   —  " : metrics.ssim.toFixed(4);
      console.log(
        `  ${story.padEnd(40)}  pm ${metrics.pixelmatchDiffPct.toFixed(2).padStart(6)}%  SSIM ${ssimStr}`,
      );
    }

    await browser.close();

    const generatedAt = new Date().toISOString();
    await fs.writeFile(
      path.join(OUT_DIR, "report.json"),
      JSON.stringify({ generatedAt, storybookDir: STORYBOOK_DIR, results }, null, 2),
    );
    await fs.writeFile(
      path.join(OUT_DIR, "report.md"),
      buildMarkdown(results, generatedAt, STORYBOOK_DIR),
    );

    console.log(`\nWrote ${results.length} fixture comparisons to ${OUT_DIR}/`);
    console.log(`  - ${OUT_DIR}/report.json`);
    console.log(`  - ${OUT_DIR}/report.md`);
  } finally {
    stopServer();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
