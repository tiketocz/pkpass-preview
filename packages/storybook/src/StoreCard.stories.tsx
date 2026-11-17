import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { storeCard1 } from "./fixtures/store-card-1";
import { storeCard2 } from "./fixtures/store-card-2";
import { storeCard3 } from "./fixtures/store-card-3";
import { storeCard4 } from "./fixtures/store-card-4";
import { storeCard5 } from "./fixtures/store-card-5";
import { storeCard6 } from "./fixtures/store-card-6";
import { storeCard7 } from "./fixtures/store-card-7";
import { storeCard8 } from "./fixtures/store-card-8";

const meta: Meta<ComparisonArgs> = {
  title: "Pass styles/Store card",
  id: "store-card",
  render: (args, context) => <Comparison {...args} scenarioId={context.id} />,
  tags: ["autodocs", "vrt"],
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
  name: "Medical assistance card",
  args: comparisonArgs("store-card--store-card-1", storeCard1),
  parameters: { __id: "store-card--store-card-1" },
};

export const StoreCard2: Story = {
  name: "Medical assistance — four secondary fields",
  args: comparisonArgs("store-card--store-card-2", storeCard2),
  parameters: { __id: "store-card--store-card-2" },
};

export const StoreCard3: Story = {
  name: "Golf club — information-only layout",
  args: comparisonArgs("store-card--store-card-3", storeCard3),
  parameters: { __id: "store-card--store-card-3" },
};

export const StoreCard4: Story = {
  name: "Golf membership card with strip image",
  args: comparisonArgs("store-card--store-card-4", storeCard4),
  parameters: { __id: "store-card--store-card-4" },
};

export const StoreCard5: Story = {
  name: "Bike assistance — four auxiliary fields",
  args: comparisonArgs("store-card--store-card-5", storeCard5),
  parameters: { __id: "store-card--store-card-5" },
};

export const StoreCard6: Story = {
  name: "Store card — five auxiliary and five secondary fields",
  args: comparisonArgs("store-card--store-card-6", storeCard6),
  parameters: { __id: "store-card--store-card-6" },
};

export const StoreCard7: Story = {
  name: "Store card — five auxiliary and three secondary fields",
  args: comparisonArgs("store-card--store-card-7", storeCard7),
  parameters: { __id: "store-card--store-card-7" },
};

export const StoreCard8: Story = {
  name: "Sweet shop info card with logo text",
  args: comparisonArgs("store-card--store-card-8", storeCard8),
  parameters: { __id: "store-card--store-card-8" },
};
