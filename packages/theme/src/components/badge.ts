import {
  BaseStyle,
  DefaultProps,
  getColor,
  ink,
  mode,
  Props,
  transparentize,
  Variants,
} from "@chakra-ui/theme-tools"

const register = {
  parts: ["container"],
  variants: ["solid", "subtle", "outline"],
} as const

const baseStyle: BaseStyle<typeof register> = {
  container: {
    paddingX: 1,
    textTransform: "uppercase",
    fontSize: "xs",
    borderRadius: "sm",
    fontWeight: "bold",
  },
}

const variants: Variants<typeof register> = {
  solid(props) {
    const { colorScheme: c, theme } = props
    const dark = transparentize(`${c}.500`, 0.6)(theme)
    return {
      container: {
        bg: mode(`${c}.500`, dark)(props),
        color: mode(`white`, `whiteAlpha.800`)(props),
      },
    }
  },

  subtle(props) {
    const { colorScheme: c, theme } = props
    const darkBg = ink(`${c}.200`, "lowest")(theme)
    return {
      container: {
        bg: mode(`${c}.100`, darkBg)(props),
        color: mode(`${c}.800`, `${c}.200`)(props),
      },
    }
  },

  outline(props: Props) {
    const { colorScheme: c, theme } = props
    const darkColor = transparentize(`${c}.200`, 0.8)(theme)
    const lightColor = getColor(theme, `${c}.500`)
    const color = mode(lightColor, darkColor)(props)

    return {
      container: {
        color,
        boxShadow: `inset 0 0 0px 1px ${color}`,
      },
    }
  },
}

const defaultProps: DefaultProps<typeof register> = {
  variant: "subtle",
  colorScheme: "gray",
}

const Badge = {
  register,
  defaultProps,
  baseStyle,
  variants,
}

export default Badge
