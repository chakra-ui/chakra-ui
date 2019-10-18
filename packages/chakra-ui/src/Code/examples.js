/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Code from "../Code";

const stories = storiesOf("Code", module);
stories.add("Default", () => <Code>import</Code>);
