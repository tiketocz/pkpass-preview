# Visual regression (VRT)

Info-only PR check. Compares `PKPassPreview`'s render against the iOS Wallet screenshot for every fixture that has one, on the PR's *base* and *head*, and posts a sticky PR comment with the delta.

No quality gate yet — the job posts metrics but never blocks merge. Promoting it to a gate is a separate decision (lower-bound SSIM, upper-bound pixelmatch %-diff) once we have a few PRs of baseline data.

## What it measures

Scope is auto-discovered from `storybook-static/index.json`: any story whose `tags` array includes `vrt` is in scope. Opt a whole group in by tagging the `meta` in its `.stories.tsx`:

```ts
const meta: Meta<ComparisonArgs> = {
  title: "Coupon",
  tags: ["vrt"],
  // ...
};
```

Tag a single story (or its meta) with `vrt:skip` to exclude it even if otherwise included.

For each in-scope story:

1. Screenshot of `#passCard` from the Storybook iframe (LEFT pane of `Comparison`).
2. iOS reference image from `packages/storybook/public/screenshots/<name>.jpg`, resized to match.
3. `pixelmatch` diff count → reported as %-of-pixels-different.
4. `ssim.js` mssim score (0..1, higher = closer match).

Stories without an iOS reference are still discovered via the tag but skipped at metric time with a log line.

## Local run

```sh
bun run storybook:build
bun run vrt
# or in one go:
bun run vrt:build
```

Outputs:

- `visual-regression-output/report.json`
- `visual-regression-output/report.md`
- `visual-regression-output/{ours,ref,diff}/*.png`

Env overrides: `STORYBOOK_DIR`, `STORYBOOK_PORT`, `OUT_DIR`, `DPR`, `VRT_TAG` (default `vrt`).

## Workflow shape

```
pull_request (opened|sync|reopened)
  ├── checkout PR head into head/, PR base into base/
  ├── bun install in both
  ├── bunx playwright install chromium (head)
  ├── bun run storybook:build in head, then base
  ├── bun run vrt against base/ storybook  → vrt-base/report.json
  ├── bun run vrt against head/ storybook  → vrt-head/report.json
  ├── bun run scripts/vrt-compare.mjs base.json head.json → vrt-comment.md
  └── marocchino/sticky-pull-request-comment posts/upserts comment
```

Concurrency group `vrt-<pr-number>` cancels in-progress runs on each push.

Artifacts `vrt-reports` (both base + head trees) retained 14 days.

## Why info-only

Pixelmatch and SSIM are dominated by low-frequency differences (background colour, layout, barcode density). They reliably catch "the card collapsed" but are noisy on 1-2 px font-tuning changes. The PR review and the storybook side-by-side are still the source of truth for visual sign-off; VRT is the safety net that flags regressions large enough to be worth a second look.

## Heuristics for reading the report

- **Δ SSIM > 0**, **Δ pixelmatch %-diff < 0**: closer to iOS reference. Good.
- **Δ SSIM < -0.01** on a single fixture: worth opening the diff PNG.
- Whole-board uniform shift of ~±0.005 SSIM with no visible change: typically font-rendering / AA noise. Ignore.

## Promoting to a gate (later)

Once a few PRs of baseline exist:

- Set a per-fixture **floor** (e.g. `SSIM >= main - 0.02`) and **ceiling** (e.g. `pixelmatch %-diff <= main + 1 pp`) in `vrt-compare.mjs`.
- Emit non-zero exit code when any fixture breaches.
- Workflow stops being info-only and starts gating merges.
