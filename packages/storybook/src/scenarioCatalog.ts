export type CatalogPassStyle =
  | "Boarding pass"
  | "Coupon"
  | "Event ticket"
  | "Generic"
  | "Poster Generic"
  | "Store card"
  | "Other / mixed";

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

export type ScenarioCatalogItem = {
  id: string;
  name: string;
  passStyle: CatalogPassStyle;
  features: readonly CatalogFeature[];
  source: CatalogSource;
  references: readonly string[];
};

const refs = (...names: string[]) => names.map((name) => `screenshots/${name}.jpg`);

export const scenarioCatalog: readonly ScenarioCatalogItem[] = [
  {
    id: "examples--generic",
    name: "Generic quick example",
    passStyle: "Generic",
    features: ["iOS comparison"],
    source: "Synthetic",
    references: refs("example-generic"),
  },
  {
    id: "examples--store-card",
    name: "Store card quick example",
    passStyle: "Store card",
    features: ["iOS comparison"],
    source: "Synthetic",
    references: refs("example-store-card"),
  },
  ...(
    [
      [
        "generic-two-actions",
        "Generic — 2 actions",
        "Generic",
        "vltava-featured-actions-generic-2-ios-27",
      ],
      [
        "generic-one-action",
        "Generic — 1 action",
        "Generic",
        "vltava-featured-actions-generic-1-ios-27",
      ],
      [
        "generic-no-actions",
        "Generic — 0 actions",
        "Generic",
        "vltava-featured-actions-generic-0-ios-27",
      ],
      [
        "event-ticket-two-actions",
        "Event ticket — 2 actions",
        "Event ticket",
        "vltava-featured-actions-event-ticket-2-ios-27",
      ],
      [
        "event-ticket-one-action",
        "Event ticket — 1 action",
        "Event ticket",
        "vltava-featured-actions-event-ticket-1-ios-27",
      ],
      [
        "event-ticket-no-actions",
        "Event ticket — 0 actions",
        "Event ticket",
        "vltava-featured-actions-event-ticket-0-ios-27",
      ],
      [
        "generic-older-ios",
        "Generic — older iOS",
        "Generic",
        "vltava-featured-actions-generic-2-ios-26",
      ],
      [
        "event-ticket-older-ios",
        "Event ticket — older iOS",
        "Event ticket",
        "vltava-featured-actions-event-ticket-2-ios-26",
      ],
    ] as const
  ).map(
    ([slug, name, passStyle, reference]): ScenarioCatalogItem => ({
      id: `examples-featured-actions-ios-27--${slug}`,
      name,
      passStyle,
      features: ["Featured Actions", "iOS comparison"],
      source: "Signed Vltava",
      references: refs(reference),
    }),
  ),
  {
    id: "examples-vltava-club--both-variants",
    name: "Vltava Club — both iOS variants",
    passStyle: "Poster Generic",
    features: ["iOS comparison", "Poster Generic"],
    source: "Signed Vltava",
    references: refs("vltava-club-ios-26.5", "vltava-club-ios-27.0"),
  },
  {
    id: "examples-vltava-club--ios-265-generic",
    name: "Vltava Club — iOS 26.5 generic",
    passStyle: "Generic",
    features: ["iOS comparison"],
    source: "Signed Vltava",
    references: refs("vltava-club-ios-26.5"),
  },
  ...(
    [
      ["ios-270-poster-generic", "Vltava Club — iOS 27 poster", "vltava-club-ios-27.0"],
      ["poster-short-text", "Poster — short text", "vltava-club-poster-short-text-ios-27"],
      [
        "poster-long-czech-text",
        "Poster — long Czech text",
        "vltava-club-poster-long-czech-text-ios-27",
      ],
      [
        "poster-three-primary-fields",
        "Poster — three primary fields",
        "vltava-club-poster-three-primary-fields-ios-27",
      ],
      [
        "poster-more-primary-fields",
        "Poster — more primary fields",
        "vltava-club-poster-more-primary-fields-ios-27",
      ],
    ] as const
  ).map(
    ([slug, name, reference]): ScenarioCatalogItem => ({
      id: `examples-vltava-club--${slug}`,
      name,
      passStyle: "Poster Generic",
      features: ["Poster Generic", "iOS comparison"],
      source: "Signed Vltava",
      references: refs(reference),
    }),
  ),
  ...(
    [
      ["membership-id-card", "Membership ID card", "sample2"],
      ["resident-benefit", "Resident benefit card", "benesov"],
      ["tour-pro", "Tour-pro card", "pga"],
      ["long-qr-alt-text", "Long QR alt text", "pga-national"],
    ] as const
  ).map(
    ([slug, name, reference]): ScenarioCatalogItem => ({
      id: `samples--${slug}`,
      name,
      passStyle: "Other / mixed",
      features: slug === "long-qr-alt-text" ? ["iOS comparison", "Long text"] : ["iOS comparison"],
      source: "Migrated sample",
      references: refs(reference),
    }),
  ),
  ...[1, 2, 3].map(
    (number): ScenarioCatalogItem => ({
      id: `boarding-pass--boarding-pass-${number}`,
      name: `Boarding pass ${number}`,
      passStyle: "Boarding pass",
      features: ["iOS comparison"],
      source: "Legacy reference",
      references: refs(`boarding-pass-${number}`),
    }),
  ),
  ...(["air", "train", "bus", "boat", "generic"] as const).map(
    (transit): ScenarioCatalogItem => ({
      id: `boarding-pass--transit-type-${transit}`,
      name: `Transit — ${transit.charAt(0).toUpperCase()}${transit.slice(1)}`,
      passStyle: "Boarding pass",
      features: ["Transit", "iOS comparison"],
      source: "Derived transit",
      references: refs(`transit-${transit}`),
    }),
  ),
  ...Array.from({ length: 8 }, (_, index) => index + 1).map(
    (number): ScenarioCatalogItem => ({
      id: `store-card--store-card-${number}`,
      name: `Store card ${number}`,
      passStyle: "Store card",
      features: ["iOS comparison"],
      source: "Legacy reference",
      references: refs(`store-card-${number}`),
    }),
  ),
  ...Array.from({ length: 5 }, (_, index) => index + 1).map(
    (number): ScenarioCatalogItem => ({
      id: `event-ticket--event-ticket-${number}`,
      name: `Event ticket ${number}`,
      passStyle: "Event ticket",
      features: ["iOS comparison"],
      source: "Legacy reference",
      references: refs(`event-ticket-${number}`),
    }),
  ),
  ...Array.from({ length: 9 }, (_, index) => index + 1).map(
    (number): ScenarioCatalogItem => ({
      id: `generic--generic-${number}`,
      name: `Generic ${number}`,
      passStyle: "Generic",
      features: ["iOS comparison"],
      source: "Legacy reference",
      references: refs(`generic${number}`),
    }),
  ),
  {
    id: "coupon--coupon-1",
    name: "Coupon 1",
    passStyle: "Coupon",
    features: ["iOS comparison"],
    source: "Legacy reference",
    references: refs("coupon1"),
  },
  {
    id: "back-fields--back-fields-1",
    name: "Back fields demo",
    passStyle: "Generic",
    features: ["Back fields", "iOS comparison"],
    source: "Legacy reference",
    references: refs("back-fields-1"),
  },
  ...(
    [
      ["code-128-1", "Code128 1", "code128-1"],
      ["code-128-2", "Code128 2", "code128-2"],
      ["code-128-3", "Code128 3", "code128-3"],
      ["code-128-4", "Code128 4", "code128-4"],
      ["code-128-5", "Code128 5", "code128-5"],
      ["pdf-417-1", "PDF417 1", "pdf417-1"],
      ["pdf-417-2", "PDF417 2", "pdf417-2"],
      ["pdf-417-3", "PDF417 3", "pdf417-3"],
      ["pdf-417-4", "PDF417 4", "pdf417-4"],
      ["large-barcode", "Large barcode", "large-barcode"],
    ] as const
  ).map(
    ([slug, name, reference]): ScenarioCatalogItem => ({
      id: `barcode--${slug}`,
      name,
      passStyle: "Other / mixed",
      features: ["Barcodes", "iOS comparison"],
      source: "Legacy reference",
      references: refs(reference),
    }),
  ),
];
