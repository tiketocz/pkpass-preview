// Ported from pkpass-builder-ui src/stories/fixtures/generic2.ts (already neutral placeholder data).

import { PLACEHOLDER_ICON_PNG } from "./_placeholder";

export const generic2 = {
  "pass.json": {
    logoText: "Some text",
    description: "Put pass description here",
    organizationName: "Put organization name here",
    foregroundColor: "#000000",
    labelColor: "#000000",
    backgroundColor: "#BBBBBB",
    formatVersion: 1,
    generic: {
      primaryFields: [{ key: "primary-rfncl", label: "Label", value: "Hello" }],
      headerFields: [
        {
          key: "header-qydlp",
          label: "This is header",
          value: "And it's value",
        },
      ],
      secondaryFields: [
        {
          key: "secondary-mkkwf",
          label: "Label3",
          value: "This is just test",
          textAlignment: "PKTextAlignmentLeft",
        },
        {
          key: "secondary-dzycj",
          value: "To test alignment",
          textAlignment: "PKTextAlignmentCenter",
        },
        {
          key: "secondary-isfda",
          value: "Right",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      auxiliaryFields: [
        { key: "auxiliary-kxafj", label: "aux field", value: "lorem ipsum" },
        {
          key: "auxiliary-zogxj",
          label: "another field",
          value: "dolor simet",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
    },
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
};
