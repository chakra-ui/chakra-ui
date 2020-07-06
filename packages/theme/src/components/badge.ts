import {
  ComponentTheme,
  mode,
  Props,
  getColor,
  ink,
  transparentize,
} from "@chakra-ui/theme-tools"

function solid(props: Props) {
  const { colorScheme: c, theme } = props
  const dark = transparentize(`${c}.500`, 0.6)(theme)

  return {
    bg: mode(`${c}.500`, dark)(props),
    color: mode(`white`, `whiteAlpha.800`)(props),
  }
}

function subtle(props: Props) {
  const { colorScheme: c, theme } = props
  const darkBg = ink(`${c}.200`, "lowest")(theme)

  return {
    bg: mode(`${c}.100`, darkBg)(props),
    color: mode(`${c}.800`, `${c}.200`)(props),
  }
}

function outline(props: Props) {
  const { colorScheme: c, theme } = props

  const dark = transparentize(`${c}.200`, 0.8)(theme)
  const light = getColor(theme, `${c}.500`)

  const color = mode(light, dark)(props)

  return {
    color,
    boxShadow: `inset 0 0 0px 1px ` + color,
  }
}

const Badge: ComponentTheme = {
  defaultProps: {
    variant: "subtle",
    colorScheme: "gray",
  },
  baseStyle: {
    paddingX: 1,
    textTransform: "uppercase",
    fontSize: "xs",
    borderRadius: "sm",
    fontWeight: "bold",
  },
  variants: {
    solid,
    outline,
    subtle,
  },
}

export const BadgeVariants = {
  solid: "solid",
  subtle: "subtle",
  outline: "outline",
}

export default Badge
