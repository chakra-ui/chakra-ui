import React from "react"
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  GlobalStyle,
  PortalManager,
} from "@chakra-ui/core"
import theme from "./src/theme"

export const wrapRootElement = (
  { element },
  { isResettingCSS = true, isUsingColorMode = true },
) => {
  const ModeProvider = isUsingColorMode ? ColorModeProvider : React.Fragment
  return (
    <ThemeProvider theme={theme}>
      <ModeProvider>
        <GlobalStyle />
        {isResettingCSS && <CSSReset />}
        <PortalManager zIndex={40}>{element}</PortalManager>
      </ModeProvider>
    </ThemeProvider>
  )
}
