import bwipjs from "@bwip-js/browser";
import * as React from "react";
import { useEffect, useState } from "react";

import { type Barcode, BarcodeFormat } from "../types";

interface BarcodeProps {
  barcodes?: Barcode[];
  expired?: boolean;
  qrSize?: number;
}
export const BarcodesPreview = ({ barcodes, expired, qrSize }: BarcodeProps) => {
  const barcodeKey = Math.random().toString(36).substring(7);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const currentBarcode = barcodes?.[Math.min(index, barcodes.length - 1)];
  useEffect(() => {
    setError(null);
    let bcid = "";
    let scale = 2;
    switch (currentBarcode?.format) {
      case BarcodeFormat.PKBarcodeFormatAztec:
        bcid = "azteccode";
        scale = 3;
        break;
      case BarcodeFormat.PKBarcodeFormatCode128:
        bcid = "code128";
        break;
      case BarcodeFormat.PKBarcodeFormatPDF417:
        bcid = "pdf417";
        break;
      case BarcodeFormat.PKBarcodeFormatQR:
        bcid = "qrcode";
        scale = 4;
        break;
    }

    if (currentBarcode) {
      try {
        bwipjs.toCanvas(`barcode-canvas-${barcodeKey}`, {
          bcid, // Barcode type
          text: currentBarcode.message, // Text to encode
          scale, // 3x scaling factor
          includetext: false, // Show human-readable text
          textxalign: "center", // Always good to set this
          barcolor: expired ? "00000055" : "000000",
        });
      } catch (err) {
        setError(err as Error);
      }
    }
  }, [currentBarcode]);

  const isQRcode = (code: BarcodeFormat): boolean => code === BarcodeFormat.PKBarcodeFormatQR;

  if (!currentBarcode) {
    return <></>;
  }

  const isQR = isQRcode(currentBarcode?.format);

  return (
    <div
      id="barcode"
      className={currentBarcode.format}
      onClick={() => {
        let newIndex = index + 1;
        if (barcodes && newIndex >= barcodes.length) {
          newIndex = 0;
        }
        setIndex(newIndex);
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: isQR ? "auto" : "70%",
          maxWidth: isQR && qrSize ? qrSize + 130 : undefined,
        }}
        id="barcode-wrapper"
      >
        <div
          id="canvas-wrapper"
          style={{
            height: isQR ? "auto" : "2.8em",
            overflow: "hidden",
            marginBottom: isQR ? 0 : "0.56em",
          }}
        >
          <canvas
            id={`barcode-canvas-${barcodeKey}`}
            hidden={!!error}
            style={{
              display: "inline-block",
              width: isQR ? (qrSize ?? "auto") : "90%",
              height: isQR ? (qrSize ?? "auto") : "2.8em",
            }}
          />
        </div>
        {error && <>{error.message}</>}
        <div
          className="text"
          style={{
            fontSize: "1.2em",
            color: expired ? "#00000055" : "#000000",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {expired ? "this pass has expired" : currentBarcode.altText}{" "}
          {barcodes && barcodes.length > 1 && (
            <>
              ({index + 1}/{barcodes?.length})
            </>
          )}
        </div>
      </div>
    </div>
  );
};
