// Anonymized from pkpass-builder-ui src/stories/fixtures/generic7.ts (golf range members card).
// Brand → "Greenfield Golf Club", back-fields → 6 short generic blocks.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const generic7 = {
  "pass.json": {
    associatedStoreIdentifiers: [],
    backgroundColor: "#ffffff",
    barcodes: [
      {
        altText: "",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/greenfield-membership",
        messageEncoding: "utf-8",
      },
    ],
    description: "Membership card",
    foregroundColor: "#000000",
    formatVersion: 1,
    generic: {
      auxiliaryFields: [
        {
          key: "auxiliary-member",
          label: "MEMBER ",
          textAlignment: "PKTextAlignmentLeft",
          value: "VALID THRU ",
        },
        {
          key: "auxiliary-info",
          label: "FOR MORE INFO",
          value: "turn the card",
        },
      ],
      backFields: [
        {
          key: "back-news",
          label: "🏌️ News",
          value: "Range open — latest updates at example.com/news.",
        },
        {
          key: "back-shop",
          label: "Shop offer ⛳🛍",
          value: "Special offer at the golf shop — see example.com/shop.",
        },
        {
          key: "back-tournaments",
          label: "Tournaments ⛳",
          value: "Members tournaments — see example.com/tournaments.",
        },
        {
          key: "back-contacts",
          label: "Contacts ℹ️",
          value: "Email info@example.com · Phone +420 000 000 000",
        },
        {
          key: "back-address",
          label: "Address 🗺️",
          value: "Sample address — see example.com/visit.",
        },
        {
          key: "back-footer",
          label: "",
          value: "Sample golf members card — example.com",
        },
      ],
      headerFields: [{ key: "header-card", label: "MEMBERS", value: "CARD" }],
      primaryFields: [
        {
          key: "primary-name",
          label: "NAME / SURNAME",
          value: " ",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-type",
          label: "MEMBER TYPE",
          value: "",
        },
        {
          key: "secondary-number",
          label: "NR.",
          textAlignment: "PKTextAlignmentRight",
          value: "",
        },
      ],
    },
    labelColor: "#ee3124",
    organizationName: "Greenfield Golf Club",
    serialNumber: "sample-greenfield-member-7",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
