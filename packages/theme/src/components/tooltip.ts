import { cssVar, SystemStyleObject } from "@chakra-ui/theme-tools"

const $bg = cssVar("tooltip-bg")
const $arrowBg = cssVar("popper-arrow-bg")

const bgLight = "gray.700"
const bgDark = "gray.300"

const baseStyle: SystemStyleObject = {
  px: "8px",
  py: "2px",
  [$arrowBg.variable]: [$bg.reference],
  borderRadius: "sm",
  fontWeight: "medium",
  fontSize: "sm",
  boxShadow: "md",
  maxW: "320px",
  zIndex: "tooltip",
  _light: {
    bg: bgLight,
    color: "whiteAlpha.900",
    [$bg.variable]: `colors.${bgLight}`,
  },
  _dark: {
    bg: bgDark,
    color: "gray.900",
    [$bg.variable]: `colors.${bgDark}`,
  },
}

export default {
  baseStyle,
}
