import { addOpacity, generateAlphaColors, getColor } from "@chakra-ui/color"
import { Props, getModeColor as get, ComponentTheme } from "./utils"

function getSolidStyle(props: Props) {
  const { variantColor: c, theme: t } = props
  const darkBg = addOpacity(`${c}.500`, 0.6)(t)
  return {
    bg: get(props, `${c}.500`, darkBg),
    color: get(props, `white`, `whiteAlpha.800`),
  }
}

function getSubtleStyle(props: Props) {
  const { variantColor: c, theme: t } = props
  const alphaColors = generateAlphaColors(`${c}.200`)
  const darkModeBg = alphaColors[300](t)

  return {
    bg: get(props, `${c}.200`, darkModeBg),
    color: get(props, `${c}.800`, `${c}.200`),
  }
}

function getOutlineStyle(props: Props) {
  const { variantColor: c, theme: t } = props
  const darkModeColor = addOpacity(`${c}.200`, 0.8)(t)
  const lightModeColor = getColor(t, `${c}.500`)
  const color = get(props, lightModeColor, darkModeColor)

  return {
    color,
    boxShadow: `inset 0 0 0px 1px ` + color,
  }
}

const Badge: ComponentTheme = {
  baseStyle: {
    display: "inline-block",
    paddingX: 1,
    textTransform: "uppercase",
    fontSize: "xs",
    borderRadius: "sm",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  },
  variant: {
    __default: "subtle",
    solid: getSolidStyle,
    outline: getOutlineStyle,
    subtle: getSubtleStyle,
  },
}

export default Badge
