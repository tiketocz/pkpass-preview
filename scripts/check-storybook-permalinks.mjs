#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { discoverStories } from "./visual-regression.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baselinePath = path.join(repoRoot, "packages/storybook/permalinks.baseline.json");
const indexPath = path.resolve(
  repoRoot,
  process.env.STORYBOOK_INDEX ?? "packages/storybook/storybook-static/index.json",
);

function duplicateIds(entries) {
  const seen = new Set();
  const duplicates = new Set();
  for (const entry of entries) {
    if (seen.has(entry.id)) duplicates.add(entry.id);
    seen.add(entry.id);
  }
  return [...duplicates].sort();
}

async function readJson(filePath, description) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${description} at ${filePath}: ${error.message}`);
  }
}

const baseline = await readJson(baselinePath, "permalink baseline");
const index = await readJson(
  indexPath,
  "Storybook index (run `bun run storybook:build` before this check)",
);
const entries = Object.values(index.entries ?? index.stories ?? {});
const baselineEntries = baseline.entries ?? [];
const errors = [];
const vrtIds = new Set(await discoverStories(path.dirname(indexPath)));

for (const [label, candidates] of [
  ["baseline", baselineEntries],
  ["Storybook index", entries],
]) {
  const duplicates = duplicateIds(candidates);
  if (duplicates.length > 0) {
    errors.push(`${label} contains duplicate ids: ${duplicates.join(", ")}`);
  }
}

const entriesById = new Map(entries.map((entry) => [entry.id, entry]));
for (const expected of baselineEntries) {
  const actual = entriesById.get(expected.id);
  if (!actual) {
    errors.push(`missing baseline ${expected.type} id: ${expected.id}`);
  } else if (actual.type !== expected.type) {
    errors.push(
      `baseline id changed type: ${expected.id} (${expected.type} -> ${actual.type ?? "unknown"})`,
    );
  }
}

for (const id of baseline.vrtStoryIds ?? []) {
  const entry = entriesById.get(id);
  if (entry && !vrtIds.has(id)) {
    errors.push(`baseline VRT story is no longer VRT-eligible: ${id}`);
  }
}

const baselineIds = new Set(baselineEntries.map((entry) => entry.id));
const newEntries = entries
  .filter((entry) => !baselineIds.has(entry.id))
  .sort((a, b) => a.id.localeCompare(b.id));

console.log(
  `Permalink guard: ${baselineEntries.length} baseline ids; ${(baseline.vrtStoryIds ?? []).length} baseline VRT ids; ${newEntries.length} new ids.`,
);
if (newEntries.length > 0) {
  console.log("New Storybook ids (allowed):");
  for (const entry of newEntries) {
    console.log(`  + ${entry.id} [${entry.type}] ${entry.title}`);
  }
}

if (errors.length > 0) {
  console.error("Permalink guard failed:");
  for (const error of errors) console.error(`  - ${error}`);
  process.exitCode = 1;
} else {
  console.log("Permalink guard passed.");
}
