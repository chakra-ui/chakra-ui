import { getColor, transparentize } from "@chakra-ui/theme-tools"
import type {
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"

const baseStyle: SystemStyleObject = {
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold",
}

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props
  const dark = transparentize(`${c}.500`, 0.6)(theme)
  return {
    _light: {
      bg: `${c}.500`,
      color: `white`,
    },
    _dark: {
      bg: dark,
      color: `whiteAlpha.800`,
    },
  }
}

const variantSubtle: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props
  const darkBg = transparentize(`${c}.200`, 0.16)(theme)
  return {
    _light: {
      bg: `${c}.100`,
      color: `${c}.800`,
    },
    _dark: {
      bg: darkBg,
      color: `${c}.200`,
    },
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props
  const darkColor = transparentize(`${c}.200`, 0.8)(theme)
  const lightColor = getColor(theme, `${c}.500`)

  return {
    _light: {
      color: lightColor,
      boxShadow: `inset 0 0 0px 1px ${lightColor}`,
    },

    _dark: {
      color: darkColor,
      boxShadow: `inset 0 0 0px 1px ${darkColor}`,
    },
  }
}

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline,
}

const defaultProps = {
  variant: "subtle",
  colorScheme: "gray",
}

export default {
  baseStyle,
  variants,
  defaultProps,
}
