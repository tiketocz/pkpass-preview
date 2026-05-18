// Ported from tiketocz/pkpass-builder-ui src/stories/fixtures/boarding-pass2.ts
// (anonymized: internal share tokens + customer back-fields replaced with placeholders).

export const boardingPass2 = {
  "pass.json": {
    associatedStoreIdentifiers: [1234, 453435],
    authenticationToken: "806bab07-5ad6-4d05-bb2e-6cc984efb1f2",
    backgroundColor: "#BBBBBB",
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        message: "aaa",
        messageEncoding: "iso-8859-1",
      },
    ],
    boardingPass: {
      backFields: [],
      headerFields: [
        {
          key: "header-zhesw",
          label: "asfg",
          value: "fdhs",
        },
      ],
      primaryFields: [
        {
          key: "primary-iywxk",
          label: "LONG TEXT LONG TEXT ",
          value: "LONG TEXT LONG TEXT ",
        },
        {
          key: "primary-gydpa",
          label: "BB",
          value: "BB",
        },
      ],
      transitType: "PKTransitTypeAir",
    },
    description: "Put pass description here",
    foregroundColor: "#000000",
    formatVersion: 1,
    labelColor: "#000000",
    organizationName: "Put organization name here",
    passTypeIdentifier: "pass.passkit.app",
    serialNumber: "https://example.com/p/sample-share-token",
    teamIdentifier: "MVBMPD7HWW",
    voided: false,
    webServiceURL: "https://ws.passkit.app/",
  },
};
