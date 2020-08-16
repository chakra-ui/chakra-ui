import { mode } from "@chakra-ui/theme-tools"

const parts = {
  overlay: "the overlay or shim",
  content: "the main content wrapper",
  header: "the content heading",
  body: "the main content area",
  footer: "the action footer",
}

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

const baseStyleOverlay = {
  bg: "blackAlpha.600",
}

function baseStyleContent(props: Record<string, any>) {
  const { isFullHeight } = props

  return {
    ...(isFullHeight && { height: "100vh" }),
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    boxShadow: mode("lg", "dark-lg")(props),
  }
}

const baseStyleHeader = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold",
}

const baseStyleBody = {
  px: 6,
  py: 2,
  flex: 1,
  overflow: "auto",
}

const baseStyleFooter = {
  px: 6,
  py: 4,
}

const baseStyle = (props: Record<string, any>) => ({
  overlay: baseStyleOverlay,
  content: baseStyleContent(props),
  header: baseStyleHeader,
  body: baseStyleBody,
  footer: baseStyleFooter,
})

const sizes = {
  xs: getSize("xs"),
  sm: getSize("md"),
  md: getSize("lg"),
  lg: getSize("2xl"),
  xl: getSize("4xl"),
  full: getSize("full"),
}

const defaultProps = {
  size: "xs",
}

const drawer = {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}

export default drawer
