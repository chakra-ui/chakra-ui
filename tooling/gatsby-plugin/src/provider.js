import * as React from "react"
import { ChakraProvider, ChakraBaseProvider } from "@chakra-ui/react"
import theme, { baseTheme } from "./theme"

export const WrapRootElement = ({
  element,
  isBaseProvider = false,
  resetCSS = true,
  portalZIndex,
}) => {
  const Provider = isBaseProvider ? ChakraBaseProvider : ChakraProvider

  const _theme = isBaseProvider ? baseTheme : theme
  return (
    <Provider theme={_theme} resetCSS={resetCSS} portalZIndex={portalZIndex}>
      {element}
    </Provider>
  )
}
