import * as React from "react"
import { StoryContext, StoryFn } from "@storybook/addons"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { ColorModeSync } from "../color-mode/ColorModeSync"
import { useDirection } from "../direction/useDirection"

export const ChakraProviderDecorator = (
  Story: StoryFn<any>,
  context: StoryContext,
) => {
  const {
    parameters: { chakra: chakraParams },
  } = context
  const direction = useDirection(chakraParams.theme?.direction)
  const themeWithDirectionOverride = extendTheme(
    { direction },
    chakraParams.theme,
  )

  return (
    <ChakraProvider {...chakraParams} theme={themeWithDirectionOverride}>
      <ColorModeSync />
      <Story {...context} />
    </ChakraProvider>
  )
}
