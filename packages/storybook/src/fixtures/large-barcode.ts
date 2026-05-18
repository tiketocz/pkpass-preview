// Ported from tiketocz/pkpass-builder-ui src/stories/fixtures/large-barcode.ts
// (anonymized: internal share tokens + customer back-fields replaced with placeholders).

export const largeBarcode = {
  "pass.json": {
    description: "Some description",
    organizationName: "Some description",
    barcodes: [
      {
        messageEncoding: "utf-8",
        format: "PKBarcodeFormatQR",
        message:
          "this is really huge message for barcode...this is really huge message for barcode...this is really huge message for barcode...this is really huge message for barcode...",
        altText: "this is text",
      },
    ],
    foregroundColor: "#000000",
    labelColor: "#1a1f71",
    backgroundColor: "#ffffff",
    // voided: true,
    formatVersion: 1,
    generic: {
      primaryFields: [
        {
          key: "primary-eozqa",
          label: "NAME / SURNAME",
          value: "John Doe",
        },
      ],
    },
  },
};
