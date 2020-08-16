import { getColor, mode, transparentize } from "@chakra-ui/theme-tools"

const baseStyle = {
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold",
}

function variantSolid(props: Record<string, any>) {
  const { colorScheme: c, theme } = props
  const dark = transparentize(`${c}.500`, 0.6)(theme)
  return {
    bg: mode(`${c}.500`, dark)(props),
    color: mode(`white`, `whiteAlpha.800`)(props),
  }
}

function variantSubtle(props: Record<string, any>) {
  const { colorScheme: c, theme } = props
  const darkBg = transparentize(`${c}.200`, 0.16)(theme)
  return {
    bg: mode(`${c}.100`, darkBg)(props),
    color: mode(`${c}.800`, `${c}.200`)(props),
  }
}

function variantOutline(props: Record<string, any>) {
  const { colorScheme: c, theme } = props
  const darkColor = transparentize(`${c}.200`, 0.8)(theme)
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

const badge = {
  baseStyle,
  variants,
  defaultProps,
}

export default badge
