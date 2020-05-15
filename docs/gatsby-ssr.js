import React from "react"
import { InitializeColorMode } from "@chakra-ui/core"

export { wrapRootElement } from "./src/provider"

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<InitializeColorMode />])
}
