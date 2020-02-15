import * as React from "react";
import { storiesOf } from "@storybook/react";
import Code from "../Code";

const stories = storiesOf("Code", module);

stories.add("basic", () => (
  <Code variantColor="pink">import React from react</Code>
));
