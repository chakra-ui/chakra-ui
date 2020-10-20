import { compose } from "@styled-system/core"
import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  list,
  others,
  outline,
  position,
  shadow,
  space,
  transform,
  transition,
  typography,
} from "./config"
import { pseudoPropNames } from "./pseudo"

export const systemProps = compose(
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
  transform,
  list,
  transition,
)

const layoutSystem = compose(space, layout, flexbox, grid, position)
export const layoutPropNames = layoutSystem.propNames

export const propNames = [...systemProps.propNames, ...pseudoPropNames]
