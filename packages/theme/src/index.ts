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

export const theme = {
  ...foundations,
  components,
  styles,
  config,
}

export type Theme = typeof theme

export default theme
