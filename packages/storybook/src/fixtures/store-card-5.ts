// Anonymized from pkpass-builder-ui src/stories/fixtures/store-card5.ts (bike subscription).
// Brand "BikePlan" → "PedalPlan", PLAN label "KOLO" → "BIKE", back-fields → 4 generic blocks.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const storeCard5 = {
  "pass.json": {
    backgroundColor: "#fee600",
    barcodes: [
      {
        altText: "23001208654",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/pedalplan-23001208654",
        messageEncoding: "iso-8859-1",
      },
    ],
    description: "Assistance card",
    foregroundColor: "#000000",
    formatVersion: 1,
    labelColor: "#000038",
    logoText: "",
    organizationName: "PedalPlan",
    serialNumber: "sample-pedalplan-storecard-5",
    storeCard: {
      auxiliaryFields: [
        {
          key: "auxiliary-valid-from",
          label: "VALID FROM",
          value: "01.02.2024",
        },
        {
          key: "auxiliary-valid-to",
          label: "VALID TO",
          value: "01.02.2025",
        },
        {
          key: "auxiliary-plan",
          label: "PLAN",
          value: "BIKE",
        },
        {
          key: "auxiliary-more",
          label: "MORE INFO",
          textAlignment: "PKTextAlignmentRight",
          value: "↪️ TURN THE CARD",
        },
      ],
      backFields: [
        {
          key: "back-news",
          label: "📻 News",
          value: "Latest news — see example.com/news.",
        },
        {
          key: "back-insurance",
          label: "💡 Your insurance",
          value: "Policy details — see example.com/policy.",
        },
        {
          key: "back-assistance",
          label: "🤵 Assistance services",
          value: "24/7 assistance line — Phone +420 000 000 000",
        },
        {
          key: "back-footer",
          value: "Sample assistance card — example.com",
        },
      ],
      headerFields: [
        {
          key: "header-card",
          label: "ASSISTANCE",
          value: "CARD",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-id",
          label: "ID CONTACT",
          value: "23001208654",
        },
        {
          key: "secondary-holder",
          label: "POLICYHOLDER",
          textAlignment: "PKTextAlignmentRight",
          value: "JOHN DOE",
        },
      ],
    },
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
