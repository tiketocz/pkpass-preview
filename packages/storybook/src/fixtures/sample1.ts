// Anonymized from pkpass-builder-ui src/stories/fixtures/sample1.ts (Pilulka loyalty coupon).
// Brand → "Coastline Pharmacy", primary text → generic loyalty thank-you, back-fields → 1 generic block.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const sample1 = {
  "pass.json": {
    backgroundColor: "#ffffff",
    description: "Sample loyalty coupon",
    foregroundColor: "#e6007e",
    formatVersion: 1,
    labelColor: "#e6007e",
    organizationName: "Coastline Pharmacy",
    serialNumber: "sample-coastline-pharmacy-loyalty",
    storeCard: {
      backFields: [
        {
          key: "back-terms",
          value: "Sample loyalty programme — see example.com for full terms.",
        },
      ],
      primaryFields: [
        {
          key: "primary-thanks",
          value: "THANK YOU FOR YOUR LOYALTY.",
        },
      ],
      secondaryFields: [],
    },
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
