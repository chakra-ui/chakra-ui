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

export const layoutPropNames = combineParsers(
  space,
  layout,
  flexbox,
  grid,
  position,
) as {
  propNames: string[]
}

export const propNames = [...parser.propNames, ...pseudoPropNames]
