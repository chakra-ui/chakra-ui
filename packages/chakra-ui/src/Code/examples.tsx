/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Code } from ".";
import { ThemeProvider } from "../ThemeProvider";
import { CSSReset } from "../CSSReset";

const stories = storiesOf("Code", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.add("Default", () => <Code>import</Code>);
