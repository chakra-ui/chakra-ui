import React from "react";
import { configure, addDecorator } from "@storybook/react";
import theme from "../src/theme";
import CSSReset from "../src/CSSReset";
import ThemeProvider, { useUIMode } from "../src/ThemeProvider";
import { Checkbox, Absolute } from "../src";
import useDarkMode from "use-dark-mode";

function loadStories() {
  require("../stories");
}

const AppProvider = ({ children }) => {
  const { mode, toggle } = useUIMode();
  return (
    <ThemeProvider theme={theme}>
      <>
        <CSSReset />
        {children}
        <Absolute bottom="24px" right="24px">
          <Checkbox isChecked={mode === "dark"} onChange={toggle} />
        </Absolute>
      </>
    </ThemeProvider>
  );
};

addDecorator(story => <AppProvider theme={theme}>{story()}</AppProvider>);

configure(loadStories, module);
