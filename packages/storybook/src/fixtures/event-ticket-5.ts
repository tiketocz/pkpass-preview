// Ported from pkpass-builder-ui src/stories/fixtures/event-ticket5.ts (generic-class pkpass with logoText).

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const eventTicket5 = {
  "pass.json": {
    backgroundColor: "#BBBBBB",
    barcodes: [
      {
        format: "PKBarcodeFormatCode128",
        message: "sample-event-ticket-5",
        messageEncoding: "iso-8859-1",
      },
    ],
    description: "Put pass description here",
    foregroundColor: "#000000",
    formatVersion: 1,
    generic: {
      auxiliaryFields: [{ key: "auxiliary-aux", label: "ee", value: "ff" }],
      primaryFields: [{ key: "primary-aaa", label: "aaa", value: "bbb" }],
      secondaryFields: [
        { key: "secondary-a", label: "aaa", value: "bbb" },
        { key: "secondary-c", label: "cc", value: "dd" },
      ],
    },
    labelColor: "#000000",
    logoText: "Sample",
    organizationName: "Put organization name here",
    serialNumber: "sample-eventticket-5",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
