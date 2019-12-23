/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Code } from ".";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";

const stories = storiesOf("Code", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.add("Default", () => <Code>import</Code>);
