import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { exampleGeneric } from "./fixtures/example-generic";
import { exampleStoreCard } from "./fixtures/example-store-card";
import { scenarioTitle } from "./scenarioCatalog";

const meta: Meta<ComparisonArgs> = {
  title: "Start here/iOS comparison",
  id: "examples",
  render: (args) => <Comparison {...args} />,
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
  name: scenarioTitle("examples--generic"),
  args: comparisonArgs("examples--generic", exampleGeneric),
  parameters: { __id: "examples--generic" },
};

export const StoreCard: Story = {
  name: scenarioTitle("examples--store-card"),
  args: comparisonArgs("examples--store-card", exampleStoreCard),
  parameters: { __id: "examples--store-card" },
};
