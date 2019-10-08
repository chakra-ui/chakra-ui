import React from "react";
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import theme from "./src/theme";

export const wrapRootElement = (
  { element },
  { isResettingCSS = true, isUsingColorMode = true },
) =>
  console.log(isResettingCSS, isUsingColorMode) || (
    <ThemeProvider theme={theme}>
      {isResettingCSS && <CSSReset />}
      {isUsingColorMode ? (
        <ColorModeProvider>{element}</ColorModeProvider>
      ) : (
        element
      )}
    </ThemeProvider>
  );
