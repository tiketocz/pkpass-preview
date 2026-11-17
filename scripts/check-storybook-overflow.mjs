#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { startServer, waitForServer } from "./visual-regression.mjs";

const ERROR_SELECTORS = [
  ".sb-show-errordisplay",
  ".sb-show-nopreview",
  "#error-message",
  ".sb-nopreview",
];

export function classifyRenderedEntry({
  type,
  rootPresent,
  renderedContentCount,
  visibleErrorDisplays = [],
}) {
  if (visibleErrorDisplays.length > 0) {
    return `Storybook error/no-preview display visible: ${visibleErrorDisplays.join(", ")}`;
  }
  const rootSelector = type === "docs" ? "#storybook-docs" : "#storybook-root";
  if (!rootPresent) return `${rootSelector} is missing`;
  if (renderedContentCount < 1) {
    return `${rootSelector} has no rendered child content with non-zero size`;
  }
  return null;
}

async function inspectRenderedEntry(page, type) {
  return page.evaluate(
    ({ entryType, errorSelectors }) => {
      const isVisible = (element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      };
      const visibleErrorDisplays = errorSelectors.filter((selector) =>
        [...document.querySelectorAll(selector)].some(isVisible),
      );
      const rootSelector = entryType === "docs" ? "#storybook-docs" : "#storybook-root";
      const root = document.querySelector(rootSelector);
      const candidates = root
        ? entryType === "docs"
          ? [...root.querySelectorAll("*")]
          : [...root.children]
        : [];
      const renderedContentCount = candidates.filter(isVisible).length;
      return {
        type: entryType,
        rootPresent: root !== null,
        renderedContentCount,
        visibleErrorDisplays,
      };
    },
    { entryType: type, errorSelectors: ERROR_SELECTORS },
  );
}

async function main() {
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
      const missingReferences = [];
      let entryReferenceFailures = [];
      let entryRuntimeFailures = [];
      page.on("response", (response) => {
        const pathname = new URL(response.url()).pathname;
        if (response.status() === 404 && pathname.startsWith("/screenshots/")) {
          entryReferenceFailures.push(pathname);
        }
      });
      page.on("pageerror", (error) => {
        entryRuntimeFailures.push(`page error: ${error.message}`);
      });
      page.on("console", (message) => {
        if (message.type() === "error")
          entryRuntimeFailures.push(`console error: ${message.text()}`);
      });

      for (const entry of entries) {
        entryReferenceFailures = [];
        entryRuntimeFailures = [];
        const viewMode = entry.type === "docs" ? "docs" : "story";
        const url = `http://127.0.0.1:${port}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=${viewMode}`;
        try {
          const response = await page.goto(url, { waitUntil: "networkidle", timeout: 15_000 });
          if (!response?.ok()) {
            throw new Error(`navigation returned HTTP ${response?.status() ?? "unknown"}`);
          }
          await page.waitForTimeout(100);
          const renderFailure = classifyRenderedEntry(await inspectRenderedEntry(page, entry.type));
          if (renderFailure) entryRuntimeFailures.push(renderFailure);
          if (entryRuntimeFailures.length > 0) {
            loadFailures.push({
              id: entry.id,
              message: [...new Set(entryRuntimeFailures)].join("; "),
            });
          }

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
                ({ left, right, width: elementWidth }) =>
                  left < viewportWidth &&
                  (right > viewportWidth + 1 || elementWidth > viewportWidth + 1),
              )
              .sort((a, b) => b.right - a.right)
              .slice(0, 3);
            return { viewportWidth, documentWidth, widest };
          });
          if (measurement.documentWidth > measurement.viewportWidth + 1) {
            overflows.push({ id: entry.id, type: entry.type, ...measurement });
          }
          for (const referencePath of new Set(entryReferenceFailures)) {
            missingReferences.push({ id: entry.id, path: referencePath });
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
            culprit
              ? ` (${culprit.element}, right ${culprit.right}px, width ${culprit.width}px)`
              : ""
          }`,
        );
      }
      for (const failure of loadFailures) {
        console.error(`  ${failure.id}: load failed — ${failure.message}`);
      }
      for (const missing of missingReferences) {
        console.error(`  ${missing.id}: reference returned 404 — ${missing.path}`);
      }

      if (loadFailures.length > 0 || missingReferences.length > 0 || overflows.length > 0) {
        failed = true;
      }
      await context.close();
    }
  } finally {
    await browser?.close();
    stopServer();
  }

  if (failed && !reportOnly) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
