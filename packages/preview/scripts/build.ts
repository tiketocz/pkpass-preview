#!/usr/bin/env bun
/**
 * Build script for @tiketo/pkpass-preview.
 *
 * Produces:
 *   dist/index.js       — ESM bundle, ES2022, browser target
 *   dist/index.d.ts     — type declarations (via tsc)
 *   dist/index.d.ts.map — declaration map (via tsc)
 *
 * Transit icons are inlined as JSX components in transit-icon.tsx — no SVG
 * loader needed at build time or in consumer bundlers. React + react-dom
 * stay external (peerDeps).
 */

import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// NODE_ENV must be "production" at *process start* — Bun's transpiler
// snapshots it then to pick jsx vs jsxDEV. Setting it inside this script
// is too late. The "build" npm script in package.json prefixes it.
if (process.env.NODE_ENV !== "production") {
  console.warn(
    `[build] NODE_ENV=${process.env.NODE_ENV ?? "(unset)"} — expected "production". Bundle will contain jsxDEV calls and fail at render time. Run via 'bun run build' (which sets NODE_ENV) instead of invoking the script directly.`,
  );
}

const pkgDir = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(pkgDir, "dist");

if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}

const result = await Bun.build({
  entrypoints: [join(pkgDir, "src/index.tsx")],
  outdir: distDir,
  target: "browser",
  format: "esm",
  external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  sourcemap: "external",
  minify: false,
  splitting: false,
  naming: "[name].js",
});

if (!result.success) {
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log("Bun.build → dist/index.js");
for (const out of result.outputs) {
  console.log(`  ${out.path}  (${out.size ?? "?"} bytes)`);
}

// Emit .d.ts via tsc using the package-local tsconfig.
const tsc = Bun.spawnSync({
  cmd: ["tsc", "-p", join(pkgDir, "tsconfig.build.json")],
  cwd: pkgDir,
  env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=4096" },
  stdout: "inherit",
  stderr: "inherit",
});

if (tsc.exitCode !== 0) {
  console.error("tsc declaration emit failed");
  process.exit(tsc.exitCode ?? 1);
}

console.log("tsc → dist/index.d.ts (+ .d.ts.map)");
