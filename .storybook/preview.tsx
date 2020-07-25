import CSSReset from "@chakra-ui/css-reset"
import theme from "@chakra-ui/theme"
import { ChakraProvider } from "@chakra-ui/core"
import { addDecorator } from "@storybook/react"
import * as React from "react"
import { withPerformance } from "storybook-addon-performance"

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

addDecorator(withPerformance)
