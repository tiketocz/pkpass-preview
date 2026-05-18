// Anonymized from pkpass-builder-ui src/stories/fixtures/generic9.ts (sales assistant business card).
// Brand → "PedalPlan" (logoText only, no logo image), email → example.com, header label → EN.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const generic9 = {
  "pass.json": {
    backgroundColor: "#ffffff",
    barcodes: [
      {
        altText: "SCAN & SHARE",
        format: "PKBarcodeFormatQR",
        message: "https://example.com/p/pedalplan-sales-businesscard",
        messageEncoding: "iso-8859-1",
      },
    ],
    description: "SALES BUSINESS CARD",
    foregroundColor: "#ec2229",
    formatVersion: 1,
    logoText: "PedalPlan",
    generic: {
      auxiliaryFields: [
        {
          key: "auxiliary-email",
          label: "E-MAIL",
          textAlignment: "PKTextAlignmentLeft",
          value: "sales@example.com",
        },
        {
          key: "auxiliary-info",
          label: "MORE INFO",
          textAlignment: "PKTextAlignmentRight",
          value: "turn the card",
        },
      ],
      backFields: [
        {
          key: "back-contacts",
          label: "Save my contacts",
          value: "Email sales@example.com · Phone +420 000 000 000",
        },
        {
          key: "back-address",
          label: "Address 🗺️",
          value: "Sample HQ, 100 00 Sample City",
        },
        {
          key: "back-inspiration",
          label: "Inspiration",
          value: "Sample portfolio — see example.com/inspiration.",
        },
        {
          key: "back-footer",
          label: "",
          value: "Sample sales card — example.com",
        },
      ],
      headerFields: [
        {
          key: "header-card",
          label: "JOHN DOE",
          textAlignment: "PKTextAlignmentRight",
          value: "SALES BUSINESS CARD",
        },
      ],
      primaryFields: [
        {
          key: "primary-name",
          label: "NAME / SURNAME",
          value: "John Doe",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-position",
          label: "POSITION",
          textAlignment: "PKTextAlignmentLeft",
          value: "Sales Assistant",
        },
        {
          key: "secondary-phone",
          label: "PHONE",
          textAlignment: "PKTextAlignmentRight",
          value: "+420 000 000 000",
        },
      ],
    },
    labelColor: "#034ea2",
    organizationName: "PedalPlan",
    serialNumber: "sample-pedalplan-sales-9",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
