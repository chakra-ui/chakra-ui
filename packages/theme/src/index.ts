import { ColorModeOptions } from "@chakra-ui/system"
import components from "./components"
import foundations from "./foundations"
import styles from "./styles"

/**
 * Color mode config
 */
const config: ColorModeOptions = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

export const theme = {
  ...foundations,
  components,
  styles,
  config,
}

export type Theme = typeof theme

export default theme
