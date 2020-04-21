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
  outline,
} from "./configs"
import { pseudoPropNames } from "./pseudo"

export const parser = combineParsers(
  background,
  border,
  color,
  flexbox,
  layout,
  outline,
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
