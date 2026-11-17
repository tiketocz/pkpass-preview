import { navigate } from "@storybook/addon-links";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

type StoryLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  storyId: string;
};

export const StoryLink = ({ storyId, onClick, ...props }: StoryLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    navigate({ storyId });
  };

  return <a href={`./?path=/story/${storyId}`} onClick={handleClick} {...props} />;
};
