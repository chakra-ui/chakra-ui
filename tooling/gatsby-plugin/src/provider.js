import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"

export const WrapRootElement = ({
  element,
  resetCSS = true,
  portalZIndex = 40,
}) => {
  return (
    <ChakraProvider
      theme={theme}
      resetCSS={resetCSS}
      portalZIndex={portalZIndex}
    >
      {element}
    </ChakraProvider>
  )
}
