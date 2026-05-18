import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { generic1 } from "./fixtures/generic1";
import { generic2 } from "./fixtures/generic2";
import { generic3 } from "./fixtures/generic3";
import { generic4 } from "./fixtures/generic4";
import { generic5 } from "./fixtures/generic5";
import { generic6 } from "./fixtures/generic6";
import { generic7 } from "./fixtures/generic7";
import { generic8 } from "./fixtures/generic8";
import { generic9 } from "./fixtures/generic9";

const meta: Meta<ComparisonArgs> = {
  title: "Generic",
  render: (args) => <Comparison {...args} />,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const Generic1: Story = {
  name: "Generic 1",
  args: { values: generic1, screenshot: "generic1" },
};

export const Generic2: Story = {
  name: "Generic 2",
  args: { values: generic2, screenshot: "generic2" },
};

export const Generic3: Story = {
  name: "Generic 3",
  args: { values: generic3, screenshot: "generic3" },
};

export const Generic4: Story = {
  name: "Generic 4",
  args: { values: generic4, screenshot: "generic4" },
};

export const Generic5: Story = {
  name: "Generic 5",
  args: { values: generic5, screenshot: "generic5" },
};

export const Generic6: Story = {
  name: "Generic 6",
  args: { values: generic6, screenshot: "generic6" },
};

export const Generic7: Story = {
  name: "Generic 7",
  args: { values: generic7, screenshot: "generic7" },
};

export const Generic8: Story = {
  name: "Generic 8 (business card)",
  args: { values: generic8, screenshot: "generic8" },
};

export const Generic9: Story = {
  name: "Generic 9 (sales card)",
  args: { values: generic9, screenshot: "generic9" },
};
