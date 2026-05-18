import type { Meta, StoryObj } from "@storybook/react";
import { PKPassPreview } from "@tiketo/pkpass-preview";

import { boardingPass1 } from "./fixtures/boarding-pass-1";
import { boardingPass2 } from "./fixtures/boarding-pass-2";
import { boardingPass3 } from "./fixtures/boarding-pass-3";
import { code128_1 } from "./fixtures/code128-1";
import { code128_2 } from "./fixtures/code128-2";
import { code128_3 } from "./fixtures/code128-3";
import { code128_4 } from "./fixtures/code128-4";
import { code128_5 } from "./fixtures/code128-5";
import { eventTicket1 } from "./fixtures/event-ticket-1";
import { eventTicket2 } from "./fixtures/event-ticket-2";
import { exampleGeneric } from "./fixtures/example-generic";
import { exampleStoreCard } from "./fixtures/example-store-card";
import { largeBarcode } from "./fixtures/large-barcode";
import { pdf417_1 } from "./fixtures/pdf417-1";
import { pdf417_2 } from "./fixtures/pdf417-2";
import { pdf417_3 } from "./fixtures/pdf417-3";
import { pdf417_4 } from "./fixtures/pdf417-4";

type Fixture = { label: string; values: Record<string, unknown> };

const fixtures: Fixture[] = [
  { label: "Examples / Generic", values: exampleGeneric },
  { label: "Examples / Store Card", values: exampleStoreCard },
  { label: "Boarding pass 1", values: boardingPass1 },
  { label: "Boarding pass 2", values: boardingPass2 },
  { label: "Boarding pass 3", values: boardingPass3 },
  { label: "Code128 1", values: code128_1 },
  { label: "Code128 2", values: code128_2 },
  { label: "Code128 3", values: code128_3 },
  { label: "Code128 4", values: code128_4 },
  { label: "Code128 5", values: code128_5 },
  { label: "PDF417 1", values: pdf417_1 },
  { label: "PDF417 2", values: pdf417_2 },
  { label: "PDF417 3", values: pdf417_3 },
  { label: "PDF417 4", values: pdf417_4 },
  { label: "Large barcode", values: largeBarcode },
  { label: "Event ticket 1", values: eventTicket1 },
  { label: "Event ticket 2", values: eventTicket2 },
];

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: 32,
    padding: 24,
    background: "#fff",
  } as const,
  cell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  } as const,
  label: {
    fontSize: 12,
    color: "#666",
    fontWeight: 500,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  } as const,
};

// All fixtures rendered side by side. PKPassPreview generates a unique
// #identifier_<random> per instance and scopes its <style> tags to that
// id; rendering many instances on the same page catches any leaked /
// unscoped CSS rule that would otherwise only surface when two cards
// land on one screen in a downstream consumer.
const AllCards = () => (
  <div style={styles.grid}>
    {fixtures.map((f) => (
      <div key={f.label} style={styles.cell}>
        <div style={styles.label}>{f.label}</div>
        <PKPassPreview values={f.values} />
      </div>
    ))}
  </div>
);

const meta: Meta = {
  title: "Gallery",
  render: () => <AllCards />,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const AllCardsStory: StoryObj = {
  name: "All cards",
};
