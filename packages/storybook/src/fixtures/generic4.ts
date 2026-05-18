// Ported from pkpass-builder-ui src/stories/fixtures/generic4.ts (already neutral numeric placeholders).
// Internal AWS share token replaced with synthetic serial.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const generic4 = {
  "pass.json": {
    backgroundColor: "#BBBBBB",
    barcodes: [],
    description: "Put pass description here",
    foregroundColor: "#000000",
    formatVersion: 1,
    generic: {
      auxiliaryFields: [
        { key: "auxiliary-mxjdc", label: "1111", value: "1111" },
        { key: "auxiliary-rieeq", label: "22222", value: "22222" },
        { key: "auxiliary-ohitz", label: "3333", value: "3333" },
        { key: "auxiliary-uvfmz", label: "4444", value: "4444" },
        { key: "auxiliary-fagdk", label: "5555", value: "5555" },
      ],
      backFields: [{ key: "back-mhrxr", value: "\n\n\n\n" }],
      headerFields: [],
      secondaryFields: [
        { key: "secondary-pupjv", label: "11111", value: "11111" },
        {
          key: "secondary-silvn",
          label: "2222",
          textAlignment: "PKTextAlignmentCenter",
          value: "22222",
        },
        { key: "secondary-msmcc", label: "33333", value: "333333" },
        { key: "secondary-uoagy", label: "4444", value: "4444" },
        { key: "secondary-dglou", label: "5555", value: "5555" },
      ],
    },
    labelColor: "#000000",
    organizationName: "Put organization name here",
    serialNumber: "sample-generic-4",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
