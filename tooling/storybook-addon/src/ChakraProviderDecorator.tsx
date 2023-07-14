import { useMemo } from "react"
import type { DecoratorFunction, Renderer } from "@storybook/types"
import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react"
import { ColorModeSync } from "./color-mode/ColorModeSync"
import { useDirection } from "./direction/useDirection"
import { DIRECTION_TOOL_ID } from "./constants"

export const ChakraProviderDecorator: DecoratorFunction<Renderer> = (
  getStory,
  context,
) => {
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
      {getStory(context)}
    </ChakraProvider>
  )
}
