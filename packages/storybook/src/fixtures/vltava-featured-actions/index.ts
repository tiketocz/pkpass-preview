import type { PassData } from "@tiketo/pkpass-preview";

import { vltavaClub } from "../vltava-club";
import eventTicketPass from "./event-ticket.pass.json";
import genericPass from "./generic.pass.json";

// TIK-318 Featured Actions fixtures. The two pass.json files are copied
// verbatim from the signed demo passes (generic + eventTicket); the images
// are the existing Vltava Club PNGs reused from ../vltava-club (the signed
// bundles carry the same image set), so no artwork is duplicated here.
const { "pass.json": _vltavaPass, ...vltavaImages } = vltavaClub;

export type FeaturedActionsCount = 0 | 1 | 2;

/**
 * Builds `values` for PKPassPreview with the first `count` featured actions.
 * Per the fixture README: 1 action = keep the first item; 0 actions = empty
 * array (`"empty"`) or key omitted (`"omit"`).
 */
const withActions = (
  source: unknown,
  count: FeaturedActionsCount,
  zeroMode: "empty" | "omit" = "empty",
): Record<string, unknown> => {
  const { featuredActions, ...rest } = structuredClone(source) as PassData;
  const pass: PassData =
    count === 0 && zeroMode === "omit"
      ? rest
      : { ...rest, featuredActions: (featuredActions ?? []).slice(0, count) };
  return { ...vltavaImages, "pass.json": pass };
};

export const vltavaFeaturedGeneric = (
  count: FeaturedActionsCount,
  zeroMode?: "empty" | "omit",
): Record<string, unknown> => withActions(genericPass, count, zeroMode);

export const vltavaFeaturedEventTicket = (
  count: FeaturedActionsCount,
  zeroMode?: "empty" | "omit",
): Record<string, unknown> => withActions(eventTicketPass, count, zeroMode);
