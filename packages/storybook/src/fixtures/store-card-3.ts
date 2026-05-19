// Anonymized from pkpass-builder-ui src/stories/fixtures/store-card3.ts (golf club info card).
// Secondary value "PGA National Czech Rep." → "Greenfield Golf Club".

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const storeCard3 = {
  "pass.json": {
    backgroundColor: "#BBBBBB",
    description: "Put pass description here",
    foregroundColor: "#000000",
    formatVersion: 1,
    labelColor: "#000000",
    organizationName: "Put organization name here",
    serialNumber: "sample-storecard-3",
    storeCard: {
      secondaryFields: [
        {
          key: "secondary-club-info",
          label: "CLUB INFORMATION",
          value: "Greenfield Golf Club",
        },
        {
          key: "secondary-info",
          label: "For more info",
          textAlignment: "PKTextAlignmentRight",
          value: "TURN THE CARD",
        },
      ],
    },
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
