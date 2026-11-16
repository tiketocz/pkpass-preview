import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  MAX_FEATURED_ACTIONS,
  PKPassPreview,
  type PreviewProps,
  UNKNOWN_FEATURED_ACTION_LABEL,
  resolveFeaturedActions,
  supportsFeaturedActions,
} from "../src/index";
import type { PassData } from "../src/types";

// Same two actions as the Vltava Club fixtures (TIK-318 podklady).
const BALANCE = {
  identifier: "vltava-balance",
  type: "addToBalance",
  url: "https://example.com/vltava-club/balance",
};
const SUPPORT = { identifier: "vltava-support", type: "call", url: "tel:+12025550123" };

const genericPass = (featuredActions?: unknown): PassData =>
  ({
    description: "Vltava Club",
    formatVersion: 1,
    organizationName: "Tiketo Demo",
    backgroundColor: "rgb(20, 30, 57)",
    foregroundColor: "rgb(255, 246, 233)",
    generic: { primaryFields: [{ key: "member", value: "Anna Nováková" }] },
    posterGeneric: { primaryFields: [{ key: "title", value: "Vltava Club" }] },
    ...(featuredActions === undefined ? {} : { featuredActions }),
  }) as PassData;

const eventTicketPass = (featuredActions?: unknown): PassData =>
  ({
    description: "Vltava Club",
    formatVersion: 1,
    organizationName: "Tiketo Demo",
    eventTicket: {
      headerFields: [{ key: "section", label: "SEKCE", value: "A" }],
      primaryFields: [{ key: "event", label: "UDÁLOST", value: "Vltava Club Night" }],
    },
    ...(featuredActions === undefined ? {} : { featuredActions }),
  }) as PassData;

const render = (data: PassData, props: Omit<PreviewProps, "values"> = {}) => {
  const markup = renderToStaticMarkup(
    createElement(PKPassPreview, { values: { "pass.json": data }, ...props }),
  );
  return new DOMParser().parseFromString(markup, "text/html");
};

const tileIds = (doc: Document) =>
  Array.from(doc.querySelectorAll(".featured-action")).map((el) =>
    el.getAttribute("data-identifier"),
  );

describe("resolveFeaturedActions", () => {
  it("preserves input order", () => {
    expect(resolveFeaturedActions([BALANCE, SUPPORT], "ios27").map((a) => a.identifier)).toEqual([
      "vltava-balance",
      "vltava-support",
    ]);
    expect(resolveFeaturedActions([SUPPORT, BALANCE], "ios27").map((a) => a.identifier)).toEqual([
      "vltava-support",
      "vltava-balance",
    ]);
  });

  it("caps the result at two actions", () => {
    const many = [1, 2, 3, 4].map((n) => ({ identifier: `a${n}`, type: "call" }));
    const resolved = resolveFeaturedActions(many, "ios27");
    expect(MAX_FEATURED_ACTIONS).toBe(2);
    expect(resolved.map((a) => a.identifier)).toEqual(["a1", "a2"]);
  });

  it("returns nothing for older or omitted targets", () => {
    expect(resolveFeaturedActions([BALANCE, SUPPORT])).toEqual([]);
    expect(resolveFeaturedActions([BALANCE, SUPPORT], "ios26")).toEqual([]);
    expect(supportsFeaturedActions()).toBe(false);
    expect(supportsFeaturedActions("ios26")).toBe(false);
    expect(supportsFeaturedActions("ios27")).toBe(true);
  });

  it.each([undefined, null, "call", 42, true, { 0: BALANCE }])(
    "treats non-array input %j as no actions without throwing",
    (input) => {
      expect(() => resolveFeaturedActions(input, "ios27")).not.toThrow();
      expect(resolveFeaturedActions(input, "ios27")).toEqual([]);
    },
  );

  it("skips malformed entries and fills the two slots from the valid ones", () => {
    const resolved = resolveFeaturedActions(
      [
        null,
        undefined,
        "call",
        7,
        [BALANCE],
        { type: "call", url: "tel:1" }, // missing identifier
        { identifier: "no-type", url: "tel:1" }, // missing type
        { identifier: "  ", type: "call" }, // blank identifier
        { identifier: "bad-url", type: "call", url: 123 }, // non-string url
        { identifier: 5, type: "call" }, // non-string identifier
        BALANCE,
        { ...BALANCE, type: "call" }, // duplicate identifier
        { identifier: "no-url", type: "call" }, // url is optional per schema
        SUPPORT,
      ],
      "ios27",
    );
    expect(resolved.map((a) => a.identifier)).toEqual(["vltava-balance", "no-url"]);
    expect(resolved[1]).not.toHaveProperty("url");
  });

  it("keeps unknown types as generic tiles", () => {
    const [unknown] = resolveFeaturedActions(
      [{ identifier: "x", type: "orderFood", url: "https://example.com" }],
      "ios27",
    );
    expect(unknown).toMatchObject({
      identifier: "x",
      type: "orderFood",
      known: false,
      label: UNKNOWN_FEATURED_ACTION_LABEL,
    });
  });
});

describe("PKPassPreview featured actions", () => {
  it.each([
    ["generic", genericPass],
    ["eventTicket", eventTicketPass],
  ])("renders %s tiles below the card front in input order at iOS 27", (_style, make) => {
    const doc = render(make([BALANCE, SUPPORT]), { targetOs: "ios27" });
    const row = doc.querySelector(".featured-actions");
    expect(row).not.toBeNull();
    // Sibling after #passCard, i.e. below the card, not inside it.
    expect(row?.previousElementSibling?.id).toBe("passCard");
    expect(doc.querySelector("#passCard .featured-actions")).toBeNull();
    expect(tileIds(doc)).toEqual(["vltava-balance", "vltava-support"]);
  });

  it("renders a single tile for one action", () => {
    const doc = render(genericPass([BALANCE]), { targetOs: "ios27" });
    expect(tileIds(doc)).toEqual(["vltava-balance"]);
    expect(doc.querySelector(".featured-actions-count-1")).not.toBeNull();
  });

  it("never renders more than two tiles", () => {
    const extra = { identifier: "third", type: "call", url: "tel:3" };
    const doc = render(genericPass([BALANCE, SUPPORT, extra]), { targetOs: "ios27" });
    expect(tileIds(doc)).toEqual(["vltava-balance", "vltava-support"]);
  });

  it.each([
    ["empty array", []],
    ["omitted key", undefined],
  ])("renders no tile container for 0 actions (%s)", (_label, actions) => {
    const doc = render(genericPass(actions), { targetOs: "ios27" });
    expect(doc.querySelector(".featured-actions")).toBeNull();
    expect(doc.querySelector(".has-featured-actions")).toBeNull();
  });

  it.each([
    ["default (omitted)", {}],
    ["ios26", { targetOs: "ios26" as const }],
  ])("renders no tiles for target %s", (_label, props) => {
    const doc = render(genericPass([BALANCE, SUPPORT]), props);
    expect(doc.querySelector(".featured-actions")).toBeNull();
    expect(doc.querySelector(".has-featured-actions")).toBeNull();
    expect(doc.querySelector("style")?.textContent).not.toContain("featured-action");
  });

  it("does not change existing markup when targetOs is omitted or ios26", () => {
    // Random root id differs per render; normalise it before comparing.
    const normalise = (html: string) => html.replace(/visualEditor_[a-z0-9]+/g, "ID");
    const withActions = genericPass([BALANCE, SUPPORT]);
    const withoutActions = genericPass();
    const baseline = normalise(
      renderToStaticMarkup(
        createElement(PKPassPreview, { values: { "pass.json": withoutActions } }),
      ),
    );
    for (const targetOs of [undefined, "ios26"] as const) {
      const html = normalise(
        renderToStaticMarkup(
          createElement(PKPassPreview, { values: { "pass.json": withActions }, targetOs }),
        ),
      );
      expect(html).toBe(baseline);
    }
  });

  it("does not throw for unknown types or malformed entries", () => {
    const malformed = [
      null,
      { identifier: "x" },
      { type: "call" },
      "nope",
      { identifier: "mystery", type: "somethingNew", url: "https://example.com" },
    ];
    let doc: Document | undefined;
    expect(() => {
      doc = render(genericPass(malformed), { targetOs: "ios27" });
    }).not.toThrow();
    expect(doc && tileIds(doc)).toEqual(["mystery"]);
    expect(doc?.querySelector(".featured-action-unknown")?.textContent).toBe(
      UNKNOWN_FEATURED_ACTION_LABEL,
    );

    for (const bad of [null, "x", 1, { a: 1 }]) {
      expect(() => render(genericPass(bad), { targetOs: "ios27" })).not.toThrow();
    }
  });

  it.each(["poster", "fallback", undefined] as const)(
    "variant %s layout is unaffected by targetOs",
    (variant) => {
      const data = genericPass([BALANCE, SUPPORT]);
      const legacy = render(data, { variant });
      const ios27 = render(data, { variant, targetOs: "ios27" });
      const legacyRoot = legacy.body.firstElementChild;
      const ios27Root = ios27.body.firstElementChild;
      const layoutClasses = (el: Element | null | undefined) =>
        Array.from(el?.classList ?? []).filter((c) => c !== "has-featured-actions");

      expect(layoutClasses(ios27Root)).toEqual(layoutClasses(legacyRoot));
      expect(ios27.querySelector("#passFront")?.outerHTML).toBe(
        legacy.querySelector("#passFront")?.outerHTML,
      );
      expect(ios27.querySelector(".poster-front") !== null).toBe(variant === "poster");
      expect(tileIds(ios27)).toEqual(["vltava-balance", "vltava-support"]);
    },
  );
});
