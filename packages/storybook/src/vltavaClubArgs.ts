import type { PassData, PassStructure } from "@tiketo/pkpass-preview";

import type { ComparisonArgs } from "./Comparison";
import { vltavaClub } from "./fixtures/vltava-club";

// Shared by Examples/Vltava Club and Poster Generic (iOS 27): both groups
// render the same signed Vltava Club pass.json and its extracted images.

export const withPosterGeneric = (posterGeneric: PassStructure): Record<string, unknown> => {
  const values = structuredClone(vltavaClub);
  const pass = values["pass.json"] as PassData;
  pass.posterGeneric = posterGeneric;
  return values;
};

export const fallbackArgs = {
  values: vltavaClub,
  screenshot: "vltava-club-ios-26.5",
  referenceLabel: "iOS Wallet — iOS 26.5",
  variant: "fallback",
} satisfies ComparisonArgs;

export const posterArgs = {
  values: vltavaClub,
  screenshot: "vltava-club-ios-27.0",
  referenceLabel: "iOS Wallet — iOS 27.0",
  variant: "poster",
} satisfies ComparisonArgs;
