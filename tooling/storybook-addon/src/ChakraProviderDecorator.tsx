import * as React from "react"

import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react"
import { makeDecorator } from "@storybook/preview-api"
import { ColorModeSync } from "./color-mode/ColorModeSync"
import { useDirection } from "./direction/useDirection"
import { DIRECTION_TOOL_ID } from "./constants"

export const ChakraProviderDecorator = makeDecorator({
  name: "ChakraProviderDecorator",
  parameterName: "chakra",
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const chakraTheme: Record<string, any> | undefined = parameters?.theme

    const direction = useDirection(
      context.globals[DIRECTION_TOOL_ID] || chakraTheme?.direction,
    )

    const themeWithDirectionOverride = React.useMemo(() => {
      return chakraTheme
        ? extendTheme({ direction }, chakraTheme)
        : extendTheme({ direction })
    }, [chakraTheme, direction])

    return (
      <ChakraBaseProvider {...parameters} theme={themeWithDirectionOverride}>
        <ColorModeSync />
        <>{getStory(context)}</>
      </ChakraBaseProvider>
    )
  },
})
