import borders from "./borders"
import breakpoints from "./breakpoints"
import colors from "./colors"
import radii from "./radius"
import shadows from "./shadows"
import sizes from "./sizes"
import { spacing } from "./spacing"
import transition from "./transition"
import typography from "./typography"
import zIndices from "./z-index"

const theme = {
  breakpoints,
  zIndices,
  radii,
  colors,
  ...typography,
  sizes,
  shadows,
  space: spacing,
  borders,
  transition,
}

export type Theme = typeof theme

export default theme
