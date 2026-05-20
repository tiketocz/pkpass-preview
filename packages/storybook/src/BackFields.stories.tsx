import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { backFields1 } from "./fixtures/back-fields";

const meta: Meta<ComparisonArgs> = {
  title: "Back fields",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs"],
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
  name: "Back fields demo",
  args: { values: backFields1, screenshot: "back-fields-1" },
};
