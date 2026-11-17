import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { backFields1 } from "./fixtures/back-fields";

const meta: Meta<ComparisonArgs> = {
  title: "Features/Back fields",
  id: "back-fields",
  render: (args, context) => <Comparison {...args} scenarioId={context.id} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Back-field coverage for long-form key/value pairs. The legacy story preserves the front comparison; the iOS 27 Pass Details story flips the component through its public interaction and documents the difference from Wallet's full details screen.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const BackFields1: Story = {
  name: "Medical assistance card with long back fields",
  args: comparisonArgs("back-fields--back-fields-1", backFields1),
  parameters: { __id: "back-fields--back-fields-1" },
};

export const Ios27PassDetails: Story = {
  name: "Back fields — iOS 27 Pass Details",
  args: comparisonArgs("back-fields--ios-27-pass-details", backFields1, {
    targetOs: "ios27",
  }),
  parameters: {
    __id: "back-fields--ios-27-pass-details",
    docs: {
      description: {
        story:
          "The web preview is flipped through its existing public interaction and shows the component's in-card back. The native iOS 27 reference is Wallet's full Pass Details screen, with a front-card thumbnail, pass description, Remove Pass control, and light grouped fields. The web component does not implement that screen, so this comparison documents the difference instead of imitating it in Storybook.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const infoButton = canvasElement.querySelector<HTMLElement>(".infoButton");
    infoButton?.click();
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  },
};
