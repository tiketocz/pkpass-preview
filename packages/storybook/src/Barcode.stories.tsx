import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { code128_1 } from "./fixtures/code128-1";
import { code128_2 } from "./fixtures/code128-2";
import { code128_3 } from "./fixtures/code128-3";
import { code128_4 } from "./fixtures/code128-4";
import { code128_5 } from "./fixtures/code128-5";
import { largeBarcode } from "./fixtures/large-barcode";
import { pdf417_1 } from "./fixtures/pdf417-1";
import { pdf417_2 } from "./fixtures/pdf417-2";
import { pdf417_3 } from "./fixtures/pdf417-3";
import { pdf417_4 } from "./fixtures/pdf417-4";

const meta: Meta<ComparisonArgs> = {
  title: "Barcode",
  render: (args) => <Comparison {...args} />,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const Code128_1: Story = {
  name: "Code128 1",
  args: { values: code128_1, screenshot: "code128-1" },
};
export const Code128_2: Story = {
  name: "Code128 2",
  args: { values: code128_2, screenshot: "code128-2" },
};
export const Code128_3: Story = {
  name: "Code128 3",
  args: { values: code128_3, screenshot: "code128-3" },
};
export const Code128_4: Story = {
  name: "Code128 4",
  args: { values: code128_4, screenshot: "code128-4" },
};
export const Code128_5: Story = {
  name: "Code128 5",
  args: { values: code128_5, screenshot: "code128-5" },
};
export const Pdf417_1: Story = {
  name: "PDF417 1",
  args: { values: pdf417_1, screenshot: "pdf417-1" },
};
export const Pdf417_2: Story = {
  name: "PDF417 2",
  args: { values: pdf417_2, screenshot: "pdf417-2" },
};
export const Pdf417_3: Story = {
  name: "PDF417 3",
  args: { values: pdf417_3, screenshot: "pdf417-3" },
};
export const Pdf417_4: Story = {
  name: "PDF417 4",
  args: { values: pdf417_4, screenshot: "pdf417-4" },
};
export const LargeBarcode: Story = {
  name: "Large barcode",
  args: { values: largeBarcode, screenshot: "large-barcode" },
};
