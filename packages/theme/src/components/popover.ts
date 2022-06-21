import { popoverAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { cssVar, mode } from "@chakra-ui/theme-tools"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $popperBg = cssVar("popper-bg")
const $arrowBg = cssVar("popper-arrow-bg")
const $arrowShadowColor = cssVar("popper-arrow-shadow-color")

const baseStylePopper = defineStyle({ zIndex: 10 })

const baseStyleContent = defineStyle((props) => {
  const bg = mode("white", "gray.700")(props)
  const shadowColor = mode("gray.200", "whiteAlpha.300")(props)

  return {
    [$popperBg.variable]: `colors.${bg}`,
    bg: $popperBg.reference,
    [$arrowBg.variable]: $popperBg.reference,
    [$arrowShadowColor.variable]: `colors.${shadowColor}`,
    width: "xs",
    border: "1px solid",
    borderColor: "inherit",
    borderRadius: "md",
    boxShadow: "sm",
    zIndex: "inherit",
    _focusVisible: {
      outline: 0,
      boxShadow: "outline",
    },
  }
})

const baseStyleHeader = defineStyle({
  px: 3,
  py: 2,
  borderBottomWidth: "1px",
})

const baseStyleBody = defineStyle({
  px: 3,
  py: 2,
})

const baseStyleFooter = defineStyle({
  px: 3,
  py: 2,
  borderTopWidth: "1px",
})

const baseStyleCloseButton = defineStyle({
  position: "absolute",
  borderRadius: "md",
  top: 1,
  insetEnd: 2,
  padding: 2,
})

const baseStyle = definePartsStyle((props) => ({
  popper: baseStylePopper,
  content: baseStyleContent(props),
  header: baseStyleHeader,
  body: baseStyleBody,
  footer: baseStyleFooter,
  arrow: {},
  closeButton: baseStyleCloseButton,
}))

export const popoverTheme = defineMultiStyleConfig({
  baseStyle,
})
