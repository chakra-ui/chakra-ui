import React from "react"
import { Global as EmotionGlobal, Interpolation } from "@emotion/core"
import { useColorMode, ColorMode } from "@chakra-ui/color-mode"

export interface GlobalProps {
  styles: (props: { theme: object; colorMode: ColorMode }) => Interpolation
}

export function Global(props: GlobalProps) {
  const { styles } = props
  const [colorMode] = useColorMode()
  return <EmotionGlobal styles={theme => styles({ theme, colorMode })} />
}
