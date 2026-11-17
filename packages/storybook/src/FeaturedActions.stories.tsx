import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import {
  type FeaturedActionsCount,
  vltavaFeaturedEventTicket,
  vltavaFeaturedGeneric,
} from "./fixtures/vltava-featured-actions";
import { ONE_ACTION_NOTE } from "./knownDeviations";
import { getScenario, scenarioTitle } from "./scenarioCatalog";

// TIK-318 — iOS 27 Featured Actions.
//
// Native references: Apple Wallet iOS 27.0 (24A434), iPhone 17 Pro Simulator,
// detail of the added Vltava Club pass (signed pass.json identical to the
// fixtures except serialNumber). All six iOS 27 stories (2 / 1 / 0 actions,
// generic + eventTicket) show that reference (card + tile row, cropped to
// the current pass) next to our render; the two older-iOS stories show the
// same 2-action pass in Apple Wallet iOS 26.5 (Simulator): card only, no
// tiles. The tile look is aligned to the references but is not pixel-perfect.
//
// Known difference: with one action, native Wallet draws one wide tile with a
// grey chevron on the right; our tile matches the width but has no chevron.
//
// NÁVRH / PROPOSAL, still unverified: the unknown-type tile ("Open" + arrow).

const NATIVE_NOTE =
  "**Look based on a native reference** — Apple Wallet iOS 27.0 (24A434), iPhone 17 Pro Simulator: two white tiles, green circle icon (credit card / phone handset), bold label (“Add to Balance” / “Call”) and grey “Open Link” subtitle. Approximation, not pixel-perfect (web fonts, glyph shapes, shadow). The unknown-type tile (“Open” + arrow) remains a **návrh / proposal**.";

const NO_ACTIONS_NOTE =
  "**Native reference** — Apple Wallet iOS 27.0 (24A434), iPhone 17 Pro Simulator: no tile row below the card, same as the web preview.";

const OLDER_IOS_NOTE =
  "**Native reference** — Apple Wallet iOS 26.5, iPhone 17 Pro Simulator: Wallet before iOS 27 ignores `featuredActions`, no tile row.";

type Style = "generic" | "eventTicket";

const fixtureFor = (style: Style, count: FeaturedActionsCount, zeroMode?: "empty" | "omit") =>
  style === "generic"
    ? vltavaFeaturedGeneric(count, zeroMode)
    : vltavaFeaturedEventTicket(count, zeroMode);

type FeaturedStoryArgs = Omit<ComparisonArgs, "values"> & {
  style: Style;
  count: FeaturedActionsCount;
  zeroMode?: "empty" | "omit";
};

const featuredArgs = (
  scenarioId: string,
  style: Style,
  count: FeaturedActionsCount,
  targetOs: "ios26" | "ios27" = "ios27",
  zeroMode?: "empty" | "omit",
): FeaturedStoryArgs => {
  if (!getScenario(scenarioId)) {
    throw new Error(`Unknown scenario metadata while defining story: ${scenarioId}`);
  }
  return {
    style,
    count,
    zeroMode,
    variant: "fallback",
    targetOs,
  };
};

const story = (id: string, description: string, note: string) => ({
  __id: id,
  docs: {
    description: { story: `${description}\n\n${note}` },
    source: {
      code: `<PKPassPreview\n  values={passFiles}\n  variant="fallback"\n  targetOs="${id.endsWith("older-ios") ? "ios26" : "ios27"}"\n/>`,
      language: "tsx",
    },
  },
});

const meta: Meta<FeaturedStoryArgs> = {
  title: "Features/Featured Actions",
  id: "examples-featured-actions-ios-27",
  render: ({ style, count, zeroMode, ...args }, context) => (
    <Comparison {...args} values={fixtureFor(style, count, zeroMode)} scenarioId={context.id} />
  ),
  tags: ["autodocs", "vrt"],
  argTypes: {
    targetOs: { control: "inline-radio", options: ["ios26", "ios27"] },
    variant: { control: "inline-radio", options: ["fallback", "poster"] },
    count: { control: "inline-radio", options: [0, 1, 2] },
    style: { control: false, table: { disable: true } },
    zeroMode: { control: false, table: { disable: true } },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `iOS 27 Featured Actions (TIK-318): up to two top-level \`featuredActions\` rendered as tiles below the card front, in input order, when \`targetOs="ios27"\`. \`targetOs\` is independent of \`variant\` (layout only). Omitted \`targetOs\` or \`"ios26"\` renders no tiles. Fixtures: Vltava Club demo pass.json (generic + eventTicket) with the existing Vltava Club PNGs.\n\n${NATIVE_NOTE}`,
      },
    },
  },
};
export default meta;

type Story = StoryObj<FeaturedStoryArgs>;

export const GenericTwoActions: Story = {
  name: scenarioTitle("examples-featured-actions-ios-27--generic-two-actions"),
  args: featuredArgs("examples-featured-actions-ios-27--generic-two-actions", "generic", 2),
  parameters: story(
    "examples-featured-actions-ios-27--generic-two-actions",
    "Both fixture actions in input order: `addToBalance`, then `call`. Right: native Apple Wallet iOS 27.0 reference (card + tile row).",
    NATIVE_NOTE,
  ),
};

export const GenericOneAction: Story = {
  name: scenarioTitle("examples-featured-actions-ios-27--generic-one-action"),
  args: featuredArgs("examples-featured-actions-ios-27--generic-one-action", "generic", 1),
  parameters: story(
    "examples-featured-actions-ios-27--generic-one-action",
    "Only the first fixture action (`addToBalance`) is kept. Right: native Apple Wallet iOS 27.0 reference (card + one wide tile).",
    ONE_ACTION_NOTE,
  ),
};

export const GenericNoActions: Story = {
  name: scenarioTitle("examples-featured-actions-ios-27--generic-no-actions"),
  args: featuredArgs(
    "examples-featured-actions-ios-27--generic-no-actions",
    "generic",
    0,
    "ios27",
    "empty",
  ),
  parameters: story(
    "examples-featured-actions-ios-27--generic-no-actions",
    "`featuredActions: []` → no tile row is rendered. Right: native Apple Wallet iOS 27.0 reference (card only).",
    NO_ACTIONS_NOTE,
  ),
};

export const EventTicketTwoActions: Story = {
  name: scenarioTitle("examples-featured-actions-ios-27--event-ticket-two-actions"),
  args: featuredArgs(
    "examples-featured-actions-ios-27--event-ticket-two-actions",
    "eventTicket",
    2,
  ),
  parameters: story(
    "examples-featured-actions-ios-27--event-ticket-two-actions",
    "Both fixture actions in input order: `addToBalance`, then `call`. Right: native Apple Wallet iOS 27.0 reference (card + tile row).",
    NATIVE_NOTE,
  ),
};

export const EventTicketOneAction: Story = {
  name: scenarioTitle("examples-featured-actions-ios-27--event-ticket-one-action"),
  args: featuredArgs("examples-featured-actions-ios-27--event-ticket-one-action", "eventTicket", 1),
  parameters: story(
    "examples-featured-actions-ios-27--event-ticket-one-action",
    "Only the first fixture action (`addToBalance`) is kept. Right: native Apple Wallet iOS 27.0 reference (card + one wide tile).",
    ONE_ACTION_NOTE,
  ),
};

export const EventTicketNoActions: Story = {
  name: scenarioTitle("examples-featured-actions-ios-27--event-ticket-no-actions"),
  args: featuredArgs(
    "examples-featured-actions-ios-27--event-ticket-no-actions",
    "eventTicket",
    0,
    "ios27",
    "omit",
  ),
  parameters: story(
    "examples-featured-actions-ios-27--event-ticket-no-actions",
    "`featuredActions` key omitted → no tile row is rendered. Right: native Apple Wallet iOS 27.0 reference (card only).",
    NO_ACTIONS_NOTE,
  ),
};

export const GenericOlderIos: Story = {
  name: scenarioTitle("examples-featured-actions-ios-27--generic-older-ios"),
  args: featuredArgs("examples-featured-actions-ios-27--generic-older-ios", "generic", 2, "ios26"),
  parameters: story(
    "examples-featured-actions-ios-27--generic-older-ios",
    'Same pass with two actions but `targetOs="ios26"`: no tiles (identical to omitting `targetOs`). Right: native Apple Wallet iOS 26.5 reference — detail of the added pass with two actions in pass.json, no tile row.',
    OLDER_IOS_NOTE,
  ),
};

export const EventTicketOlderIos: Story = {
  name: scenarioTitle("examples-featured-actions-ios-27--event-ticket-older-ios"),
  args: featuredArgs(
    "examples-featured-actions-ios-27--event-ticket-older-ios",
    "eventTicket",
    2,
    "ios26",
  ),
  parameters: story(
    "examples-featured-actions-ios-27--event-ticket-older-ios",
    'Same pass with two actions but `targetOs="ios26"`: no tiles (identical to omitting `targetOs`). Right: native Apple Wallet iOS 26.5 reference — detail of the added pass with two actions in pass.json, no tile row.',
    OLDER_IOS_NOTE,
  ),
};
