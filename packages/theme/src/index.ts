import components from "./components"
import foundations from "./foundations"
import styles from "./styles"
import { ChakraTheme, ThemeConfig, ThemeDirection } from "./theme.types"

const direction: ThemeDirection = "ltr"

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

const defaultTheme = {
  direction,
  ...foundations,
  components,
  styles,
  config,
}

export const theme: ChakraTheme = defaultTheme

export type DefaultChakraTheme = typeof defaultTheme

export * from "./theme.types"

export default theme
