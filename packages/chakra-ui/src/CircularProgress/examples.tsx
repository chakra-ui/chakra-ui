/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { CircularProgressLabel, CircularProgress } from ".";
import { ThemeProvider } from "../ThemeProvider";
import { CSSReset } from "../CSSReset";

const stories = storiesOf("Circular progress", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.add("Default", () => (
  <CircularProgress value={60}>
    <CircularProgressLabel>60%</CircularProgressLabel>
  </CircularProgress>
));

stories.add("indeterminate", () => (
  <div>
    <CircularProgress value={60} isIndeterminate></CircularProgress>
  </div>
));
