// TIK-106 — unit tests for the FONT_PROFILES char-density font-sizing
// algorithm. The (size = ROW_WIDTH / charCount * density, clamped to
// [min, maxPrimary | maxSecondary | maxAuxiliary | maxHeader by fieldType])
// computation lives in pure helpers exported from `src/font-profiles.ts`;
// this suite pins the per-variant baseline so future tuning can move pixels
// intentionally rather than by accident.
//
// Expected values are pinned against current main (post-PR #13 TIK-108
// profile-unification, 2026-05-21). Four cases from the original TIK-106
// spec table (#3, #4, #6, #7) were re-baselined when several boarding-pass,
// store-card, and coupon variants were unified onto BASELINE_PROFILE — the
// "original TIK-106 spec px" is noted in each test for audit trail.
import { describe, expect, it } from "vitest";
import {
  FONT_PROFILES,
  calculateFontSize,
  calculateGlobalFontSizeForRow,
  getDensity,
  getMaxFontSize,
  scaledRowFontSize,
} from "../src/font-profiles";
import type { PassField } from "../src/types";

describe("FONT_PROFILES char-density algorithm — minimum spec (TIK-106)", () => {
  // TC1 — default profile, cap-bound primary. 320/8*1.4=56 → cap 18.
  it("default / 8ch primaryFields → 18 (cap-bound)", () => {
    expect(calculateFontSize(FONT_PROFILES.default, 8)).toBe(18);
  });

  // TC2 — default profile, density-bound secondary. 320/30*1.4=14.93 < cap 18.
  it("default / 30ch secondaryFields → ~14.93 (density-bound)", () => {
    expect(calculateFontSize(FONT_PROFILES.default, 30, "secondaryFields")).toBeCloseTo(14.933, 2);
  });

  // TC3 — boarding-pass, cap-bound primary. Post-TIK-145 (revised) cap 21
  // — was 24 in the first TIK-145 per-field cut, 22 in the per-row cut,
  // 18 pre-TIK-145, 28 in the original TIK-106 spec pre-TIK-108. Cap 21
  // is the highest where BP-1 "Prague12345" (11ch ~125 px wide at 21)
  // still clears the centred transit icon at column-relative x=132 with
  // a 7 px safety gap; cap 22 produced a 3 px overlap per DOM measure.
  // Per-row pattern — both FROM and TO share this size.
  it("boarding-pass / 6ch primaryFields → 21 (cap-bound; per-row pattern, FROM=TO same size)", () => {
    expect(calculateFontSize(FONT_PROFILES["boarding-pass"], 6)).toBe(21);
  });

  // TC4 — boarding-pass, long primary value. Post-TIK-145 (revised) density
  // 1.4 / 21ch → 21.33 → cap 21 → 21 (cap-bound). Per-row uniform shrink
  // applies the same size to FROM and TO; the BP-2 fixture has a higher
  // totalCharCount (~22) so it shrinks slightly further in practice
  // (320/22*1.4 = 20.36 → no cap → 20.36).
  it("boarding-pass / 21ch primaryFields → 21 (cap-bound; per-row uniform shrink)", () => {
    expect(calculateFontSize(FONT_PROFILES["boarding-pass"], 21)).toBe(21);
  });

  // TC5 — event-ticket-5col, packed-row auxiliary cap. 320/5*1.5=96 → cap 13.
  // Confirms `maxAuxiliary` distinct from `maxSecondary`.
  it("event-ticket-5col / 5ch auxiliaryFields → 13 (cap-bound, maxAuxiliary distinct from maxSecondary)", () => {
    expect(calculateFontSize(FONT_PROFILES["event-ticket-5col"], 5, "auxiliaryFields")).toBe(13);
  });

  // TC6 — store-card-4col, density-bound secondary. Original TIK-106 spec:
  // ~15.15 (density 1.42, regression-sensitive). Post-TIK-108 → BASELINE
  // → 320/30*1.4=14.93. Pinned to detect any density bump that would
  // overflow 4-column rows.
  it("store-card-4col / 30ch secondaryFields → ~14.93 (BASELINE density; was ~15.15 in TIK-106 spec pre-TIK-108)", () => {
    expect(calculateFontSize(FONT_PROFILES["store-card-4col"], 30, "secondaryFields")).toBeCloseTo(
      14.933,
      2,
    );
  });

  // TC7 — coupon, density+cap interaction at upper bound. Original TIK-106
  // spec: 24 (density 2.5, maxAuxiliary 24). Post-TIK-108 → BASELINE →
  // 320/12*1.4=37.33 → cap maxAuxiliary 14.
  it("coupon / 12ch auxiliaryFields → 14 (BASELINE cap; was 24 in TIK-106 spec pre-TIK-108)", () => {
    expect(calculateFontSize(FONT_PROFILES.coupon, 12, "auxiliaryFields")).toBe(14);
  });
});

describe("FONT_PROFILES char-density algorithm — extended coverage", () => {
  // TC8 — id-card secondary. Original TIK-106 spec: ~16.84 (density 1.8).
  // Post-TIK-108 → BASELINE → ~11.79.
  it("id-card / 38ch secondaryFields → ~11.79 (BASELINE density; was ~16.84 in TIK-106 spec pre-TIK-108)", () => {
    expect(calculateFontSize(FONT_PROFILES["id-card"], 38, "secondaryFields")).toBeCloseTo(
      11.789,
      2,
    );
  });

  // TC9 — boarding-pass, short primary value. Post-TIK-145 (revised) cap 21
  // (chosen because cap 22 produced a 3 px overlap with the centred icon
  // per DOM measure). 320/11*1.4 = 40.73 → cap 21. With per-row pattern
  // this is the SHARED size for BP-1 "Prague12345" (FROM 11ch) + "Paris"
  // (TO 5ch) row.
  it("boarding-pass / 11ch primaryFields → 21 (cap-bound; BP-1 'Prague12345' fits with 7 px gap to icon)", () => {
    expect(calculateFontSize(FONT_PROFILES["boarding-pass"], 11)).toBe(21);
  });

  // TIK-145: boarding-pass header value char-density sizing. "fdhs" (4ch)
  // → 320/4*1.0 = 80 → cap maxHeader 18. Replaces the pre-TIK-145
  // PassFieldItemHeaderFit/useFitText fallback (~14 CSS px) that left
  // "fdhs" undersized vs iOS.
  it("boarding-pass / 4ch headerFields → 18 (TIK-145 headerDensity 1.0 + maxHeader 18, 'fdhs' iOS-faithful)", () => {
    expect(calculateFontSize(FONT_PROFILES["boarding-pass"], 4, "headerFields")).toBe(18);
  });

  // TC10 — generic primary. Original TIK-106 spec: ~16 (density 2.0).
  // Post-TIK-108 → BASELINE → ~14.93.
  it("generic / 30ch primaryFields → ~14.93 (BASELINE density; was ~16 in TIK-106 spec pre-TIK-108)", () => {
    expect(calculateFontSize(FONT_PROFILES.generic, 30)).toBeCloseTo(14.933, 2);
  });

  // store-card-2col-hero is the only profile that exercises `primaryDensity`
  // (TIK-100 / PR #12). Primary uses primaryDensity 1.6, header uses
  // headerDensity 1.0 with maxHeader 19.
  it("store-card-2col-hero / 11ch primaryFields → ~46.55 (uses primaryDensity 1.6, cap 50)", () => {
    expect(calculateFontSize(FONT_PROFILES["store-card-2col-hero"], 11)).toBeCloseTo(46.545, 2);
  });

  it("store-card-2col-hero / 5ch headerFields → 19 (uses headerDensity 1.0, cap maxHeader 19)", () => {
    expect(calculateFontSize(FONT_PROFILES["store-card-2col-hero"], 5, "headerFields")).toBe(19);
  });

  // Edge: 0-char → 0 (early return; prevents Infinity from ROW_WIDTH/0).
  it("0 charCount → 0 (early return, no division by zero)", () => {
    expect(calculateFontSize(FONT_PROFILES.default, 0)).toBe(0);
    expect(calculateFontSize(FONT_PROFILES.default, 0, "secondaryFields")).toBe(0);
  });

  // Edge: very long row → density-result below profile.min, clamped to min.
  it("very long row clamps to profile.min (Math.max floor)", () => {
    // 320/200*1.4=2.24 → max(2.24, 10) = 10 → min(10, cap 18) = 10
    expect(calculateFontSize(FONT_PROFILES.default, 200)).toBe(FONT_PROFILES.default.min);
  });
});

describe("getMaxFontSize", () => {
  it("returns profile.maxPrimary for undefined / primary fieldType", () => {
    expect(getMaxFontSize(FONT_PROFILES.default)).toBe(FONT_PROFILES.default.maxPrimary);
  });

  it("returns profile.maxSecondary for secondaryFields", () => {
    expect(getMaxFontSize(FONT_PROFILES.default, "secondaryFields")).toBe(
      FONT_PROFILES.default.maxSecondary,
    );
  });

  it("returns profile.maxAuxiliary for auxiliaryFields", () => {
    expect(getMaxFontSize(FONT_PROFILES.default, "auxiliaryFields")).toBe(
      FONT_PROFILES.default.maxAuxiliary,
    );
  });

  it("returns profile.maxHeader for headerFields when set", () => {
    expect(getMaxFontSize(FONT_PROFILES["store-card-2col-hero"], "headerFields")).toBe(19);
  });

  it("falls back to profile.maxPrimary for headerFields when maxHeader not set (contract — not exercised by PKPassPreview when headerDensity unset)", () => {
    expect(getMaxFontSize(FONT_PROFILES.default, "headerFields")).toBe(
      FONT_PROFILES.default.maxPrimary,
    );
  });
});

describe("calculateGlobalFontSizeForRow", () => {
  // Wraps the algorithm: sums char counts across a row of PassFields, then
  // delegates to calculateFontSize. Exercises the value vs label vs
  // attributedValue precedence and the header / non-header sum mode.
  it("returns undefined for undefined fields (early return)", () => {
    expect(calculateGlobalFontSizeForRow(FONT_PROFILES.default, undefined)).toBeUndefined();
  });

  it("non-header row sums max(value, label) per field", () => {
    // Two fields: ("Tier", "Gold") = max(4,4)=4, ("Member since","2024") =
    // max(12,4)=12. Total 16ch, secondaryFields → 320/16*1.4=28 → cap 18.
    const fields: PassField[] = [
      { key: "tier", label: "Tier", value: "Gold" },
      { key: "memberSince", label: "Member since", value: "2024" },
    ];
    expect(calculateGlobalFontSizeForRow(FONT_PROFILES.default, fields, "secondaryFields")).toBe(
      18,
    );
  });

  it("headerFields sums value-lengths only (label ignored, label fixed-size)", () => {
    // Field with label "BUSINESS CARD" (13ch) + value "CARD" (4ch). Header mode
    // should sum 4 (value only), not 13 (label). 320/4*1.0=80, cap maxHeader 19.
    const fields: PassField[] = [{ key: "h1", label: "BUSINESS CARD", value: "CARD" }];
    expect(
      calculateGlobalFontSizeForRow(FONT_PROFILES["store-card-2col-hero"], fields, "headerFields"),
    ).toBe(19);
  });

  it("attributedValue takes precedence over value (HTML markup is sized by raw length)", () => {
    // attributedValue "<a>Tap here</a>" (15ch) wins over value "fallback" (8).
    // No label → total 15ch. primary → 320/15*1.4 ≈ 29.87 → cap 18.
    const fields: PassField[] = [
      { key: "p1", attributedValue: "<a>Tap here</a>", value: "fallback" },
    ];
    expect(calculateGlobalFontSizeForRow(FONT_PROFILES.default, fields)).toBe(18);
  });

  it("missing value AND missing label coerces to 0 (no crash on undefined.toString)", () => {
    // Sparse field — deliberately malformed to exercise the runtime guard
    // `field.value?.toString().length || 0`. `pass.json` arrives via
    // JSON.parse() and can violate the static PassField contract at runtime;
    // dropping the optional chain on a "the type says it's required" basis
    // would crash this case. Test pins the defensive path; the cast bypasses
    // the static contract on purpose.
    const fields = [{}] as unknown as PassField[];
    // 0 charCount → calculateFontSize early-returns 0.
    expect(calculateGlobalFontSizeForRow(FONT_PROFILES.default, fields)).toBe(0);
  });
});

describe("scaledRowFontSize — width-based row-fit math (TIK-145)", () => {
  // Pure helper used by the boarding-pass branch of PKPassPreview to scale
  // the FROM/TO row uniformly when the FROM value at the density-bound size
  // would still reach the centred transit icon. The DOM/canvas read that
  // produces `renderedWidth` is covered by VRT; this suite pins the math.

  // Happy path: rendered <= available → no shrink, base size returned.
  it("returns baseFontSize when text already fits availableWidth", () => {
    expect(scaledRowFontSize(21, 125, 130, 12)).toBe(21);
  });

  // Edge: exact-fit (rendered == available) is treated as fits, no shrink.
  it("returns baseFontSize when renderedWidth equals availableWidth", () => {
    expect(scaledRowFontSize(21, 130, 130, 12)).toBe(21);
  });

  // BP-2 typical case: "LONG TEXT LONG TEXT" at the density-bound size
  // (20.36 px) measures ~265 px in DejaVu Sans fallback. Scaled =
  // floor(20.36 * 130 / 265) = floor(9.99) = 9 → clamp at floor 12.
  it("clamps to floor when scaled result would drop below it", () => {
    expect(scaledRowFontSize(20.36, 265, 130, 12)).toBe(12);
  });

  // Production Helvetica Neue case: same BP-2 text at 20.36 px in real
  // Helvetica Neue light is ~232 px. Scaled = floor(20.36 * 130 / 232) =
  // floor(11.41) = 11 → still below floor 12 → 12.
  it("returns floor when scaled is just under (BP-2 Safari production)", () => {
    expect(scaledRowFontSize(20.36, 232, 130, 12)).toBe(12);
  });

  // Mild overflow: rendered just past available → small proportional shrink.
  // 21 * 130 / 140 = 19.5 → floor 19. Above floor 12 → 19.
  it("scales down proportionally for mild overflow above floor", () => {
    expect(scaledRowFontSize(21, 140, 130, 12)).toBe(19);
  });

  // Floor parameter respected: caller can pass a different floor (e.g.
  // profile.min 10) and the helper honours it.
  it("uses caller-supplied minFontSize as the floor", () => {
    // 20.36 * 130 / 265 = 9.99 → floor 10 (caller-supplied) wins over 9.
    expect(scaledRowFontSize(20.36, 265, 130, 10)).toBe(10);
  });
});

describe("getDensity", () => {
  it("returns profile.density by default", () => {
    expect(getDensity(FONT_PROFILES.default)).toBe(FONT_PROFILES.default.density);
    expect(getDensity(FONT_PROFILES.default, "secondaryFields")).toBe(
      FONT_PROFILES.default.density,
    );
  });

  it("returns headerDensity for headerFields when set", () => {
    expect(getDensity(FONT_PROFILES["store-card-2col-hero"], "headerFields")).toBe(1.0);
  });

  it("returns primaryDensity for undefined fieldType when set (hero override)", () => {
    expect(getDensity(FONT_PROFILES["store-card-2col-hero"])).toBe(1.6);
  });

  it("primaryDensity does NOT override for secondary / aux / header rows (contract — pins behaviour for future profiles, current live caller only requests primary path with primaryDensity set)", () => {
    const hero = FONT_PROFILES["store-card-2col-hero"];
    // hero has primaryDensity 1.6 but base density 1.5 — non-primary rows
    // should land on 1.5 (or headerDensity for header).
    expect(getDensity(hero, "secondaryFields")).toBe(hero.density);
    expect(getDensity(hero, "auxiliaryFields")).toBe(hero.density);
  });
});
