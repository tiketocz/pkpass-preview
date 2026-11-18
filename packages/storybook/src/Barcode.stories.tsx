import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
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
  title: "Features/Barcodes",
  id: "barcode",
  render: (args, context) => <Comparison {...args} scenarioId={context.id} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Barcode rendering primitives — code128, PDF417, QR — sizing, positioning and alt-text fallback.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const Code128_1: Story = {
  name: "Code 128 — 1 character",
  args: comparisonArgs("barcode--code-128-1", code128_1),
  parameters: { __id: "barcode--code-128-1" },
};
export const Code128_2: Story = {
  name: "Code 128 — 3 characters",
  args: comparisonArgs("barcode--code-128-2", code128_2),
  parameters: { __id: "barcode--code-128-2" },
};
export const Code128_3: Story = {
  name: "Code 128 — 20-character message",
  args: comparisonArgs("barcode--code-128-3", code128_3),
  parameters: { __id: "barcode--code-128-3" },
};
export const Code128_4: Story = {
  name: "Code 128 — 40-character message",
  args: comparisonArgs("barcode--code-128-4", code128_4),
  parameters: { __id: "barcode--code-128-4" },
};
export const Code128_5: Story = {
  name: "Code 128 — 80-character message",
  args: comparisonArgs("barcode--code-128-5", code128_5),
  parameters: { __id: "barcode--code-128-5" },
};
export const Pdf417_1: Story = {
  name: "PDF417 — short alphanumeric message",
  args: comparisonArgs("barcode--pdf-417-1", pdf417_1),
  parameters: { __id: "barcode--pdf-417-1" },
};
export const Pdf417_2: Story = {
  name: "PDF417 — 20-character message",
  args: comparisonArgs("barcode--pdf-417-2", pdf417_2),
  parameters: { __id: "barcode--pdf-417-2" },
};
export const Pdf417_3: Story = {
  name: "PDF417 — 40-character message",
  args: comparisonArgs("barcode--pdf-417-3", pdf417_3),
  parameters: { __id: "barcode--pdf-417-3" },
};
export const Pdf417_4: Story = {
  name: "PDF417 — compact alphanumeric message",
  args: comparisonArgs("barcode--pdf-417-4", pdf417_4),
  parameters: { __id: "barcode--pdf-417-4" },
};
export const LargeBarcode: Story = {
  name: "QR code — large payload",
  args: comparisonArgs("barcode--large-barcode", largeBarcode),
  parameters: { __id: "barcode--large-barcode" },
};
