import { paginationAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleRoot = defineStyle({})

const baseStyleList = defineStyle({
  display: "flex",
  listStyleType: "none",
})

const baseStyleEllipsis = defineStyle({
  cursor: "default",
})

const baseStyle = definePartsStyle({
  root: baseStyleRoot,
  ellipsis: baseStyleEllipsis,
  list: baseStyleList,
})

export const paginationTheme = defineMultiStyleConfig({ baseStyle })
