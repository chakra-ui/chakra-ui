import React from "react";
import { configure, addDecorator } from "@storybook/react";
import theme from "../src/theme";
import CSSReset from "../src/CSSReset";
import ThemeProvider from "../src/ThemeProvider";

function loadStories() {
  require("../stories");
}

addDecorator(story => (
  <ThemeProvider theme={theme} mode="light">
    <>
      <CSSReset />
      {story()}
    </>
  </ThemeProvider>
));

configure(loadStories, module);
