import breakpoints from "./breakpoints"
import colors from "./colors"
import radii from "./radius"
import shadows from "./shadows"
import sizes, { baseSizes } from "./sizes"
import typography from "./typography"
import zIndices from "./z-index"

const space = baseSizes

const theme = {
  breakpoints,
  zIndices,
  radii,
  colors,
  ...typography,
  sizes,
  shadows,
  space,
}

export type Theme = typeof theme

export default theme
