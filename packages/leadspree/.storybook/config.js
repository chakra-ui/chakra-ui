import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { UIModeProvider, ThemeProvider, theme, CSSReset } from "@chakra/ui";

function loadStories() {
  require("../stories");
}

addDecorator(story => (
  <UIModeProvider value="light">
    <ThemeProvider theme={theme}>
      <CSSReset />
      {story()}
    </ThemeProvider>
  </UIModeProvider>
));

configure(loadStories, module);
