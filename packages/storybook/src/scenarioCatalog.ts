import type { PreviewTargetOs, PreviewVariant } from "@tiketo/pkpass-preview";

export type PassStyleKey =
  | "boardingPass"
  | "coupon"
  | "eventTicket"
  | "generic"
  | "posterGeneric"
  | "storeCard";

export type CatalogFeature =
  | "Back fields"
  | "Barcodes"
  | "Featured Actions"
  | "iOS comparison"
  | "Long text"
  | "Poster Generic"
  | "Transit";

export type CatalogSource =
  | "Derived transit"
  | "Legacy reference"
  | "Migrated sample"
  | "Signed Vltava"
  | "Synthetic";

export type ReferenceKind = "simulator" | "device" | "legacy-unknown";
export type ReferenceView = "front" | "back" | "pass-details" | "notification";

export type ReferenceConfiguration = {
  fixtureKey: string;
  variant: PreviewVariant;
  targetOs: PreviewTargetOs;
  featuredActionsCount?: 0 | 1 | 2;
};

export type NativeReference = {
  path: string;
  kind: ReferenceKind;
  device?: string;
  iOS?: string;
  view: ReferenceView;
  configuration: ReferenceConfiguration;
};

export type ScenarioMetadata = {
  /** Permanent Storybook id; never derive this from the visible title. */
  id: string;
  title: string;
  labels: readonly string[];
  /** Every pass-style key actually present in this fixture's pass.json. */
  passStyles: readonly PassStyleKey[];
  features: readonly CatalogFeature[];
  source: CatalogSource;
  fixtureKey: string;
  references: readonly NativeReference[];
};

export const passStyleLabels: Record<PassStyleKey, string> = {
  boardingPass: "Boarding pass",
  coupon: "Coupon",
  eventTicket: "Event ticket",
  generic: "Generic",
  posterGeneric: "Poster Generic",
  storeCard: "Store card",
};

export type CatalogPassStyle = (typeof passStyleLabels)[PassStyleKey];

const referencePath = (name: string) => `screenshots/${name}.jpg`;
const fallbackConfiguration = (fixtureKey: string): ReferenceConfiguration => ({
  fixtureKey,
  variant: "fallback",
  targetOs: "ios26",
});

const legacyReference = (name: string, fixtureKey: string): NativeReference => ({
  path: referencePath(name),
  kind: "legacy-unknown",
  view: "front",
  configuration: fallbackConfiguration(fixtureKey),
});

const simulatorReference = (
  name: string,
  configuration: ReferenceConfiguration,
  iOS: string,
): NativeReference => ({
  path: referencePath(name),
  kind: "simulator",
  device: "iPhone 17 Pro",
  iOS,
  view: "pass-details",
  configuration,
});

const scenario = (metadata: ScenarioMetadata) => metadata;

const legacyScenario = ({
  id,
  title,
  fixtureKey,
  passStyles,
  reference = fixtureKey,
  features = ["iOS comparison"],
  source = "Legacy reference",
  labels = [],
}: {
  id: string;
  title: string;
  fixtureKey: string;
  passStyles: readonly PassStyleKey[];
  reference?: string;
  features?: readonly CatalogFeature[];
  source?: CatalogSource;
  labels?: readonly string[];
}): ScenarioMetadata =>
  scenario({
    id,
    title,
    labels,
    passStyles,
    features,
    source,
    fixtureKey,
    references: [legacyReference(reference, fixtureKey)],
  });

const featuredScenario = (
  style: "generic" | "eventTicket",
  count: 0 | 1 | 2,
  targetOs: PreviewTargetOs,
  title: string,
): ScenarioMetadata => {
  const styleSlug = style === "generic" ? "generic" : "event-ticket";
  const fixtureKey = `vltava-featured-${styleSlug}`;
  const older = targetOs === "ios26";
  const actionSuffix = ["no-actions", "one-action", "two-actions"][count];
  const idSuffix = older ? `${styleSlug}-older-ios` : `${styleSlug}-${actionSuffix}`;
  const screenshotCount = older ? 2 : count;
  return scenario({
    id: `examples-featured-actions-ios-27--${idSuffix}`,
    title,
    labels: [style === "generic" ? "Generic" : "Event ticket", `${count} actions`],
    passStyles: [style],
    features: ["Featured Actions", "iOS comparison"],
    source: "Signed Vltava",
    fixtureKey,
    references: [
      simulatorReference(
        `vltava-featured-actions-${styleSlug}-${screenshotCount}-ios-${older ? "26" : "27"}`,
        {
          fixtureKey,
          variant: "fallback",
          targetOs,
          featuredActionsCount: count,
        },
        older ? "26.5" : "27.0",
      ),
    ],
  });
};

const vltavaStyles = ["generic", "posterGeneric"] as const;
const vltavaFallbackReference: NativeReference = {
  ...legacyReference("vltava-club-ios-26.5", "vltava-club"),
  iOS: "26.5",
  view: "pass-details",
};
const vltavaPosterReference = simulatorReference(
  "vltava-club-ios-27.0",
  { fixtureKey: "vltava-club", variant: "poster", targetOs: "ios27" },
  "27.0",
);

export const scenarioCatalog: readonly ScenarioMetadata[] = [
  legacyScenario({
    id: "examples--generic",
    title: "Generic quick example",
    fixtureKey: "example-generic",
    passStyles: ["generic"],
    source: "Synthetic",
  }),
  legacyScenario({
    id: "examples--store-card",
    title: "Store card quick example",
    fixtureKey: "example-store-card",
    passStyles: ["storeCard"],
    source: "Synthetic",
  }),
  featuredScenario("generic", 2, "ios27", "Generic — 2 actions (iOS 27)"),
  featuredScenario("generic", 1, "ios27", "Generic — 1 action (iOS 27)"),
  featuredScenario("generic", 0, "ios27", "Generic — 0 actions (iOS 27)"),
  featuredScenario("eventTicket", 2, "ios27", "Event ticket — 2 actions (iOS 27)"),
  featuredScenario("eventTicket", 1, "ios27", "Event ticket — 1 action (iOS 27)"),
  featuredScenario("eventTicket", 0, "ios27", "Event ticket — 0 actions (iOS 27)"),
  featuredScenario("generic", 2, "ios26", "Generic — 2 actions, iOS 26.5"),
  featuredScenario("eventTicket", 2, "ios26", "Event ticket — 2 actions, iOS 26.5"),
  scenario({
    id: "examples-vltava-club--both-variants",
    title: "Vltava Club — iOS 26.5 and iOS 27.0",
    labels: ["Generic fallback", "Poster Generic"],
    passStyles: vltavaStyles,
    features: ["iOS comparison", "Poster Generic"],
    source: "Signed Vltava",
    fixtureKey: "vltava-club",
    references: [vltavaFallbackReference, vltavaPosterReference],
  }),
  scenario({
    id: "examples-vltava-club--ios-265-generic",
    title: "Vltava Club — iOS 26.5 generic fallback",
    labels: ["Generic fallback"],
    passStyles: vltavaStyles,
    features: ["iOS comparison", "Poster Generic"],
    source: "Signed Vltava",
    fixtureKey: "vltava-club",
    references: [vltavaFallbackReference],
  }),
  scenario({
    id: "examples-vltava-club--ios-270-poster-generic",
    title: "Vltava Club — iOS 27.0 poster",
    labels: ["Poster Generic"],
    passStyles: vltavaStyles,
    features: ["Poster Generic", "iOS comparison"],
    source: "Signed Vltava",
    fixtureKey: "vltava-club",
    references: [vltavaPosterReference],
  }),
  ...(
    [
      [
        "poster-short-text",
        "Poster front text — short",
        "vltava-poster-short-text",
        "vltava-club-poster-short-text-ios-27",
      ],
      [
        "poster-long-czech-text",
        "Poster front text — long Czech",
        "vltava-poster-long-czech-text",
        "vltava-club-poster-long-czech-text-ios-27",
      ],
      [
        "poster-three-primary-fields",
        "Poster front text — three primary fields",
        "vltava-poster-three-primary-fields",
        "vltava-club-poster-three-primary-fields-ios-27",
      ],
      [
        "poster-more-primary-fields",
        "Poster front text — four primary fields",
        "vltava-poster-more-primary-fields",
        "vltava-club-poster-more-primary-fields-ios-27",
      ],
    ] as const
  ).map(([slug, title, fixtureKey, reference]) =>
    scenario({
      id: `examples-vltava-club--${slug}`,
      title,
      labels: ["Poster Generic", "Front text"],
      passStyles: vltavaStyles,
      features: ["Poster Generic", "iOS comparison"],
      source: "Signed Vltava",
      fixtureKey,
      references: [
        simulatorReference(reference, { fixtureKey, variant: "poster", targetOs: "ios27" }, "27.0"),
      ],
    }),
  ),
  legacyScenario({
    id: "samples--membership-id-card",
    title: "Membership ID card",
    fixtureKey: "sample2",
    passStyles: ["generic"],
    reference: "sample2",
    source: "Migrated sample",
  }),
  legacyScenario({
    id: "samples--resident-benefit",
    title: "Resident benefit card",
    fixtureKey: "benesov",
    passStyles: ["storeCard"],
    reference: "benesov",
    source: "Migrated sample",
  }),
  legacyScenario({
    id: "samples--tour-pro",
    title: "Tour-pro membership card",
    fixtureKey: "pga",
    passStyles: ["generic"],
    reference: "pga",
    source: "Migrated sample",
  }),
  legacyScenario({
    id: "samples--long-qr-alt-text",
    title: "Store card — long QR alternative text",
    fixtureKey: "pga-national",
    passStyles: ["storeCard"],
    reference: "pga-national",
    features: ["iOS comparison", "Long text", "Barcodes"],
    source: "Migrated sample",
  }),
  ...(
    [
      ["boarding-pass-1", "Boarding pass — Prague to Paris"],
      ["boarding-pass-2", "Boarding pass — long secondary text"],
      ["boarding-pass-3", "Boarding pass — HTML-like origin text"],
    ] as const
  ).map(([fixtureKey, title], index) =>
    legacyScenario({
      id: `boarding-pass--boarding-pass-${index + 1}`,
      title,
      fixtureKey,
      passStyles: ["boardingPass"],
    }),
  ),
  ...(["air", "train", "bus", "boat", "generic"] as const).map((transit) => {
    const fixtureKey = `transit-${transit}`;
    return legacyScenario({
      id: `boarding-pass--transit-type-${transit}`,
      title: `Transit icon — ${transit.charAt(0).toUpperCase()}${transit.slice(1)}`,
      fixtureKey,
      passStyles: ["boardingPass"],
      features: ["Transit", "iOS comparison"],
      source: "Derived transit",
    });
  }),
  ...(
    [
      "Medical assistance card",
      "Medical assistance — four secondary fields",
      "Golf club — information-only layout",
      "Golf membership card with strip image",
      "Bike assistance — four auxiliary fields",
      "Store card — five auxiliary and five secondary fields",
      "Store card — five auxiliary and three secondary fields",
      "Sweet shop info card with logo text",
    ] as const
  ).map((title, index) => {
    const number = index + 1;
    return legacyScenario({
      id: `store-card--store-card-${number}`,
      title,
      fixtureKey: `store-card-${number}`,
      passStyles: ["storeCard"],
    });
  }),
  ...(
    [
      ["Event ticket — primary, header and secondary fields", "eventTicket"],
      ["Event ticket — auxiliary field density", "eventTicket"],
      ["Event ticket — five-column density", "eventTicket"],
      ["Event ticket — compact field layout", "eventTicket"],
      ["Generic layout filed as event-ticket fixture", "generic"],
    ] as const
  ).map(([title, passStyle], index) => {
    const number = index + 1;
    return legacyScenario({
      id: `event-ticket--event-ticket-${number}`,
      title,
      fixtureKey: `event-ticket-${number}`,
      passStyles: [passStyle],
    });
  }),
  ...(
    [
      "Generic — dense fields without logo text",
      "Generic — dense fields with logo text",
      "Generic — reordered field groups",
      "Generic — five-column density",
      "Membership card — rich back fields",
      "Membership card — duplicate baseline",
      "Golf membership — empty member values",
      "Business card",
      "Sales card",
    ] as const
  ).map((title, index) => {
    const number = index + 1;
    return legacyScenario({
      id: `generic--generic-${number}`,
      title,
      fixtureKey: `generic${number}`,
      passStyles: ["generic"],
    });
  }),
  legacyScenario({
    id: "coupon--coupon-1",
    title: "Skyrider mobile coupon",
    fixtureKey: "coupon1",
    passStyles: ["coupon"],
  }),
  legacyScenario({
    id: "back-fields--back-fields-1",
    title: "Medical assistance card with long back fields",
    fixtureKey: "back-fields-1",
    passStyles: ["storeCard"],
    reference: "back-fields-1",
    features: ["Back fields", "iOS comparison"],
  }),
  ...(
    [
      ["code-128-1", "Code 128 — 1 character"],
      ["code-128-2", "Code 128 — 3 characters"],
      ["code-128-3", "Code 128 — 20-character message"],
      ["code-128-4", "Code 128 — 40-character message"],
      ["code-128-5", "Code 128 — 80-character message"],
      ["pdf-417-1", "PDF417 — short alphanumeric message"],
      ["pdf-417-2", "PDF417 — 20-character message"],
      ["pdf-417-3", "PDF417 — 40-character message"],
      ["pdf-417-4", "PDF417 — compact alphanumeric message"],
      ["large-barcode", "QR code — large payload"],
    ] as const
  ).map(([slug, title]) =>
    legacyScenario({
      id: `barcode--${slug}`,
      title,
      fixtureKey: slug,
      passStyles: ["generic"],
      features: ["Barcodes", "iOS comparison"],
    }),
  ),
];

const scenarioMap = new Map(scenarioCatalog.map((item) => [item.id, item]));

export const getScenario = (id: string): ScenarioMetadata => {
  const item = scenarioMap.get(id);
  if (!item) throw new Error(`Unknown scenario metadata: ${id}`);
  return item;
};

export const scenarioTitle = (id: string) => getScenario(id).title;

export const getPassStyles = (values: Record<string, unknown>): PassStyleKey[] => {
  const pass = values["pass.json"] as Record<string, unknown> | undefined;
  if (!pass) return [];
  return (Object.keys(passStyleLabels) as PassStyleKey[]).filter((key) => key in pass);
};

export const featuredActionsCount = (values: Record<string, unknown>): 0 | 1 | 2 => {
  const pass = values["pass.json"] as { featuredActions?: unknown[] } | undefined;
  return Math.min(pass?.featuredActions?.length ?? 0, 2) as 0 | 1 | 2;
};

export const findNativeReference = (
  configuration: ReferenceConfiguration,
): NativeReference | undefined => {
  const matches = scenarioCatalog
    .flatMap((item) => item.references)
    .filter((reference) => {
      const expected = reference.configuration;
      return (
        expected.fixtureKey === configuration.fixtureKey &&
        expected.variant === configuration.variant &&
        expected.targetOs === configuration.targetOs &&
        expected.featuredActionsCount === configuration.featuredActionsCount
      );
    });
  return matches[0];
};
