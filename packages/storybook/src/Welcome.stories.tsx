import type { Meta, StoryObj } from "@storybook/react";
import { PKPassPreview } from "@tiketo/pkpass-preview";

import WelcomePage from "./Welcome.page.mdx";
import { exampleStoreCard } from "./fixtures/example-store-card";

const QuickStartPage = () => (
  <main className="guide-page quick-start-page">
    <div>
      <p className="guide-eyebrow">Quick start</p>
      <h1>Render pass data directly in React</h1>
      <p>
        Install the package, import <code>PKPassPreview</code>, and pass the same image map and
        <code>pass.json</code> payload your signing pipeline uses.
      </p>
      <pre>
        <code>{`import { PKPassPreview } from "@tiketo/pkpass-preview";

const pass = {
  "pass.json": {
    formatVersion: 1,
    organizationName: "Example Coffee",
    description: "Loyalty card",
    storeCard: {
      primaryFields: [{ key: "points", label: "POINTS", value: "420" }],
    },
  },
};

<PKPassPreview values={pass} />`}</code>
      </pre>
    </div>
    <div className="quick-start-preview">
      <PKPassPreview values={exampleStoreCard} />
    </div>
  </main>
);

const meta: Meta = {
  title: "Start here/Welcome",
  id: "welcome",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { page: WelcomePage },
    controls: { disable: true },
    options: { showPanel: false },
  },
};
export default meta;

export const QuickStart: StoryObj = {
  name: "Quick start",
  render: () => <QuickStartPage />,
  parameters: { __id: "start-here-welcome--quick-start" },
};
