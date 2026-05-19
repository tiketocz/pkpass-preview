// Ported from pkpass-builder-ui src/stories/fixtures/event-ticket4.ts (placeholder values only).

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const eventTicket4 = {
  "pass.json": {
    backgroundColor: "#BBBBBB",
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        message: "sample-event-ticket-4",
        messageEncoding: "iso-8859-1",
      },
    ],
    description: "Put pass description here",
    eventTicket: {
      auxiliaryFields: [{ key: "auxiliary-aux", label: "ee", value: "ff" }],
      primaryFields: [{ key: "primary-aaa", label: "aaa", value: "bbb" }],
      secondaryFields: [
        { key: "secondary-a", label: "aaa", value: "bbb" },
        { key: "secondary-c", label: "cc", value: "dd" },
      ],
    },
    foregroundColor: "#000000",
    formatVersion: 1,
    labelColor: "#000000",
    organizationName: "Put organization name here",
    serialNumber: "sample-eventticket-4",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
