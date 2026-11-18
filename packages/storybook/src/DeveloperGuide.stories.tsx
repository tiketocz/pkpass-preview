import type { Meta, StoryObj } from "@storybook/react";
import type { PreviewTargetOs, PreviewVariant } from "@tiketo/pkpass-preview";
import type { ReactNode } from "react";

import { WebWalletDetail } from "./Comparison";
import { StoryLink } from "./StoryLink";
import { vltavaClub } from "./fixtures/vltava-club";
import { vltavaFeaturedGeneric } from "./fixtures/vltava-featured-actions";

const GuidePage = ({ children }: { children: ReactNode }) => (
  <main className="guide-page">{children}</main>
);

const ApiPage = () => (
  <GuidePage>
    <p className="guide-eyebrow">Developer guide</p>
    <h1>API</h1>
    <p>
      The public React entry point is <code>PKPassPreview</code>. Its required <code>values</code>
      prop accepts the pass payload plus image files; layout and OS capability overrides are
      optional.
    </p>
    <pre>
      <code>{`<PKPassPreview
  values={pass}
  variant="fallback"
  targetOs="ios27"
  removeVariablePlaceholders
/>`}</code>
    </pre>
    <table className="api-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type / default</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>values</code>
          </td>
          <td>
            <code>{"Record<string, unknown>"}</code> · required
          </td>
          <td>
            A <code>pass.json</code> value plus optional image entries. Image values are base64,
            data/blob URLs, absolute paths, or HTTP(S) URLs.
          </td>
        </tr>
        <tr>
          <td>
            <code>removeVariablePlaceholders</code>
          </td>
          <td>
            <code>boolean</code> · <code>false</code>
          </td>
          <td>
            Removes <code>{"${…}"}</code> placeholders from a cloned <code>pass.json</code> before
            rendering. The supplied values object is not mutated.
          </td>
        </tr>
        <tr>
          <td>
            <code>variant</code>
          </td>
          <td>
            <code>"poster" | "fallback"</code> · omitted
          </td>
          <td>
            Chooses the experimental <code>posterGeneric</code> layout or the pass's classic
            structure. Omission preserves classic rendering.
          </td>
        </tr>
        <tr>
          <td>
            <code>targetOs</code>
          </td>
          <td>
            <code>"ios26" | "ios27"</code> · omitted
          </td>
          <td>
            Enables OS-gated behavior. Only <code>"ios27"</code> renders valid top-level Featured
            Actions; omission and <code>"ios26"</code> do not.
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Start with the runnable{" "}
      <StoryLink storyId="start-here-welcome--quick-start">quick start</StoryLink>, then use{" "}
      <StoryLink storyId="developer-guide--playground">Playground</StoryLink> to inspect variant and
      target-OS combinations.
    </p>
  </GuidePage>
);

const ISSUES_URL = "https://github.com/tiketocz/pkpass-preview/issues";

const IssueLink = ({ number }: { number: number }) => (
  <a href={`${ISSUES_URL}/${number}`} target="_blank" rel="noreferrer">
    #{number}
  </a>
);

const KnownDeviationsPage = () => (
  <GuidePage>
    <p className="guide-eyebrow">Developer guide</p>
    <h1>Known deviations from Apple Wallet</h1>
    <p>
      The web renderer is a design-time approximation. These are the documented gaps and
      compatibility boundaries behind the native references in this Storybook.
    </p>
    <div className="deviation-list">
      <section>
        <h2>One Featured Action</h2>
        <p>
          <strong>Difference:</strong> every action type other than <code>addToBalance</code> /{" "}
          <code>call</code> renders as the unverified “Open” tile, including valid Apple types such
          as <code>place</code> or <code>viewSchedule</code>.
        </p>
        <p>
          <strong>Reference:</strong> iOS 27.0 build 24A434, iPhone 17 Pro Simulator, Generic and
          Event Ticket passes. <strong>Status:</strong> open. Grey chevron:{" "}
          <IssueLink number={31} /> (fixed in 0.2.3). Action types and unknown-type fallback:{" "}
          <IssueLink number={34} /> (needs Wallet references).
        </p>
      </section>
      <section>
        <h2>Back fields / Pass Details</h2>
        <p>
          <strong>Difference:</strong> the public component flips to an in-card back-field view.
          Native Wallet uses a full Pass Details screen with a card thumbnail, description, Remove
          Pass control, and grouped light fields. Storybook does not fake those controls.
        </p>
        <p>
          <strong>Reference:</strong> fixture <code>backFields1</code>, iOS 27.0 build 24A434,
          iPhone 17 Pro Simulator. <strong>Status:</strong> open, <IssueLink number={32} /> (iOS 27
          Pass Details view for <code>targetOs="ios27"</code>; the in-card flip stays for older
          targets). Compare the{" "}
          <StoryLink storyId="back-fields--ios-27-pass-details">Pass Details story</StoryLink>.
        </p>
      </section>
      <section>
        <h2>Poster Generic</h2>
        <p>
          <strong>Difference:</strong> browser font metrics, exact ellipsis points, artwork/QR
          raster scaling, and in dense cases the bottom-band shade can differ from Wallet.
        </p>
        <p>
          <strong>Reference:</strong> Vltava Club iOS 27.0, iPhone 17 Pro Simulator.{" "}
          <strong>Status:</strong> open, <IssueLink number={33} />: all five native crops are 1110 ×
          1509 (435 px tall at 320 px width) while the web card is 320 × 420; aspect ratio first,
          then fonts/truncation. Field order, row structure, and clamps are covered by focused
          stories.
        </p>
      </section>
      <section>
        <h2>Older iOS and reference provenance</h2>
        <p>
          <strong>Boundary:</strong> Wallet iOS 26.5 ignores Featured Actions and shows Vltava's
          classic Generic fallback rather than Poster Generic. The web preview requires the matching{" "}
          <code>targetOs="ios26"</code> / <code>variant="fallback"</code> configuration.
        </p>
        <p>
          <strong>Reference:</strong> iOS 26.5, iPhone 17 Pro Simulator, original add-pass preview.
          <strong> Status:</strong> behavior aligned in the recorded cases. Other unversioned legacy
          references remain labelled “origin not recorded”; no OS/device is inferred.
        </p>
      </section>
    </div>
  </GuidePage>
);

const QaMatrix = () => (
  <GuidePage>
    <p className="guide-eyebrow">Developer guide</p>
    <h1>QA matrix</h1>
    <p>Use these permanent entries for targeted visual and compatibility review.</p>
    <ul className="guide-links">
      <li>
        <StoryLink storyId="gallery--all-cards-story">Gallery stress test</StoryLink> — 43
        simultaneous preview instances.
      </li>
      <li>
        <StoryLink storyId="examples-vltava-club--both-variants">Vltava Club comparison</StoryLink>{" "}
        — iOS 26.5 fallback and iOS 27 poster.
      </li>
      <li>
        <StoryLink storyId="examples-featured-actions-ios-27--generic-two-actions">
          Featured Actions
        </StoryLink>{" "}
        — card plus iOS 27 action tiles.
      </li>
      <li>
        <StoryLink storyId="back-fields--back-fields-1">Back fields front</StoryLink> and{" "}
        <StoryLink storyId="back-fields--ios-27-pass-details">Pass Details</StoryLink> — the same
        fixture's two native views.
      </li>
    </ul>
    <p>The permalink guard protects 78 baseline entries and the 62-story VRT selection.</p>
  </GuidePage>
);

type PlaygroundArgs = {
  fixture: "vltava-club" | "vltava-featured-generic";
  variant: PreviewVariant;
  targetOs: PreviewTargetOs;
};

const meta: Meta<PlaygroundArgs> = {
  title: "Developer guide",
  id: "developer-guide",
  argTypes: {
    fixture: {
      control: "select",
      options: ["vltava-club", "vltava-featured-generic"],
      labels: {
        "vltava-club": "Vltava Club (Generic + Poster Generic)",
        "vltava-featured-generic": "Vltava Featured Actions (2 actions)",
      },
    },
    variant: { control: "inline-radio", options: ["fallback", "poster"] },
    targetOs: { control: "inline-radio", options: ["ios26", "ios27"] },
  },
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Api: Story = {
  name: "API",
  render: () => <ApiPage />,
  parameters: {
    controls: { disable: true },
    options: { showPanel: false },
  },
};

export const KnownDeviations: Story = {
  name: "Known deviations",
  render: () => <KnownDeviationsPage />,
  parameters: {
    controls: { disable: true },
    options: { showPanel: false },
  },
};

export const Playground: Story = {
  name: "Playground",
  args: { fixture: "vltava-club", variant: "poster", targetOs: "ios27" },
  render: ({ fixture, variant, targetOs }) => {
    const values = fixture === "vltava-club" ? vltavaClub : vltavaFeaturedGeneric(2);
    return (
      <WebWalletDetail values={values} fixtureKey={fixture} variant={variant} targetOs={targetOs} />
    );
  },
};

export const Qa: Story = {
  name: "QA matrix",
  render: () => <QaMatrix />,
  parameters: {
    controls: { disable: true },
    options: { showPanel: false },
  },
};
