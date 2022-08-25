import { accordionAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleContainer = defineStyle({
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px",
  },
})

const baseStyleButton = defineStyle({
  transitionProperty: "common",
  transitionDuration: "normal",
  fontSize: "md",
  _focusVisible: {
    boxShadow: "outline",
  },
  _hover: {
    bg: "blackAlpha.50",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  px: "4",
  py: "2",
})

const baseStylePanel = defineStyle({
  pt: "2",
  px: "4",
  pb: "5",
})

const baseStyleIcon = defineStyle({
  fontSize: "1.25em",
})

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
  button: baseStyleButton,
  panel: baseStylePanel,
  icon: baseStyleIcon,
})

export const accordionTheme = defineMultiStyleConfig({ baseStyle })
