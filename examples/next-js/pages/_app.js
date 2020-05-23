import * as React from "react"
import {
  ColorModeProvider,
  ThemeProvider,
  GlobalStyle,
} from "@chakra-ui/system"
import CSSReset from "@chakra-ui/css-reset"
import theme from "@chakra-ui/theme"

export default ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <ColorModeProvider>
      <CSSReset />
      <GlobalStyle />
      <Component {...pageProps} />
    </ColorModeProvider>
  </ThemeProvider>
)
