import * as React from "react"
import { StoryContext, StoryFn } from "@storybook/addons"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { ColorModeSync } from "../color-mode/ColorModeSync"
import { useDirection } from "../direction/useDirection"
import { DIRECTION_TOOL_ID } from "../../constants"

export const ChakraProviderDecorator = (
  Story: StoryFn<any>,
  context: StoryContext,
) => {
  const {
    parameters: { chakra: chakraParams },
    globals: { [DIRECTION_TOOL_ID]: globalDirection },
  } = context
  const direction = useDirection(
    globalDirection ?? chakraParams.theme?.direction,
  )
  const themeWithDirectionOverride = React.useMemo(
    () => extendTheme({ direction }, chakraParams.theme),
    [chakraParams.theme, direction],
  )

  return (
    <ChakraProvider {...chakraParams} theme={themeWithDirectionOverride}>
      <ColorModeSync />
      <Story {...context} />
    </ChakraProvider>
  )
}
