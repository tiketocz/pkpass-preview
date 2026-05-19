// Anonymized from pkpass-builder-ui src/stories/fixtures/generic5.ts (golf member info card).
// Brand → "Sandcastle Athletic Society", primary → "Alex Doe", back-fields → 6 short generic blocks.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const generic5 = {
  "pass.json": {
    associatedStoreIdentifiers: [],
    backgroundColor: "#ffffff",
    barcodes: [
      {
        altText: "",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/sandcastle-23478",
        messageEncoding: "utf-8",
      },
    ],
    description: "Membership card",
    foregroundColor: "#0b3b63",
    formatVersion: 1,
    generic: {
      auxiliaryFields: [
        {
          key: "auxiliary-validity",
          label: "VALIDITY DATES",
          textAlignment: "PKTextAlignmentLeft",
          value: "17.6.2027",
        },
      ],
      backFields: [
        {
          key: "back-info",
          label: "🏌️‍♂️ Member info",
          value: "Member info & benefits — see example.com.",
        },
        {
          key: "back-contacts",
          label: "📞 Key contacts",
          value: "Email info@example.com · Phone +420 000 000 000",
        },
        {
          key: "back-partners",
          label: "🤝 Partner benefits",
          value: "Programme partner benefits — see example.com/partners.",
        },
        {
          key: "back-toolkit",
          label: "⛳ Toolkit",
          value: "Player toolkit — see example.com/toolkit.",
        },
        {
          key: "back-road",
          label: "📍 Roadside support",
          value: "Emergency travel support — see example.com/support.",
        },
        {
          key: "back-social",
          label: "🔗 Stay connected",
          value: "Newsletter & social — see example.com/social.",
        },
      ],
      headerFields: [{ key: "header-card", label: "MEMBERS", value: "CARD" }],
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
          value: "23478",
        },
      ],
    },
    labelColor: "#cf202f",
    organizationName: "Sandcastle Athletic Society",
    serialNumber: "sample-sandcastle-member-5",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
