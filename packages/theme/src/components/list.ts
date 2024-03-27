import { listAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleIcon = defineStyle({
  marginEnd: "2",
  display: "inline",
  verticalAlign: "text-bottom",
})

const baseStyleRoot = defineStyle({
  display: "flex",
  flexDirection: "column",
})

const baseStyleItem = defineStyle({
  "--align": "flex-start",
  display: "inline-flex",
  alignItems: "var(--align)",
  whiteSpace: "normal",
  "&:has(svg)": {
    "--align": "center",
  },
})

const baseStyle = definePartsStyle({
  root: baseStyleRoot,
  icon: baseStyleIcon,
  item: baseStyleItem,
})

export const listTheme = defineMultiStyleConfig({
  baseStyle,
})
