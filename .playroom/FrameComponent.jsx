import CSSReset from "@chakra-ui/css-reset"
import theme from "@chakra-ui/theme"
import {
  ColorModeProvider,
  GlobalStyle,
  ThemeProvider,
} from "@chakra-ui/system"
import * as React from "react"

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <ColorModeProvider>
      <GlobalStyle />
      <CSSReset />
      {children}
    </ColorModeProvider>
  </ThemeProvider>
)
