import React from "react";
import { storiesOf } from "@storybook/react";
import { TabsExample, TabsExample2 } from "./Tabs";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";

const stories = storiesOf("Tabs", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.add("Default", () => <TabsExample />);
stories.add("Example 2", () => <TabsExample2 />);
