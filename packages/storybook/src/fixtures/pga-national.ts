// Anonymized from pkpass-builder-ui src/stories/fixtures/pga-national.ts (long QR altText test).
// Brand → "Greenfield Golf Club", back-fields → 1 generic block, QR altText kept long (TIK-43 regression test).

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const pgaNational = {
  "pass.json": {
    logoText: "",
    description: "Members card",
    organizationName: "Greenfield Golf Club",
    barcodes: [
      {
        messageEncoding: "iso-8859-1",
        format: "PKBarcodeFormatQR",
        message: "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
        altText: "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
      },
    ],
    foregroundColor: "#000000",
    labelColor: "#b2b2b2",
    backgroundColor: "#ffffff",
    formatVersion: 1,
    storeCard: {
      primaryFields: [
        {
          key: "primary-photo",
          label: "",
          value: "   ",
        },
      ],
      headerFields: [
        {
          key: "header-member",
          label: "Members card",
          value: "001234",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-name",
          label: "Name",
          value: "John Doe",
          textAlignment: "PKTextAlignmentLeft",
        },
        {
          key: "secondary-info",
          label: "News",
          value: "Flip the card",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      auxiliaryFields: [],
      backFields: [
        {
          key: "back-info",
          label: "Club info",
          value: "Sample club benefits and member news — see example.com for the full programme.",
        },
      ],
    },
    serialNumber: "sample-greenfield-members-card",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
