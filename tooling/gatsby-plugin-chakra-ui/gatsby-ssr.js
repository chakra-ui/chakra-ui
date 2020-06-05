import React from "react"
import { InitializeColorMode } from "@chakra-ui/core"
export { wrapRootElement } from "./gatsby-browser"

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<InitializeColorMode key="chakra-ui-no-flash" />])
}
