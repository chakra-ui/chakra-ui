import React from "react";
import { storiesOf } from "@storybook/react";
import { TabsExample } from "./Tabs";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";

const stories = storiesOf("Tabs", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.add("Default", () => <TabsExample />);
