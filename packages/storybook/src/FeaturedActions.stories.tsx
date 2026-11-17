import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import {
  type FeaturedActionsCount,
  vltavaFeaturedEventTicket,
  vltavaFeaturedGeneric,
} from "./fixtures/vltava-featured-actions";

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
// NÁVRH / PROPOSAL, still unverified: the unknown-type tile ("Open" + arrow).

const NATIVE_NOTE =
  "**Look based on a native reference** — Apple Wallet iOS 27.0 (24A434), iPhone 17 Pro Simulator: two white tiles, green circle icon (credit card / phone handset), bold label (“Add to Balance” / “Call”) and grey “Open Link” subtitle. Approximation, not pixel-perfect (web fonts, glyph shapes, shadow). The unknown-type tile (“Open” + arrow) remains a **návrh / proposal**.";

const ONE_ACTION_NOTE =
  "**Native reference** — Apple Wallet iOS 27.0 (24A434), iPhone 17 Pro Simulator: one wide white tile spanning the card width, with a grey chevron aligned to the bottom label/subtitle group. The web rendering remains approximate for fonts, glyph shape and shadow. The unknown-type tile (“Open” + arrow) remains a **návrh / proposal**.";

const NO_ACTIONS_NOTE =
  "**Native reference** — Apple Wallet iOS 27.0 (24A434), iPhone 17 Pro Simulator: no tile row below the card, same as the web preview.";

const PENDING_REFERENCE =
  "Native reference image missing — every story in this group should have an Apple Wallet screenshot in public/screenshots/.";

const OLDER_IOS_NOTE =
  "**Native reference** — Apple Wallet iOS 26.5, iPhone 17 Pro Simulator: Wallet before iOS 27 ignores `featuredActions`, no tile row.";

const NATIVE_REFERENCE_LABEL = "Apple Wallet / iOS 27.0 Simulator";
const OLDER_IOS_REFERENCE_LABEL = "Apple Wallet / iOS 26.5 Simulator";

type Style = "generic" | "eventTicket";

const fixtureFor = (style: Style, count: FeaturedActionsCount, zeroMode?: "empty" | "omit") =>
  style === "generic"
    ? vltavaFeaturedGeneric(count, zeroMode)
    : vltavaFeaturedEventTicket(count, zeroMode);

const ios27 = (
  style: Style,
  count: FeaturedActionsCount,
  zeroMode?: "empty" | "omit",
): ComparisonArgs => ({
  values: fixtureFor(style, count, zeroMode),
  // Native refs cropped to the current pass (card + tile row) for 0/1/2.
  screenshot: `vltava-featured-actions-${style === "generic" ? "generic" : "event-ticket"}-${count}-ios-27`,
  referenceLabel: NATIVE_REFERENCE_LABEL,
  referencePlaceholder: PENDING_REFERENCE,
  variant: "fallback",
  targetOs: "ios27",
});

const story = (description: string, note: string) => ({
  docs: { description: { story: `${description}\n\n${note}` } },
});

const meta: Meta<ComparisonArgs> = {
  title: "Examples/Featured Actions (iOS 27)",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs", "vrt"],
  argTypes: {
    targetOs: { control: "inline-radio", options: ["ios26", "ios27"] },
    variant: { control: "inline-radio", options: ["fallback", "poster"] },
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

type Story = StoryObj<ComparisonArgs>;

export const GenericTwoActions: Story = {
  name: "Generic — 2 actions (iOS 27)",
  args: ios27("generic", 2),
  parameters: story(
    "Both fixture actions in input order: `addToBalance`, then `call`. Right: native Apple Wallet iOS 27.0 reference (card + tile row).",
    NATIVE_NOTE,
  ),
};

export const GenericOneAction: Story = {
  name: "Generic — 1 action (iOS 27)",
  args: ios27("generic", 1),
  parameters: story(
    "Only the first fixture action (`addToBalance`) is kept. Right: native Apple Wallet iOS 27.0 reference (card + one wide tile).",
    ONE_ACTION_NOTE,
  ),
};

export const GenericNoActions: Story = {
  name: "Generic — 0 actions (iOS 27)",
  args: ios27("generic", 0, "empty"),
  parameters: story(
    "`featuredActions: []` → no tile row is rendered. Right: native Apple Wallet iOS 27.0 reference (card only).",
    NO_ACTIONS_NOTE,
  ),
};

export const EventTicketTwoActions: Story = {
  name: "Event ticket — 2 actions (iOS 27)",
  args: ios27("eventTicket", 2),
  parameters: story(
    "Both fixture actions in input order: `addToBalance`, then `call`. Right: native Apple Wallet iOS 27.0 reference (card + tile row).",
    NATIVE_NOTE,
  ),
};

export const EventTicketOneAction: Story = {
  name: "Event ticket — 1 action (iOS 27)",
  args: ios27("eventTicket", 1),
  parameters: story(
    "Only the first fixture action (`addToBalance`) is kept. Right: native Apple Wallet iOS 27.0 reference (card + one wide tile).",
    ONE_ACTION_NOTE,
  ),
};

export const EventTicketNoActions: Story = {
  name: "Event ticket — 0 actions (iOS 27)",
  args: ios27("eventTicket", 0, "omit"),
  parameters: story(
    "`featuredActions` key omitted → no tile row is rendered. Right: native Apple Wallet iOS 27.0 reference (card only).",
    NO_ACTIONS_NOTE,
  ),
};

export const GenericOlderIos: Story = {
  name: "Generic — 2 actions, older iOS (no tiles)",
  args: {
    ...ios27("generic", 2),
    screenshot: "vltava-featured-actions-generic-2-ios-26",
    referenceLabel: OLDER_IOS_REFERENCE_LABEL,
    targetOs: "ios26",
  },
  parameters: story(
    'Same pass with two actions but `targetOs="ios26"`: no tiles (identical to omitting `targetOs`). Right: native Apple Wallet iOS 26.5 reference — detail of the added pass with two actions in pass.json, no tile row.',
    OLDER_IOS_NOTE,
  ),
};

export const EventTicketOlderIos: Story = {
  name: "Event ticket — 2 actions, older iOS (no tiles)",
  args: {
    ...ios27("eventTicket", 2),
    screenshot: "vltava-featured-actions-event-ticket-2-ios-26",
    referenceLabel: OLDER_IOS_REFERENCE_LABEL,
    targetOs: "ios26",
  },
  parameters: story(
    'Same pass with two actions but `targetOs="ios26"`: no tiles (identical to omitting `targetOs`). Right: native Apple Wallet iOS 26.5 reference — detail of the added pass with two actions in pass.json, no tile row.',
    OLDER_IOS_NOTE,
  ),
};
