import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import {
  type FeaturedActionsCount,
  vltavaFeaturedEventTicket,
  vltavaFeaturedGeneric,
} from "./fixtures/vltava-featured-actions";

// TIK-318 — iOS 27 Featured Actions.
//
// Native reference: Apple Wallet iOS 27.0 (24A434), iPhone 17 Pro Simulator,
// detail of the added Vltava Club pass with [addToBalance, call]. The two
// 2-action stories show that reference (card + tile row) next to our render;
// the two older-iOS stories show the same 2-action pass in Apple Wallet
// iOS 26.5 (Simulator, detail after add): card only, no tiles.
// the tile look is aligned to it but is not pixel-perfect.
//
// NÁVRH / PROPOSAL, still unverified: the unknown-type tile ("Open" + arrow)
// and the single-action layout. Stories without a native screenshot keep the
// "native reference pending" placeholder (no fake screenshots).

const NATIVE_NOTE =
  "**Look based on a native reference** — Apple Wallet iOS 27.0 (24A434), iPhone 17 Pro Simulator: two white tiles, green circle icon (credit card / phone handset), bold label (“Add to Balance” / “Call”) and grey “Open Link” subtitle. Approximation, not pixel-perfect (web fonts, glyph shapes, shadow). The unknown-type tile (“Open” + arrow) remains a **návrh / proposal**.";

const UNVERIFIED_NOTE =
  "**Tiles follow the native iOS 27.0 two-action reference**, but this exact case has no native screenshot: the single-action layout (one tile spanning the card width) and the unknown-type tile (“Open” + arrow) are a **návrh / proposal, unverified**.";

const PENDING_REFERENCE =
  "No native iOS 27 Wallet screenshot for this case yet (TIK-318) — tiles are only visible in the detail of an added pass, not in the Add-pass preview.";

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
  // Only the 2-action files exist (native refs cropped to card + tile row);
  // the other names are intentionally missing → Comparison placeholder.
  screenshot: `vltava-featured-actions-${style === "generic" ? "generic" : "event-ticket"}-${count}-ios-27`,
  referenceLabel: count === 2 ? NATIVE_REFERENCE_LABEL : "iOS Wallet — iOS 27.0",
  referencePlaceholder: PENDING_REFERENCE,
  variant: "fallback",
  targetOs: "ios27",
});

const story = (description: string, note: string = UNVERIFIED_NOTE) => ({
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
  parameters: story(
    "Both fixture actions in input order: `addToBalance`, then `call`. Right: native Apple Wallet iOS 27.0 reference (card + tile row).",
    NATIVE_NOTE,
  ),
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
    referenceLabel: OLDER_IOS_REFERENCE_LABEL,
    targetOs: "ios26",
  },
  parameters: story(
    'Same pass with two actions but `targetOs="ios26"`: no tiles (identical to omitting `targetOs`). Right: native Apple Wallet iOS 26.5 reference — detail of the added pass with two actions in pass.json, no tile row.',
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
  ),
};
