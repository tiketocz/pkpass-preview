import { describe, expect, it } from "vitest";

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
});
