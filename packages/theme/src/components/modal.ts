import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"

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

const parts = {
  overlay: "the modal overlay",
  content: "the modal content wrapper",
  header: "the modal content header",
  body: "the modal main content area",
  footer: "the modal footer action",
}

const baseStyleOverlay = function (props: Record<string, any>) {
  const { isCentered, scrollBehavior } = props

  return {
    bg: "blackAlpha.600",
    display: "flex",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto",
  }
}

const baseStyleContent = function (props: Record<string, any>) {
  const { scrollBehavior } = props

  return {
    borderRadius: "md",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    my: "3.75rem",
    maxH: scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
    boxShadow: mode("lg", "dark-lg")(props),
  }
}

const baseStyleHeader = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold",
}

const baseStyleBody = function (props: Record<string, any>) {
  const { scrollBehavior } = props
  return {
    px: 6,
    py: 2,
    flex: 1,
    overflow: scrollBehavior === "inside" ? "auto" : undefined,
  }
}

const baseStyleFooter = {
  px: 6,
  py: 4,
}

const baseStyle = (props: Record<string, any>) => ({
  overlay: baseStyleOverlay(props),
  content: baseStyleContent(props),
  header: baseStyleHeader,
  body: baseStyleBody(props),
  footer: baseStyleFooter,
})

const sizes = {
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

const defaultProps = {
  size: "md",
} as const

const modal = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  defaultProps,
})

export const modalStyles = {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}

export default modal
