import type { Meta, StoryObj } from "@storybook/react";
import { PKPassPreview, type PreviewTargetOs, type PreviewVariant } from "@tiketo/pkpass-preview";
import type { ReactNode } from "react";

import { StoryLink } from "./StoryLink";
import { exampleStoreCard } from "./fixtures/example-store-card";

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
    <p>
      The full prop reference and source-snippet corrections are scheduled for the documentation
      phase. For a working first render, open the{" "}
      <StoryLink storyId="start-here-welcome--quick-start">quick start</StoryLink>.
    </p>
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
        <StoryLink storyId="back-fields--back-fields-1">Back fields</StoryLink> — current
        back-fields fixture (true back-side VRT comes later).
      </li>
    </ul>
    <p>The permalink guard protects 78 baseline entries and the 62-story VRT selection.</p>
  </GuidePage>
);

type PlaygroundArgs = {
  variant: PreviewVariant;
  targetOs: PreviewTargetOs;
};

const meta: Meta<PlaygroundArgs> = {
  title: "Developer guide",
  id: "developer-guide",
  argTypes: {
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
};

export const Playground: Story = {
  name: "Playground",
  args: { variant: "fallback", targetOs: "ios27" },
  render: (args) => (
    <PKPassPreview values={exampleStoreCard} variant={args.variant} targetOs={args.targetOs} />
  ),
};

export const Qa: Story = {
  name: "QA matrix",
  render: () => <QaMatrix />,
};
