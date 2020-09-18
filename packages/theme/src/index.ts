import foundations from "./foundations"
import components from "./components"
import styles from "./styles"
import { ColorModeOptions } from "@chakra-ui/system"

/**
 * Color mode config
 */
const config: ColorModeOptions = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

export type { Breakpoints, BaseBreakpointConfig } from "@chakra-ui/theme-tools"
export { createBreakpoints } from "@chakra-ui/theme-tools"

export const theme = {
  ...foundations,
  components,
  styles,
  config,
}

export type Theme = typeof theme

export default theme
