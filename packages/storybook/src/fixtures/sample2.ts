// Anonymized from pkpass-builder-ui src/stories/fixtures/sample2.ts (Abu Dhabi GC ID card).
// Brand → "Sandcastle Athletic Society", person → "Alex Doe", back-fields → 4 short generic blocks.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const sample2 = {
  "pass.json": {
    backgroundColor: "#ffffff",
    barcodes: [
      {
        altText: "SAMPLE-CARD-001",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/sample-card-001",
        messageEncoding: "utf-8",
      },
    ],
    description: "Membership Card",
    foregroundColor: "#000000",
    formatVersion: 1,
    generic: {
      auxiliaryFields: [
        {
          key: "auxiliary-validity",
          label: "VALIDITY DATES",
          textAlignment: "PKTextAlignmentLeft",
          value: "31.12.2024",
        },
      ],
      backFields: [
        {
          key: "back-benefits",
          label: "⛳🛍 BENEFITS & DISCOUNTS",
          value: "Sample benefits & member discounts — see example.com for details.",
        },
        {
          key: "back-coaches",
          label: "🏌️ ACADEMY COACHES",
          value: "Coaching contacts available at example.com/coaches.",
        },
        {
          key: "back-contacts",
          label: "ℹ️ GENERAL CONTACTS",
          value: "Email info@example.com · Phone +420 000 000 000",
        },
        {
          key: "back-footer",
          label: "",
          value: "Sample membership card — example.com",
        },
      ],
      headerFields: [
        {
          key: "header-card",
          label: "MEMBERS",
          value: "CARD",
        },
      ],
      primaryFields: [
        {
          key: "primary-name",
          label: "NAME / SURNAME",
          value: "Alex Doe",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-type",
          label: "MEMBERSHIP TYPE",
          textAlignment: "PKTextAlignmentLeft",
          value: "Adult Development Programme",
        },
        {
          key: "secondary-number",
          label: "MEMBERSHIP NR.",
          textAlignment: "PKTextAlignmentRight",
          value: "",
        },
      ],
    },
    labelColor: "#ee3124",
    organizationName: "Sandcastle Athletic Society",
    serialNumber: "sample-sandcastle-membership",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
