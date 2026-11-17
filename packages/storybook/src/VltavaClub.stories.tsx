import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { fallbackArgs, posterArgs } from "./vltavaClubArgs";

const meta: Meta<ComparisonArgs> = {
  title: "Examples/Vltava Club",
  id: "examples-vltava-club",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout. The standalone poster and its front-text variants live in [Poster Generic (iOS 27)](?path=/docs/poster-generic-ios-27--docs).",
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
  parameters: { __id: "examples-vltava-club--both-variants" },
  render: () => (
    <div className="vltava-variants" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
      <Comparison {...fallbackArgs} />
      <Comparison {...posterArgs} />
    </div>
  ),
};

export const Ios265Generic: Story = {
  name: "iOS 26.5 (generic)",
  tags: ["vrt"],
  args: fallbackArgs,
  parameters: { __id: "examples-vltava-club--ios-265-generic" },
};
