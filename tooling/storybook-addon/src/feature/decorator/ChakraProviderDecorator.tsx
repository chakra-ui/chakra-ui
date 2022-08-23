import { useMemo } from "react"
import { DecoratorFunction } from "@storybook/addons"
import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react"
import { ColorModeSync } from "../color-mode/ColorModeSync"
import { useDirection } from "../direction/useDirection"
import { DIRECTION_TOOL_ID } from "../../constants"

export const ChakraProviderDecorator: DecoratorFunction = (story, context) => {
  const {
    parameters: { chakra: chakraParams },
    globals: { [DIRECTION_TOOL_ID]: globalDirection },
  } = context
  const chakraTheme = chakraParams?.theme || theme
  const direction = useDirection(globalDirection || chakraTheme?.direction)
  const themeWithDirectionOverride = useMemo(
    () => extendTheme({ direction }, chakraTheme),
    [chakraTheme, direction],
  )

  return (
    <ChakraProvider {...chakraParams} theme={themeWithDirectionOverride}>
      <ColorModeSync />
      {story()}
    </ChakraProvider>
  )
}
