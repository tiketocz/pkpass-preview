import type { Meta, StoryObj } from "@storybook/react";
import type { PassData, PassStructure } from "@tiketo/pkpass-preview";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { vltavaClub } from "./fixtures/vltava-club";

const withPosterGeneric = (posterGeneric: PassStructure): Record<string, unknown> => {
  const values = structuredClone(vltavaClub);
  const pass = values["pass.json"] as PassData;
  pass.posterGeneric = posterGeneric;
  return values;
};

const webOnlyReferenceLabel = "iOS Wallet — iOS 27 reference pending";

const webOnlyPlaceholder = (details: string) =>
  `Web render only — awaiting iOS 27 reference screenshot. ${details}`;

const fallbackArgs = {
  values: vltavaClub,
  screenshot: "vltava-club-ios-26.5",
  referenceLabel: "iOS Wallet — iOS 26.5",
  variant: "fallback",
} satisfies ComparisonArgs;

const posterArgs = {
  values: vltavaClub,
  screenshot: "vltava-club-ios-27.0",
  referenceLabel: "iOS Wallet — iOS 27.0",
  variant: "poster",
} satisfies ComparisonArgs;

const meta: Meta<ComparisonArgs> = {
  title: "Examples/Vltava Club",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "One signed Vltava Club pass rendered as the iOS 26.5 generic fallback and the experimental iOS 27 posterGeneric layout.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const BothVariants: Story = {
  name: "Both variants",
  args: fallbackArgs,
  tags: ["vrt:skip"],
  render: () => (
    <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
      <Comparison {...fallbackArgs} />
      <Comparison {...posterArgs} />
    </div>
  ),
};

export const Ios265Generic: Story = {
  name: "iOS 26.5 (generic)",
  tags: ["vrt"],
  args: fallbackArgs,
};

export const Ios270PosterGeneric: Story = {
  name: "iOS 27.0 (posterGeneric)",
  tags: ["vrt"],
  args: posterArgs,
};

export const PosterShortText: Story = {
  name: "Poster front text — short",
  tags: ["vrt"],
  args: {
    values: withPosterGeneric({
      primaryFields: [{ key: "title", value: "Vltava Club" }],
    }),
    screenshot: "vltava-club-poster-short-text-ios-27",
    referenceLabel: webOnlyReferenceLabel,
    referencePlaceholder: webOnlyPlaceholder(
      "Web omits the optional header, second primary field, and footer; the corresponding iOS layout is unknown.",
    ),
    variant: "poster",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Web render only — awaiting iOS 27 reference screenshot. Exercises a single primary field with headerFields, a second primary field, and footerFields omitted; the corresponding iOS layout is unknown.",
      },
    },
  },
};

export const PosterLongCzechText: Story = {
  name: "Poster front text — long Czech",
  tags: ["vrt"],
  args: {
    values: withPosterGeneric({
      headerFields: [
        {
          key: "membership",
          label: "ČLENSTVÍ",
          value: "Zlaté celoroční s výhodami",
        },
      ],
      primaryFields: [
        {
          key: "title",
          value: "Vltavský klub přátel Pražského hradu a Karlova mostu",
        },
        {
          key: "member",
          label: "ČLENKA",
          value: "Žofie Přemyslovna Dvořáčková-Šťastná",
        },
      ],
      footerFields: [
        {
          key: "member-id",
          label: "ČLENSKÉ ČÍSLO",
          value: "VC-2026-ŽLUŤOUČKÝ-0024-PRAHA",
        },
      ],
    }),
    screenshot: "vltava-club-poster-long-czech-text-ios-27",
    referenceLabel: webOnlyReferenceLabel,
    referencePlaceholder: webOnlyPlaceholder(
      "Web wraps the header, truncates the title and member with ellipses, and fits the footer on one line; no text shrinks, and exact iOS fitting is unknown.",
    ),
    variant: "poster",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Web render only — awaiting iOS 27 reference screenshot. The web header wraps, title and member truncate with ellipses, footer fits on one line, and no text shrinks; exact iOS fitting is unknown.",
      },
    },
  },
};

export const PosterMorePrimaryFields: Story = {
  name: "Poster front text — more primary fields",
  tags: ["vrt"],
  args: {
    values: withPosterGeneric({
      headerFields: [{ key: "status", label: "STAV", value: "Aktivní" }],
      primaryFields: [
        { key: "title", value: "Vltava Club" },
        { key: "member", label: "ČLENKA", value: "Anna" },
        { key: "level", label: "ÚROVEŇ", value: "Gold" },
        { key: "points", label: "BODY", value: "1 250" },
      ],
      footerFields: [{ key: "member-id", label: "ČLENSKÉ ČÍSLO", value: "VC-0024" }],
    }),
    screenshot: "vltava-club-poster-more-primary-fields-ios-27",
    referenceLabel: webOnlyReferenceLabel,
    referencePlaceholder: webOnlyPlaceholder(
      "Web renders only the first two primary fields; ÚROVEŇ and BODY are ignored. Apple documents up to four primary fields for posterGeneric; the iOS 27 layout of this variant is not yet verified by a screenshot.",
    ),
    variant: "poster",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Web render only — awaiting iOS 27 reference screenshot. The current web renderer intentionally displays only the first two primary fields, so ÚROVEŇ and BODY are ignored. Apple documents up to four primary fields for posterGeneric (https://developer.apple.com/documentation/walletpasses/creating-a-poster-generic-pass); the concrete iOS 27 layout of this variant is not yet verified by a screenshot.",
      },
    },
  },
};
