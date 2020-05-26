import { ColorMode } from "@chakra-ui/color-mode"
import { css } from "@chakra-ui/css"
import { get, runIfFn } from "@chakra-ui/utils"
import { Global as EmotionGlobal, Interpolation } from "@emotion/core"
import * as React from "react"
import { useChakra } from "./hooks"

export interface GlobalProps {
  styles:
    | Interpolation
    | ((props: { theme: object; colorMode: ColorMode }) => Interpolation)
}

export function Global(props: GlobalProps) {
  const { styles } = props
  const { colorMode, theme } = useChakra()
  const _styles = runIfFn(styles, { theme, colorMode })
  return <EmotionGlobal styles={_styles} />
}

export function GlobalStyle() {
  return (
    <Global
      styles={(props) => {
        const { theme, colorMode } = props
        const styleOrFn = get(theme, "styles.global")
        if (!styleOrFn) return

        const globalStyle = runIfFn(styleOrFn, { colorMode })
        const styles = css({ body: globalStyle })(theme)
        return styles as Interpolation
      }}
    />
  )
}
