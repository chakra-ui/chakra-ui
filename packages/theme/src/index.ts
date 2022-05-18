import components from "./components"
import foundations from "./foundations"
import { semanticTokens } from "./semantic-tokens"
import styles from "./styles"
import type { ThemeConfig, ThemeDirection } from "./theme.types"

const direction: ThemeDirection = "ltr"

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "chakra",
}

export const theme = {
  semanticTokens,
  direction,
  ...foundations,
  components,
  styles,
  config,
}

export type Theme = typeof theme

export * from "./theme.types"
export * from "./utils"

export default theme
