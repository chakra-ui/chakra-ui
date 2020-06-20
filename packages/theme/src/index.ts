import foundations from "./foundations"
import components from "./components"
import styles from "./styles"

const theme = {
  ...foundations,
  components,
  styles,
}

export type Theme = typeof theme

export default theme
