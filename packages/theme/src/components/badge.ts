import { getColor, mode } from "@chakra-ui/theme-tools"
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
  const { colorScheme: c } = props
  return {
    bg: mode(`${c}.500`, `${c}.700`)(props),
    color: mode(`white`, `whiteAlpha.800`)(props),
  }
}

const variantSubtle: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  if (c === "gray") {
    return {
      bg: mode(`${c}.100`, `${c}.600`)(props),
      color: mode(`${c}.800`, `${c}.100`)(props),
    }
  }

  return {
    bg: mode(`${c}.100`, `${c}.800`)(props),
    color: mode(`${c}.800`, `${c}.200`)(props),
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props
  const darkColor = getColor(theme, `${c}.300`)
  const lightColor = getColor(theme, `${c}.500`)
  const color = mode(lightColor, darkColor)(props)

  return {
    color,
    boxShadow: `inset 0 0 0px 1px ${color}`,
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
