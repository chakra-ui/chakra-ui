import CSSReset from "@chakra-ui/css-reset"
import theme from "@chakra-ui/preset-base"
import {
  ColorModeProvider,
  GlobalStyle,
  ThemeProvider,
} from "@chakra-ui/system"
import { addDecorator } from "@storybook/react"
import * as React from "react"

addDecorator((storyFn: any) => (
  <ThemeProvider theme={theme}>
    <ColorModeProvider>
      <GlobalStyle />
      <CSSReset />
      {storyFn()}
    </ColorModeProvider>
  </ThemeProvider>
))
