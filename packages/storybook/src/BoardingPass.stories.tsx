import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { boardingPass1 } from "./fixtures/boarding-pass-1";
import { boardingPass2 } from "./fixtures/boarding-pass-2";
import { boardingPass3 } from "./fixtures/boarding-pass-3";
import { scenarioTitle } from "./scenarioCatalog";

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
  name: scenarioTitle("boarding-pass--boarding-pass-1"),
  args: comparisonArgs("boarding-pass--boarding-pass-1", boardingPass1),
  parameters: { __id: "boarding-pass--boarding-pass-1" },
};

export const BoardingPass2: Story = {
  name: scenarioTitle("boarding-pass--boarding-pass-2"),
  args: comparisonArgs("boarding-pass--boarding-pass-2", boardingPass2),
  parameters: { __id: "boarding-pass--boarding-pass-2" },
};

export const BoardingPass3: Story = {
  name: scenarioTitle("boarding-pass--boarding-pass-3"),
  args: comparisonArgs("boarding-pass--boarding-pass-3", boardingPass3),
  parameters: { __id: "boarding-pass--boarding-pass-3" },
};
