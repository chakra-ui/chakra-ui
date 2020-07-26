import { ChakraProvider } from "@chakra-ui/core"
import CSSReset from "@chakra-ui/css-reset"
import theme from "@chakra-ui/theme"
import { addDecorator } from "@storybook/react"
import * as React from "react"
import { withPerformance } from "storybook-addon-performance"
import { withA11y } from "@storybook/addon-a11y"

const withChakra = (StoryFn: Function) => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <StoryFn />
  </ChakraProvider>
)

addDecorator(withChakra)
addDecorator(withPerformance)
addDecorator(withA11y)
