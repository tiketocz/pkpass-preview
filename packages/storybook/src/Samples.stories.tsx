import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { benesov } from "./fixtures/benesov";
import { pga } from "./fixtures/pga";
import { pgaNational } from "./fixtures/pga-national";
import { sample2 } from "./fixtures/sample2";

const meta: Meta<ComparisonArgs> = {
  title: "Examples/Other use cases",
  id: "samples",
  render: (args) => <Comparison {...args} />,
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
  args: { values: sample2, screenshot: "sample2" },
  parameters: { __id: "samples--membership-id-card" },
};

export const ResidentBenefit: Story = {
  name: "Resident benefit card",
  args: { values: benesov, screenshot: "benesov" },
  parameters: { __id: "samples--resident-benefit" },
};

export const TourPro: Story = {
  name: "Tour-pro card",
  args: { values: pga, screenshot: "pga" },
  parameters: { __id: "samples--tour-pro" },
};

export const LongQrAltText: Story = {
  name: "Long-QR-altText regression",
  args: { values: pgaNational, screenshot: "pga-national" },
  parameters: { __id: "samples--long-qr-alt-text" },
};
