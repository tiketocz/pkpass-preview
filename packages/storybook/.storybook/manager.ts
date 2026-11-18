import { DOCS_RENDERED, STORY_CHANGED, STORY_RENDERED } from "storybook/internal/core-events";
import { addons } from "storybook/internal/manager-api";
import { create } from "storybook/internal/theming";

const tiketoTheme = create({
  base: "light",

  brandTitle: "@tiketo/pkpass-preview",
  brandUrl: "https://github.com/tiketocz/pkpass-preview",
  brandImage: "brand/tiketo-wordmark.png",
  brandTarget: "_blank",

  colorPrimary: "#0066FF",
  colorSecondary: "#0B0B45",

  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#e5e7eb",
  appBorderRadius: 8,

  textColor: "#0B0B45",
  textInverseColor: "#ffffff",
  textMutedColor: "#64748b",

  barTextColor: "#475569",
  barSelectedColor: "#0066FF",
  barBg: "#ffffff",
  barHoverColor: "#0066FF",

  inputBg: "#ffffff",
  inputBorder: "#e2e8f0",
  inputTextColor: "#0B0B45",
  inputBorderRadius: 6,

  fontBase:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
});

addons.setConfig({
  theme: tiketoTheme,
  sidebar: { showRoots: true },
});

// Story-level `options.showPanel` is not applied dynamically by Storybook 8's
// manager. Mirror it on navigation so content pages can use the full canvas,
// while Playground and comparison stories still open their useful controls.
addons.register("pkpass-preview/content-panel", (api) => {
  const syncPanel = (storyId: string) => {
    const options = api.getParameters(storyId, "options") as { showPanel?: boolean } | undefined;
    api.togglePanel(options?.showPanel !== false);
  };
  api.on(STORY_CHANGED, syncPanel);
  api.on(STORY_RENDERED, syncPanel);
  api.on(DOCS_RENDERED, syncPanel);
});
