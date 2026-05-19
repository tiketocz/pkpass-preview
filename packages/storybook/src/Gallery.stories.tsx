import type { Meta, StoryObj } from "@storybook/react";
import { PKPassPreview } from "@tiketo/pkpass-preview";

import { backFields1 } from "./fixtures/back-fields";
import { benesov } from "./fixtures/benesov";
import { boardingPass1 } from "./fixtures/boarding-pass-1";
import { boardingPass2 } from "./fixtures/boarding-pass-2";
import { boardingPass3 } from "./fixtures/boarding-pass-3";
import { code128_1 } from "./fixtures/code128-1";
import { code128_2 } from "./fixtures/code128-2";
import { code128_3 } from "./fixtures/code128-3";
import { code128_4 } from "./fixtures/code128-4";
import { code128_5 } from "./fixtures/code128-5";
import { coupon1 } from "./fixtures/coupon1";
import { eventTicket1 } from "./fixtures/event-ticket-1";
import { eventTicket2 } from "./fixtures/event-ticket-2";
import { eventTicket3 } from "./fixtures/event-ticket-3";
import { eventTicket4 } from "./fixtures/event-ticket-4";
import { eventTicket5 } from "./fixtures/event-ticket-5";
import { exampleGeneric } from "./fixtures/example-generic";
import { exampleStoreCard } from "./fixtures/example-store-card";
import { generic1 } from "./fixtures/generic1";
import { generic2 } from "./fixtures/generic2";
import { generic3 } from "./fixtures/generic3";
import { generic4 } from "./fixtures/generic4";
import { generic5 } from "./fixtures/generic5";
import { generic6 } from "./fixtures/generic6";
import { generic7 } from "./fixtures/generic7";
import { generic8 } from "./fixtures/generic8";
import { generic9 } from "./fixtures/generic9";
import { largeBarcode } from "./fixtures/large-barcode";
import { pdf417_1 } from "./fixtures/pdf417-1";
import { pdf417_2 } from "./fixtures/pdf417-2";
import { pdf417_3 } from "./fixtures/pdf417-3";
import { pdf417_4 } from "./fixtures/pdf417-4";
import { pga } from "./fixtures/pga";
import { pgaNational } from "./fixtures/pga-national";
import { sample2 } from "./fixtures/sample2";
import { storeCard1 } from "./fixtures/store-card-1";
import { storeCard2 } from "./fixtures/store-card-2";
import { storeCard3 } from "./fixtures/store-card-3";
import { storeCard4 } from "./fixtures/store-card-4";
import { storeCard5 } from "./fixtures/store-card-5";
import { storeCard6 } from "./fixtures/store-card-6";
import { storeCard7 } from "./fixtures/store-card-7";
import { storeCard8 } from "./fixtures/store-card-8";

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
  { label: "Event ticket 3", values: eventTicket3 },
  { label: "Event ticket 4", values: eventTicket4 },
  { label: "Event ticket 5", values: eventTicket5 },
  { label: "Membership ID card", values: sample2 },
  { label: "Resident benefit card", values: benesov },
  { label: "Tour-pro card", values: pga },
  { label: "Members card (long altText)", values: pgaNational },
  { label: "Generic 1", values: generic1 },
  { label: "Generic 2", values: generic2 },
  { label: "Generic 3", values: generic3 },
  { label: "Generic 4", values: generic4 },
  { label: "Generic 5", values: generic5 },
  { label: "Generic 6", values: generic6 },
  { label: "Generic 7", values: generic7 },
  { label: "Generic 8 (business card)", values: generic8 },
  { label: "Generic 9 (sales card)", values: generic9 },
  { label: "Store card 1", values: storeCard1 },
  { label: "Store card 2", values: storeCard2 },
  { label: "Store card 3", values: storeCard3 },
  { label: "Store card 4", values: storeCard4 },
  { label: "Store card 5", values: storeCard5 },
  { label: "Store card 6", values: storeCard6 },
  { label: "Store card 7", values: storeCard7 },
  { label: "Store card 8", values: storeCard8 },
  { label: "Coupon 1", values: coupon1 },
  { label: "Back fields demo", values: backFields1 },
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
