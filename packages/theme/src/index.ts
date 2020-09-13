import foundations from "./foundations"
import components from "./components"
import styles from "./styles"

export {
  Breakpoints,
  BaseBreakpointConfig,
  createBreakpoints,
} from "@chakra-ui/theme-tools"

export const theme = {
  ...foundations,
  components,
  styles,
}

export type Theme = typeof theme

export default theme
