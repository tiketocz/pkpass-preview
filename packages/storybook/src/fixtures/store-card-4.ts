// Anonymized from pkpass-builder-ui src/stories/fixtures/store-card4.ts (golf members card with strip).
// Brand → "Greenfield Golf Club", back-fields → 3 short generic blocks.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const storeCard4 = {
  "pass.json": {
    backgroundColor: "#ffffff",
    description: "Members card",
    foregroundColor: "#000000",
    formatVersion: 1,
    labelColor: "#b2b2b2",
    logoText: "",
    organizationName: "Greenfield Golf Club",
    serialNumber: "sample-greenfield-storecard-4",
    storeCard: {
      auxiliaryFields: [
        {
          key: "auxiliary-label",
          label: "aaaa",
          value: "bbbb",
        },
      ],
      backFields: [
        {
          key: "back-news",
          label: "News",
          value: "Season opener and latest news — see example.com/news.",
        },
        {
          key: "back-events",
          label: "Events",
          value: "Upcoming tournaments — see example.com/events.",
        },
        {
          key: "back-members",
          label: "Members",
          value: "Member benefits — see example.com/members.",
        },
      ],
      headerFields: [
        {
          key: "header-member",
          label: "Members card",
          value: "123456",
        },
      ],
      primaryFields: [
        {
          key: "primary-photo",
          label: "",
          value: "   ",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-name",
          label: "Name",
          textAlignment: "PKTextAlignmentLeft",
          value: "John Doe",
        },
        {
          key: "secondary-news",
          label: "News",
          textAlignment: "PKTextAlignmentRight",
          value: "Flip the card",
        },
      ],
    },
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
