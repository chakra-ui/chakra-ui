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
  gap: "1",
})

const baseStyleEllipsis = defineStyle({
  cursor: "default",
})

const baseStyleItem = defineStyle({})

const baseStylePrevNextItem = defineStyle({
  ...baseStyleItem,
  px: "2",
})

const baseStyle = definePartsStyle({
  root: baseStyleRoot,
  ellipsis: baseStyleEllipsis,
  list: baseStyleList,
  item: baseStyleItem,
  nextItem: baseStylePrevNextItem,
  prevItem: baseStylePrevNextItem,
})

export const paginationTheme = defineMultiStyleConfig({ baseStyle })
