import React from "react"
import { StoryContext, StoryFn } from "@storybook/addons"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeSetter } from "./ColorModeSetter"

export const ChakraProviderWrapper = (
  Story: StoryFn<JSX.Element>,
  context: StoryContext,
) => {
  const { chakra } = context.parameters

  return (
    <ChakraProvider {...chakra}>
      <ColorModeSetter />
      <Story {...context} />
    </ChakraProvider>
  )
}
