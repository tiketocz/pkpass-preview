#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import { startServer, waitForServer } from "./visual-regression.mjs";

const storybookDir = process.env.STORYBOOK_DIR ?? "packages/storybook/storybook-static";
const port = Number(process.env.STORYBOOK_PORT ?? 9701);
const widths = (process.env.STORYBOOK_WIDTHS ?? "1440,390,320")
  .split(",")
  .map(Number)
  .filter(Number.isFinite);
const reportOnly = process.argv.includes("--report-only");

const index = JSON.parse(await fs.readFile(path.join(storybookDir, "index.json"), "utf8"));
const entries = Object.values(index.entries ?? index.stories ?? {}).sort((a, b) =>
  a.id.localeCompare(b.id),
);

const stopServer = startServer(storybookDir, port);
let browser;
let failed = false;

try {
  await waitForServer(port);
  browser = await chromium.launch();

  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const overflows = [];
    const loadFailures = [];

    for (const entry of entries) {
      const viewMode = entry.type === "docs" ? "docs" : "story";
      const url = `http://127.0.0.1:${port}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=${viewMode}`;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 15_000 });
        await page.waitForTimeout(100);
        const measurement = await page.evaluate(() => {
          const viewportWidth = window.innerWidth;
          const documentWidth = Math.max(
            document.documentElement.scrollWidth,
            document.body?.scrollWidth ?? 0,
          );
          const widest = [...document.querySelectorAll("body *")]
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                element: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}${
                  typeof element.className === "string" && element.className
                    ? `.${element.className.trim().split(/\s+/).slice(0, 2).join(".")}`
                    : ""
                }`,
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              };
            })
            .filter(
              ({ left, right, width }) =>
                left < viewportWidth && (right > viewportWidth + 1 || width > viewportWidth + 1),
            )
            .sort((a, b) => b.right - a.right)
            .slice(0, 3);
          return { viewportWidth, documentWidth, widest };
        });
        if (measurement.documentWidth > measurement.viewportWidth + 1) {
          overflows.push({ id: entry.id, type: entry.type, ...measurement });
        }
      } catch (error) {
        loadFailures.push({ id: entry.id, message: error.message });
      }
    }

    console.log(`Overflow at ${width}px: ${overflows.length}/${entries.length}`);
    for (const overflow of overflows) {
      const culprit = overflow.widest[0];
      console.log(
        `  ${overflow.id}: ${overflow.documentWidth}px${
          culprit ? ` (${culprit.element}, right ${culprit.right}px, width ${culprit.width}px)` : ""
        }`,
      );
    }
    for (const failure of loadFailures) {
      console.error(`  ${failure.id}: load failed — ${failure.message}`);
    }

    if (loadFailures.length > 0 || (width >= 390 && overflows.length > 0)) failed = true;
    await context.close();
  }
} finally {
  await browser?.close();
  stopServer();
}

if (failed && !reportOnly) process.exitCode = 1;
