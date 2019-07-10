import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider, useUIMode, UIModeProvider } from "../src/theme";
import CSSReset from "../src/CSSReset";
import { Checkbox, Box, Button } from "../src";

function loadStories() {
  require("../stories");
}

const AppProvider = ({ children }) => {
  const { mode, toggle } = useUIMode();
  return (
    <ThemeProvider>
      <CSSReset />
      {children}
      <Box position="fixed" bottom="24px" right="24px" zIndex={2}>
        <Button onClick={toggle} leftIcon={mode === "dark" ? "sun" : "moon"}>
          {mode === "dark" ? "Light" : "Dark"}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

addDecorator(story => (
  <UIModeProvider>
    <AppProvider>{story()}</AppProvider>
  </UIModeProvider>
));

configure(loadStories, module);
