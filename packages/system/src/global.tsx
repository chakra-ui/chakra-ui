import { useColorMode } from "@chakra-ui/color-mode"
import css from "@chakra-ui/css"
import { get, runIfFn } from "@chakra-ui/utils"
import { Global, Interpolation } from "@emotion/core"
import * as React from "react"

export function GlobalStyle() {
  const { colorMode } = useColorMode()
  return (
    <Global
      styles={(theme) => {
        const styleObjectOrFn = get(theme, "styles.global")
        const styleObject = runIfFn(styleObjectOrFn, { theme, colorMode })
        if (!styleObject) return
        const styles = css({ body: styleObject })(theme)
        return styles as Interpolation
      }}
    />
  )
}
