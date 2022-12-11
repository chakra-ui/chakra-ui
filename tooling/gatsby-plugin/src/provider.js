import * as React from "react"
import { ChakraProvider, ChakraBaseProvider } from "@chakra-ui/react"
import { theme as defaultTheme, baseTheme } from "./theme"

export const WrapRootElement = ({
  element,
  isBaseProvider = false,
  resetCSS = true,
  portalZIndex,
}) => {
  const Provider = isBaseProvider ? ChakraBaseProvider : ChakraProvider

  const theme = isBaseProvider ? baseTheme : defaultTheme
  return (
    <Provider theme={theme} resetCSS={resetCSS} portalZIndex={portalZIndex}>
      {element}
    </Provider>
  )
}
