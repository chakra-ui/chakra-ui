import * as React from "react"
import { WrapRootElement } from "./src/provider"

export const wrapRootElement = ({ element }, pluginOptions) => {
  return <WrapRootElement element={element} {...pluginOptions} />
}
