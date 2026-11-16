import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PKPassPreview, resolvePassPresentation } from "../src/index";
import type { PassData } from "../src/types";

const pass = (includePoster = true): PassData => ({
  description: "Vltava Club",
  formatVersion: 1,
  organizationName: "Tiketo Demo",
  generic: {
    primaryFields: [{ key: "member", value: "Anna Nováková" }],
  },
  ...(includePoster
    ? {
        posterGeneric: {
          primaryFields: [{ key: "title", value: "Vltava Club" }],
        },
      }
    : {}),
});

describe("resolvePassPresentation", () => {
  it("selects posterGeneric only when the poster variant is requested", () => {
    const data = pass();

    expect(resolvePassPresentation(data, "poster")).toMatchObject({
      editorClassName: "posterGeneric",
      structure: data.posterGeneric,
      isPoster: true,
    });
  });

  it("selects the classic generic structure for the fallback variant", () => {
    const data = pass();

    expect(resolvePassPresentation(data, "fallback")).toMatchObject({
      editorClassName: "generic",
      structure: data.generic,
      isPoster: false,
    });
  });

  it("preserves classic rendering when the variant is omitted", () => {
    const data = pass();

    expect(resolvePassPresentation(data)).toMatchObject({
      editorClassName: "generic",
      structure: data.generic,
      isPoster: false,
    });
  });

  it("falls back to the classic structure when posterGeneric is missing", () => {
    const data = pass(false);

    expect(resolvePassPresentation(data, "poster")).toMatchObject({
      editorClassName: "generic",
      structure: data.generic,
      isPoster: false,
    });
  });
});

describe("poster optional front field groups", () => {
  it("does not render empty header or footer containers when their fields are omitted", () => {
    const markup = renderToStaticMarkup(
      createElement(PKPassPreview, {
        values: { "pass.json": pass() },
        variant: "poster",
      }),
    );
    const rendered = new DOMParser().parseFromString(markup, "text/html");

    expect(rendered.querySelector(".poster-header-fields")).toBeNull();
    expect(rendered.querySelector(".poster-footer-fields")).toBeNull();
    expect(rendered.querySelector(".poster-title")?.textContent).toBe("Vltava Club");
  });

  it("renders all four poster primary fields in source order", () => {
    const data = pass();
    if (!data.posterGeneric) throw new Error("posterGeneric fixture is required");
    data.posterGeneric.primaryFields = [
      { key: "title", value: "Vltava Club" },
      { key: "member", label: "ČLENKA", value: "Anna" },
      { key: "level", label: "ÚROVEŇ", value: "Gold" },
      { key: "points", label: "BODY", value: "1 250" },
    ];

    const markup = renderToStaticMarkup(
      createElement(PKPassPreview, {
        values: { "pass.json": data },
        variant: "poster",
      }),
    );
    const rendered = new DOMParser().parseFromString(markup, "text/html");
    const fields = Array.from(rendered.querySelectorAll(".poster-primary-fields > *"));

    expect(fields).toHaveLength(4);
    expect(fields.map((field) => field.textContent)).toEqual([
      "Vltava Club",
      "ČLENKAAnna",
      "ÚROVEŇGold",
      "BODY1 250",
    ]);
  });
});
