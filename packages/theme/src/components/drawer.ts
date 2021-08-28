import { drawerAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { mode } from "@chakra-ui/theme-tools"

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string): PartsStyleObject<typeof parts> {
  if (value === "full") {
    return {
      dialog: { maxW: "100vw", h: "100vh" },
    }
  }
  return {
    dialog: { maxW: value },
  }
}

const baseStyleOverlay: SystemStyleObject = {
  bg: "blackAlpha.600",
  zIndex: "overlay",
}

const baseStyleDialogContainer: SystemStyleObject = {
  display: "flex",
  zIndex: "modal",
  justifyContent: "center",
}

const baseStyleDialog: SystemStyleFunction = (props) => {
  const { isFullHeight } = props

  return {
    ...(isFullHeight && { height: "100vh" }),
    zIndex: "modal",
    maxH: "100vh",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    boxShadow: mode("lg", "dark-lg")(props),
  }
}

const baseStyleHeader: SystemStyleObject = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold",
}

const baseStyleCloseButton: SystemStyleObject = {
  position: "absolute",
  top: 2,
  insetEnd: 3,
}

const baseStyleBody: SystemStyleObject = {
  px: 6,
  py: 2,
  flex: 1,
  overflow: "auto",
}

const baseStyleFooter: SystemStyleObject = {
  px: 6,
  py: 4,
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  overlay: baseStyleOverlay,
  dialogContainer: baseStyleDialogContainer,
  dialog: baseStyleDialog(props),
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
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

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
}
