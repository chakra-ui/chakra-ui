import CSSReset from "@chakra-ui/css-reset/src"
import theme from "@chakra-ui/theme/src"
import { ChakraProvider } from "@chakra-ui/core/src"
import { addDecorator } from "@storybook/react"
import * as React from "react"

export const Chakra: React.FC = ({ children }) => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    {children}
  </ChakraProvider>
)

addDecorator((StoryFn: Function) => (
  <Chakra>
    <StoryFn />
  </Chakra>
))
