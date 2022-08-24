import { listAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleIcon = defineStyle({
  marginEnd: "0.5rem",
  display: "inline",
  verticalAlign: "text-bottom",
})

const baseStyle = definePartsStyle({
  container: {},
  item: {},
  icon: baseStyleIcon,
})

export const listTheme = defineMultiStyleConfig({
  baseStyle,
})
