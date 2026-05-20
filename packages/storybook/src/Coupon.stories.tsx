import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { coupon1 } from "./fixtures/coupon1";

const meta: Meta<ComparisonArgs> = {
  title: "Coupon",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs"],
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
  name: "Coupon 1",
  args: { values: coupon1, screenshot: "coupon1" },
};
