import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Comparison, comparisonArgs } from "../src/Comparison";
import { backFields1 } from "../src/fixtures/back-fields";
import { benesov } from "../src/fixtures/benesov";
import { boardingPass1 } from "../src/fixtures/boarding-pass-1";
import { boardingPass2 } from "../src/fixtures/boarding-pass-2";
import { boardingPass3 } from "../src/fixtures/boarding-pass-3";
import { code128_1 } from "../src/fixtures/code128-1";
import { code128_2 } from "../src/fixtures/code128-2";
import { code128_3 } from "../src/fixtures/code128-3";
import { code128_4 } from "../src/fixtures/code128-4";
import { code128_5 } from "../src/fixtures/code128-5";
import { coupon1 } from "../src/fixtures/coupon1";
import { eventTicket1 } from "../src/fixtures/event-ticket-1";
import { eventTicket2 } from "../src/fixtures/event-ticket-2";
import { eventTicket3 } from "../src/fixtures/event-ticket-3";
import { eventTicket4 } from "../src/fixtures/event-ticket-4";
import { eventTicket5 } from "../src/fixtures/event-ticket-5";
import { exampleGeneric } from "../src/fixtures/example-generic";
import { exampleStoreCard } from "../src/fixtures/example-store-card";
import { generic1 } from "../src/fixtures/generic1";
import { generic2 } from "../src/fixtures/generic2";
import { generic3 } from "../src/fixtures/generic3";
import { generic4 } from "../src/fixtures/generic4";
import { generic5 } from "../src/fixtures/generic5";
import { generic6 } from "../src/fixtures/generic6";
import { generic7 } from "../src/fixtures/generic7";
import { generic8 } from "../src/fixtures/generic8";
import { generic9 } from "../src/fixtures/generic9";
import { largeBarcode } from "../src/fixtures/large-barcode";
import { pdf417_1 } from "../src/fixtures/pdf417-1";
import { pdf417_2 } from "../src/fixtures/pdf417-2";
import { pdf417_3 } from "../src/fixtures/pdf417-3";
import { pdf417_4 } from "../src/fixtures/pdf417-4";
import { pga } from "../src/fixtures/pga";
import { pgaNational } from "../src/fixtures/pga-national";
import { sample2 } from "../src/fixtures/sample2";
import { storeCard1 } from "../src/fixtures/store-card-1";
import { storeCard2 } from "../src/fixtures/store-card-2";
import { storeCard3 } from "../src/fixtures/store-card-3";
import { storeCard4 } from "../src/fixtures/store-card-4";
import { storeCard5 } from "../src/fixtures/store-card-5";
import { storeCard6 } from "../src/fixtures/store-card-6";
import { storeCard7 } from "../src/fixtures/store-card-7";
import { storeCard8 } from "../src/fixtures/store-card-8";
import { vltavaClub } from "../src/fixtures/vltava-club";
import {
  vltavaFeaturedEventTicket,
  vltavaFeaturedGeneric,
} from "../src/fixtures/vltava-featured-actions";
import { getPassStyles, getScenario, scenarioCatalog } from "../src/scenarioCatalog";

const fixtureValues: Record<string, Record<string, unknown>> = {
  "example-generic": exampleGeneric,
  "example-store-card": exampleStoreCard,
  "vltava-featured-generic": vltavaFeaturedGeneric(2),
  "vltava-featured-event-ticket": vltavaFeaturedEventTicket(2),
  "vltava-club": vltavaClub,
  "vltava-poster-short-text": vltavaClub,
  "vltava-poster-long-czech-text": vltavaClub,
  "vltava-poster-three-primary-fields": vltavaClub,
  "vltava-poster-more-primary-fields": vltavaClub,
  sample2,
  benesov,
  pga,
  "pga-national": pgaNational,
  "boarding-pass-1": boardingPass1,
  "boarding-pass-2": boardingPass2,
  "boarding-pass-3": boardingPass3,
  "transit-air": boardingPass1,
  "transit-train": boardingPass1,
  "transit-bus": boardingPass1,
  "transit-boat": boardingPass1,
  "transit-generic": boardingPass1,
  "store-card-1": storeCard1,
  "store-card-2": storeCard2,
  "store-card-3": storeCard3,
  "store-card-4": storeCard4,
  "store-card-5": storeCard5,
  "store-card-6": storeCard6,
  "store-card-7": storeCard7,
  "store-card-8": storeCard8,
  "event-ticket-1": eventTicket1,
  "event-ticket-2": eventTicket2,
  "event-ticket-3": eventTicket3,
  "event-ticket-4": eventTicket4,
  "event-ticket-5": eventTicket5,
  generic1,
  generic2,
  generic3,
  generic4,
  generic5,
  generic6,
  generic7,
  generic8,
  generic9,
  coupon1,
  "back-fields-1": backFields1,
  "code-128-1": code128_1,
  "code-128-2": code128_2,
  "code-128-3": code128_3,
  "code-128-4": code128_4,
  "code-128-5": code128_5,
  "pdf-417-1": pdf417_1,
  "pdf-417-2": pdf417_2,
  "pdf-417-3": pdf417_3,
  "pdf-417-4": pdf417_4,
  "large-barcode": largeBarcode,
};

describe("scenario catalog fixture metadata", () => {
  it("keeps scenario identity out of editable story args", () => {
    expect(getScenario("not-a-story-id")).toBeUndefined();
    expect(comparisonArgs("examples--generic", exampleGeneric)).not.toHaveProperty("scenarioId");
  });

  it("renders the explicit no-reference state for an unknown story id", () => {
    const html = renderToStaticMarkup(
      createElement(Comparison, {
        values: exampleGeneric,
        scenarioId: "not-a-story-id",
        variant: "fallback",
        targetOs: "ios26",
      }),
    );
    expect(html).toContain("No native reference for this configuration.");
  });

  it("matches every catalog pass style to the keys in the actual fixture pass.json", () => {
    expect(scenarioCatalog).toHaveLength(63);
    for (const scenario of scenarioCatalog) {
      const values = fixtureValues[scenario.fixtureKey];
      expect(values, `missing test fixture for ${scenario.fixtureKey}`).toBeDefined();
      if (!values) throw new Error(`missing test fixture for ${scenario.fixtureKey}`);
      expect(getPassStyles(values), scenario.id).toEqual(scenario.passStyles);
    }
  });

  it("resolves every metadata reference path to an existing public screenshot", () => {
    const storybookRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
    for (const scenario of scenarioCatalog) {
      for (const reference of scenario.references) {
        const referencePath = path.resolve(storybookRoot, "public", reference.path);
        expect(existsSync(referencePath), `${scenario.id}: ${reference.path}`).toBe(true);
      }
    }
  });
});
