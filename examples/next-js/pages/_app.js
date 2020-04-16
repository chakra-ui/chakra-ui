import React from "react"
import {
  ColorModeProvider,
  ThemeProvider,
  GlobalStyle,
} from "@chakra-ui/system"
import CSSReset from "@chakra-ui/css-reset"
import theme from "@chakra-ui/preset-base"

export default ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <ColorModeProvider value="light">
      <CSSReset />
      <GlobalStyle />
      <Component {...pageProps} />
    </ColorModeProvider>
  </ThemeProvider>
)
