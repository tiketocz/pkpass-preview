import type { Preview } from "@storybook/react";
import "./preview.css";

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
      storySort: {
        order: [
          "Start here",
          ["Welcome", ["Docs", "Quick start"], "Catalog", "iOS comparison"],
          "Pass styles",
          [
            "Generic",
            "Poster Generic (iOS 27)",
            "Event ticket",
            "Boarding pass",
            "Store card",
            "Coupon",
          ],
          "Features",
          ["Featured Actions", "Barcodes", "Back fields", "Transit"],
          "Examples",
          ["Vltava Club", "Other use cases"],
          "Developer guide",
          ["API", "Playground", "QA matrix", "Gallery (stress)"],
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
  argTypes: {
    values: {
      control: false,
      table: { disable: true },
    },
  },
};

export default preview;
