// TIK-145 — unit tests for the per-field shrink-to-fit math helper
// extracted from PassFieldItemFit. The DOM/canvas read (containerRef,
// measureText) is covered by VRT; the pure scaling math lives in
// `scaledFontSize(maxFontSize, renderedWidth, availableWidth, minFontSize)`
// and is tested here to guard against future regressions of the
// Math.floor / Math.max clamp logic.
import { describe, expect, it } from "vitest";
import { scaledFontSize } from "../src/components/PassFieldItems";

describe("scaledFontSize — per-field shrink math (TIK-145)", () => {
  // Happy path: text fits the column → returns maxFontSize unchanged.
  it("returns maxFontSize when text already fits", () => {
    expect(scaledFontSize(24, 150, 200, 10)).toBe(24);
  });

  // Edge: rendered == available → still considered "fits".
  it("returns maxFontSize when rendered equals available width", () => {
    expect(scaledFontSize(24, 200, 200, 10)).toBe(24);
  });

  // Overflow: BP-2 left FROM "LONG TEXT LONG TEXT" at 24px renders ~256
  // px wide vs 200 px column → 24 * 200 / 256 = 18.75 → floor 18.
  it("scales down proportionally when text overflows", () => {
    expect(scaledFontSize(24, 256, 200, 10)).toBe(18);
  });

  // Clamp: extreme overflow that would scale below the floor gets pinned.
  it("clamps at minFontSize on extreme overflow", () => {
    expect(scaledFontSize(24, 1000, 50, 10)).toBe(10);
  });

  // Floor below clamp: 24 * 100 / 1000 = 2.4 → would floor to 2, clamped to 10.
  it("returns minFontSize when scaled result is below the floor", () => {
    expect(scaledFontSize(24, 1000, 100, 10)).toBe(10);
  });

  // Exact-floor case: scaled = 12.0 exactly → no Math.floor drop.
  it("returns the exact integer when ratio yields a whole number", () => {
    expect(scaledFontSize(24, 200, 100, 10)).toBe(12);
  });

  // Different minFontSize → caller-controlled floor.
  it("honours caller-supplied minFontSize", () => {
    expect(scaledFontSize(24, 1000, 50, 14)).toBe(14);
  });
});
