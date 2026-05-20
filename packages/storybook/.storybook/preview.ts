import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    backgrounds: {
      default: "Light",
      values: [
        { name: "Light", value: "#f8fafc" },
        { name: "Tiketo", value: "#0B0B45" },
        { name: "White", value: "#ffffff" },
      ],
    },
    options: {
      // Editorial sidebar order (not alphabetical). Welcome leads; the
      // examples & gallery introduce the lib visually; the per-pass-type
      // sections walk users through every variant; Back fields and
      // Barcodes are special-case demos and land at the end.
      storySort: {
        order: [
          "Welcome",
          "Examples",
          "Samples",
          "Gallery",
          "Boarding pass",
          "Store card",
          "Event ticket",
          "Generic",
          "Coupon",
          "Back fields",
          "Barcode",
        ],
      },
    },
    docs: {
      // Per-story raw JSX snippet — strips the Comparison wrapper so the
      // source block in Docs matches what a user would paste into their
      // own app, not the side-by-side test harness.
      source: {
        language: "tsx",
        transform: (code: string) => {
          const m = code.match(/values=\{([A-Za-z0-9_$]+)\}/);
          return m ? `<PKPassPreview values={${m[1]}} />` : code;
        },
      },
    },
  },
};

export default preview;
