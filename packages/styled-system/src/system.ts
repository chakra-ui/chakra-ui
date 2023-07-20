import {
  background,
  border,
  color,
  effect,
  filter,
  flexbox,
  grid,
  interactivity,
  layout,
  list,
  others,
  position,
  ring,
  scroll,
  space,
  textDecoration,
  transform,
  transition,
  typography,
} from "./config"
import { pseudoPropNames, pseudoSelectors } from "./pseudos"

export const systemProps = Object.assign(
  {},
  background,
  border,
  color,
  flexbox,
  layout,
  filter,
  ring,
  interactivity,
  grid,
  others,
  position,
  effect,
  space,
  scroll,
  typography,
  textDecoration,
  transform,
  list,
  transition,
)

const layoutSystem = Object.assign({}, space, layout, flexbox, grid, position)

export const layoutPropNames = Object.keys(
  layoutSystem,
) as (keyof typeof layoutSystem)[]

export const propNames = [...Object.keys(systemProps), ...pseudoPropNames]
const styleProps = { ...systemProps, ...pseudoSelectors }

export const isStyleProp = (prop: string) => prop in styleProps
