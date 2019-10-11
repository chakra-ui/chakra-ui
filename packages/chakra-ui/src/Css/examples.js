/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import css from ".";

const stories = storiesOf("CSS", module);
stories.add("Default", () => (
  <div
    css={css({
      bg: "red.200",
      w: 300,
      h: 400,
      rounded: "md",
      "&:hover": {
        rounded: "lg",
        textDecor: "underline",
        "& > *": { rounded: "md" },
      },
    })}
  />
));
