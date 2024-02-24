import {
  defineStyle,
  defineStyleConfig,
} from "../../../components/src/styled-system"

const baseStyle = defineStyle({
  bg: "transparent",
  whiteSpace: "nowrap",
})

export const markTheme = defineStyleConfig({
  baseStyle,
})
