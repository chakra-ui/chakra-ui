import * as React from "react";
import { storiesOf } from "@storybook/react";
import Code from "./Code";
import setup from "../story.setup";

const stories = storiesOf("Code", module);

stories.addDecorator(setup);

stories.add("Default", () => (
  <Code variantColor="pink">import React from react</Code>
));
