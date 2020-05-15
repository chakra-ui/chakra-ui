import React from "react"
import { MDXProvider } from "@mdx-js/react"
import theme from "@chakra-ui/preset-base"
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  GlobalStyle,
} from "@chakra-ui/core"
import MDXComponents from "./components/docs/MDXComponents"

const Root = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ColorModeProvider>
      <CSSReset />
      <GlobalStyle />
      <MDXProvider components={MDXComponents}>{children}</MDXProvider>
    </ColorModeProvider>
  </ThemeProvider>
)

export const wrapRootElement = ({ element }) => {
  return <Root>{element}</Root>
}
