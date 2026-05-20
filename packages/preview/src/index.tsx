import * as React from "react";
import { useMemo, useState } from "react";
import { BarcodesPreview } from "./components/BarcodesPreview";
import { PassBackFieldItem, PassFieldItem, PassFieldItemHeader } from "./components/PassFieldItems";
import { getPassStyles } from "./styles";
import { TransitIcon } from "./transit-icon";
import type { FieldType, PassData, PassField, PassStructure } from "./types";

export type { PassData, PassField, PassStructure, PKTextAlignment, FieldType } from "./types";
export { PassTransitType } from "./types";

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

export interface PreviewProps {
  values: { [key: string]: any };
  removeVariablePlaceholders?: boolean;
}

const ROW_WIDTH = 320;

// TIK-99: per-template "variant" font profiles. The font size is still computed
// dynamically from the text length ((ROW_WIDTH / charCount) * density, clamped to
// [min, max]); the variant only changes the parameters of that computation, so a
// longer/shorter value still gets a fitting size — no hardcoded per-card pixels.
type FontProfile = {
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

const FONT_PROFILES: Record<PassVariant, FontProfile> = {
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
  // 2col / 3col can include a non-empty primary field by deriveVariant rules.
  // iOS Wallet renders that primary as a hero element that fills ~95% of card
  // width (measured: 11-char "Jane Sample" = 609/640 device px ≈ 95%, ~55px
  // logical font). BASELINE density 1.4 + cap 18 clamps it to body size.
  // Use `primaryDensity: 1.9` so the primary-only path gets the hero font
  // while header / secondary / auxiliary keep the BASELINE density 1.4 — that
  // matters because store-card-2col is also the catch-all for header-only +
  // secondary+aux fixtures (e.g. resident-benefit) where bumping global
  // density would inflate the header value.
  "store-card-2col": { ...BASELINE_PROFILE, primaryDensity: 1.8, max: 60 },
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

// Deterministic variant detection from `values` (pkpass type + field shape).
// Pure function — no DOM measurement, no content heuristics beyond the explicit
// boarding-pass primary-value length check below. Falls back to `default` when
// no recognised pkpass class is present. `PKPassPreview` calls this on every
// render; the public API of the component stays `values`-only.
//
// Rules are evaluated top-to-bottom; first match wins. Each rule references the
// fixture shape that anchored it so the mapping remains traceable for future
// maintenance.
export const deriveVariant = (values: { [key: string]: any }): PassVariant => {
  // The pkpass class + fields live inside the `pass.json` blob; `values` also
  // carries image keys (logo.png, strip.png, …). Read from `pass.json`.
  const pass = values?.["pass.json"];
  if (!pass) return "default";

  // pkpass class — exactly one of these top-level keys is set per the spec.
  if (pass.coupon) return "coupon";

  if (pass.boardingPass) {
    const bp = pass.boardingPass;
    // Threshold > 12 chars: anchored on the BP fixtures (BP1 "Prague12345" = 11,
    // BP3 "<a>here</a>" = 12, both short; BP2 "LONG TEXT LONG TEXT" = 19, long).
    // 13+ char primary values push to the -long profile (cap 11px) because the
    // 200px FROM column truncates them at the base 28px cap. This is a char-count
    // heuristic — real airport codes / city names just above the threshold (e.g.
    // "San Francisco" = 13) will fall into -long and render small; if that becomes
    // a problem, a measured-text-width approach (TIK-XXX) is the proper fix.
    const longVal = (bp.primaryFields ?? []).some((f: any) => String(f?.value ?? "").length > 12);
    return longVal ? "boarding-pass-long" : "boarding-pass-short";
  }

  if (pass.eventTicket) {
    const et = pass.eventTicket;
    const head = et.headerFields ?? [];
    const prim = et.primaryFields ?? [];
    const sec = et.secondaryFields ?? [];
    // ET3-shape: 5 secondary, no primary → 5-column ladder layout.
    if (sec.length === 5 && prim.length === 0) return "event-ticket-5col";
    // ET4-shape: no header → strip-style (primary row on its own).
    if (head.length === 0) return "event-ticket-strip";
    // ET1/ET2-shape: header + primary + secondary.
    return "event-ticket";
  }

  if (pass.generic) {
    const g = pass.generic;
    const head = g.headerFields ?? [];
    const prim = g.primaryFields ?? [];
    const sec = g.secondaryFields ?? [];
    const hasLogoText = !!pass.logoText;

    // ET5-shape: generic-class pkpass used as an event-ticket-ish card —
    // no header, with logoText.
    if (head.length === 0 && prim.length > 0 && hasLogoText) return "event-ticket-generic";
    // G4-shape: no header AND no primary → barcode-only baseline.
    if (head.length === 0 && prim.length === 0) return "generic-baseline";
    // G3-shape: 2+ headers → denser layout.
    if (head.length >= 2) return "generic";
    // G1/G2-shape: 1 header + 3+ secondary (wordy 3-col secondary row).
    if (head.length === 1 && sec.length >= 3) return "generic-header";
    // Member-card shape: 1 header + 2 secondary (id-card layout).
    if (head.length === 1 && sec.length <= 2) return "id-card";
    return "generic-baseline";
  }

  if (pass.storeCard) {
    const s = pass.storeCard;
    const head = s.headerFields ?? [];
    const prim = s.primaryFields ?? [];
    const sec = s.secondaryFields ?? [];
    const aux = s.auxiliaryFields ?? [];

    // SC6/SC7-shape: 5+ auxiliary fields → numeric ladder layout.
    if (aux.length >= 5) return "store-card-numeric";
    // SC5-shape: 4 auxiliary fields → 4-col layout.
    if (aux.length >= 4) return "store-card-4col";
    // SC4-shape: primary + 1 auxiliary → 3-col secondary layout.
    if (prim.length >= 1 && aux.length === 1) return "store-card-3col";
    // Primary + 2 secondary (no aux): 2-col secondary layout.
    if (prim.length >= 1 && sec.length === 2) return "store-card-2col";
    // 2+ headers, no primary, 1+ secondary, 1+ auxiliary: 2-col layout.
    if (head.length >= 2 && prim.length === 0 && sec.length >= 1 && aux.length >= 1)
      return "store-card-2col";
    // SC3-shape: no header, no primary, 2 secondary.
    if (head.length === 0 && prim.length === 0 && sec.length === 2) return "store-card-2col";
    // BackFields1-shape: 1 header + 1 secondary + 1 auxiliary (no primary).
    if (head.length === 1 && sec.length === 1 && aux.length === 1 && prim.length === 0)
      return "store-card-baseline";
    // Catch-all: storeCard cards with header+secondary or primary-only.
    return "store-card";
  }

  return "default";
};

export const PKPassPreview = ({ values, removeVariablePlaceholders }: PreviewProps) => {
  const [flipped, setFlipped] = useState(false);

  // Variant is derived from `values` (pkpass type + field shape). The
  // public API only takes `values` — no `variant` prop — so production
  // consumers (`tiketo-cms` editor, `tiketo-pass-share`) keep using the
  // component unchanged.
  const resolvedVariant = deriveVariant(values);
  // Defensive fallback: deriveVariant returns a typed union member, but
  // if a future code path ever returns an unknown string this keeps the
  // render alive instead of crashing.
  const profile = FONT_PROFILES[resolvedVariant] ?? FONT_PROFILES.default;

  // Fix 1: Stable identifier using useMemo
  const identifier = useMemo(() => {
    return `visualEditor_${(Math.random() + 1).toString(36).substring(7)}`;
  }, []);

  // Fix 7: Memoize callback functions to ensure stability
  const getMaxFontSize = useMemo(() => {
    return (fieldType?: FieldType): number => {
      if (fieldType === "secondaryFields") return profile.maxAdditional;
      if (fieldType === "auxiliaryFields") return profile.maxAuxiliary;
      if (fieldType === "headerFields") return profile.maxHeader ?? profile.max;
      return profile.max;
    };
  }, [profile]);

  const getDensity = useMemo(() => {
    return (fieldType?: FieldType): number => {
      if (fieldType === "headerFields" && profile.headerDensity != null)
        return profile.headerDensity;
      if (fieldType === undefined && profile.primaryDensity != null) return profile.primaryDensity;
      return profile.density;
    };
  }, [profile]);

  const calculateFontSizeBasedOnCharCount = useMemo(() => {
    return (charCount: number, fieldType?: FieldType) => {
      if (charCount === 0) {
        return 0;
      }

      const maxFontSize = getMaxFontSize(fieldType);
      const fontSize = Math.max((ROW_WIDTH / charCount) * getDensity(fieldType), profile.min);

      return Math.min(fontSize, maxFontSize);
    };
  }, [getMaxFontSize, getDensity, profile]);

  const calculateGlobalFontSizeForRow = useMemo(() => {
    return (fields: PassField[] | undefined, fieldType?: FieldType) => {
      if (!fields) {
        return undefined;
      }

      const totalCharCount = fields.reduce((count: number, field) => {
        const valueLength = field.attributedValue?.length || field.value?.toString().length || 0;
        const labelLength = field.label?.length || 0;
        // Header value is sized off the value length only — the header label has
        // its own fixed size, so a long label shouldn't shrink the value.
        return (
          count + (fieldType === "headerFields" ? valueLength : Math.max(valueLength, labelLength))
        );
      }, 0);

      return calculateFontSizeBasedOnCharCount(totalCharCount, fieldType);
    };
  }, [calculateFontSizeBasedOnCharCount]);

  // Fix 2: Memoize data processing to prevent recalculation on every render
  const data: PassData = useMemo(() => {
    let processedData: PassData = values["pass.json"] || {};

    if (removeVariablePlaceholders) {
      processedData = JSON.parse(JSON.stringify(processedData).replaceAll(/\${[^}]+}/g, ""));
    }

    return processedData;
  }, [values["pass.json"], removeVariablePlaceholders]);

  // Fix 8: Memoize editorClassName and structure to prevent recreation on every render
  const { editorClassName, structure } = useMemo(() => {
    let className = "unknown";
    let passStructure: PassStructure | undefined = undefined;

    if (data.boardingPass) {
      className = "boardingPass";
      passStructure = data.boardingPass;
    } else if (data.coupon) {
      className = "coupon";
      passStructure = data.coupon;
    } else if (data.eventTicket) {
      className = "eventTicket background";
      passStructure = data.eventTicket;
    } else if (data.generic) {
      className = "generic";
      passStructure = data.generic;
    } else if (data.storeCard) {
      className = "storeCard";
      passStructure = data.storeCard;
    }

    return { editorClassName: className, structure: passStructure };
  }, [data]);

  // Fix 3: Memoize secondary fields font size calculation
  const secondaryFieldsFontSize = useMemo(() => {
    const secondaryFieldsCount = structure?.secondaryFields?.length || 0;
    return secondaryFieldsCount <= 2 ? "1.8em" : secondaryFieldsCount === 3 ? "1.4em" : "1.1em";
  }, [structure?.secondaryFields?.length]);

  const isExpired =
    data.voided || (data.expirationDate && data.expirationDate < new Date().toISOString()) || false;

  // Fix 4: Memoize dynamic styles to prevent recalculation
  const dynamicStyles = useMemo(() => {
    const secondaryFieldsCount = structure?.secondaryFields?.length || 0;

    return `
${getPassStyles(identifier)}
  #${identifier} #passFront,
  #${identifier} #passBack {
  background: ${data.backgroundColor};
  color: ${data.foregroundColor};
}
#${identifier} #pass-transport-type {
  fill: ${data.labelColor};
}

#${identifier} #passFront #secondaryFields .passField {
${secondaryFieldsCount >= 4 ? `max-width: calc(100% / ${secondaryFieldsCount});` : ""}
}

#${identifier} #passFront #secondaryFields .passField span {
  font-size: ${secondaryFieldsFontSize};
}

#${identifier} #passFront .passField label {
  color: ${data.labelColor};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

#${identifier} #headerFields h1 {
  color: ${data.foregroundColor};
}

#${identifier} #primaryFields.strip {
  background-color: ${data.backgroundColor};
}

#${identifier} #passFront .infoButton {
  border-color: ${data.foregroundColor};
}
#${identifier} #images img {
  background: ${data.backgroundColor};
}
#${identifier} #passCard > div::before {
  ${
    values["background.png"]
      ? `background-image: url("data:application/octet-stream;base64,${values["background.png"]}");`
      : ""
  }
}
#${identifier}.boardingPass .passField span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
  `;
  }, [
    identifier,
    data.backgroundColor,
    data.foregroundColor,
    data.labelColor,
    structure?.secondaryFields?.length,
    secondaryFieldsFontSize,
    values["background.png"],
  ]);
  // Fix 5: Memoize headerFields to prevent array recreation and reversal on every render
  const headerFields = useMemo(() => {
    const fields = [...(structure?.headerFields || [])];
    fields.reverse();
    return fields;
  }, [structure?.headerFields]);

  // Fix 6: Memoize font size calculations to prevent recalculation on every render
  const globalFontSizePrimary = useMemo(() => {
    return calculateGlobalFontSizeForRow(structure?.primaryFields);
  }, [calculateGlobalFontSizeForRow, structure?.primaryFields]);

  // Header value font size — only for profiles that opt into char-density header
  // sizing (headerDensity set); otherwise undefined → PassFieldItemHeader falls
  // back to its useFitText behavior.
  const globalFontSizeHeader = useMemo(() => {
    if (profile.headerDensity == null) return undefined;
    const size = calculateGlobalFontSizeForRow(headerFields, "headerFields");
    return size && size > 0 ? size : undefined;
  }, [profile, calculateGlobalFontSizeForRow, headerFields]);

  const secondaryFields = useMemo(() => {
    if (data.storeCard) {
      const secondaryFields = structure?.secondaryFields || [];
      const auxiliaryFields = structure?.auxiliaryFields || [];
      return [...secondaryFields, ...auxiliaryFields].slice(0, 4);
    }

    // Generic cards have a max of 4 fields per row
    if (data.generic) {
      return structure?.secondaryFields?.slice(0, 4);
    }

    return structure?.secondaryFields;
  }, [data.storeCard, data.generic, structure?.secondaryFields, structure?.auxiliaryFields]);

  const auxiliaryFields = useMemo(() => {
    if (data.storeCard) {
      return [];
    }

    // Generic cards have a max of 4 fields per row
    if (data.generic) {
      return structure?.auxiliaryFields?.slice(0, 4) ?? [];
    }

    return structure?.auxiliaryFields ?? [];
  }, [data.storeCard, data.generic, structure?.auxiliaryFields]);

  const globalFontSizeSecondary = useMemo(() => {
    return calculateGlobalFontSizeForRow(secondaryFields, "secondaryFields");
  }, [calculateGlobalFontSizeForRow, secondaryFields]);

  const globalFontSizeAuxiliary = useMemo(() => {
    return calculateGlobalFontSizeForRow(auxiliaryFields, "auxiliaryFields");
  }, [calculateGlobalFontSizeForRow, auxiliaryFields]);

  // Fix 7: Memoize inline style objects to prevent recreation on every render
  const primaryFieldsStyle = useMemo(
    () => ({
      backgroundImage:
        values["strip.png"] && editorClassName !== "generic"
          ? `url(data:application/octet-stream;base64,${values["strip.png"]})`
          : "none",
    }),
    [values["strip.png"], editorClassName],
  );

  const transitIconStyle = useMemo(
    () => ({
      height: 34,
      width: 34,
      marginTop: 10,
      float: "none" as const,
      display: "inline-block" as const,
    }),
    [],
  );

  // Content-aware QR sizing — approximates iOS Wallet behaviour by shrinking
  // the QR canvas as the rest of the card consumes more vertical space.
  // Inputs: presence of strip/thumbnail images, header field count, secondary
  // field count, auxiliary field count. Output is in CSS pixels.
  const qrSize = useMemo(() => {
    const hasStrip = !!values["strip.png"] && editorClassName !== "generic";
    const hasThumbnail = !!values["thumbnail.png"];
    const headerCount = structure?.headerFields?.length ?? 0;
    const secondaryCount = secondaryFields?.length ?? 0;
    const auxiliaryCount = auxiliaryFields?.length ?? 0;

    let size = 155;
    if (hasStrip) size -= 35;
    if (hasThumbnail) size -= 20;
    if (secondaryCount >= 2) size -= 10;
    if (auxiliaryCount >= 1) size -= 10;
    if (headerCount >= 2) size -= 10;
    if (editorClassName === "boardingPass") size = Math.min(size, 120);

    return Math.max(95, Math.min(170, size));
  }, [
    values["strip.png"],
    values["thumbnail.png"],
    editorClassName,
    structure?.headerFields?.length,
    secondaryFields?.length,
    auxiliaryFields?.length,
  ]);

  return (
    <div id={identifier} className={`${editorClassName} pkpass-variant-${resolvedVariant}`}>
      <div id="passCard" className={`flipper ${flipped ? "flipped" : ""}`}>
        <div id="passFront" className={`pass${data.coupon ? "" : " shadow"}`}>
          <div className="decoration" />
          <div className="decoration" />
          <div id="headerFields">
            {values["logo.png"] && (
              <img alt="" src={`data:application/octet-stream;base64,${values["logo.png"]}`} />
            )}
            <h1>{data.logoText}</h1>
            <div>
              {headerFields.map((f, i) => (
                <PassFieldItemHeader
                  {...f}
                  globalFontSize={globalFontSizeHeader}
                  key={f.key || `${i}`}
                />
              ))}
            </div>
          </div>
          <div
            id="primaryFields"
            className={values["strip.png"] && editorClassName !== "generic" ? "strip" : undefined}
            style={primaryFieldsStyle}
          >
            {values["thumbnail.png"] && (
              <img alt="" src={`data:application/octet-stream;base64,${values["thumbnail.png"]}`} />
            )}
            <div className={values["thumbnail.png"] ? "with-thumbnail" : undefined}>
              {data.boardingPass ? (
                <>
                  {structure?.primaryFields?.[0] && (
                    <PassFieldItem
                      {...structure?.primaryFields[0]}
                      globalFontSize={globalFontSizePrimary}
                    />
                  )}
                  <span style={transitIconStyle}>
                    {structure?.transitType && <TransitIcon transitType={structure?.transitType} />}
                  </span>
                  {structure?.primaryFields?.slice(1)?.map((f, i) => (
                    <PassFieldItem
                      {...f}
                      key={f.key || `${i}`}
                      globalFontSize={globalFontSizePrimary}
                    />
                  ))}
                </>
              ) : (
                <>
                  {data.storeCard ? (
                    <>
                      {structure?.primaryFields && (
                        <div className="row">
                          {structure.primaryFields.map((field, i) => (
                            <PassFieldItem
                              {...field}
                              key={field.key || `${i}`}
                              globalFontSize={globalFontSizePrimary}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {structure?.primaryFields?.map((f, i) => (
                        <PassFieldItem
                          {...f}
                          key={f.key || `${i}`}
                          globalFontSize={globalFontSizePrimary}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div id="secondaryFields">
            <div>
              {secondaryFields?.map((f, i) => (
                <PassFieldItem
                  {...f}
                  key={f.key || `${i}`}
                  globalFontSize={globalFontSizeSecondary}
                />
              ))}
            </div>
          </div>
          {auxiliaryFields?.length > 0 ? (
            <div id="auxiliaryFields">
              <div>
                {auxiliaryFields?.map((f, i) => (
                  <PassFieldItem
                    {...f}
                    key={f.key || `${i}`}
                    globalFontSize={globalFontSizeAuxiliary}
                  />
                ))}
              </div>
            </div>
          ) : null}
          <BarcodesPreview barcodes={data.barcodes} expired={isExpired} qrSize={qrSize} />
          <span className="infoButton" onClick={() => setFlipped(!flipped)}>
            i
          </span>
        </div>
        <div id="passBack" className={`pass${data.coupon ? "" : " shadow"}`}>
          <button className="doneButton" onClick={() => setFlipped(!flipped)}>
            Done
          </button>
          <div id="backFields">
            <div>
              {structure?.backFields?.map((f, i) => (
                <PassBackFieldItem {...f} key={f.key || `${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{dynamicStyles}</style>
    </div>
  );
};
