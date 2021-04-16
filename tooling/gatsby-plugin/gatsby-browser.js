import * as React from "react"
import { WrapRootElement } from "./src/provider"

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
