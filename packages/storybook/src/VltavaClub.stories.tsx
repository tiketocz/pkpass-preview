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
  parameters: {
    docs: {
      description: {
        story:
          "The web poster follows the iOS 27 structure: constrained logoText, a single-line header value, a large title plus right-aligned member column, and a value-only footer. Remaining differences are browser font metrics and the QR/artwork raster scaling.",
      },
    },
  },
};

export const PosterShortText: Story = {
  name: "Poster front text — short",
  tags: ["vrt"],
  args: {
    values: withPosterGeneric({
      primaryFields: [{ key: "title", value: "Vltava Club" }],
    }),
    screenshot: "vltava-club-poster-short-text-ios-27",
    referenceLabel: "iOS Wallet — iOS 27.0",
    variant: "poster",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Observed on iPhone 17 Pro with iOS 27.0: the bottom band contains only the Vltava Club title; the top-right header slot and footer are empty, while the logo and truncated logoText ("Vltava…") remain top-left. The web render now matches that field structure and logoText truncation; only browser font metrics and raster scaling remain different.',
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
    referenceLabel: "iOS Wallet — iOS 27.0",
    variant: "poster",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Observed on iPhone 17 Pro with iOS 27.0: the header value is a single truncated line ("Zlaté celoroční s výh…"); the smaller title uses two lines and cuts off after "Vltavský klub přátel / Pražského hradu a Karlova"; the member name truncates to "Žofie Přemyslovna Dvořáčk…"; logoText truncates to "Vltava…"; and the full footer value "VC-2026-ŽLUŤOUČKÝ-0024-PRAHA" appears without its label. The web render now follows the same one-line/two-line clamps, single-row field structure, logoText constraint, and value-only footer. Exact ellipsis points can still vary slightly with browser font metrics.',
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
    referenceLabel: "iOS Wallet — iOS 27.0",
    variant: "poster",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Observed on iPhone 17 Pro with iOS 27.0: Wallet shows all four primary fields in one bottom-band row—large "Vltava Club" on the left, then Členka/Anna, Úroveň/Gold, and Body/1 250 label/value columns—shrinking the title and values to fit. The web renderer now preserves all four fields in that order and row, shows footer value "VC-0024" without its label, and constrains logoText to "Vltava…". Remaining differences are limited to browser font metrics and raster scaling.',
      },
    },
  },
};
