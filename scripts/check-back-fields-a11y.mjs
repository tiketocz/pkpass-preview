#!/usr/bin/env node

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium } from "playwright";
import { startServer, waitForServer } from "./visual-regression.mjs";

const STORYBOOK_DIR = process.env.STORYBOOK_DIR ?? "packages/storybook/storybook-static";
const PORT = Number(process.env.STORYBOOK_A11Y_PORT ?? 9702);
const STORY_ID = "back-fields--back-fields-1";

const waitForFace = async (page, flipped) => {
  await page.waitForFunction(
    (expected) => document.querySelector("#passCard")?.classList.contains("flipped") === expected,
    flipped,
  );
};

const activeControl = (page) =>
  page.evaluate(() => {
    const active = document.activeElement;
    if (!(active instanceof HTMLElement)) return null;
    if (active instanceof HTMLButtonElement) {
      return active.getAttribute("aria-label") ?? active.textContent?.trim() ?? null;
    }
    return active.id || active.tagName;
  });

const assertFaces = async (page, flipped) => {
  const state = await page.evaluate(() => {
    const front = document.querySelector("#passFront");
    const back = document.querySelector("#passBack");
    const info = document.querySelector('button[aria-label="Show pass details"]');
    const done = document.querySelector(".doneButton");
    return {
      frontInert: front?.hasAttribute("inert"),
      frontHidden: front?.getAttribute("aria-hidden"),
      backInert: back?.hasAttribute("inert"),
      backHidden: back?.getAttribute("aria-hidden"),
      infoTabIndex: info?.getAttribute("tabindex"),
      doneTabIndex: done?.getAttribute("tabindex"),
    };
  });

  if (flipped) {
    assert.deepEqual(state, {
      frontInert: true,
      frontHidden: "true",
      backInert: false,
      backHidden: null,
      infoTabIndex: "-1",
      doneTabIndex: null,
    });
  } else {
    assert.deepEqual(state, {
      frontInert: false,
      frontHidden: null,
      backInert: true,
      backHidden: "true",
      infoTabIndex: null,
      doneTabIndex: "-1",
    });
  }
};

const focusInfoWithTab = async (page) => {
  await page.evaluate(() => {
    let marker = document.querySelector("#a11y-tab-start");
    if (!(marker instanceof HTMLElement)) {
      marker = document.createElement("span");
      marker.id = "a11y-tab-start";
      marker.tabIndex = 0;
      document.body.prepend(marker);
    }
    marker.focus();
  });
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await page.keyboard.press("Tab");
    const active = await activeControl(page);
    assert.notEqual(active, "Done", "the hidden Done button entered the front-side tab order");
    if (active === "Show pass details") return;
  }
  assert.fail("Tab did not reach Show pass details");
};

const exerciseViewport = async (browser, width) => {
  const context = await browser.newContext({ viewport: { width, height: 1000 } });
  const page = await context.newPage();
  const consoleProblems = [];
  page.on("console", (message) => {
    if (["warning", "error"].includes(message.type())) consoleProblems.push(message.text());
  });
  page.on("pageerror", (error) => consoleProblems.push(error.message));

  await page.goto(`http://127.0.0.1:${PORT}/iframe.html?id=${STORY_ID}&viewMode=story`, {
    waitUntil: "networkidle",
  });

  const info = page.getByRole("button", { name: "Show pass details" });
  const done = page.locator(".doneButton");
  await info.waitFor();
  assert.equal(await info.getAttribute("type"), "button");
  assert.equal(await done.getAttribute("type"), "button");
  await assertFaces(page, false);

  // Pointer path.
  await info.click();
  await waitForFace(page, true);
  await assertFaces(page, true);
  assert.equal(await page.getByRole("button", { name: "Done" }).count(), 1);
  assert.equal(await activeControl(page), "Done");
  await done.click();
  await waitForFace(page, false);
  await assertFaces(page, false);
  assert.equal(await activeControl(page), "Show pass details");

  // Enter opens, Space closes. Tabbing from the visible control must never
  // reach the hidden face's control.
  await focusInfoWithTab(page);
  await page.keyboard.press("Enter");
  await waitForFace(page, true);
  assert.equal(await activeControl(page), "Done");
  await page.keyboard.press("Tab");
  assert.notEqual(await activeControl(page), "Show pass details");
  await done.focus();
  await page.keyboard.press("Space");
  await waitForFace(page, false);
  assert.equal(await activeControl(page), "Show pass details");
  await page.keyboard.press("Tab");
  assert.notEqual(await activeControl(page), "Done");

  // Space opens, Enter closes.
  await focusInfoWithTab(page);
  await page.keyboard.press("Space");
  await waitForFace(page, true);
  assert.equal(await activeControl(page), "Done");
  await page.keyboard.press("Enter");
  await waitForFace(page, false);
  assert.equal(await activeControl(page), "Show pass details");

  assert.deepEqual(consoleProblems, []);
  await context.close();
  return { width, consoleProblems: consoleProblems.length };
};

async function main() {
  if (!existsSync(STORYBOOK_DIR)) {
    throw new Error(`Storybook build not found at ${STORYBOOK_DIR}; run bun run storybook:build`);
  }

  const stopServer = startServer(STORYBOOK_DIR, PORT);
  try {
    await waitForServer(PORT);
    const browser = await chromium.launch();
    try {
      const results = [];
      for (const width of [390, 1440]) results.push(await exerciseViewport(browser, width));
      console.log(`Back-fields accessibility passed: ${JSON.stringify(results)}`);
    } finally {
      await browser.close();
    }
  } finally {
    stopServer();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
