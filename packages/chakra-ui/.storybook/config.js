import { addDecorator, configure } from "@storybook/react";
import React from "react";
import { Button, Fixed } from "../src";
import CSSReset from "../src/CSSReset";
import ColorModeProvider, { useColorMode } from "../src/ColorModeProvider";
import ThemeProvider from "../src/ThemeProvider";

// function loadStories() {
//   require("../stories");
// }

const req = require.context("../src", true, /examples\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const AppProvider = ({ children }) => {
  const { mode, toggle } = useColorMode();
  return (
    <ThemeProvider>
      <CSSReset />
      {children}
      <Fixed bottom="24px" right="24px" zIndex={2}>
        <Button
          variant="outline"
          onClick={toggle}
          leftIcon={mode === "dark" ? "sun" : "moon"}
        >
          {mode === "dark" ? "Light" : "Dark"}
        </Button>
      </Fixed>
    </ThemeProvider>
  );
};

addDecorator(story => (
  <ColorModeProvider>
    <AppProvider>{story()}</AppProvider>
  </ColorModeProvider>
));

configure(loadStories, module);
