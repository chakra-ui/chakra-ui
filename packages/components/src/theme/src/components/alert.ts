import { alertAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  StyleFunctionProps,
} from "@chakra-ui/styled-system"
import { transparentize } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $fg = cssVar("alert-fg")
const $bg = cssVar("alert-bg")

const baseStyle = definePartsStyle({
  container: {
    bg: $bg.reference,
    px: "4",
    py: "3",
  },
  title: {
    fontWeight: "bold",
    lineHeight: "6",
    marginEnd: "2",
  },
  description: {
    lineHeight: "6",
  },
  icon: {
    color: $fg.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "6",
  },
  spinner: {
    color: $fg.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "5",
  },
})

function getBg(props: StyleFunctionProps) {
  const { theme, colorScheme: c } = props
  const darkBg = transparentize(`${c}.200`, 0.16)(theme)
  return {
    light: `colors.${c}.100`,
    dark: darkBg,
  }
}

const variantSubtle = definePartsStyle((props) => {
  const { colorScheme: c } = props
  const bg = getBg(props)
  return {
    container: {
      [$fg.variable]: `colors.${c}.500`,
      [$bg.variable]: bg.light,
      _dark: {
        [$fg.variable]: `colors.${c}.200`,
        [$bg.variable]: bg.dark,
      },
    },
  }
})

const variantLeftAccent = definePartsStyle((props) => {
  const { colorScheme: c } = props
  const bg = getBg(props)
  return {
    container: {
      [$fg.variable]: `colors.${c}.500`,
      [$bg.variable]: bg.light,
      _dark: {
        [$fg.variable]: `colors.${c}.200`,
        [$bg.variable]: bg.dark,
      },
      paddingStart: "3",
      borderStartWidth: "4px",
      borderStartColor: $fg.reference,
    },
  }
})

const variantTopAccent = definePartsStyle((props) => {
  const { colorScheme: c } = props
  const bg = getBg(props)
  return {
    container: {
      [$fg.variable]: `colors.${c}.500`,
      [$bg.variable]: bg.light,
      _dark: {
        [$fg.variable]: `colors.${c}.200`,
        [$bg.variable]: bg.dark,
      },
      pt: "2",
      borderTopWidth: "4px",
      borderTopColor: $fg.reference,
    },
  }
})

const variantSolid = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    container: {
      [$fg.variable]: `colors.white`,
      [$bg.variable]: `colors.${c}.500`,
      _dark: {
        [$fg.variable]: `colors.gray.900`,
        [$bg.variable]: `colors.${c}.200`,
      },
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
