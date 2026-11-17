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
          ["API", "Known deviations", "Playground", "QA matrix", "Gallery (stress)"],
        ],
      },
    },
    docs: {
      // Per-story raw JSX snippet — strips the Comparison wrapper so the
      // source block in Docs matches what a user would paste into their
      // own app, not the side-by-side test harness.
      source: {
        language: "tsx",
        transform: (code: string, context) => {
          const m = code.match(/values=\{([A-Za-z0-9_$]+)\}/);
          if (!m) return code;
          const props = [`values={${m[1]}}`];
          if (context.args.variant) props.push(`variant="${context.args.variant}"`);
          if (context.args.targetOs) props.push(`targetOs="${context.args.targetOs}"`);
          return `<PKPassPreview ${props.join(" ")} />`;
        },
      },
    },
  },
  argTypes: {
    scenarioId: {
      control: false,
      table: { disable: true },
    },
    values: {
      control: false,
      table: { disable: true },
    },
  },
};

export default preview;
