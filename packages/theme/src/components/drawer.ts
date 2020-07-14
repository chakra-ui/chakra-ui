import { BaseStyle, DefaultProps, mode, Sizes } from "@chakra-ui/theme-tools"

const register = {
  parts: ["overlay", "content", "header", "body", "footer"],
  sizes: [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "full",
  ],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    overlay: {
      bg: "blackAlpha.600",
    },

    content: {
      bg: mode("white", "gray.700")(props),
      color: "inherit",
      boxShadow: mode("lg", "dark-lg")(props),
    },

    header: {
      paddingX: 6,
      paddingY: 4,
      fontSize: "xl",
      fontWeight: "semibold",
    },

    body: {
      paddingX: 6,
      paddingY: 2,
      flex: 1,
      overflow: "auto",
    },

    footer: {
      paddingX: 6,
      paddingY: 4,
    },
  }
}

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
  return {
    content: { maxWidth: value },
  }
}

const sizes: Sizes<typeof register> = {
  xs: getSize("xs"),
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg"),
  xl: getSize("xl"),
  "2xl": getSize("2xl"),
  "3xl": getSize("3xl"),
  "4xl": getSize("4xl"),
  "5xl": getSize("5xl"),
  "6xl": getSize("6xl"),
  full: getSize("full"),
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
}

const modal = {
  register,
  defaultProps,
  baseStyle,
  sizes,
}

export default modal
