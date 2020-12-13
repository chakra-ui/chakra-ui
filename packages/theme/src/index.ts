import { ColorModeOptions } from "@chakra-ui/system"
import components from "./components"
import foundations, { Foundations } from "./foundations"
import styles from "./styles"

export interface ThemeConfig extends ColorModeOptions {}

export type ThemeDirection = "ltr" | "rtl"
const direction: ThemeDirection = "ltr"

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

export const theme = {
  direction,
  ...foundations,
  components,
  styles,
  config,
}

export interface Theme extends Foundations {
  direction: ThemeDirection
  components: typeof components
  styles: typeof styles
  config: ThemeConfig
}

export default theme
