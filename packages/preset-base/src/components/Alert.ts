import { colorEmphasis, getColor } from "@chakra-ui/color"
import {
  StyleFunctionProps,
  getModeColor as get,
  ComponentTheme,
} from "./utils"

function getSubtleStyle(props: StyleFunctionProps) {
  const { theme: t, variantColor: c } = props
  const lightBg = getColor(t, `${c}.100`, c)
  //@ts-ignore
  const darkBg = colorEmphasis(`${c}.200`, "lowest")(t)
  return { Root: { bg: get(props, lightBg, darkBg) } }
}

function getLeftAccentStyle(props: StyleFunctionProps) {
  const { variantColor: c } = props
  const borderColor = get(props, `${c}.500`, `${c}.200`)

  return {
    Root: {
      paddingLeft: 3,
      borderLeft: "4px solid",
      borderColor,
      ...getSubtleStyle(props)["Root"],
    },
  }
}

function getTopAccentStyle(props: StyleFunctionProps) {
  const { variantColor: c } = props
  const borderColor = get(props, `${c}.500`, `${c}.200`)

  return {
    Root: {
      paddingTop: 2,
      borderTop: "4px solid",
      borderColor,
      ...getSubtleStyle(props)["Root"],
    },
  }
}

function getSolidStyle(props: StyleFunctionProps) {
  const { variantColor: c } = props
  return {
    Root: {
      bg: get(props, `${c}.500`, `${c}.200`),
      color: get(props, `white`, `gray.900`),
    },
  }
}

const Alert: ComponentTheme = {
  baseStyle: {
    Root: {
      paddingX: 4,
      paddingY: 3,
    },
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
