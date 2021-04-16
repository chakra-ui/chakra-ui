import * as React from "react"
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  GlobalStyle,
  PortalManager,
  extendTheme,
} from "@chakra-ui/react"
import userTheme from "./theme"

const theme = extendTheme(userTheme)

export const WrapRootElement = ({
  element,
  isResettingCSS,
  isUsingColorMode,
  portalZIndex,
}) => {
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
