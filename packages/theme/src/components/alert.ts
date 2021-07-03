import { getColor, mode, transparentize } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

const parts = ["container", "title", "description", "icon"]

const baseStyle = {
  container: {
    px: 4,
    py: 3,
  },
  title: {
    fontWeight: "bold",
    lineHeight: 6,
    marginEnd: 2,
  },
  description: {
    lineHeight: 6,
  },
  icon: {
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 6,
  },
}

function getBg(props: Dict) {
  const { theme, colorScheme: c } = props
  const lightBg = getColor(theme, `${c}.100`, c)
  const darkBg = transparentize(`${c}.200`, 0.16)(theme)
  return mode(lightBg, darkBg)(props)
}

function variantSubtle(props: Dict) {
  const { colorScheme: c } = props
  return {
    container: { bg: getBg(props) },
    icon: { color: mode(`${c}.500`, `${c}.200`)(props) },
  }
}

function variantLeftAccent(props: Dict) {
  const { colorScheme: c } = props
  return {
    container: {
      paddingStart: 3,
      borderStartWidth: "4px",
      borderStartColor: mode(`${c}.500`, `${c}.200`)(props),
      bg: getBg(props),
    },
    icon: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

function variantTopAccent(props: Dict) {
  const { colorScheme: c } = props
  return {
    container: {
      pt: 2,
      borderTopWidth: "4px",
      borderTopColor: mode(`${c}.500`, `${c}.200`)(props),
      bg: getBg(props),
    },
    icon: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

function variantSolid(props: Dict) {
  const { colorScheme: c } = props
  return {
    container: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      color: mode(`white`, `gray.900`)(props),
    },
  }
}

const variants = {
  subtle: variantSubtle,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid,
}

const defaultProps = {
  variant: "subtle",
  colorScheme: "blue",
}

export default {
  parts,
  baseStyle,
  variants,
  defaultProps,
}
