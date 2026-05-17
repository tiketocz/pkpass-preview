// Store card example — synthetic, no real customer data.
//
// Shape: 1 header field + 1 primary field + 2 secondary fields, plus a QR
// barcode. `deriveVariant` will resolve this to the `store-card` profile.

const PLACEHOLDER_ICON_PNG =
  "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAp0lEQVR4nNXX6wqAIAyGYS/H+8f7KwqCUJfbdLwm+C/3PeCxlHM+yJ62AZRS7h7dnhwREIl4ZzSA+oPI8Kt1AVGIXk0RsBoh1foErEJ81RgCZhGjsSqAF6EZowZYEdpvTQBtYQvUDBgFWKfKBZCCPOvEDagDvTtlCtBDWNu/AegUoIsQ3YboQYQexehlhF7H6IMEfZKhj9KIcAmx349JdHiNaABUxwEnrg4HdIHXtTQAAAAASUVORK5CYII=";

export const exampleStoreCard = {
  "pass.json": {
    formatVersion: 1,
    organizationName: "Demo Organization",
    description: "Example store card",
    logoText: "Demo Loyalty",
    foregroundColor: "#ffffff",
    labelColor: "#dcdcdc",
    backgroundColor: "#283c78",
    storeCard: {
      headerFields: [{ key: "header-balance", label: "Points", value: "1,250" }],
      primaryFields: [{ key: "primary-name", label: "Member", value: "Jane Sample" }],
      secondaryFields: [
        {
          key: "secondary-tier",
          label: "Tier",
          value: "Gold",
        },
        {
          key: "secondary-since",
          label: "Member since",
          value: "2024",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
    },
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        message: "EXAMPLE-STORE-CARD-00000001",
        messageEncoding: "iso-8859-1",
        altText: "SCAN AT CHECKOUT",
      },
    ],
  },
  "icon.png": PLACEHOLDER_ICON_PNG,
  "logo.png": PLACEHOLDER_ICON_PNG,
};
