import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { benesov } from "./fixtures/benesov";
import { pga } from "./fixtures/pga";
import { pgaNational } from "./fixtures/pga-national";
import { sample2 } from "./fixtures/sample2";

const meta: Meta<ComparisonArgs> = {
  title: "Examples/Other use cases",
  id: "samples",
  render: (args, context) => <Comparison {...args} scenarioId={context.id} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Real-world .pkpass samples ingested into the renderer — each story is the side-by-side render vs the iOS Wallet screenshot from the original pass.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const MembershipIdCard: Story = {
  name: "Membership ID card",
  args: comparisonArgs("samples--membership-id-card", sample2),
  parameters: { __id: "samples--membership-id-card" },
};

export const ResidentBenefit: Story = {
  name: "Resident benefit card",
  args: comparisonArgs("samples--resident-benefit", benesov),
  parameters: { __id: "samples--resident-benefit" },
};

export const TourPro: Story = {
  name: "Tour-pro membership card",
  args: comparisonArgs("samples--tour-pro", pga),
  parameters: { __id: "samples--tour-pro" },
};

export const LongQrAltText: Story = {
  name: "Store card — long QR alternative text",
  args: comparisonArgs("samples--long-qr-alt-text", pgaNational),
  parameters: { __id: "samples--long-qr-alt-text" },
};
