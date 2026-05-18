import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { exampleGeneric } from "./fixtures/example-generic";
import { exampleStoreCard } from "./fixtures/example-store-card";

const meta: Meta<ComparisonArgs> = {
  title: "Examples",
  render: (args) => <Comparison {...args} />,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const Generic: Story = {
  args: { values: exampleGeneric, screenshot: "example-generic" },
};

export const StoreCard: Story = {
  args: { values: exampleStoreCard, screenshot: "example-store-card" },
};
