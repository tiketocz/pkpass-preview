import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { benesov } from "./fixtures/benesov";
import { pga } from "./fixtures/pga";
import { pgaNational } from "./fixtures/pga-national";
import { sample1 } from "./fixtures/sample1";
import { sample2 } from "./fixtures/sample2";

const meta: Meta<ComparisonArgs> = {
  title: "Samples",
  render: (args) => <Comparison {...args} />,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const Sample1: Story = {
  name: "Sample 1 (loyalty coupon)",
  args: { values: sample1, screenshot: "sample1" },
};

export const Sample2: Story = {
  name: "Sample 2 (membership ID card)",
  args: { values: sample2, screenshot: "sample2" },
};

export const ResidentBenefit: Story = {
  name: "Resident benefit card",
  args: { values: benesov, screenshot: "benesov" },
};

export const TourPro: Story = {
  name: "Tour-pro card",
  args: { values: pga, screenshot: "pga" },
};

export const LongQrAltText: Story = {
  name: "Long-QR-altText regression",
  args: { values: pgaNational, screenshot: "pga-national" },
};
