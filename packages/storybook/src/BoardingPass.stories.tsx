import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { boardingPass1 } from "./fixtures/boarding-pass-1";
import { boardingPass2 } from "./fixtures/boarding-pass-2";
import { boardingPass3 } from "./fixtures/boarding-pass-3";

const meta: Meta<ComparisonArgs> = {
  title: "Boarding pass",
  render: (args) => <Comparison {...args} />,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const BoardingPass1: Story = {
  name: "Boarding pass 1",
  args: { values: boardingPass1, screenshot: "boarding-pass-1" },
};

export const BoardingPass2: Story = {
  name: "Boarding pass 2",
  args: { values: boardingPass2, screenshot: "boarding-pass-2" },
};

export const BoardingPass3: Story = {
  name: "Boarding pass 3",
  args: { values: boardingPass3, screenshot: "boarding-pass-3" },
};
