/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import CircularProgress, { CircularProgressLabel } from "../CircularProgress";

const stories = storiesOf("Circular progress", module);

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
