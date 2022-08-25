import { alertAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  StyleFunctionProps,
} from "@chakra-ui/styled-system"
import { getColor, mode, transparentize } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $fg = cssVar("alert-fg")
const $bg = cssVar("alert-bg")

const baseStyle = definePartsStyle({
  container: {
    bg: $bg.reference,
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
    color: $fg.reference,
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 6,
  },
  spinner: {
    color: $fg.reference,
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
  const fg = mode(`${c}.500`, `${c}.200`)(props)
  return {
    container: {
      [$bg.variable]: getBg(props),
      [$fg.variable]: `colors.${fg}`,
    },
  }
})

const variantLeftAccent = definePartsStyle((props) => {
  const { colorScheme: c } = props
  const fg = mode(`${c}.500`, `${c}.200`)(props)
  return {
    container: {
      [$bg.variable]: getBg(props),
      [$fg.variable]: `colors.${fg}`,
      paddingStart: "3",
      borderStartWidth: "4px",
      borderStartColor: $fg.reference,
    },
  }
})

const variantTopAccent = definePartsStyle((props) => {
  const { colorScheme: c } = props
  const fg = mode(`${c}.500`, `${c}.200`)(props)
  return {
    container: {
      [$bg.variable]: getBg(props),
      [$fg.variable]: `colors.${fg}`,
      pt: "2",
      borderTopWidth: "4px",
      borderTopColor: $fg.reference,
    },
  }
})

const variantSolid = definePartsStyle((props) => {
  const { colorScheme: c } = props
  const bg = mode(`${c}.500`, `${c}.200`)(props)
  const fg = mode(`white`, `gray.900`)(props)
  return {
    container: {
      [$bg.variable]: `colors.${bg}`,
      [$fg.variable]: `colors.${fg}`,
      color: $fg.reference,
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
