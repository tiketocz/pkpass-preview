import type * as React from "react";

import type { FeaturedAction, KnownFeaturedActionType, PreviewTargetOs } from "./types";

// iOS 27 Featured Actions (TIK-318).
//
// NÁVRH / PROPOSAL, PENDING NATIVE REFERENCE: the tile layout, labels and
// icons below are a plausible approximation designed from the WWDC26
// session 209 description only. They have NOT been verified against a
// native Apple Wallet screenshot yet — the system "Add pass" preview on
// iOS 27.0 does not show the tiles; a native reference has to be captured
// from the detail of an added pass. Treat every label/icon here as a
// proposal until that reference lands.

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
  /** Proposal label shown on the tile (unverified vs native Wallet). */
  label: string;
}

/**
 * Proposal labels (EN) — UNVERIFIED vs native Wallet, pending reference.
 * Unknown types fall back to `UNKNOWN_FEATURED_ACTION_LABEL`.
 */
export const FEATURED_ACTION_LABELS: Readonly<Record<KnownFeaturedActionType, string>> = {
  addToBalance: "Add to Balance",
  call: "Call",
};

/** Proposal label for action types without a dedicated tile. */
export const UNKNOWN_FEATURED_ACTION_LABEL = "Open";

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
 *   `UNKNOWN_FEATURED_ACTION_LABEL` label and a neutral icon.
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
    });
  }

  return resolved;
};

// Proposal icons (UNVERIFIED vs native Wallet). Inline SVG, stroke-based,
// `currentColor` so the badge colour cascades. Kept dependency-free like
// transit-icon.tsx.
type IconProps = React.SVGProps<SVGSVGElement>;

const svgBase = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** addToBalance → plus sign. */
const AddToBalanceIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgBase} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

/** call → phone handset. */
const CallIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgBase} {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/** Unknown type → neutral "open" arrow. */
const GenericActionIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgBase} {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
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
  return (
    <div
      className={`featured-actions featured-actions-count-${actions.length}`}
      data-proposal="unverified-vs-native-wallet"
    >
      {actions.map((action) => {
        const Icon = iconFor(action);
        return (
          <div
            className={`featured-action${action.known ? "" : " featured-action-unknown"}`}
            data-identifier={action.identifier}
            data-type={action.type}
            data-url={action.url}
            title={action.url}
            key={action.identifier}
          >
            <span className="featured-action-icon">
              <Icon width={16} height={16} />
            </span>
            <span className="featured-action-label">{action.label}</span>
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
 * Geometry: `#passCard` is 320×420 but the classic front is 450px tall plus
 * 2×10px padding (470px), so the row needs a 62px offset (470 − 420 + 12px
 * gap). The poster front is exactly 420px → 12px gap.
 */
export const getFeaturedActionStyles = (
  identifier: string,
  colors: { backgroundColor?: string; foregroundColor?: string },
) => `
  #${identifier}.has-featured-actions {
    height: auto;
  }
  #${identifier} .featured-actions {
    box-sizing: border-box;
    display: flex;
    gap: 8px;
    width: 320px;
    margin-top: 62px;
  }
  #${identifier}.posterGeneric .featured-actions {
    margin-top: 12px;
  }
  #${identifier} .featured-action {
    box-sizing: border-box;
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 76px;
    padding: 10px 12px;
    border-radius: 14px;
    background: #ffffff;
    color: #1c1c1e;
    box-shadow: 0 3px 4px 0 rgb(0 0 0 / 20%), 0 2px 5px 0 rgb(0 0 0 / 19%);
  }
  #${identifier} .featured-action-icon {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${colors.backgroundColor || "#1c1c1e"};
    color: ${colors.foregroundColor || "#ffffff"};
  }
  #${identifier} .featured-action-label {
    max-width: 100%;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
