import React from "react"
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  GlobalStyle,
} from "@chakra-ui/core"
import theme from "./src/theme"

export const wrapRootElement = (
  { element },
  { isResettingCSS = true, isUsingColorMode = true },
) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
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
)
