import { combineParsers } from "./combine-parser"
import {
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
  layout,
  pseudoPropNames,
} from "./configs"

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

const layoutParser = combineParsers(space, layout, flexbox, grid, position)

export const layoutPropNames = layoutParser.propNames

export const propNames = [...parser.propNames, ...pseudoPropNames]
