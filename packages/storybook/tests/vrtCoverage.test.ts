import { describe, expect, it } from "vitest";

// @ts-expect-error The runtime .mjs helper has no declaration file.
import { classifyRenderedEntry } from "../../../scripts/check-storybook-overflow.mjs";
// @ts-expect-error The runtime .mjs helper has no declaration file.
import { buildComparisonMarkdown } from "../../../scripts/vrt-compare.mjs";
// Node runs this shared helper directly; it intentionally remains plain ESM.
// @ts-expect-error The runtime .mjs helper has no declaration file.
import { assertCaptureCoverage, assertPairedCoverage } from "../../../scripts/vrt-coverage.mjs";

describe("VRT structural coverage", () => {
  it("fails with the ids of VRT-eligible stories missing references", () => {
    expect(() =>
      assertCaptureCoverage({
        baselineIds: ["kept", "missing"],
        discoveredIds: ["kept", "missing"],
        capturedIds: ["kept"],
        failures: { missing: "no Wallet reference image found" },
      }),
    ).toThrow(/missing[\s\S]*no Wallet reference image found/);
  });

  it("fails when a base-selected id is lost or uncaptured on head", () => {
    expect(() =>
      assertPairedCoverage({
        baseSelectedIds: ["kept", "lost"],
        headSelectedIds: ["kept"],
        baseCapturedIds: ["kept", "lost"],
        headCapturedIds: ["kept"],
      }),
    ).toThrow(/lost/);
  });

  it("accepts a new head-only id after its reference capture is verified", () => {
    expect(
      assertPairedCoverage({
        baseSelectedIds: ["kept"],
        headSelectedIds: ["kept", "new-pass-details"],
        baseCapturedIds: ["kept"],
        headCapturedIds: ["kept", "new-pass-details"],
      }),
    ).toEqual({ pairedIds: ["kept"], newHeadIds: ["new-pass-details"] });
  });

  it("excludes new-on-head values from paired means and reports their absolute metrics", () => {
    const paired = {
      story: "kept",
      pixelmatchDiffPct: 10,
      ssim: 0.8,
      webRenderWidth: 750,
      webRenderHeight: 1000,
      webRenderAspectRatio: 0.75,
      referenceWidth: 1200,
      referenceHeight: 1600,
      referenceAspectRatio: 0.75,
    };
    const report = buildComparisonMarkdown(
      { discoveredStoryIds: ["kept"], results: [paired] },
      {
        discoveredStoryIds: ["kept", "new-pass-details"],
        results: [
          { ...paired, pixelmatchDiffPct: 12, ssim: 0.7 },
          {
            story: "new-pass-details",
            pixelmatchDiffPct: 99,
            ssim: 0.1,
            webRenderWidth: 750,
            webRenderHeight: 1000,
            webRenderAspectRatio: 0.75,
            referenceWidth: 1206,
            referenceHeight: 2622,
            referenceAspectRatio: 1206 / 2622,
          },
        ],
      },
    );

    expect(report).toContain(
      "| mean pixelmatch %-diff (lower=better) | 10.00% | 12.00% | +2.00 pp |",
    );
    expect(report).toContain("| mean SSIM (higher=better) | 0.8000 | 0.7000 | -0.1000 |");
    expect(report).not.toContain("55.50%");
    expect(report).toContain(
      "| `new-pass-details` | 750×1000 (0.7500) | 1206×2622 (0.4600) | 0.1000 | 99.00% |",
    );
  });
});

describe("Storybook rendered-page classification", () => {
  it("accepts a populated story root", () => {
    expect(
      classifyRenderedEntry({
        type: "story",
        rootPresent: true,
        renderedContentCount: 1,
      }),
    ).toBeNull();
  });

  it.each([
    [
      "empty root",
      { type: "story", rootPresent: true, renderedContentCount: 0 },
      "no rendered child content",
    ],
    [
      "Storybook error display",
      {
        type: "docs",
        rootPresent: true,
        renderedContentCount: 3,
        visibleErrorDisplays: [".sb-show-errordisplay"],
      },
      "error/no-preview",
    ],
  ])("rejects an %s", (_label, state, reason) => {
    expect(classifyRenderedEntry(state)).toContain(reason);
  });
});
