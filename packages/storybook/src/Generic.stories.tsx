import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
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
  title: "Pass styles/Generic",
  id: "generic",
  render: (args, context) => <Comparison {...args} scenarioId={context.id} />,
  tags: ["autodocs", "vrt"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "generic — most flexible type. Small label/value tables; the renderer's density profile (Baseline) gets exercised hardest here.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const Generic1: Story = {
  name: "Generic — dense fields without logo text",
  args: comparisonArgs("generic--generic-1", generic1),
  parameters: { __id: "generic--generic-1" },
};

export const Generic2: Story = {
  name: "Generic — dense fields with logo text",
  args: comparisonArgs("generic--generic-2", generic2),
  parameters: { __id: "generic--generic-2" },
};

export const Generic3: Story = {
  name: "Generic — reordered field groups",
  args: comparisonArgs("generic--generic-3", generic3),
  parameters: { __id: "generic--generic-3" },
};

export const Generic4: Story = {
  name: "Generic — five-column density",
  args: comparisonArgs("generic--generic-4", generic4),
  parameters: { __id: "generic--generic-4" },
};

export const Generic5: Story = {
  name: "Membership card — rich back fields",
  args: comparisonArgs("generic--generic-5", generic5),
  parameters: { __id: "generic--generic-5" },
};

export const Generic6: Story = {
  name: "Membership card — alias of Generic 5",
  args: comparisonArgs("generic--generic-6", generic6),
  parameters: {
    __id: "generic--generic-6",
    docs: {
      description: {
        story:
          "Intentional compatibility alias of Generic 5. The fixture and native reference are retained under both permanent story IDs so historical links and VRT pairs stay valid.",
      },
    },
  },
};

export const Generic7: Story = {
  name: "Golf membership — empty member values",
  args: comparisonArgs("generic--generic-7", generic7),
  parameters: { __id: "generic--generic-7" },
};

export const Generic8: Story = {
  name: "Business card",
  args: comparisonArgs("generic--generic-8", generic8),
  parameters: { __id: "generic--generic-8" },
};

export const Generic9: Story = {
  name: "Sales card",
  args: comparisonArgs("generic--generic-9", generic9),
  parameters: { __id: "generic--generic-9" },
};
