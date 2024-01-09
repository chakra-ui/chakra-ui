/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"
import { ChakraBaseProvider } from "@chakra-ui/react/chakra-base-provider"
import { extendTheme } from "@chakra-ui/react/extend-theme"
import { makeDecorator } from "@storybook/preview-api"
import { ColorModeSync } from "./color-mode-sync"
import { DIRECTION_TOOL_ID } from "./constants"
import { useDirection } from "./use-direction"

export const Provider = makeDecorator({
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
