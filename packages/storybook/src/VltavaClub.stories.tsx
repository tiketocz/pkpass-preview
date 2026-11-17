import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { scenarioTitle } from "./scenarioCatalog";
import { fallbackArgs, posterArgs } from "./vltavaClubArgs";

const BothVariantsDetail = () => {
  const [selected, setSelected] = useState<"ios26" | "ios27">("ios27");
  return (
    <div className="vltava-both-detail">
      <div className="vltava-version-switch" aria-label="Apple Wallet version">
        <button
          type="button"
          aria-pressed={selected === "ios27"}
          onClick={() => setSelected("ios27")}
        >
          iOS 27.0
        </button>
        <button
          type="button"
          aria-pressed={selected === "ios26"}
          onClick={() => setSelected("ios26")}
        >
          iOS 26.5
        </button>
      </div>
      <div className="vltava-variants">
        <div className={`vltava-variant ${selected === "ios27" ? "is-active" : ""}`}>
          <Comparison {...posterArgs} scenarioId="examples-vltava-club--both-variants" />
        </div>
        <div className={`vltava-variant ${selected === "ios26" ? "is-active" : ""}`}>
          <Comparison {...fallbackArgs} scenarioId="examples-vltava-club--both-variants" />
        </div>
      </div>
    </div>
  );
};

const meta: Meta<ComparisonArgs> = {
  title: "Examples/Vltava Club",
  id: "examples-vltava-club",
  render: (args, context) => <Comparison {...args} scenarioId={context.id} />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout. The standalone poster and its front-text variants live in [Poster Generic (iOS 27)](?path=/docs/poster-generic-ios-27--docs).",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const BothVariants: Story = {
  name: scenarioTitle("examples-vltava-club--both-variants"),
  args: fallbackArgs,
  tags: ["vrt:skip"],
  parameters: {
    __id: "examples-vltava-club--both-variants",
    controls: { disable: true },
    options: { showPanel: false },
  },
  render: () => <BothVariantsDetail />,
};

export const Ios265Generic: Story = {
  name: scenarioTitle("examples-vltava-club--ios-265-generic"),
  tags: ["vrt"],
  args: fallbackArgs,
  parameters: { __id: "examples-vltava-club--ios-265-generic" },
};
