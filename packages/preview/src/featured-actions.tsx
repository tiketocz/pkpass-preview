import type * as React from "react";

import type { FeaturedAction, KnownFeaturedActionType, PreviewTargetOs } from "./types";

// iOS 27 Featured Actions (TIK-318).
//
// Native reference: Apple Wallet iOS 27.0 (24A434), iPhone 17 Pro Simulator,
// detail of the added Vltava Club pass (generic + eventTicket) with
// [addToBalance, call]. Native-verified (look approximated, not
// pixel-perfect): white rounded tiles below the card (two side by side or
// one full-width tile with a grey chevron),
// green circle icon (credit card / phone handset), bold label
// ("Add to Balance" / "Call") and grey subtitle "Open Link".
//
// NÁVRH / PROPOSAL, still UNVERIFIED vs native Wallet:
// - unknown action types (green circle + arrow, "Open" / "Open Link"),
// - whether the subtitle ever differs from "Open Link" (e.g. tel: URLs show
//   "Open Link" in the reference too).

/** Wallet shows at most two featured actions. */
export const MAX_FEATURED_ACTIONS = 2;

/** iOS targets that render Featured Actions. Anything else → no tiles. */
const FEATURED_ACTIONS_TARGETS: ReadonlySet<PreviewTargetOs> = new Set(["ios27"]);

/** True when the preview target supports Featured Actions (iOS 27+). */
export const supportsFeaturedActions = (targetOs?: PreviewTargetOs): boolean =>
  targetOs !== undefined && FEATURED_ACTIONS_TARGETS.has(targetOs);

/** A validated action, ready to render. */
export interface ResolvedFeaturedAction extends FeaturedAction {
  /** False when `type` has no dedicated tile (rendered as a generic tile). */
  known: boolean;
  /** Bold tile label ("Add to Balance", "Call"; unknown types → "Open"). */
  label: string;
  /** Grey secondary line under the label (native reference: "Open Link"). */
  subtitle: string;
}

/**
 * Tile labels (EN) — match the native iOS 27.0 Wallet reference.
 * Unknown types fall back to `UNKNOWN_FEATURED_ACTION_LABEL`.
 */
export const FEATURED_ACTION_LABELS: Readonly<Record<KnownFeaturedActionType, string>> = {
  addToBalance: "Add to Balance",
  call: "Call",
};

/** Proposal label for action types without a dedicated tile (unverified). */
export const UNKNOWN_FEATURED_ACTION_LABEL = "Open";

/**
 * Grey subtitle under every tile label. The native iOS 27.0 reference shows
 * "Open Link" for both `addToBalance` (https URL) and `call` (tel: URL).
 */
export const FEATURED_ACTION_SUBTITLE = "Open Link";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isKnownType = (type: string): type is KnownFeaturedActionType =>
  Object.prototype.hasOwnProperty.call(FEATURED_ACTION_LABELS, type);

/**
 * Normalises the untrusted top-level `featuredActions` value into at most
 * two renderable actions. Never throws.
 *
 * Rules (documented contract, covered by unit tests):
 * - Returns `[]` unless `targetOs` supports Featured Actions (`"ios27"`).
 *   Omitted `targetOs` (the default for existing callers) → `[]`.
 * - Non-array input (missing, `null`, object, string, …) → `[]`.
 * - An entry is valid when it is a plain object with a non-empty string
 *   `identifier` and a non-empty string `type`; `url` is optional (per
 *   apple/pass-builder `Pass+Action.swift`) but, when present, must be a
 *   string. Everything else (`null`, primitives, arrays, missing/blank
 *   identifier or type, non-string url) is skipped silently.
 * - Identifiers must be unique: a later entry repeating an identifier is
 *   skipped.
 * - Unknown `type` values are kept and rendered as a generic tile with the
 *   `UNKNOWN_FEATURED_ACTION_LABEL` label and an arrow icon (proposal).
 * - Every tile carries the `FEATURED_ACTION_SUBTITLE` subtitle.
 * - The first `MAX_FEATURED_ACTIONS` (2) valid entries are returned, in
 *   input order; the rest are dropped.
 */
export const resolveFeaturedActions = (
  featuredActions: unknown,
  targetOs?: PreviewTargetOs,
): ResolvedFeaturedAction[] => {
  if (!supportsFeaturedActions(targetOs)) return [];
  if (!Array.isArray(featuredActions)) return [];

  const resolved: ResolvedFeaturedAction[] = [];
  const seen = new Set<string>();

  for (const entry of featuredActions) {
    if (resolved.length >= MAX_FEATURED_ACTIONS) break;
    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) continue;

    const { identifier, type, url } = entry as Record<string, unknown>;
    if (!isNonEmptyString(identifier) || !isNonEmptyString(type)) continue;
    if (url !== undefined && typeof url !== "string") continue;
    if (seen.has(identifier)) continue;
    seen.add(identifier);

    const known = isKnownType(type);
    resolved.push({
      identifier,
      type,
      ...(url !== undefined ? { url } : {}),
      known,
      label: known ? FEATURED_ACTION_LABELS[type] : UNKNOWN_FEATURED_ACTION_LABEL,
      subtitle: FEATURED_ACTION_SUBTITLE,
    });
  }

  return resolved;
};

// Tile icons: filled white glyph on an iOS system-green circle. The
// credit-card (addToBalance) and phone-handset (call) glyphs follow the
// native iOS 27.0 Wallet reference; the arrow for unknown types is a
// proposal. Inline SVG, `currentColor`, dependency-free like transit-icon.tsx.
type IconProps = React.SVGProps<SVGSVGElement>;

const svgBase = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
} as const;

/** addToBalance → credit card (native-verified glyph shape, approximated). */
const AddToBalanceIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgBase} {...props}>
    <path
      fillRule="evenodd"
      d="M5.5 6h13A2.5 2.5 0 0 1 21 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 15.5v-7A2.5 2.5 0 0 1 5.5 6zM3 9v2.4h18V9zm3 4.6v1.6h3.2v-1.6z"
    />
  </svg>
);

/** call → phone handset (native-verified glyph shape, approximated). */
const CallIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgBase} {...props}>
    <path d="M7.3 3.4c.5-.4 1.3-.3 1.7.3l1.9 2.7c.4.5.3 1.2-.1 1.7L9.6 9.3c-.2.2-.2.5-.1.8.9 1.8 2.6 3.5 4.4 4.4.3.1.6.1.8-.1l1.2-1.2c.5-.4 1.2-.5 1.7-.1l2.7 1.9c.6.4.7 1.2.3 1.7l-1.2 1.6c-.7.9-1.9 1.3-3 1-5.2-1.4-9.2-5.4-10.6-10.6-.3-1.1.1-2.3 1-3z" />
  </svg>
);

/** Unknown type → arrow (proposal, no native reference). */
const GenericActionIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgBase} {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 16.5 16.5 7.5M9 7.5h7.5V15"
    />
  </svg>
);

/** Single-action disclosure indicator, measured from the native iOS 27 reference. */
const FeaturedActionChevron = () => (
  <span className="featured-action-chevron" aria-hidden="true">
    <svg viewBox="0 0 7.2 12.4" width={7.2} height={12.4} aria-hidden="true">
      <path
        d="m1 1 5.2 5.2L1 11.4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const ICONS: Readonly<Record<KnownFeaturedActionType, (props: IconProps) => React.ReactElement>> = {
  addToBalance: AddToBalanceIcon,
  call: CallIcon,
};

const iconFor = (action: ResolvedFeaturedAction) =>
  action.known ? ICONS[action.type as KnownFeaturedActionType] : GenericActionIcon;

/**
 * Tile row rendered below the card front. Static preview only — tiles are
 * not links (the URL is exposed via `title`/`data-url` for inspection).
 */
export const FeaturedActionsRow = ({ actions }: { actions: ResolvedFeaturedAction[] }) => {
  if (actions.length === 0) return null;
  const showChevron = actions.length === 1;
  return (
    <div className={`featured-actions featured-actions-count-${actions.length}`}>
      {actions.map((action) => {
        const Icon = iconFor(action);
        return (
          <div
            className={`featured-action${action.known ? "" : " featured-action-unknown"}`}
            data-identifier={action.identifier}
            data-type={action.type}
            data-url={action.url}
            data-proposal={action.known ? undefined : "unverified-vs-native-wallet"}
            title={action.url}
            key={action.identifier}
          >
            <span className="featured-action-icon">
              <Icon width={17} height={17} />
            </span>
            <span className="featured-action-text">
              <span className="featured-action-label">{action.label}</span>
              <span className="featured-action-subtitle">{action.subtitle}</span>
            </span>
            {showChevron ? <FeaturedActionChevron /> : null}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Styles for the tile row. Injected ONLY when tiles render, so existing
 * previews keep byte-identical markup. The root drops its fixed height so
 * the row below the card takes part in layout.
 *
 * Proportions are taken from the native iOS 27.0 Wallet reference (iPhone 17
 * Pro Simulator, card 1110 px wide → 320 px here, scale ≈ 0.288): gap card →
 * tiles ≈ 70 px → 20 px, tile height ≈ 342 px → 99 px, gap between tiles
 * ≈ 24 px → 7 px, icon circle ≈ 88 px → 25 px, label/subtitle ≈ 13 px.
 *
 * Geometry: `#passCard` is 320×420 but the classic front is 450px tall plus
 * 2×10px padding (470px), so the row needs a 70px offset (470 − 420 + 20px
 * gap). The poster front is exactly 420px → 20px gap.
 */
export const getFeaturedActionStyles = (identifier: string) => `
  #${identifier}.has-featured-actions {
    height: auto;
    max-height: none;
  }
  #${identifier} .featured-actions {
    box-sizing: border-box;
    display: flex;
    gap: 7px;
    width: 320px;
    margin-top: 70px;
  }
  #${identifier}.posterGeneric .featured-actions {
    margin-top: 20px;
  }
  #${identifier} .featured-action {
    box-sizing: border-box;
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 99px;
    padding: 11px 12px 11px 13px;
    border-radius: 17px;
    background: #ffffff;
    color: #000000;
    text-align: left;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 0 0.5px rgb(0 0 0 / 6%);
  }
  #${identifier} .featured-action-icon {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #34c759;
    color: #ffffff;
  }
  #${identifier} .featured-action-text {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    min-width: 0;
  }
  #${identifier} .featured-action-chevron {
    position: absolute;
    right: 12.4px;
    bottom: 24.3px;
    display: flex;
    width: 7.2px;
    height: 12.4px;
    color: #c7c7cc;
  }
  #${identifier} .featured-action-label,
  #${identifier} .featured-action-subtitle {
    max-width: 100%;
    font-size: 13px;
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #${identifier} .featured-action-label {
    font-weight: 600;
  }
  #${identifier} .featured-action-subtitle {
    font-weight: 400;
    color: #8a8a8e;
  }
`;
