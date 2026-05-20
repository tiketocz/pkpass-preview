import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { storeCard1 } from "./fixtures/store-card-1";
import { storeCard2 } from "./fixtures/store-card-2";
import { storeCard3 } from "./fixtures/store-card-3";
import { storeCard4 } from "./fixtures/store-card-4";
import { storeCard5 } from "./fixtures/store-card-5";
import { storeCard6 } from "./fixtures/store-card-6";
import { storeCard7 } from "./fixtures/store-card-7";
import { storeCard8 } from "./fixtures/store-card-8";

const meta: Meta<ComparisonArgs> = {
  title: "Store card",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "storeCard — 2-col / 3-col density, hero primary auto-fit (`primaryDensity` profile), member-card and check-in styles.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const StoreCard1: Story = {
  name: "Store card 1",
  args: { values: storeCard1, screenshot: "store-card-1" },
};

export const StoreCard2: Story = {
  name: "Store card 2 (4-col secondary)",
  args: { values: storeCard2, screenshot: "store-card-2" },
};

export const StoreCard3: Story = {
  name: "Store card 3 (info only)",
  args: { values: storeCard3, screenshot: "store-card-3" },
};

export const StoreCard4: Story = {
  name: "Store card 4 (with strip)",
  args: { values: storeCard4, screenshot: "store-card-4" },
};

export const StoreCard5: Story = {
  name: "Store card 5 (4-col auxiliary)",
  args: { values: storeCard5, screenshot: "store-card-5" },
};

export const StoreCard6: Story = {
  name: "Store card 6 (5-col aux+sec)",
  args: { values: storeCard6, screenshot: "store-card-6" },
};

export const StoreCard7: Story = {
  name: "Store card 7 (5-col aux, 3-col sec)",
  args: { values: storeCard7, screenshot: "store-card-7" },
};

export const StoreCard8: Story = {
  name: "Store card 8 (logoText)",
  args: { values: storeCard8, screenshot: "store-card-8" },
};
