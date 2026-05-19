// Anonymized from pkpass-builder-ui src/stories/fixtures/store-card1.ts (insurance assistance card).
// Org was already neutral; back-fields translated CZ → EN.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const storeCard1 = {
  "pass.json": {
    backgroundColor: "#ffffff",
    barcodes: [
      {
        altText: "FOR MORE INFO TURN THE CARD",
        format: "PKBarcodeFormatQR",
        message: "Hi",
        messageEncoding: "iso-8859-1",
      },
    ],
    description: "Put pass description here",
    foregroundColor: "#000000",
    formatVersion: 1,
    labelColor: "#015f91",
    logoText: "",
    organizationName: "Put organization name here",
    serialNumber: "sample-storecard-1",
    storeCard: {
      backFields: [
        {
          key: "back-info",
          label: "💡 ANY INFO",
          value: "Any info — see example.com.",
        },
        {
          key: "back-assistance",
          label: "🤵 Assistance services",
          value: "24/7 assistance line — see example.com/assistance.",
        },
        {
          key: "back-abroad",
          label: "🌍 INTERNATIONAL HELP",
          value: "Call any time — Phone +420 000 000 000",
        },
        {
          key: "back-claim",
          label: "🔊 REPORT A CLAIM ONLINE",
          value: "Report online — see example.com/claim.",
        },
        {
          key: "back-tips",
          label: "🙂 HANDY TIPS",
          value: "Useful information — see example.com/tips.",
        },
        {
          key: "back-travel",
          label: "🗺️ PLANNING ANOTHER TRIP",
          value: "Travel planning — see example.com/travel.",
        },
        {
          key: "back-footer",
          value: "Sample assistance card — example.com",
        },
      ],
      headerFields: [
        {
          key: "header-card",
          label: "MEDICAL",
          value: "ASSISTANCE CARD",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-holder",
          label: "POLICYHOLDER",
          textAlignment: "PKTextAlignmentLeft",
          value: "JOHN DOE",
        },
        {
          key: "secondary-id",
          label: "ID CONTACT",
          textAlignment: "PKTextAlignmentRight",
          value: "23001208654",
        },
      ],
    },
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
