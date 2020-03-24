import { ink, getColor } from "@chakra-ui/color"
import { Props, ComponentTheme, mode } from "./utils"

function getSubtleStyle(props: Props) {
  const { theme: t, colorScheme: c } = props

  const light = getColor(t, `${c}.100`, c)
  const dark = ink(`${c}.200`, "lowest")(t)

  return { Root: { bg: mode(light, dark)(props) } }
}

function getLeftAccentStyle(props: Props) {
  const { colorScheme: c } = props
  return {
    Root: {
      paddingLeft: 3,
      borderLeft: "4px solid",
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      ...getSubtleStyle(props)["Root"],
    },
  }
}

function getTopAccentStyle(props: Props) {
  const { colorScheme: c } = props
  return {
    Root: {
      paddingTop: 2,
      borderTop: "4px solid",
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      ...getSubtleStyle(props)["Root"],
    },
  }
}

function getSolidStyle(props: Props) {
  const { colorScheme: c } = props
  return {
    Root: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      color: mode(`white`, `gray.900`)(props),
    },
  }
}

const Alert: ComponentTheme = {
  defaultProps: {
    variant: "subtle",
  },
  baseStyle: {
    Root: {
      paddingX: 4,
      paddingY: 3,
    },
  },
  variants: {
    solid: getSolidStyle,
    subtle: getSubtleStyle,
    "left-accent": getLeftAccentStyle,
    "top-accent": getTopAccentStyle,
  },
}

export default Alert
