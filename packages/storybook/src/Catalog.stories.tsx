import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";

import { StoryLink } from "./StoryLink";
import {
  type CatalogFeature,
  type CatalogPassStyle,
  type CatalogSource,
  passStyleLabels,
  scenarioCatalog,
} from "./scenarioCatalog";

const unique = <T extends string>(values: readonly T[]) => [...new Set(values)].sort();

const Catalog = () => {
  const [passStyle, setPassStyle] = useState<"all" | CatalogPassStyle>("all");
  const [feature, setFeature] = useState<"all" | CatalogFeature>("all");
  const [source, setSource] = useState<"all" | CatalogSource>("all");
  const passStyles = unique(
    scenarioCatalog.flatMap((scenario) =>
      scenario.passStyles.map((style) => passStyleLabels[style]),
    ),
  );
  const features = unique(scenarioCatalog.flatMap((scenario) => scenario.features));
  const sources = unique(scenarioCatalog.map((scenario) => scenario.source));
  const filtered = useMemo(
    () =>
      scenarioCatalog.filter(
        (scenario) =>
          (passStyle === "all" ||
            scenario.passStyles.some((style) => passStyleLabels[style] === passStyle)) &&
          (feature === "all" || scenario.features.includes(feature)) &&
          (source === "all" || scenario.source === source),
      ),
    [feature, passStyle, source],
  );

  return (
    <main className="catalog-page">
      <header>
        <p className="guide-eyebrow">Scenario catalog</p>
        <h1>Find the closest Wallet case</h1>
        <p>
          Filter every public comparison by pass style, feature, or fixture source. Links select the
          exact permanent story ID inside Storybook.
        </p>
      </header>
      <div className="catalog-filters" aria-label="Catalog filters">
        <label>
          Pass style
          <select
            value={passStyle}
            onChange={(event) => setPassStyle(event.target.value as typeof passStyle)}
          >
            <option value="all">All pass styles</option>
            {passStyles.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Feature
          <select
            value={feature}
            onChange={(event) => setFeature(event.target.value as typeof feature)}
          >
            <option value="all">All features</option>
            {features.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Source
          <select
            value={source}
            onChange={(event) => setSource(event.target.value as typeof source)}
          >
            <option value="all">All sources</option>
            {sources.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="catalog-count" aria-live="polite">
        {filtered.length} of {scenarioCatalog.length} scenarios
      </p>
      <ul className="catalog-results">
        {filtered.map((scenario) => (
          <li key={scenario.id}>
            <div className="catalog-result-copy">
              <StoryLink storyId={scenario.id}>{scenario.title}</StoryLink>
              <span>{scenario.passStyles.map((style) => passStyleLabels[style]).join(" · ")}</span>
              <span>{scenario.source}</span>
              <small>{scenario.features.join(" · ")}</small>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

const meta: Meta = {
  title: "Start here/Catalog",
  id: "start-here-catalog",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Browse: StoryObj = {
  name: "Browse scenarios",
  render: () => <Catalog />,
};
