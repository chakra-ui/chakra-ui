import foundations from "./foundations"
import components, { accordionStyles } from "./components"
import styles from "./styles"
import { ColorModeOptions } from "@chakra-ui/system"

/**
 * Color mode config
 */
const config: ColorModeOptions = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

const theme = {
  ...foundations,
  components,
  styles,
  config,
}

export type Theme = typeof theme

export default theme

export { accordionStyles }
