import { alertAnatomy as parts } from "@chakra-ui/anatomy"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"
import { getColor, mode, transparentize } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
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
  spinner: {
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 5,
  },
})

function getBg(props: StyleFunctionProps): string {
  const { theme, colorScheme: c } = props
  const lightBg = getColor(theme, `${c}.100`, c)
  const darkBg = transparentize(`${c}.200`, 0.16)(theme)
  return mode(lightBg, darkBg)(props)
}

const variantSubtle = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    container: { bg: getBg(props) },
    icon: { color: mode(`${c}.500`, `${c}.200`)(props) },
    spinner: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
})

const variantLeftAccent = definePartsStyle((props) => {
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
    spinner: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
})

const variantTopAccent = definePartsStyle((props) => {
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
    spinner: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
})

const variantSolid = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    container: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      color: mode(`white`, `gray.900`)(props),
    },
  }
})

const variants = {
  subtle: variantSubtle,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid,
}

export const alertTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "subtle",
    colorScheme: "blue",
  },
})
