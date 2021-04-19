import React from "react"
import { ColorModeScript, extendTheme } from "@chakra-ui/react"
import { WrapRootElement } from "./src/provider"
import userTheme from "./src/theme"

const theme = extendTheme(userTheme)

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ])
}

export const wrapRootElement = (props) => {
  return <WrapRootElement {...props} />
}
