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
  { isResettingCSS = true, isUsingColorMode = true, portalZIndex = 40 },
) => {
  const ModeProvider = isUsingColorMode ? ColorModeProvider : React.Fragment
  return (
    <ThemeProvider theme={theme}>
      <ModeProvider>
        {isResettingCSS && <CSSReset />}
        <GlobalStyle />
        <PortalManager zIndex={portalZIndex}>{element}</PortalManager>
      </ModeProvider>
    </ThemeProvider>
  )
}
