import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { coupon1 } from "./fixtures/coupon1";
import { scenarioTitle } from "./scenarioCatalog";

const meta: Meta<ComparisonArgs> = {
  title: "Pass styles/Coupon",
  id: "coupon",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "coupon — discount, voucher and loyalty layouts. Strip image dominant; back fields used for terms & expiry.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const Coupon1: Story = {
  name: scenarioTitle("coupon--coupon-1"),
  args: comparisonArgs("coupon--coupon-1", coupon1),
  parameters: { __id: "coupon--coupon-1" },
};
