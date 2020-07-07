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
} from "./config"
import { pseudoPropNames } from "./pseudo"
import { compose } from "@styled-system/core"

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
)

const layoutSystem = compose(space, layout, flexbox, grid, position)
export const layoutPropNames = layoutSystem.propNames

export const propNames = [...systemProps.propNames, ...pseudoPropNames]
