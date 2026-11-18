import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { exampleGeneric } from "./fixtures/example-generic";
import { exampleStoreCard } from "./fixtures/example-store-card";

const meta: Meta<ComparisonArgs> = {
  title: "Start here/iOS comparison",
  id: "examples",
  render: (args, context) => <Comparison {...args} scenarioId={context.id} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "MVP brand showcase used in the README quick start — fastest preview of what production input looks like.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const Generic: Story = {
  name: "Generic quick example",
  args: comparisonArgs("examples--generic", exampleGeneric),
  parameters: { __id: "examples--generic" },
};

export const StoreCard: Story = {
  name: "Store card quick example",
  args: comparisonArgs("examples--store-card", exampleStoreCard),
  parameters: { __id: "examples--store-card" },
};
