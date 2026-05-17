import type { Meta, StoryObj } from "@storybook/react";
import { PKPassPreview } from "@tiketo/pkpass-preview";

import { exampleGeneric } from "./fixtures/example-generic";
import { exampleStoreCard } from "./fixtures/example-store-card";

const meta: Meta<typeof PKPassPreview> = {
  title: "Examples",
  component: PKPassPreview,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof PKPassPreview>;

export const Generic: Story = {
  args: { values: exampleGeneric },
};

export const StoreCard: Story = {
  args: { values: exampleStoreCard },
};
