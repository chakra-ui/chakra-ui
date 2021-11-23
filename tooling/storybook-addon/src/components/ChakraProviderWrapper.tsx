import * as React from "react"
import { StoryContext, StoryFn } from "@storybook/addons"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeSwitch } from "./ColorModeSwitch"

export const ChakraProviderWrapper = (
  Story: StoryFn<JSX.Element>,
  context: StoryContext,
) => {
  const { chakra } = context.parameters
  return (
    <ChakraProvider {...chakra}>
      <ColorModeSwitch />
      <Story {...context} />
    </ChakraProvider>
  )
}
