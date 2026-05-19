import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { backFields1 } from "./fixtures/back-fields";

const meta: Meta<ComparisonArgs> = {
  title: "Back fields",
  render: (args) => <Comparison {...args} />,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const BackFields1: Story = {
  name: "Back fields demo",
  args: { values: backFields1, screenshot: "back-fields-1" },
};
