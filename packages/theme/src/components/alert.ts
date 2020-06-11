import { ink, getColor } from "@chakra-ui/color"
import { Props, ComponentTheme, mode } from "./utils"

function getSubtleStyle(props: Props) {
  const { theme: t, colorScheme: c } = props

  const light = getColor(t, `${c}.100`, c)
  const dark = ink(`${c}.200`, "lowest")(t)

  const bg = mode(light, dark)(props)

  return {
    Root: { bg },
    Icon: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

function getLeftAccentStyle(props: Props) {
  const { colorScheme: c } = props
  const subtleStyle = getSubtleStyle(props)
  return {
    Root: {
      paddingLeft: 3,
      borderLeft: "4px solid",
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      ...subtleStyle.Root,
    },
    Icon: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

function getTopAccentStyle(props: Props) {
  const { colorScheme: c } = props
  const subtleStyle = getSubtleStyle(props)
  return {
    Root: {
      paddingTop: 2,
      borderTop: "4px solid",
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      ...subtleStyle.Root,
    },
    Icon: {
      color: mode(`${c}.500`, `${c}.200`)(props),
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
    Icon: {
      marginRight: 3,
      boxSize: 5,
    },
  },
  variants: {
    solid: getSolidStyle,
    subtle: getSubtleStyle,
    "left-accent": getLeftAccentStyle,
    "top-accent": getTopAccentStyle,
  },
}

export const AlertVariants = {
  solid: "solid",
  subtle: "subtle",
  "left-accent": "left-accent",
  "top-accent": "top-accent",
}

export default Alert
