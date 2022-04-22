import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import {
  StoryContext,
  StoryFn,
  useChannel,
  useEffect,
  useState,
} from "@storybook/addons"
import * as React from "react"
import { EVENTS } from "../constants"
import { getPersistedState } from "./use-addon-state"

export function ChakraProviderWrapper(
  Story: StoryFn<JSX.Element>,
  context: StoryContext,
) {
  const { chakra = {} } = context.parameters
  chakra.theme ??= {}

  const PERSISTED = getPersistedState()
  const [direction, setDirection] = useState(PERSISTED.direction)
  const [colorMode, setColorMode] = useState(PERSISTED.colorMode)

  useEffect(() => {
    const css = document.createElement("style")
    css.innerHTML = `* { transition: none !important; }`
    document.head.appendChild(css)
    setTimeout(() => {
      css.remove()
    }, 0)
  }, [])

  useChannel({
    [EVENTS.TOGGLE_DIRECTION]: (value: "ltr" | "rtl") => {
      setDirection(value)
    },
    [EVENTS.TOGGLE_COLOR_MODE]: (value: "light" | "dark") => {
      setColorMode(value)
    },
  })

  const theme = extendTheme({
    ...chakra.theme,
    direction,
    config: {
      initialColorMode: colorMode,
      useSystemColorMode: false,
    },
  })

  return (
    <ChakraProvider key={colorMode} {...chakra} theme={theme}>
      <Story {...context} />
    </ChakraProvider>
  )
}
