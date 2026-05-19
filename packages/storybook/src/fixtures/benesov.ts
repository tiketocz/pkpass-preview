// Anonymized from pkpass-builder-ui src/stories/fixtures/benesov.ts (municipal benefit card).
// Brand → "City of Northshore", labels → EN, back-fields → 1 generic block.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const benesov = {
  "pass.json": {
    logoText: "",
    description: "Resident card",
    organizationName: "City of Northshore",
    barcodes: [
      {
        messageEncoding: "utf-8",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/northshore-resident-001",
        altText: "NS-RESIDENT-001",
      },
    ],
    foregroundColor: "#060056",
    labelColor: "#060056",
    backgroundColor: "#ffffff",
    formatVersion: 1,
    storeCard: {
      primaryFields: [],
      headerFields: [
        {
          key: "header-valid",
          label: "VALID",
          value: "YES",
          textAlignment: "PKTextAlignmentRight",
        },
        {
          key: "header-card",
          label: "RESIDENT",
          value: "CARD",
          textAlignment: "PKTextAlignmentLeft",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-id",
          label: "ID",
          value: "0123456789",
          textAlignment: "PKTextAlignmentLeft",
        },
      ],
      auxiliaryFields: [
        {
          key: "auxiliary-flip",
          value: "↪️ FLIP FOR BENEFITS",
          label: "MORE INFO",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      backFields: [
        {
          key: "back-about",
          label: "About this card",
          value:
            "Municipal resident benefits — see example.com for the latest list of partners and offers.",
        },
      ],
    },
    serialNumber: "sample-northshore-resident",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
