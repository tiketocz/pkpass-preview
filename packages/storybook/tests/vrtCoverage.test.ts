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

  it("fails with every unpaired base and head id", () => {
    expect(() =>
      assertPairedCoverage({
        expectedIds: ["kept", "base-only", "head-only"],
        baseIds: ["kept", "base-only"],
        headIds: ["kept", "head-only"],
      }),
    ).toThrow(/base-only[\s\S]*head-only/);
  });
});
