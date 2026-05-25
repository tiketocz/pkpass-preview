import type { FieldType, PassField } from "./types";

export type PassVariant =
  | "default"
  | "generic-baseline"
  | "store-card-baseline"
  | "generic"
  | "generic-header"
  | "id-card"
  | "store-card"
  | "store-card-numeric"
  | "store-card-2col"
  | "store-card-2col-hero"
  | "store-card-3col"
  | "store-card-4col"
  | "coupon"
  | "boarding-pass"
  | "boarding-pass-short"
  | "boarding-pass-long"
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
  // then clamped to [min, max] (or maxAdditional / maxAuxiliary by field type).
  // density 1.0 ≈ 1 char per pixel of row width at the cap; higher density →
  // larger font for the same char count. The default profile uses 1.4 to
  // match the pre-TIK-99 baseline.
  density: number;
  min: number;
  max: number; // primary fields
  maxAdditional: number; // secondary fields
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
  max: 18,
  maxAdditional: 18,
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
  // generic / generic-header: kept at BASELINE_PROFILE values (= pre-PR main).
  // Earlier iterations bumped density + caps to grow text closer to iOS but
  // VRT against the iOS reference shows main was closer than the bumped
  // values; reverting these two profiles keeps the rendered field text in
  // sync with main / iOS for Generic 1/2/3.
  generic: BASELINE_PROFILE,
  "generic-header": BASELINE_PROFILE,
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
  //   maxAdditional 30) → matches iOS sec-value tier.
  "store-card-2col-hero": {
    ...BASELINE_PROFILE,
    density: 1.5,
    primaryDensity: 1.6,
    max: 50,
    headerDensity: 1.0,
    maxHeader: 19,
    maxAdditional: 30,
  },
  // store-card-3col: primary + 1 auxiliary (sc4 photo-card shape). The
  // primary value is usually whitespace/blank (placeholder for a thumbnail),
  // so the hero font tier doesn't apply here — and bumping header/secondary
  // would push the short numeric header (e.g. "123456") far above the iOS
  // reference. Keep only the `primaryDensity` + `max` knobs from PR #12 so
  // any future fixture with a non-blank primary still gets shrink-fit
  // protection up to 60px, but header + secondary stay at BASELINE.
  "store-card-3col": { ...BASELINE_PROFILE, primaryDensity: 1.8, max: 60 },
  "store-card-4col": BASELINE_PROFILE,
  // coupon: kept at BASELINE_PROFILE — VRT showed iOS reference matches main.
  coupon: BASELINE_PROFILE,
  // boarding-pass family — kept at BASELINE_PROFILE; VRT showed BP1/2/3 are
  // closer to iOS reference at default values than with the previously-tuned
  // caps + headerDensity. `deriveVariant` only ever emits the `-short` or
  // `-long` form (split by primary value length > 12 chars); the base
  // `'boarding-pass'` entry exists so the FONT_PROFILES map is total over
  // the PassVariant union.
  "boarding-pass": BASELINE_PROFILE,
  "boarding-pass-short": BASELINE_PROFILE,
  "boarding-pass-long": BASELINE_PROFILE,
  // event-ticket: ET1/ET2 fixtures (no strip image, no logoText). Header
  // value char-density driven (320/14*1.0=22.9 → cap 19 for "And it's value");
  // density 2.0 grows 3-col secondary the same way `generic` does (12.3→16.4);
  // maxAuxiliary 15 (~-1px vs default 16).
  "event-ticket": {
    density: 2.1,
    min: 10,
    max: 20,
    maxAdditional: 15,
    maxAuxiliary: 14,
    maxHeader: 17,
    headerDensity: 1.0,
  },
  // event-ticket-5col: no-primary shape with 5 secondary + 5 auxiliary
  // columns of short numeric values. "Top row" = secondaryFields (cap 13),
  // "bottom row" = auxiliaryFields (cap 19).
  "event-ticket-5col": {
    density: 1.5,
    min: 10,
    max: 20,
    maxAdditional: 15,
    maxAuxiliary: 13,
  },
  // event-ticket-strip: ET4 fixture (with strip image). Secondary capped at
  // 13 (~-1/3 from default 20); auxiliary capped at 15 (~-1px). Primary stays
  // at default cap 20.
  "event-ticket-strip": {
    density: 1.5,
    min: 10,
    max: 20,
    maxAdditional: 18,
    maxAuxiliary: 15,
  },
  // event-ticket-generic: ET5 fixture — it's actually a `generic` pkpass
  // class (NOT eventTicket), with a logoText. Separate variant so it doesn't
  // share `generic-header` (which is reserved for G1/G2). Primary cap 27
  // (~+1/3), secondary 18 (~-2px), aux 15 (~-1px).
  "event-ticket-generic": {
    density: 1.5,
    min: 10,
    max: 26,
    maxAdditional: 19,
    maxAuxiliary: 15,
  },
};

// Pure helpers for the char-density font sizing algorithm. Lifted out of
// `PKPassPreview` (TIK-106) so they can be unit-tested without rendering React.
// `PKPassPreview` calls these with its `profile` (FONT_PROFILES[variant]) and
// behaviour is unchanged — see `tests/font-profiles.test.ts` for the pinned
// per-variant baselines.
export const getMaxFontSize = (profile: FontProfile, fieldType?: FieldType): number => {
  if (fieldType === "secondaryFields") return profile.maxAdditional;
  if (fieldType === "auxiliaryFields") return profile.maxAuxiliary;
  if (fieldType === "headerFields") return profile.maxHeader ?? profile.max;
  return profile.max;
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
