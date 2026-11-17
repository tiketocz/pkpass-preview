import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { backFields1 } from "./fixtures/back-fields";
import { scenarioTitle } from "./scenarioCatalog";

const meta: Meta<ComparisonArgs> = {
  title: "Features/Back fields",
  id: "back-fields",
  render: (args, context) => <Comparison {...args} scenarioId={context.id} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Back-side render — long-form key/value pairs in the iOS Wallet dark layout. No header strip, no logo; primary text is hidden.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const BackFields1: Story = {
  name: scenarioTitle("back-fields--back-fields-1"),
  args: comparisonArgs("back-fields--back-fields-1", backFields1),
  parameters: { __id: "back-fields--back-fields-1" },
};
