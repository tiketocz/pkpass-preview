import { Controls, Description, Primary, Stories, Subtitle, Title, useOf } from "@storybook/blocks";

import { StoryLink } from "./StoryLink";

/** The standard autodocs page with one shared note for the public source examples. */
export const SharedDocsPage = () => {
  const { csfFile } = useOf("meta", ["meta"]);
  const isSingleStory = Object.keys(csfFile.stories).length === 1;

  return (
    <>
      <Title />
      <Subtitle />
      <Description of="meta" />
      {isSingleStory ? <Description of="story" /> : null}
      <Primary />
      <Controls />
      <p className="sbdocs sbdocs-p">
        <code>passFiles</code> comes from the files in an unzipped <code>.pkpass</code> or your
        signing output, keyed by filename (for example <code>pass.json</code> and{" "}
        <code>icon.png</code>
        ). See the <StoryLink storyId="start-here-welcome--quick-start">Quick start</StoryLink> for
        a complete runnable example.
      </p>
      {isSingleStory ? null : <Stories />}
    </>
  );
};
