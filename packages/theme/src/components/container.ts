import {
  defineStyle,
  defineStyleConfig,
} from "../../../components/src/styled-system"

const baseStyle = defineStyle({
  w: "100%",
  mx: "auto",
  maxW: "prose",
  px: "4",
})

export const containerTheme = defineStyleConfig({
  baseStyle,
})
