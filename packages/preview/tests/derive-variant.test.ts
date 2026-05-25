// TIK-112 — deriveVariant boarding-pass collapse. Before TIK-112 the BP
// branch routed by primary value char count (`length > 12` → `-long`, else
// `-short`); post-TIK-108 both routes mapped to BASELINE_PROFILE so the
// split was vestigial. TIK-112 removes the `-short`/`-long` variants and
// collapses the branch to a single `boarding-pass`. These tests pin the
// new behaviour (and the acceptance criterion from the TIK-112 ticket:
// `(boarding-pass, "San Francisco", primaryFields) → no longer routed to
// the small-cap variant`).
import { describe, expect, it } from "vitest";
import { deriveVariant } from "../src/index";

const bp = (primaryValue: string) => ({
  "pass.json": {
    boardingPass: {
      primaryFields: [{ value: primaryValue }],
    },
  },
});

describe("deriveVariant — boarding-pass (TIK-112 collapse)", () => {
  // Short primary (BP1 fixture range, pre-TIK-112 → `-short`).
  it("BP1 'Prague12345' (11 chars) → boarding-pass", () => {
    expect(deriveVariant(bp("Prague12345"))).toBe("boarding-pass");
  });

  // Boundary primary (BP3 fixture, pre-TIK-112 → `-short` at exactly the
  // length 12 threshold).
  it("BP3 '<a>here</a>' (12 chars) → boarding-pass", () => {
    expect(deriveVariant(bp("<a>here</a>"))).toBe("boarding-pass");
  });

  // Acceptance criterion from TIK-112: 13-char primary values no longer
  // route to a small-cap variant. Pre-TIK-112 this routed to `-long`.
  it("'San Francisco' (13 chars) → boarding-pass (acceptance: no -long routing)", () => {
    expect(deriveVariant(bp("San Francisco"))).toBe("boarding-pass");
  });

  // Long primary (BP2 fixture, pre-TIK-112 → `-long`).
  it("BP2 'LONG TEXT LONG TEXT' (19 chars) → boarding-pass", () => {
    expect(deriveVariant(bp("LONG TEXT LONG TEXT"))).toBe("boarding-pass");
  });

  // Empty primary fields (pre-TIK-112 → `-short` via the `.some` default
  // being false).
  it("empty primaryFields → boarding-pass", () => {
    expect(
      deriveVariant({
        "pass.json": { boardingPass: { primaryFields: [] } },
      }),
    ).toBe("boarding-pass");
  });

  // Missing primaryFields entirely (defensive).
  it("missing primaryFields → boarding-pass", () => {
    expect(
      deriveVariant({
        "pass.json": { boardingPass: {} },
      }),
    ).toBe("boarding-pass");
  });
});
