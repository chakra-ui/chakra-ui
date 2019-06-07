import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider } from "emotion-theming";
import theme from "../src/theme";
import CSSReset from "../src/CSSReset";

function loadStories() {
  require("../stories");
}

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <CSSReset />
      {story()}
    </React.Fragment>
  </ThemeProvider>
));

configure(loadStories, module);
