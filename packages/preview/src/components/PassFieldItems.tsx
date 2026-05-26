import type { Property } from "csstype";
import * as React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import useFitText from "use-fit-text";
import { PASS_FONT_STACK } from "../styles";
import { PKTextAlignment, type PassField } from "../types";

const getTextAlignment = (textAlignment: PKTextAlignment | undefined): Property.TextAlign => {
  let textAlign = "inherit";
  switch (textAlignment) {
    case PKTextAlignment.PKTextAlignmentLeft:
      textAlign = "left";
      break;
    case PKTextAlignment.PKTextAlignmentCenter:
      textAlign = "center";
      break;
    case PKTextAlignment.PKTextAlignmentRight:
      textAlign = "right";
      break;
    case PKTextAlignment.PKTextAlignmentNatural:
      textAlign = "left";
      break;
  }

  return textAlign as Property.TextAlign;
};

export const PassFieldItem = ({
  label,
  value,
  attributedValue,
  textAlignment,
  globalFontSize,
}: PassField & {
  globalFontSize?: number;
}) => {
  const textAlign: Property.TextAlign = getTextAlignment(textAlignment);
  const verticalAlign: Property.VerticalAlign = !value ? "top" : "bottom";

  return (
    <>
      <div className="passField" style={{ textAlign, verticalAlign }}>
        <label>{label}</label>
        <span>
          <span style={{ fontSize: `${globalFontSize}px` }}>
            {attributedValue?.toString() || value?.toString()}
          </span>
        </span>
      </div>{" "}
    </>
  );
};

// TIK-145 — per-field shrink-to-fit primary, used by boarding-pass so the
// FROM / TO columns scale independently (iOS Wallet behaviour). Mechanism:
// after mount, read the .passField column width (200/90 px per boarding-pass
// CSS) and use canvas measureText to compute the rendered width of the value
// at maxFontSize in the same PASS_FONT_STACK the CSS renders with. If it
// overflows, scale fontSize down by the ratio (floor at minFontSize from
// the caller's FontProfile.min). One layout measurement + one canvas
// measurement per field, no bisection loop — deterministic and independent
// per field so BP-2 long FROM shrinks while short TO stays at hero. A
// ResizeObserver on the container catches both window resizes AND
// display:none → block transitions (e.g. Storybook docs tabs).
const BOARDING_PASS_PRIMARY_WEIGHT = 300;
let _measureCanvas: HTMLCanvasElement | null = null;
const getMeasureCtx = (): CanvasRenderingContext2D | null => {
  if (typeof document === "undefined") return null;
  if (!_measureCanvas) _measureCanvas = document.createElement("canvas");
  return _measureCanvas.getContext("2d");
};

// Pure helper extracted so the shrink math is unit-testable independently
// from the DOM / canvas read. Given the rendered width of the text at
// maxFontSize, returns the size that fits availableWidth — floored at
// minFontSize. Returns maxFontSize when the text already fits.
export const scaledFontSize = (
  maxFontSize: number,
  renderedWidth: number,
  availableWidth: number,
  minFontSize: number,
): number => {
  if (renderedWidth <= availableWidth) return maxFontSize;
  const scaled = Math.floor((maxFontSize * availableWidth) / renderedWidth);
  return Math.max(minFontSize, scaled);
};

export const PassFieldItemFit = ({
  label,
  value,
  attributedValue,
  textAlignment,
  maxFontSize,
  minFontSize,
}: PassField & { maxFontSize: number; minFontSize: number }) => {
  const textAlign: Property.TextAlign = getTextAlignment(textAlignment);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSizePx, setFontSizePx] = useState<number>(maxFontSize);
  const text = attributedValue?.toString() || value?.toString() || "";

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ctx = getMeasureCtx();
    const recalc = () => {
      if (!ctx) return;
      const available = el.clientWidth;
      if (available === 0) return;
      ctx.font = `${BOARDING_PASS_PRIMARY_WEIGHT} ${maxFontSize}px ${PASS_FONT_STACK}`;
      const rendered = ctx.measureText(text).width;
      const next = scaledFontSize(maxFontSize, rendered, available, minFontSize);
      setFontSizePx((prev) => (prev === next ? prev : next));
    };
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, maxFontSize, minFontSize]);

  return (
    <>
      <div ref={containerRef} className="passField" style={{ textAlign }}>
        <label>{label}</label>
        <span>
          <span style={{ fontSize: `${fontSizePx}px` }}>{text}</span>
        </span>
      </div>{" "}
    </>
  );
};

// Profiles with `headerDensity` precompute header font size, so `useFitText`'s
// ResizeObserver and DOM measurement are dead work. Split the component so the
// hook only mounts in the auto-fit branch (TIK-109).
const PassFieldItemHeaderFit = ({ label, value, attributedValue, textAlignment }: PassField) => {
  const { fontSize, ref } = useFitText({});
  const textAlign: Property.TextAlign = getTextAlignment(textAlignment);

  return (
    <>
      <div className="passField" style={{ textAlign }} ref={ref}>
        <label>{label}</label>
        <span>
          <span style={{ fontSize, fontWeight: 400 }}>
            {attributedValue?.toString() || value?.toString()}
          </span>
        </span>
      </div>{" "}
    </>
  );
};

const PassFieldItemHeaderStatic = ({
  label,
  value,
  attributedValue,
  textAlignment,
  valueFontSize,
}: PassField & { valueFontSize: number }) => {
  const textAlign: Property.TextAlign = getTextAlignment(textAlignment);

  return (
    <>
      <div className="passField" style={{ textAlign }}>
        <label>{label}</label>
        <span>
          <span style={{ fontSize: `${valueFontSize}px`, fontWeight: 400 }}>
            {attributedValue?.toString() || value?.toString()}
          </span>
        </span>
      </div>{" "}
    </>
  );
};

export const PassFieldItemHeader = ({
  valueFontSize,
  ...field
}: PassField & {
  valueFontSize?: number;
}) => {
  if (valueFontSize != null) {
    return <PassFieldItemHeaderStatic {...field} valueFontSize={valueFontSize} />;
  }
  return <PassFieldItemHeaderFit {...field} />;
};

export const PassBackFieldItem = ({ label, value, attributedValue, textAlignment }: PassField) => {
  const { fontSize, ref } = useFitText({});
  const textAlign: Property.TextAlign = getTextAlignment(textAlignment);

  return (
    <>
      <div ref={ref} className="passField" style={{ textAlign }}>
        <label>{label}</label>
        <span>
          <span
            style={{ fontSize }}
            dangerouslySetInnerHTML={{
              __html: attributedValue?.toString() || value?.toString(),
            }}
          />
        </span>
      </div>{" "}
    </>
  );
};
