import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { StoryFn, StoryContext } from "@storybook/addons"

export function withChakra(Story: StoryFn<JSX.Element>, context: StoryContext) {
  return (
    <ChakraProvider>
      <Story {...context} />
    </ChakraProvider>
  )
}
