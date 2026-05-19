import type { Meta, StoryObj } from "@storybook/react";

import { PassTransitType } from "@tiketo/pkpass-preview";
import { Comparison, type ComparisonArgs } from "./Comparison";
import { boardingPass1 } from "./fixtures/boarding-pass-1";
import { boardingPass2 } from "./fixtures/boarding-pass-2";
import { boardingPass3 } from "./fixtures/boarding-pass-3";

const meta: Meta<ComparisonArgs> = {
  title: "Boarding pass",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "boardingPass — variants by transit type (air/train/bus/boat/generic), with terminal sub-fields and primary destination layout.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const BoardingPass1: Story = {
  name: "Boarding pass 1",
  args: { values: boardingPass1, screenshot: "boarding-pass-1" },
};

export const BoardingPass2: Story = {
  name: "Boarding pass 2",
  args: { values: boardingPass2, screenshot: "boarding-pass-2" },
};

export const BoardingPass3: Story = {
  name: "Boarding pass 3",
  args: { values: boardingPass3, screenshot: "boarding-pass-3" },
};

// All 5 transit types rendered against the same fixture — visual regression
// guard for the inline-JSX transit icons (TIK-100 port).
const withTransitType = (transitType: PassTransitType) => {
  const passJson = boardingPass1["pass.json"] as Record<string, unknown>;
  const boardingPass = passJson.boardingPass as Record<string, unknown>;
  return {
    ...boardingPass1,
    "pass.json": {
      ...passJson,
      boardingPass: { ...boardingPass, transitType },
    },
  };
};

export const TransitTypeAir: Story = {
  name: "Transit type — Air",
  args: { values: withTransitType(PassTransitType.PKTransitTypeAir), screenshot: "transit-air" },
};
export const TransitTypeTrain: Story = {
  name: "Transit type — Train",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeTrain),
    screenshot: "transit-train",
  },
};
export const TransitTypeBus: Story = {
  name: "Transit type — Bus",
  args: { values: withTransitType(PassTransitType.PKTransitTypeBus), screenshot: "transit-bus" },
};
export const TransitTypeBoat: Story = {
  name: "Transit type — Boat",
  args: { values: withTransitType(PassTransitType.PKTransitTypeBoat), screenshot: "transit-boat" },
};
export const TransitTypeGeneric: Story = {
  name: "Transit type — Generic",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeGeneric),
    screenshot: "transit-generic",
  },
};
