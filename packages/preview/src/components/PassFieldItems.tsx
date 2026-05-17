import type { Property } from "csstype";
import * as React from "react";
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

export const PassFieldItemHeader = ({
  label,
  value,
  attributedValue,
  textAlignment,
  globalFontSize,
}: PassField & {
  globalFontSize?: number;
}) => {
  const { fontSize, ref } = useFitText({});
  const textAlign: Property.TextAlign = getTextAlignment(textAlignment);
  const headerFontSize = globalFontSize != null ? `${globalFontSize}px` : fontSize;

  return (
    <>
      <div className="passField" style={{ textAlign }} ref={ref}>
        <label>{label}</label>
        <span>
          <span style={{ fontSize: headerFontSize, fontWeight: 400 }}>
            {attributedValue?.toString() || value?.toString()}
          </span>
        </span>
      </div>{" "}
    </>
  );
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
