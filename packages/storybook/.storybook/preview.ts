import type { Preview } from "@storybook/react";
import { SharedDocsPage } from "../src/SharedDocsPage";
import { buildComparisonSource } from "../src/docsSource";
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
      page: SharedDocsPage,
      // Build public examples from Args instead of parsing Storybook's
      // generated JSX, which contains the internal comparison wrapper.
      source: {
        language: "tsx",
        transform: (code: string, context) => {
          return buildComparisonSource(context.args) ?? code;
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
