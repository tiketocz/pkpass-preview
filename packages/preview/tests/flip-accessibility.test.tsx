import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";

import { PKPassPreview } from "../src/index";

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const values = {
  "pass.json": {
    backgroundColor: "rgb(10, 60, 110)",
    foregroundColor: "rgb(255, 255, 255)",
    labelColor: "rgb(220, 230, 240)",
    logoText: "Accessible pass",
    storeCard: {
      backFields: [{ key: "terms", label: "Terms", value: "Example details" }],
    },
  },
};

let container: HTMLDivElement | undefined;

afterEach(() => {
  container?.remove();
  container = undefined;
});

describe("PKPassPreview flip controls", () => {
  it("exposes named buttons and keeps only the visible face interactive", async () => {
    container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    await act(async () => root.render(<PKPassPreview values={values} />));

    const front = container.querySelector<HTMLElement>("#passFront");
    const back = container.querySelector<HTMLElement>("#passBack");
    const info = container.querySelector<HTMLButtonElement>(
      'button[aria-label="Show pass details"]',
    );
    const done = [...container.querySelectorAll<HTMLButtonElement>("button")].find(
      (button) => button.textContent === "Done",
    );

    expect(info?.type).toBe("button");
    expect(done?.type).toBe("button");
    expect(front?.hasAttribute("inert")).toBe(false);
    expect(back?.hasAttribute("inert")).toBe(true);
    expect(back?.getAttribute("aria-hidden")).toBe("true");
    expect(info?.hasAttribute("tabindex")).toBe(false);
    expect(done?.getAttribute("tabindex")).toBe("-1");

    await act(async () => info?.click());

    expect(container.querySelector("#passCard")?.classList.contains("flipped")).toBe(true);
    expect(front?.hasAttribute("inert")).toBe(true);
    expect(front?.getAttribute("aria-hidden")).toBe("true");
    expect(back?.hasAttribute("inert")).toBe(false);
    expect(back?.hasAttribute("aria-hidden")).toBe(false);
    expect(info?.getAttribute("tabindex")).toBe("-1");
    expect(done?.hasAttribute("tabindex")).toBe(false);
    expect(document.activeElement).toBe(done);

    await act(async () => done?.click());

    expect(container.querySelector("#passCard")?.classList.contains("flipped")).toBe(false);
    expect(front?.hasAttribute("inert")).toBe(false);
    expect(back?.hasAttribute("inert")).toBe(true);
    expect(document.activeElement).toBe(info);

    await act(async () => root.unmount());
  });
});
