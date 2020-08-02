import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"

const drawer = multiStyleConfig({
  parts: {
    overlay: "the overlay or shim",
    content: "the main content wrapper",
    header: "the content heading",
    body: "the main content area",
    footer: "the action footer",
  },
  baseStyle: function (props) {
    const { isFullHeight } = props
    return {
      overlay: {
        bg: "blackAlpha.600",
      },
      content: {
        ...(isFullHeight && { height: "100vh" }),
        bg: mode("white", "gray.700")(props),
        color: "inherit",
        boxShadow: mode("lg", "dark-lg")(props),
      },
      header: {
        px: 6,
        py: 4,
        fontSize: "xl",
        fontWeight: "semibold",
      },

      body: {
        px: 6,
        py: 2,
        flex: 1,
        overflow: "auto",
      },

      footer: {
        px: 6,
        py: 4,
      },
    }
  },

  sizes: {
    xs: getSize("xs"),
    sm: getSize("md"),
    md: getSize("lg"),
    lg: getSize("2xl"),
    xl: getSize("4xl"),
    full: getSize("full"),
  },

  defaultProps: {
    size: "xs",
  },
})

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
  if (value === "full") {
    return { content: { maxW: "100vw", h: "100vh" } }
  }

  return {
    content: { maxW: value },
  }
}

export default drawer
