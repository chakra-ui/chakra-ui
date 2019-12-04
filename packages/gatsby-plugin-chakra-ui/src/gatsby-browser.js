import React from "react";
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import theme from "./theme";

export const wrapRootElement = (
  { element },
  { isResettingCSS = true, isUsingColorMode = true },
) => (
  <ThemeProvider theme={theme}>
    {isResettingCSS && !isUsingColorMode && <CSSReset />}
    {isUsingColorMode ? (
      <ColorModeProvider>
        {isResettingCSS && <CSSReset />}
        {element}
      </ColorModeProvider>
    ) : (
      element
    )}
  </ThemeProvider>
);
