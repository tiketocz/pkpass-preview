// Anonymized from pkpass-builder-ui src/stories/fixtures/store-card8.ts (patisserie info card).
// Brand "Iveta Fabešová" → "Daisy's Sweet Shop" / logoText "DAISY SAMPLE", labels translated to EN.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const storeCard8 = {
  "pass.json": {
    backgroundColor: "#11012b",
    barcodes: [
      {
        altText: "SHARE",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/daisys-sweet-shop-loyalty",
        messageEncoding: "utf-8",
      },
    ],
    description: "Info card",
    foregroundColor: "#e9aa7a",
    formatVersion: 1,
    labelColor: "#e9aa7a",
    logoText: "DAISY SAMPLE",
    organizationName: "Daisy's Sweet Shop",
    serialNumber: "sample-daisys-sweetshop-8",
    storeCard: {
      auxiliaryFields: [],
      backFields: [
        {
          key: "back-news",
          label: "ℹ️ News",
          value: "Latest seasonal news — see example.com/news.",
        },
        {
          key: "back-shop",
          label: "🍰 Sweet shop",
          value: "About our shop — see example.com/about.",
        },
        {
          key: "back-menu",
          label: "🧁 Menu & online order",
          value: "Order online — see example.com/order.",
        },
        {
          key: "back-contact",
          label: "📇 Contact",
          value: "Email hello@example.com · Phone +420 000 000 000",
        },
        {
          key: "back-footer",
          value: "Sample sweet shop card — example.com",
        },
      ],
      headerFields: [
        {
          key: "header-card",
          label: "INFO",
          textAlignment: "PKTextAlignmentRight",
          value: "CARD",
        },
      ],
      primaryFields: [],
      secondaryFields: [
        {
          key: "secondary-name",
          label: "SWEET SHOP",
          textAlignment: "PKTextAlignmentLeft",
          value: "DAISY SAMPLE",
        },
        {
          key: "secondary-info",
          label: "FOR MORE INFO ",
          textAlignment: "PKTextAlignmentRight",
          value: "TURN THE CARD  ",
        },
      ],
    },
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
