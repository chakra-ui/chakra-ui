import React from "react"
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  GlobalStyle,
  PortalManager,
} from "@chakra-ui/react"
import theme from "./src/theme"

export const wrapRootElement = (
  { element },
  { isResettingCSS = true, isUsingColorMode = true, portalZIndex = 40 },
) => {
  const content = (
    <>
      {isResettingCSS && <CSSReset />}
      <GlobalStyle />
      <PortalManager zIndex={portalZIndex}>{element}</PortalManager>
    </>
  )
  return (
    <ThemeProvider theme={theme}>
      {isUsingColorMode ? (
        <ColorModeProvider options={theme.config}>{content}</ColorModeProvider>
      ) : (
        content
      )}
    </ThemeProvider>
  )
}
