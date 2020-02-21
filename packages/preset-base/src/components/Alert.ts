import { colorEmphasis, getColor } from "@chakra-ui/color"
import {
  StyleFunctionProps,
  getModeColor as get,
  ComponentTheme,
} from "./utils"

function getSubtleStyle(props: StyleFunctionProps) {
  const { theme: t, variantColor: c } = props
  const lightBg = getColor(t, `${c}.100`, c)
  const darkBg = colorEmphasis(`${c}.200`, "lowest")

  return { bg: get(props, lightBg, darkBg) }
}

function getLeftAccentStyle(props: StyleFunctionProps) {
  const { variantColor: c } = props
  const borderColor = get(props, `${c}.500`, `${c}.200`)

  return {
    paddingLeft: 3,
    borderLeft: "4px solid",
    borderColor,
    ...getSubtleStyle(props),
  }
}

function getTopAccentStyle(props: StyleFunctionProps) {
  const { variantColor: c } = props
  const borderColor = get(props, `${c}.500`, `${c}.200`)

  return {
    paddingTop: 2,
    borderTop: "4px solid",
    borderColor,
    ...getSubtleStyle(props),
  }
}

function getSolidStyle(props: StyleFunctionProps) {
  const { variantColor: c } = props
  return {
    bg: get(props, `${c}.500`, `${c}.200`),
    color: get(props, `white`, `gray.900`),
  }
}

const Alert: ComponentTheme = {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 3,
    paddingBottom: 3,
  },
  variant: {
    __default: "subtle",
    solid: getSolidStyle,
    subtle: getSubtleStyle,
    "left-accent": getLeftAccentStyle,
    "top-accent": getTopAccentStyle,
  },
}

export default Alert
