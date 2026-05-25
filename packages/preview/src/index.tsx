import * as React from "react";
import { useMemo, useState } from "react";
import { BarcodesPreview } from "./components/BarcodesPreview";
import { PassBackFieldItem, PassFieldItem, PassFieldItemHeader } from "./components/PassFieldItems";
import { FONT_PROFILES, type PassVariant, calculateGlobalFontSizeForRow } from "./font-profiles";
import { getPassStyles } from "./styles";
import { TransitIcon } from "./transit-icon";
import type { FieldType, PassData, PassField, PassStructure } from "./types";

export type { PassData, PassField, PassStructure, PKTextAlignment, FieldType } from "./types";
export { PassTransitType } from "./types";
// TIK-106: re-exported from ./font-profiles so the char-density algorithm
// lives in a standalone module (testable without rendering React, coverage
// scoped to just the algorithm) while keeping the public API surface
// identical for consumers importing from `@tiketo/pkpass-preview`.
export {
  FONT_PROFILES,
  ROW_WIDTH,
  calculateFontSize,
  calculateGlobalFontSizeForRow,
  getDensity,
  getMaxFontSize,
} from "./font-profiles";
export type { FontProfile, PassVariant } from "./font-profiles";

export interface PreviewProps {
  values: { [key: string]: any };
  removeVariablePlaceholders?: boolean;
}

// Deterministic variant detection from `values` (pkpass type + field shape).
// Pure function — no DOM measurement, no content heuristics. Falls back to
// `default` when no recognised pkpass class is present. `PKPassPreview` calls
// this on every render; the public API of the component stays `values`-only.
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

  // boarding-pass: single profile post-TIK-112. The previous `-short`/`-long`
  // split routed by primary value length > 12 chars was made vestigial by
  // TIK-108 (all three BP variants collapsed onto BASELINE_PROFILE, so the
  // routing produced identical visual output regardless of branch).
  if (pass.boardingPass) return "boarding-pass";

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
    // G1/G2/G3-shape: 2+ headers (G3 denser layout) OR 1 header + 3+ secondary
    // (G1/G2 wordy 3-col layout). Collapsed onto a single `generic` profile in
    // TIK-108 — the previous `generic` vs `generic-header` split only varied
    // by useFitText vs char-density header sizing, now unified via
    // headerDensity+maxHeader.
    if (head.length >= 2 || (head.length === 1 && sec.length >= 3)) return "generic";
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
    // Primary + 2 secondary (no aux): 2-col secondary layout with hero
    // primary. Split from the plain `store-card-2col` (which also catches
    // header-only shapes like resident-benefit) so only the with-primary
    // case gets the iOS hero font tier.
    if (prim.length >= 1 && sec.length === 2) return "store-card-2col-hero";
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

  // TIK-106: delegates to the pure top-level helper so unit tests can hit the
  // same algorithm without rendering React. Memo keeps the closure stable for
  // downstream useMemo deps (globalFontSizePrimary/Header/Secondary/Auxiliary).
  const calculateRowFontSize = useMemo(() => {
    return (fields: PassField[] | undefined, fieldType?: FieldType) =>
      calculateGlobalFontSizeForRow(profile, fields, fieldType);
  }, [profile]);

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
    return calculateRowFontSize(structure?.primaryFields);
  }, [calculateRowFontSize, structure?.primaryFields]);

  // Header value font size — only for profiles that opt into char-density header
  // sizing (headerDensity set); otherwise undefined → PassFieldItemHeader falls
  // back to its useFitText behavior.
  const globalFontSizeHeader = useMemo(() => {
    if (profile.headerDensity == null) return undefined;
    const size = calculateRowFontSize(headerFields, "headerFields");
    return size && size > 0 ? size : undefined;
  }, [profile, calculateRowFontSize, headerFields]);

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
    return calculateRowFontSize(secondaryFields, "secondaryFields");
  }, [calculateRowFontSize, secondaryFields]);

  const globalFontSizeAuxiliary = useMemo(() => {
    return calculateRowFontSize(auxiliaryFields, "auxiliaryFields");
  }, [calculateRowFontSize, auxiliaryFields]);

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
                  valueFontSize={globalFontSizeHeader}
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
