import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"

const modal = multiStyleConfig({
  parts: {
    overlay: "the modal overlay",
    content: "the modal content wrapper",
    header: "the modal content header",
    body: "the modal main content area",
    footer: "the modal footer action",
  },

  baseStyle: function (props) {
    const { isCentered, scrollBehavior } = props

    return {
      overlay: {
        bg: "blackAlpha.600",
        display: "flex",
        justifyContent: "center",
        alignItems: isCentered ? "center" : "flex-start",
        overflow: scrollBehavior === "inside" ? "hidden" : "auto",
      },

      content: {
        borderRadius: "md",
        bg: mode("white", "gray.700")(props),
        color: "inherit",
        my: "3.75rem",
        maxH: scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
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
        overflow: scrollBehavior === "inside" ? "auto" : undefined,
      },

      footer: {
        px: 6,
        py: 4,
      },
    }
  },

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

  defaultProps: {
    size: "md",
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

export default modal
