import { addDecorator, configure } from "@storybook/react";
import React from "react";
import { Button, Fixed } from "../src";
import CSSReset from "../src/CSSReset";
import ThemeProvider, { UIModeProvider, useUIMode } from "../src/ThemeProvider";

// function loadStories() {
//   require("../stories");
// }

const req = require.context("../src", true, /examples\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const AppProvider = ({ children }) => {
  const { mode, toggle } = useUIMode();
  return (
    <ThemeProvider>
      <CSSReset />
      {children}
      <Fixed bottom="24px" right="24px" zIndex={2}>
        <Button
          variant="ghost"
          color="red"
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
  <UIModeProvider>
    <AppProvider>{story()}</AppProvider>
  </UIModeProvider>
));

configure(loadStories, module);
