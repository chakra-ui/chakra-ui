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
      ...(props.isFullHeight && { height: "100vh" }),
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
const getSize = (value: string) => ({
  content: { maxWidth: value },
})

const sizes: Sizes<typeof register> = {
  xs: getSize("xs"),
  sm: getSize("md"),
  md: getSize("lg"),
  lg: getSize("2xl"),
  xl: getSize("4xl"),
  full: getSize("100vw"),
}

const defaultProps: DefaultProps<typeof register> = {
  size: "xs",
}

const modal = {
  register,
  defaultProps,
  baseStyle,
  sizes,
}

export default modal
