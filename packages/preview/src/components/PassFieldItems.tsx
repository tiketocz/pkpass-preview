import type { Property } from "csstype";
import * as React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import useFitText from "use-fit-text";
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
// at maxFontSize in the same font stack. If it overflows, scale fontSize
// down by the ratio (floor at MIN_PRIMARY_PX = profile.min). One layout
// measurement + one canvas measurement per field, no bisection loop —
// deterministic and independent per field so BP-2 long FROM shrinks while
// short TO stays at hero. Re-measures on window resize so responsive layout
// (currently unused for boarding-pass primary, but cheap insurance) stays
// correct.
const MIN_PRIMARY_PX = 10;
const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
let _measureCanvas: HTMLCanvasElement | null = null;
const getMeasureCtx = (): CanvasRenderingContext2D | null => {
  if (typeof document === "undefined") return null;
  if (!_measureCanvas) _measureCanvas = document.createElement("canvas");
  return _measureCanvas.getContext("2d");
};

export const PassFieldItemFit = ({
  label,
  value,
  attributedValue,
  textAlignment,
  maxFontSize,
}: PassField & { maxFontSize: number }) => {
  const textAlign: Property.TextAlign = getTextAlignment(textAlignment);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSizePx, setFontSizePx] = useState<number>(maxFontSize);
  const text = attributedValue?.toString() || value?.toString() || "";

  useLayoutEffect(() => {
    const recalc = () => {
      const el = containerRef.current;
      const ctx = getMeasureCtx();
      if (!el || !ctx) return;
      const available = el.clientWidth;
      if (available === 0) return;
      ctx.font = `300 ${maxFontSize}px ${FONT_STACK}`;
      const rendered = ctx.measureText(text).width;
      if (rendered <= available) {
        setFontSizePx(maxFontSize);
        return;
      }
      const scaled = Math.floor((maxFontSize * available) / rendered);
      setFontSizePx(Math.max(MIN_PRIMARY_PX, scaled));
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [text, maxFontSize]);

  return (
    <>
      <div ref={containerRef} className="passField" style={{ textAlign }}>
        <label>{label}</label>
        <span>
          <span style={{ fontSize: `${fontSizePx}px`, fontWeight: 300 }}>{text}</span>
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
