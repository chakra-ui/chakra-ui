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
import layout from "./configs/layout"
import { pseudoPropNames } from "./configs/pseudo.selector"

export const parser = combineParsers(
  background,
  border,
  color,
  flexbox,
  layout,
  grid,
  others,
  position,
  shadow,
  space,
  typography,
)

export const propNames = [...parser.propNames, ...pseudoPropNames]

export default parser
