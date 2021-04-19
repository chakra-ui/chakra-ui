import * as React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import userTheme from "./theme"

const theme = extendTheme(userTheme)

export const WrapRootElement = ({
  element,
  isResettingCSS = true,
  portalZIndex = 40,
}) => {
  return (
    <ChakraProvider
      theme={theme}
      resetCSS={isResettingCSS}
      portalZIndex={portalZIndex}
    >
      {element}
    </ChakraProvider>
  )
}
