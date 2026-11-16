import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import {
  type FeaturedActionsCount,
  vltavaFeaturedEventTicket,
  vltavaFeaturedGeneric,
} from "./fixtures/vltava-featured-actions";

// TIK-318 — iOS 27 Featured Actions.
//
// NÁVRH / PROPOSAL, PENDING NATIVE REFERENCE: tile layout, labels
// ("Add to Balance", "Call", unknown → "Open") and icons are NOT verified
// against native Apple Wallet. No native screenshot exists yet (the iOS 27.0
// "Add pass" preview does not show the tiles; the reference must be taken
// from the detail of an added pass), so every story shows the "native
// reference pending" placeholder instead of a screenshot.

const PROPOSAL_NOTE =
  "**Návrh / proposal, pending native reference.** Tile layout, labels (`addToBalance` → “Add to Balance”, `call` → “Call”, unknown types → “Open”) and icons are unverified against native Apple Wallet.";

const PENDING_REFERENCE =
  "Native iOS 27 Wallet reference pending (TIK-318) — tiles are only visible in the detail of an added pass, not in the Add-pass preview.";

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
  // Intentionally non-existent file → Comparison renders the placeholder.
  screenshot: `vltava-featured-actions-${style === "generic" ? "generic" : "event-ticket"}-${count}-ios-27`,
  referenceLabel: "iOS Wallet — iOS 27.0",
  referencePlaceholder: PENDING_REFERENCE,
  variant: "fallback",
  targetOs: "ios27",
});

const story = (description: string) => ({
  docs: { description: { story: `${description}\n\n${PROPOSAL_NOTE}` } },
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
        component: `iOS 27 Featured Actions (TIK-318): up to two top-level \`featuredActions\` rendered as tiles below the card front, in input order, when \`targetOs="ios27"\`. \`targetOs\` is independent of \`variant\` (layout only). Omitted \`targetOs\` or \`"ios26"\` renders no tiles. Fixtures: Vltava Club demo pass.json (generic + eventTicket) with the existing Vltava Club PNGs.\n\n${PROPOSAL_NOTE}`,
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const GenericTwoActions: Story = {
  name: "Generic — 2 actions (iOS 27)",
  args: ios27("generic", 2),
  parameters: story("Both fixture actions in input order: `addToBalance`, then `call`."),
};

export const GenericOneAction: Story = {
  name: "Generic — 1 action (iOS 27)",
  args: ios27("generic", 1),
  parameters: story("Only the first fixture action (`addToBalance`) is kept."),
};

export const GenericNoActions: Story = {
  name: "Generic — 0 actions (iOS 27)",
  args: ios27("generic", 0, "empty"),
  parameters: story("`featuredActions: []` → no tile row is rendered."),
};

export const EventTicketTwoActions: Story = {
  name: "Event ticket — 2 actions (iOS 27)",
  args: ios27("eventTicket", 2),
  parameters: story("Both fixture actions in input order: `addToBalance`, then `call`."),
};

export const EventTicketOneAction: Story = {
  name: "Event ticket — 1 action (iOS 27)",
  args: ios27("eventTicket", 1),
  parameters: story("Only the first fixture action (`addToBalance`) is kept."),
};

export const EventTicketNoActions: Story = {
  name: "Event ticket — 0 actions (iOS 27)",
  args: ios27("eventTicket", 0, "omit"),
  parameters: story("`featuredActions` key omitted → no tile row is rendered."),
};

export const GenericOlderIos: Story = {
  name: "Generic — 2 actions, older iOS (no tiles)",
  args: {
    ...ios27("generic", 2),
    screenshot: "vltava-featured-actions-generic-2-ios-26",
    referenceLabel: "iOS Wallet — iOS 26",
    referencePlaceholder:
      "Native iOS 26 reference pending — Wallet before iOS 27 ignores featuredActions.",
    targetOs: "ios26",
  },
  parameters: story(
    'Same pass with two actions but `targetOs="ios26"`: no tiles (identical to omitting `targetOs`).',
  ),
};

export const EventTicketOlderIos: Story = {
  name: "Event ticket — 2 actions, older iOS (no tiles)",
  args: {
    ...ios27("eventTicket", 2),
    screenshot: "vltava-featured-actions-event-ticket-2-ios-26",
    referenceLabel: "iOS Wallet — iOS 26",
    referencePlaceholder:
      "Native iOS 26 reference pending — Wallet before iOS 27 ignores featuredActions.",
    targetOs: "ios26",
  },
  parameters: story(
    'Same pass with two actions but `targetOs="ios26"`: no tiles (identical to omitting `targetOs`).',
  ),
};
