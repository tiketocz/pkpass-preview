import type { PassData, PassStructure } from "@tiketo/pkpass-preview";

import { comparisonArgs } from "./Comparison";
import { vltavaClub } from "./fixtures/vltava-club";

// Shared by Examples/Vltava Club and Poster Generic (iOS 27): both groups
// render the same signed Vltava Club pass.json and its extracted images.

export const withPosterGeneric = (posterGeneric: PassStructure): Record<string, unknown> => {
  const values = structuredClone(vltavaClub);
  const pass = values["pass.json"] as PassData;
  pass.posterGeneric = posterGeneric;
  return values;
};

export const fallbackArgs = comparisonArgs("examples-vltava-club--ios-265-generic", vltavaClub);

export const posterArgs = comparisonArgs(
  "examples-vltava-club--ios-270-poster-generic",
  vltavaClub,
  {
    variant: "poster",
    targetOs: "ios27",
  },
);
