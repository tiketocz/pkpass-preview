import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    options: {
      // Explicit nav order. Anything not listed falls to the end,
      // alphabetically — but "Back fields" is pinned last so the
      // back-of-pass demo doesn't lead the menu.
      storySort: {
        order: [
          "Examples",
          "Samples",
          "Generic",
          "Store card",
          "Coupon",
          "Boarding pass",
          "Event ticket",
          "Barcode",
          "Gallery",
          "Back fields",
        ],
      },
    },
  },
};

export default preview;
