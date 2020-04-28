import * as React from "react"
import { Global as EmotionGlobal, Interpolation } from "@emotion/core"
import { useColorMode, ColorMode } from "@chakra-ui/color-mode"
import { css } from "@chakra-ui/css"
import { get, runIfFn } from "@chakra-ui/utils"

export interface GlobalProps {
  styles: (props: { theme: object; colorMode: ColorMode }) => Interpolation
}

export function Global(props: GlobalProps) {
  const { styles } = props
  const [colorMode] = useColorMode()
  return <EmotionGlobal styles={theme => styles({ theme, colorMode })} />
}

export function GlobalStyle() {
  return (
    <Global
      styles={props => {
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
