import { ComponentTheme, mode } from "@chakra-ui/theme-tools"

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
const getSize = (value: string) => ({
  Content: { maxWidth: value },
})

export interface Props {
  scrollBehavior?: "inside" | "outside"
}

const Modal: ComponentTheme<Props> = {
  defaultProps: {
    size: "md",
  },
  baseStyle: (props) => ({
    Overlay: {
      bg: "blackAlpha.600",
    },
    Content: {
      borderRadius: "md",
      bg: mode("white", "gray.700")(props),
      color: "inherit",
      marginY: "3.75rem",
      maxHeight:
        props.scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
      boxShadow: mode("lg", "dark-lg")(props),
    },
    Header: {
      paddingX: 6,
      paddingY: 4,
      fontSize: "xl",
      fontWeight: "semibold",
    },
    Body: {
      paddingX: 6,
      paddingY: 2,
    },
    Footer: {
      paddingX: 6,
      paddingY: 4,
    },
  }),
  sizes: {
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
  },
}

export const ModalSizes = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  "3xl": "3xl",
  "4xl": "4xl",
  "5xl": "5xl",
  "6xl": "6xl",
  full: "full",
}

export default Modal
