import { popoverAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { cssVar } from "@chakra-ui/theme-tools"

const $popperBg = cssVar("popper-bg")

const $arrowBg = cssVar("popper-arrow-bg")
const $arrowShadowColor = cssVar("popper-arrow-shadow-color")

const baseStylePopper: SystemStyleObject = {
  zIndex: 10,
}

const contentBgLight = "white"
const contentBgDark = "gray.700"
const contentShadowColorLight = "whiteAlpha.300"
const contentShadowColorDark = "gray.200"

const baseStyleContent: SystemStyleObject = {
  [$arrowBg.variable]: $popperBg.reference,
  width: "xs",
  border: "1px solid",
  borderColor: "inherit",
  borderRadius: "md",
  boxShadow: "sm",
  zIndex: "inherit",

  _focus: {
    outline: 0,
    boxShadow: "outline",
  },

  _light: {
    bg: contentBgLight,
    [$popperBg.variable]: `colors.${contentBgLight}`,
    [$arrowShadowColor.variable]: `colors.${contentShadowColorDark}`,
  },

  _dark: {
    bg: contentBgDark,
    [$popperBg.variable]: `colors.${contentBgDark}`,
    [$arrowShadowColor.variable]: `colors.${contentShadowColorLight}`,
  },
}

const baseStyleHeader: SystemStyleObject = {
  px: 3,
  py: 2,
  borderBottomWidth: "1px",
}

const baseStyleBody: SystemStyleObject = {
  px: 3,
  py: 2,
}

const baseStyleFooter: SystemStyleObject = {
  px: 3,
  py: 2,
  borderTopWidth: "1px",
}

const baseStyleCloseButton: SystemStyleObject = {
  position: "absolute",
  borderRadius: "md",
  top: 1,
  insetEnd: 2,
  padding: 2,
}

const baseStyle: PartsStyleObject<typeof parts> = {
  popper: baseStylePopper,
  content: baseStyleContent,
  header: baseStyleHeader,
  body: baseStyleBody,
  footer: baseStyleFooter,
  arrow: {},
  closeButton: baseStyleCloseButton,
}

export default {
  parts: parts.keys,
  baseStyle,
}
