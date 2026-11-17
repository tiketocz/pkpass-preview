import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { boardingPass1 } from "./fixtures/boarding-pass-1";
import { boardingPass2 } from "./fixtures/boarding-pass-2";
import { boardingPass3 } from "./fixtures/boarding-pass-3";

const meta: Meta<ComparisonArgs> = {
  title: "Pass styles/Boarding pass",
  id: "boarding-pass",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "boardingPass — terminal sub-fields, primary destination layout and reference-backed density cases. Transit icon variants live in the dedicated Features / Transit section.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const BoardingPass1: Story = {
  name: "Boarding pass 1",
  args: { values: boardingPass1, screenshot: "boarding-pass-1" },
  parameters: { __id: "boarding-pass--boarding-pass-1" },
};

export const BoardingPass2: Story = {
  name: "Boarding pass 2",
  args: { values: boardingPass2, screenshot: "boarding-pass-2" },
  parameters: { __id: "boarding-pass--boarding-pass-2" },
};

export const BoardingPass3: Story = {
  name: "Boarding pass 3",
  args: { values: boardingPass3, screenshot: "boarding-pass-3" },
  parameters: { __id: "boarding-pass--boarding-pass-3" },
};
