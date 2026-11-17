import type { Meta, StoryObj } from "@storybook/react";
import { PassTransitType } from "@tiketo/pkpass-preview";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { boardingPass1 } from "./fixtures/boarding-pass-1";
import { scenarioTitle } from "./scenarioCatalog";

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
  name: scenarioTitle("boarding-pass--transit-type-air"),
  args: comparisonArgs(
    "boarding-pass--transit-type-air",
    withTransitType(PassTransitType.PKTransitTypeAir),
  ),
  parameters: { __id: "boarding-pass--transit-type-air" },
};

export const TransitTypeTrain: Story = {
  name: scenarioTitle("boarding-pass--transit-type-train"),
  args: comparisonArgs(
    "boarding-pass--transit-type-train",
    withTransitType(PassTransitType.PKTransitTypeTrain),
  ),
  parameters: { __id: "boarding-pass--transit-type-train" },
};

export const TransitTypeBus: Story = {
  name: scenarioTitle("boarding-pass--transit-type-bus"),
  args: comparisonArgs(
    "boarding-pass--transit-type-bus",
    withTransitType(PassTransitType.PKTransitTypeBus),
  ),
  parameters: { __id: "boarding-pass--transit-type-bus" },
};

export const TransitTypeBoat: Story = {
  name: scenarioTitle("boarding-pass--transit-type-boat"),
  args: comparisonArgs(
    "boarding-pass--transit-type-boat",
    withTransitType(PassTransitType.PKTransitTypeBoat),
  ),
  parameters: { __id: "boarding-pass--transit-type-boat" },
};

export const TransitTypeGeneric: Story = {
  name: scenarioTitle("boarding-pass--transit-type-generic"),
  args: comparisonArgs(
    "boarding-pass--transit-type-generic",
    withTransitType(PassTransitType.PKTransitTypeGeneric),
  ),
  parameters: { __id: "boarding-pass--transit-type-generic" },
};
