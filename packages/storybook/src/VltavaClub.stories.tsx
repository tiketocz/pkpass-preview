import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { vltavaClub } from "./fixtures/vltava-club";

const fallbackArgs = {
  values: vltavaClub,
  screenshot: "vltava-club-ios-26.5",
  referenceLabel: "iOS Wallet — iOS 26.5",
  variant: "fallback",
} satisfies ComparisonArgs;

const posterArgs = {
  values: vltavaClub,
  screenshot: "vltava-club-ios-27.0",
  referenceLabel: "iOS Wallet — iOS 27.0",
  variant: "poster",
} satisfies ComparisonArgs;

const meta: Meta<ComparisonArgs> = {
  title: "Examples/Vltava Club",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const BothVariants: Story = {
  name: "Both variants",
  args: fallbackArgs,
  tags: ["vrt:skip"],
  render: () => (
    <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
      <Comparison {...fallbackArgs} />
      <Comparison {...posterArgs} />
    </div>
  ),
};

export const Ios265Generic: Story = {
  name: "iOS 26.5 (generic)",
  tags: ["vrt"],
  args: fallbackArgs,
};

export const Ios270PosterGeneric: Story = {
  name: "iOS 27.0 (posterGeneric)",
  tags: ["vrt"],
  args: posterArgs,
};
