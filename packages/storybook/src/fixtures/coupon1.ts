// Anonymized from pkpass-builder-ui src/stories/fixtures/coupon1.ts (mobile carrier loyalty coupon).
// logoText "Attido Mobile!!" → "Skyrider Mobile", back-fields → 3 short generic blocks.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const coupon1 = {
  "pass.json": {
    backgroundColor: "#ffdd00",
    barcodes: [
      {
        altText: "SCAN ME",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/skyrider-mobile-coupon",
        messageEncoding: "iso-8859-1",
      },
    ],
    coupon: {
      auxiliaryFields: [
        { key: "aux-ios", label: "iOS", value: "" },
        {
          key: "aux-android",
          label: "Android",
          textAlignment: "PKTextAlignmentCenter",
          value: "",
        },
        {
          key: "aux-blackberry",
          label: "Blackberry",
          textAlignment: "PKTextAlignmentRight",
          value: "2",
        },
        { key: "aux-spacer-1", value: " " },
        { key: "aux-spacer-2", value: " " },
      ],
      backFields: [
        {
          key: "back-offers",
          label: "Mobile offers",
          value: "Latest offers — see example.com/offers.",
        },
        {
          key: "back-devices",
          label: "Compatible devices",
          value: "Device list — see example.com/devices.",
        },
        {
          key: "back-footer",
          label: "",
          value: "Sample mobile coupon — example.com",
        },
      ],
      headerFields: [
        {
          changeMessage: "Your points have changed to %@",
          key: "header-points",
          label: "Points",
          value: "666",
        },
      ],
      primaryFields: [],
      secondaryFields: [],
    },
    description: "Put pass description here",
    foregroundColor: "#333333",
    formatVersion: 1,
    labelColor: "#000000",
    logoText: "Skyrider Mobile",
    organizationName: "Skyrider Mobile",
    serialNumber: "sample-skyrider-coupon-1",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
