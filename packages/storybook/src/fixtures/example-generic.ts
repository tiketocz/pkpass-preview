// Generic pass example — synthetic, no real customer data.
//
// Shape: 1 header field + 1 primary field + 3 secondary fields + 2 auxiliary
// fields. `deriveVariant` will resolve this to the `generic-header` profile.

const PLACEHOLDER_ICON_PNG =
  "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAp0lEQVR4nNXX6wqAIAyGYS/H+8f7KwqCUJfbdLwm+C/3PeCxlHM+yJ62AZRS7h7dnhwREIl4ZzSA+oPI8Kt1AVGIXk0RsBoh1foErEJ81RgCZhGjsSqAF6EZowZYEdpvTQBtYQvUDBgFWKfKBZCCPOvEDagDvTtlCtBDWNu/AegUoIsQ3YboQYQexehlhF7H6IMEfZKhj9KIcAmx349JdHiNaABUxwEnrg4HdIHXtTQAAAAASUVORK5CYII=";

export const exampleGeneric = {
  "pass.json": {
    formatVersion: 1,
    organizationName: "Demo Organization",
    description: "Example generic pass",
    logoText: "Demo",
    foregroundColor: "rgb(20, 20, 20)",
    labelColor: "rgb(80, 80, 80)",
    backgroundColor: "rgb(240, 240, 240)",
    generic: {
      headerFields: [{ key: "header-status", label: "Status", value: "Active" }],
      primaryFields: [{ key: "primary-name", label: "Name", value: "Hello World" }],
      secondaryFields: [
        {
          key: "secondary-left",
          label: "Left",
          value: "First value",
          textAlignment: "PKTextAlignmentLeft",
        },
        {
          key: "secondary-center",
          label: "Center",
          value: "Middle value",
          textAlignment: "PKTextAlignmentCenter",
        },
        {
          key: "secondary-right",
          label: "Right",
          value: "Last value",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      auxiliaryFields: [
        { key: "auxiliary-a", label: "Field A", value: "lorem ipsum" },
        {
          key: "auxiliary-b",
          label: "Field B",
          value: "dolor sit amet",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
    },
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        message: "EXAMPLE-GENERIC-PASS",
        messageEncoding: "iso-8859-1",
        altText: "EXAMPLE",
      },
    ],
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
  "logo.png": PLACEHOLDER_ICON_PNG,
};
