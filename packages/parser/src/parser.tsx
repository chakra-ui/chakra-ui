import { combineParsers } from "./combine-parser"
import background from "./configs/background"
import border from "./configs/border"
import color from "./configs/color"
import flexbox from "./configs/flexbox"
import grid from "./configs/grid"
import others from "./configs/others"
import position from "./configs/position"
import shadow from "./configs/shadow"
import space from "./configs/space"
import typography from "./configs/typography"

const parser = combineParsers(
  background,
  border,
  color,
  flexbox,
  grid,
  others,
  position,
  shadow,
  space,
  typography,
)

export default parser
