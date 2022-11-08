import { useMemo } from "react"
import { StoryContext, StoryFn } from "@storybook/addons"
import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react"
import { ColorModeSync } from "../color-mode/ColorModeSync"
import { useDirection } from "../direction/useDirection"
import { DIRECTION_TOOL_ID } from "../../constants"

export function ChakraProviderDecorator(
  Story: StoryFn<any>,
  context: StoryContext,
) {
  const {
    parameters: { chakra: chakraParams },
    globals: { [DIRECTION_TOOL_ID]: globalDirection },
  } = context
  const chakraTheme = chakraParams?.theme
    ? typeof chakraParams.theme === "function"
      ? chakraParams.theme(context)
      : chakraParams.theme
    : theme
  const direction = useDirection(globalDirection || chakraTheme?.direction)
  const themeWithDirectionOverride = useMemo(
    () => extendTheme({ direction }, chakraTheme),
    [chakraTheme, direction],
  )

  return (
    <ChakraProvider {...chakraParams} theme={themeWithDirectionOverride}>
      <ColorModeSync />
      <Story {...context} />
    </ChakraProvider>
  )
}
