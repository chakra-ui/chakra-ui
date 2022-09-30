import { paginationAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $color = cssVar("pagination-item-color")
const $bg = cssVar("pagination-item-background")
const $borderColor = cssVar("pagination-item-border-color")

const baseStyleRoot = defineStyle({})

const baseStyleList = defineStyle({
  display: "flex",
  listStyleType: "none",
  gap: "4",
})

const baseStyleEllipsis = defineStyle({
  cursor: "default",
})

const baseStyleItem = defineStyle({
  h: "10",
  minW: "10",
  fontSize: "md",
  px: "4",

  display: "inline-flex",
  appearance: "none",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  position: "relative",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  outline: "none",

  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline",
  },

  border: "1px solid",
  [$borderColor.variable]: "colors.gray.200",
  borderColor: $borderColor.reference,

  [$color.variable]: "inherit",

  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },

  _hover: {
    [$bg.variable]: "colors.gray.100",
    _dark: {
      [$bg.variable]: "colors.whiteAlpha.200",
    },
    _disabled: {
      bg: "initial",
    },
  },
  _selected: {
    [$bg.variable]: "colors.gray.100",
    _hover: {
      [$bg.variable]: "colors.gray.200",
      _dark: {
        [$bg.variable]: "colors.whiteAlpha.300",
      },
    },
    _dark: {
      [$bg.variable]: "colors.whiteAlpha.200",
      [$color.variable]: "colors.gray.800",
    },
  },

  color: $color.reference,
  bg: $bg.reference,
  _dark: {
    [$borderColor.variable]: "colors.whiteAlpha.300",
    [$color.variable]: "colors.whiteAlpha.900",
  },
})

const baseStyle = definePartsStyle({
  root: baseStyleRoot,
  list: baseStyleList,
  ellipsis: baseStyleEllipsis,
  item: baseStyleItem,
  prevItem: baseStyleItem,
  nextItem: baseStyleItem,
})

export const paginationTheme = defineMultiStyleConfig({
  baseStyle,
})
