import React from "react"
import { ColorModeScript } from "@chakra-ui/react"
import { WrapRootElement } from "./src/provider"

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<ColorModeScript key="chakra-ui-no-flash" />])
}

export const wrapRootElement = (
  { element },
  { isResettingCSS = true, isUsingColorMode = true, portalZIndex = 40 },
) => {
  return (
    <WrapRootElement
      element={element}
      isResettingCSS={isResettingCSS}
      isUsingColorMode={isUsingColorMode}
      portalZIndex={portalZIndex}
    />
  )
}
