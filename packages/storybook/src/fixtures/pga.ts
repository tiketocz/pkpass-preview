// Anonymized from pkpass-builder-ui src/stories/fixtures/pga.ts (golf federation tour-pro card).
// Brand → "National Golf Federation of Aurelia", person → "Jane Sample", back-fields → 4 short blocks.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const pga = {
  "pass.json": {
    description: "Membership card",
    organizationName: "National Golf Federation of Aurelia",
    barcodes: [
      {
        messageEncoding: "utf-8",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/aurelia-tour-pro-001",
        altText: "Membership card",
      },
    ],
    foregroundColor: "#000000",
    labelColor: "#1a1f71",
    backgroundColor: "#ffffff",
    formatVersion: 1,
    generic: {
      primaryFields: [
        {
          key: "primary-name",
          label: "NAME / SURNAME",
          value: "Jane Sample",
        },
      ],
      headerFields: [{ key: "header-card", label: "MEMBERS", value: "CARD" }],
      secondaryFields: [
        {
          key: "secondary-position",
          label: "POSITION",
          value: "TOUR PROFESSIONAL",
        },
        {
          key: "secondary-number",
          label: "NR.",
          value: "00123",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      auxiliaryFields: [
        {
          key: "auxiliary-flip",
          label: "FOR MORE INFO",
          value: "turn the card",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      backFields: [
        {
          key: "back-news",
          label: "News & announcements",
          value: "Latest federation news — see example.com.",
        },
        {
          key: "back-tournaments",
          label: "Tournaments",
          value: "Upcoming tournaments — see example.com/tournaments.",
        },
        {
          key: "back-members",
          label: "Members",
          value: "Member benefits — see example.com/members.",
        },
        {
          key: "back-footer",
          label: "",
          value: "Sample federation card — example.com",
        },
      ],
    },
    serialNumber: "sample-aurelia-tour-pro",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
