import CSSReset from "@chakra-ui/css-reset"
import theme from "@chakra-ui/theme"
import {
  ColorModeProvider,
  GlobalStyle,
  ThemeProvider,
} from "@chakra-ui/system"
import { addDecorator } from "@storybook/react"
import * as React from "react"

export const ChakraProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ColorModeProvider>
      <GlobalStyle />
      <CSSReset />
      {children}
    </ColorModeProvider>
  </ThemeProvider>
)

addDecorator((StoryFn: Function) => (
  <ChakraProvider>
    <StoryFn />
  </ChakraProvider>
))
