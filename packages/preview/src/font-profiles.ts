import type { FieldType, PassField } from "./types";

export type PassVariant =
  | "default"
  | "generic-baseline"
  | "store-card-baseline"
  | "generic"
  | "id-card"
  | "store-card"
  | "store-card-numeric"
  | "store-card-2col"
  | "store-card-2col-hero"
  | "store-card-3col"
  | "store-card-4col"
  | "coupon"
  | "boarding-pass"
  | "event-ticket"
  | "event-ticket-5col"
  | "event-ticket-strip"
  | "event-ticket-generic";

export const ROW_WIDTH = 320;

// TIK-99: per-template "variant" font profiles. The font size is still computed
// dynamically from the text length ((ROW_WIDTH / charCount) * density, clamped to
// [min, max]); the variant only changes the parameters of that computation, so a
// longer/shorter value still gets a fitting size — no hardcoded per-card pixels.
export type FontProfile = {
  // Char-density multiplier used by calculateGlobalFontSizeForRow:
  //   size = (ROW_WIDTH / charCount) * density,
  // then clamped to [min, maxPrimary] (or maxSecondary / maxAuxiliary by field type).
  // density 1.0 ≈ 1 char per pixel of row width at the cap; higher density →
  // larger font for the same char count. The default profile uses 1.4 to
  // match the pre-TIK-99 baseline.
  density: number;
  min: number;
  // Per-field caps. Required for FontProfile shape completeness — even
  // variants that don't render a given field type (e.g. `event-ticket-5col`
  // has no primary fields per `deriveVariant`) declare all three caps so
  // `getMaxFontSize` can be a total function without `?? fallback` branches.
  maxPrimary: number; // primary fields
  maxSecondary: number; // secondary fields
  maxAuxiliary: number; // auxiliary fields
  // When set, the header value is sized by the same char-density algorithm
  // (using headerDensity instead of density, clamped to [min, maxHeader])
  // instead of useFitText — so a short header value ("CARD") stays large while
  // a long one ("BUSINESS CARD" / "VIZITKA PRODEJCE") scales down.
  maxHeader?: number;
  headerDensity?: number;
  // When set, overrides `density` for primary fields only. Lets a profile
  // push the primary value to hero size (matching iOS Wallet) without also
  // enlarging header / secondary / auxiliary text that share the same
  // FontProfile but use their own caps.
  primaryDensity?: number;
};

// Pre-TIK-99 baseline values — referenced by `default` and by the explicit
// per-pkpass-type baseline variants (`generic-baseline`, `store-card-baseline`).
// The two baseline variants currently share these exact values but are kept
// separate so future per-pkpass-type baseline tuning (e.g. a storeCard-only
// padding adjustment) can split without renaming downstream consumers.
const BASELINE_PROFILE: FontProfile = {
  density: 1.4,
  min: 10,
  maxPrimary: 18,
  maxSecondary: 18,
  maxAuxiliary: 14,
};

export const FONT_PROFILES: Record<PassVariant, FontProfile> = {
  // default profile — preserved 1:1 from the pre-TIK-99 main branch (density
  // 1.4, caps 18/18/14). Used as the fallback when `deriveVariant` cannot
  // recognise the pkpass class from `values['pass.json']` (no behaviour
  // change vs pre-TIK-99).
  default: BASELINE_PROFILE,
  // generic-baseline / store-card-baseline — explicit variants for stories
  // that historically relied on the implicit `default` profile (generic
  // info cards, code128/pdf417 barcode-only cards, plain store cards, back
  // fields). Same values as `default` for now; kept distinct so future
  // per-pkpass-type baseline tuning (e.g. store-card-only padding adjustment)
  // can split without renaming consumers.
  "generic-baseline": BASELINE_PROFILE,
  "store-card-baseline": BASELINE_PROFILE,
  // generic: single profile for all G1/G2/G3 shapes (TIK-108 merge of the
  // previous `generic` + `generic-header` split, which differed only in
  // whether the header value was useFitText-sized or char-density-sized).
  // headerDensity + maxHeader replace useFitText so header sizing is
  // deterministic: short G3 headers ("1"/"2") clamp at maxHeader (22px);
  // long G1/G2 header ("And it's value", 14 chars) → 320/14×0.7 ≈ 16px,
  // matching the prior useFitText output within ~1px. Field caps stay at
  // BASELINE so primary/secondary/auxiliary render identically to main.
  generic: { ...BASELINE_PROFILE, headerDensity: 0.7, maxHeader: 22 },
  // id-card: kept at BASELINE_PROFILE for now — VRT vs iOS shows main was
  // closer than the previously-tuned (density 1.8, maxHeader 18 + headerDensity 0.5).
  "id-card": BASELINE_PROFILE,
  // store-card family — kept at BASELINE_PROFILE; VRT against iOS showed main
  // was closer than the previously-tuned per-shape (2col/3col/4col/numeric)
  // values across the fixtures. The shape detection itself (via deriveVariant)
  // is retained so future fine-tuning can split back into separate profiles.
  "store-card": BASELINE_PROFILE,
  "store-card-numeric": BASELINE_PROFILE,
  // 2col matches multiple shapes — only `2col-hero` (with a non-empty primary
  // field) gets the iOS hero tier treatment. The plain `2col` catch-all keeps
  // BASELINE so header-only fixtures (e.g. resident-benefit, where the header
  // values are the de-facto primary) don't get bumped above iOS reference.
  "store-card-2col": BASELINE_PROFILE,
  // store-card-2col-hero: primary + 2 secondary (loyalty / member card shape).
  // Tuned against the iOS Wallet reference for `examples--store-card`
  // (Jane Sample). Per-field densities so each row independently matches
  // the iOS tier:
  //   primary "Jane Sample" 11 chars → 320/11×1.6 ≈ 46.5 (cap 50). Cannot
  //   shrink-fit so cap is held just below the storeCard inner width to
  //   avoid clipping the trailing char.
  //   header value "1,250" 5 chars → char-density (1.0) lands at 64, cap
  //   maxHeader 19 → 19px (pinned by font-profiles.test.ts; the lower cap
  //   keeps the value within the 3.8em header strip).
  //   secondary "Tier"/"Gold" + "Member since"/"2024" → 320/16×1.5=30 (cap
  //   maxSecondary 30) → matches iOS sec-value tier.
  "store-card-2col-hero": {
    ...BASELINE_PROFILE,
    density: 1.5,
    primaryDensity: 1.6,
    maxPrimary: 50,
    headerDensity: 1.0,
    maxHeader: 19,
    maxSecondary: 30,
  },
  // store-card-3col: primary + 1 auxiliary (sc4 photo-card shape). The
  // primary value is usually whitespace/blank (placeholder for a thumbnail),
  // so the hero font tier doesn't apply here — and bumping header/secondary
  // would push the short numeric header (e.g. "123456") far above the iOS
  // reference. Keep only the `primaryDensity` + `maxPrimary` knobs from PR #12
  // so any future fixture with a non-blank primary still gets shrink-fit
  // protection up to 60px, but header + secondary stay at BASELINE.
  "store-card-3col": { ...BASELINE_PROFILE, primaryDensity: 1.8, maxPrimary: 60 },
  "store-card-4col": BASELINE_PROFILE,
  // coupon: kept at BASELINE_PROFILE — VRT showed iOS reference matches main.
  coupon: BASELINE_PROFILE,
  // boarding-pass — TIK-145 (revised). Two-layer primary sizing:
  //
  //   1. Per-row char-density helper (calculateGlobalFontSizeForRow) —
  //      same call as every other variant. Both FROM and TO share one
  //      font size that scales with totalCharCount. iOS BP-2 reference
  //      confirms this — FROM and TO cap heights measure ~1:1 even when
  //      the row overflows. maxPrimary 21 is the highest cap where the
  //      BP-1 "Prague12345" 11-char value (rendered ~125 px wide at 21
  //      in Helvetica Neue light) still clears the centred transit icon
  //      at column-relative x=132 with a 7 px safety gap. Cap 22 was
  //      tried in the first per-row cut but DOM measurement showed BP-1
  //      textRight=147 vs icon left=144 = 3 px overlap.
  //
  //   2. Width-based row-fit pass (boardingPassRowFontSize useMemo in
  //      index.tsx, gated on data.boardingPass) — runs only for
  //      boarding-pass, only when the FROM value at the density-bound
  //      size would still reach the centred icon. Canvas measureText
  //      on FROM, scaledRowFontSize() shrinks the row uniformly by
  //      the ratio that lands FROM at the icon left edge minus a 2 px
  //      safety. Floors at 12 px (iOS BP-2 cap height ~30 image px /
  //      0.27 logical-to-image ratio / 0.71 cap-to-em = ~12 logical px).
  //      Other variants use the char-density helper alone.
  //
  // Header value is char-density sized (headerDensity 1.0, maxHeader 18)
  // so short header values like "fdhs" (4 chars) land at the iOS-faithful
  // 18 px instead of the previous PassFieldItemHeaderFit/useFitText fallback.
  "boarding-pass": { ...BASELINE_PROFILE, maxPrimary: 21, headerDensity: 1.0, maxHeader: 18 },
  // event-ticket: ET1/ET2 fixtures (no strip image, no logoText). Header value
  // is char-density driven (headerDensity 1.0, maxHeader 17) so a long header
  // like "And it's value" (14 chars) shrinks to fit the row. density 2.1 +
  // maxPrimary 20 grows the primary value to iOS hero size; maxSecondary 15
  // matches the iOS 3-col secondary tier; maxAuxiliary 14 keeps the aux row
  // visually distinct (smaller than secondary) per iOS reference.
  // math (header, "And it's value" 14ch): 320/14*1.0 = 22.86 → cap maxHeader 17.
  "event-ticket": {
    density: 2.1,
    min: 10,
    maxPrimary: 20,
    maxSecondary: 15,
    maxAuxiliary: 14,
    maxHeader: 17,
    headerDensity: 1.0,
  },
  // event-ticket-5col: no-primary shape with 5 secondary + 5 auxiliary columns
  // of short numeric values. maxSecondary 15 caps the "top row" (secondary
  // labels/values like FLIGHT / GATE), maxAuxiliary 13 caps the "bottom row"
  // of denser numeric aux values so they don't collide visually with the
  // header strip. maxPrimary 20 unused (no primary fields) but kept for
  // FontProfile shape completeness.
  // math (auxiliary, 5ch packed row): 320/5*1.5 = 96 → cap maxAuxiliary 13.
  "event-ticket-5col": {
    density: 1.5,
    min: 10,
    maxPrimary: 20,
    maxSecondary: 15,
    maxAuxiliary: 13,
  },
  // event-ticket-strip: ET4 fixture (with strip image). maxPrimary 20 matches
  // the iOS primary tier for the row above the strip; maxSecondary 18 keeps
  // the secondary row legible alongside the strip image without overlapping;
  // maxAuxiliary 15 sits just below to keep the visual hierarchy
  // secondary > auxiliary as in iOS reference.
  // math (secondary, 10ch row): 320/10*1.5 = 48 → cap maxSecondary 18.
  "event-ticket-strip": {
    density: 1.5,
    min: 10,
    maxPrimary: 20,
    maxSecondary: 18,
    maxAuxiliary: 15,
  },
  // event-ticket-generic: ET5 fixture — it's actually a `generic` pkpass class
  // (NOT eventTicket), with a logoText. Separate variant so it doesn't share
  // the unified `generic` profile (which targets G1/G2/G3). maxPrimary 26
  // grows the logoText/primary close to iOS hero size; maxSecondary 19
  // matches the iOS secondary tier for the longer label/value pairs;
  // maxAuxiliary 15 keeps the aux row a step smaller so the visual hierarchy
  // stays primary > secondary > auxiliary.
  // math (primary, 8ch row): 320/8*1.5 = 60 → cap maxPrimary 26.
  "event-ticket-generic": {
    density: 1.5,
    min: 10,
    maxPrimary: 26,
    maxSecondary: 19,
    maxAuxiliary: 15,
  },
};

// Pure helpers for the char-density font sizing algorithm. Lifted out of
// `PKPassPreview` (TIK-106) so they can be unit-tested without rendering React.
// `PKPassPreview` calls these with its `profile` (FONT_PROFILES[variant]) and
// behaviour is unchanged — see `tests/font-profiles.test.ts` for the pinned
// per-variant baselines.
export const getMaxFontSize = (profile: FontProfile, fieldType?: FieldType): number => {
  if (fieldType === "secondaryFields") return profile.maxSecondary;
  if (fieldType === "auxiliaryFields") return profile.maxAuxiliary;
  if (fieldType === "headerFields") return profile.maxHeader ?? profile.maxPrimary;
  return profile.maxPrimary;
};

export const getDensity = (profile: FontProfile, fieldType?: FieldType): number => {
  if (fieldType === "headerFields" && profile.headerDensity != null) return profile.headerDensity;
  if (fieldType === undefined && profile.primaryDensity != null) return profile.primaryDensity;
  return profile.density;
};

export const calculateFontSize = (
  profile: FontProfile,
  charCount: number,
  fieldType?: FieldType,
): number => {
  if (charCount === 0) return 0;
  const maxFontSize = getMaxFontSize(profile, fieldType);
  const fontSize = Math.max((ROW_WIDTH / charCount) * getDensity(profile, fieldType), profile.min);
  return Math.min(fontSize, maxFontSize);
};

// Sum char counts across a row of fields, then run the char-density algorithm.
// Header rows sum value-lengths only (label has its own fixed size); other rows
// take the max(value, label) per field.
export const calculateGlobalFontSizeForRow = (
  profile: FontProfile,
  fields: PassField[] | undefined,
  fieldType?: FieldType,
): number | undefined => {
  if (!fields) return undefined;
  const totalCharCount = fields.reduce((count: number, field) => {
    const valueLength = field.attributedValue?.length || field.value?.toString().length || 0;
    const labelLength = field.label?.length || 0;
    return (
      count + (fieldType === "headerFields" ? valueLength : Math.max(valueLength, labelLength))
    );
  }, 0);
  return calculateFontSize(profile, totalCharCount, fieldType);
};

// TIK-145 width-based row-fit pure helper, exported so the math can be
// unit-tested independently of the DOM/canvas read that produces
// `renderedWidth`. Given the row's char-density-bound `baseFontSize` and
// the measured width of the constraining field at that size, returns
// the size that fits `availableWidth` — floored at `minFontSize`. Returns
// `baseFontSize` unchanged when the text already fits. Used by the
// boarding-pass branch of `PKPassPreview` to shrink the FROM/TO row
// uniformly when the FROM value would reach the centred transit icon.
export const scaledRowFontSize = (
  baseFontSize: number,
  renderedWidth: number,
  availableWidth: number,
  minFontSize: number,
): number => {
  if (renderedWidth <= availableWidth) return baseFontSize;
  const scaled = Math.floor((baseFontSize * availableWidth) / renderedWidth);
  return Math.max(minFontSize, scaled);
};
