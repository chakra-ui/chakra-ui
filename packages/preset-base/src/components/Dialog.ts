import { ComponentTheme, mode } from "./utils"

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our dialogs.
 */
const size = (value: string) => ({ Content: { maxWidth: value } })

const Dialog: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: props => ({
    Overlay: {
      bg: "rgba(0,0,0,0.4)",
    },
    Content: {
      borderRadius: "md",
      bg: mode("white", "gray.700")(props),
      color: "inherit",
      shadow: mode(
        "0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)",
        "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px",
      )(props),
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
    xs: size("xs"),
    sm: size("sm"),
    md: size("md"),
    lg: size("lg"),
    xl: size("xl"),
    "2xl": size("2xl"),
    "3xl": size("3xl"),
    "4xl": size("4xl"),
    "5xl": size("5xl"),
    "6xl": size("6xl"),
    full: size("full"),
  },
}

export default Dialog
