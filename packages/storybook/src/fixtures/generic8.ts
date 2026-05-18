// Anonymized from pkpass-builder-ui src/stories/fixtures/generic8.ts (business card).
// Person → "Martin Sample" + example.com email, back-fields → 4 short generic blocks.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const generic8 = {
  "pass.json": {
    backgroundColor: "#ffffff",
    barcodes: [
      {
        altText: "SCAN & SHARE",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/martin-sample-businesscard",
        messageEncoding: "iso-8859-1",
      },
    ],
    description: "BUSINESS CARD",
    foregroundColor: "#000050",
    formatVersion: 1,
    generic: {
      auxiliaryFields: [
        {
          key: "auxiliary-email",
          label: "E-MAIL",
          textAlignment: "PKTextAlignmentLeft",
          value: "martin.sample@example.com",
        },
        {
          key: "auxiliary-info",
          label: "FOR MORE INFO",
          textAlignment: "PKTextAlignmentRight",
          value: "turn the card",
        },
      ],
      backFields: [
        {
          key: "back-news",
          label: "News",
          value: "Latest updates — see example.com/news.",
        },
        {
          key: "back-contacts",
          label: "Contact details 🇨🇿",
          value: "Email hello@example.com · Phone +420 000 000 000",
        },
        {
          key: "back-address",
          label: "Address 🗺️",
          value: "Sample HQ, 100 00 Sample City",
        },
        {
          key: "back-footer",
          label: "Inspiration",
          value: "Sample portfolio — see example.com/inspiration.",
        },
      ],
      headerFields: [
        {
          key: "header-card",
          label: "MARTIN SAMPLE",
          textAlignment: "PKTextAlignmentRight",
          value: "BUSINESS CARD",
        },
      ],
      primaryFields: [
        {
          key: "primary-name",
          label: "NAME / SURNAME",
          value: "Martin Sample",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-position",
          label: "POSITION",
          textAlignment: "PKTextAlignmentLeft",
          value: "Business Director",
        },
        {
          key: "secondary-mobile",
          label: "MOBILE",
          textAlignment: "PKTextAlignmentRight",
          value: "+420 000 000 000",
        },
      ],
    },
    labelColor: "#00ffb2",
    organizationName: "Sample Studio",
    serialNumber: "sample-business-card-8",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
