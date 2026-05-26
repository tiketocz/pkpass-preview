// Ported from tiketocz/pkpass-builder-ui src/stories/fixtures/boarding-pass.ts
// (anonymized: internal share tokens + customer back-fields replaced with placeholders).

export const boardingPass1 = {
  "pass.json": {
    foregroundColor: "#000000",
    labelColor: "#000000",
    backgroundColor: "#BBBBBB",
    formatVersion: 1,
    logoText: "",
    description: "Testing boarding pass",
    organizationName: "Aerolines",
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        message: "aaa",
        messageEncoding: "iso-8859-1",
      },
    ],
    boardingPass: {
      backFields: [
        {
          key: "back-ovclb",
          label: "📢 AKTUÁLNĚ",
          value: 'Sample back-of-pass content. <a href="https://example.com/">Learn more</a>',
          changeMessage: "Nový článek právě na blogu! Tak mrkněte, co se kde v červenci šustne! %@",
        },
      ],
      headerFields: [
        {
          key: "header-zhesw",
          label: "asfg",
          value: "fdhs",
        },
      ],
      transitType: "PKTransitTypeAir",
      primaryFields: [
        {
          key: "primary-zhsru",
          label: "From",
          value: "Prague",
          changeMessage: "Departure changed to %@",
        },
        {
          key: "primary-unzwd",
          label: "To",
          value: "Paris",
          changeMessage: "Destination changed to %@",
        },
      ],
      secondaryFields: [],
    },
  },
};
