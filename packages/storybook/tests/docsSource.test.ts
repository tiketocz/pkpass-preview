import { describe, expect, it } from "vitest";

import { buildComparisonSource } from "../src/docsSource";

describe("comparison Docs source", () => {
  it("builds a bounded public snippet from story args", () => {
    const source = buildComparisonSource({
      values: {
        "pass.json": { formatVersion: 1, description: "Example" },
        "icon.png": "A".repeat(2_000),
        "logo.png": "B".repeat(2_000),
      },
      variant: "poster",
      targetOs: "ios27",
    });

    expect(source).toContain('import { PKPassPreview } from "@tiketo/pkpass-preview";');
    expect(source).toContain('"pass.json"');
    expect(source).toContain('"icon.png": "<base64-encoded image>"');
    expect(source).toContain('variant="poster"');
    expect(source).toContain('targetOs="ios27"');
    expect(source).not.toContain("scenarioId");
    expect(source).not.toMatch(/[A-Za-z0-9+/]{200,}={0,2}/);
    expect(source?.length).toBeLessThan(800);
  });

  it("omits the comparison defaults and ignores non-comparison args", () => {
    expect(
      buildComparisonSource({
        values: { "pass.json": {}, "icon.png": "unused fixture payload" },
        variant: "fallback",
        targetOs: "ios26",
      }),
    ).toContain("<PKPassPreview values={passFiles} />");
    expect(buildComparisonSource({ values: { "icon.png": "not a pass" } })).toBeUndefined();
  });
});
