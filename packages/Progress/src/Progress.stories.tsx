import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import { Progress } from "./Progress.line";
import { CircularProgress, CircularProgressLabel } from "./Progress.circular";

const stories = storiesOf("Progress", module);

stories.addDecorator(setup);

stories.add("basic usage", () => {
  return <Progress value={50} />;
});

stories.add("with theme color", () => {
  return <Progress color="pink" value={20} />;
});

stories.add("indeterminate", () => {
  return <Progress margin="20px" variantSize="xs" value={undefined} />;
});

stories.add("with stripe", () => {
  return <Progress color="green" hasStripe value={20} />;
});

stories.add("with sizes", () => {
  return (
    <div>
      <Progress color="green" variantSize="sm" value={20} />
      <br />
      <Progress color="green" variantSize="md" value={20} />
      <br />
      <Progress color="green" variantSize="lg" value={20} />
    </div>
  );
});

stories.add("with stripe animation", () => {
  return <Progress color="green" hasStripe isAnimated value={20} />;
});

//////////////////////////////////////////////////////////////////////////

const circleStories = storiesOf("CircularProgress", module);

circleStories.addDecorator(setup);

circleStories.add("default", () => (
  <CircularProgress size="120px" value={60}>
    <CircularProgressLabel>60%</CircularProgressLabel>
  </CircularProgress>
));

circleStories.add("indeterminate", () => (
  <CircularProgress trackColor="transparent" thickness={10} value={undefined} />
));
