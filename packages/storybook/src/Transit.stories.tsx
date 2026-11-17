import type { Meta, StoryObj } from "@storybook/react";
import { PassTransitType } from "@tiketo/pkpass-preview";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { boardingPass1 } from "./fixtures/boarding-pass-1";

// All five transit types render against one fixture. The primary FROM value
// and header match the native transit reference captures without modifying
// the original boarding-pass fixture.
const withTransitType = (transitType: PassTransitType) => {
  const passJson = boardingPass1["pass.json"] as Record<string, unknown>;
  const boardingPass = passJson.boardingPass as Record<string, unknown>;
  const primaryFields = boardingPass.primaryFields as Array<Record<string, unknown>>;
  return {
    ...boardingPass1,
    "pass.json": {
      ...passJson,
      boardingPass: {
        ...boardingPass,
        transitType,
        headerFields: [{ key: "header-flight", label: "FLIGHT", value: "TIK 100" }],
        primaryFields: [{ ...primaryFields[0], value: "Prague" }, primaryFields[1]],
      },
    },
  };
};

const meta: Meta<ComparisonArgs> = {
  title: "Features/Transit",
  id: "features-transit",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Boarding-pass transit icons for air, train, bus, boat and generic journeys, compared with native Wallet references.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const TransitTypeAir: Story = {
  name: "Air",
  args: { values: withTransitType(PassTransitType.PKTransitTypeAir), screenshot: "transit-air" },
  parameters: { __id: "boarding-pass--transit-type-air" },
};

export const TransitTypeTrain: Story = {
  name: "Train",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeTrain),
    screenshot: "transit-train",
  },
  parameters: { __id: "boarding-pass--transit-type-train" },
};

export const TransitTypeBus: Story = {
  name: "Bus",
  args: { values: withTransitType(PassTransitType.PKTransitTypeBus), screenshot: "transit-bus" },
  parameters: { __id: "boarding-pass--transit-type-bus" },
};

export const TransitTypeBoat: Story = {
  name: "Boat",
  args: { values: withTransitType(PassTransitType.PKTransitTypeBoat), screenshot: "transit-boat" },
  parameters: { __id: "boarding-pass--transit-type-boat" },
};

export const TransitTypeGeneric: Story = {
  name: "Generic",
  args: {
    values: withTransitType(PassTransitType.PKTransitTypeGeneric),
    screenshot: "transit-generic",
  },
  parameters: { __id: "boarding-pass--transit-type-generic" },
};
