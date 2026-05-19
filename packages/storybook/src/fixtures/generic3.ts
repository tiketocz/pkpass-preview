// Ported from pkpass-builder-ui src/stories/fixtures/generic3.ts (already neutral placeholder data).
// Internal AWS share token replaced with synthetic serial.

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const generic3 = {
  "pass.json": {
    backgroundColor: "#BBBBBB",
    description: "Put pass description here",
    foregroundColor: "#000000",
    formatVersion: 1,
    generic: {
      auxiliaryFields: [
        {
          key: "auxiliary-kxafj",
          label: "aux field",
          value: "lorem ipsum",
        },
        {
          key: "auxiliary-zogxj",
          label: "another field",
          textAlignment: "PKTextAlignmentRight",
          value: "dolor simet",
        },
      ],
      headerFields: [
        {
          key: "header-qydlp",
          label: "2",
          value: "2",
        },
        {
          key: "header-hzcqf",
          label: "1",
          value: "1",
        },
      ],
      primaryFields: [
        {
          key: "primary-rfncl",
          label: "Label",
          value: "Hello",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-mkkwf",
          label: "Label3",
          textAlignment: "PKTextAlignmentLeft",
          value: "This is just test",
        },
        {
          key: "secondary-dzycj",
          textAlignment: "PKTextAlignmentCenter",
          value: "To test alignment",
        },
        {
          key: "secondary-isfda",
          textAlignment: "PKTextAlignmentRight",
          value: "Right",
        },
      ],
    },
    labelColor: "#000000",
    logoText: "Some text",
    organizationName: "Put organization name here",
    serialNumber: "sample-generic-3",
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
