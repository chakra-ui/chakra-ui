import { mergeWith, objectKeys } from "@chakra-ui/utils"
import {
  background,
  border,
  color,
  flexbox,
  filter,
  grid,
  layout,
  list,
  others,
  ring,
  position,
  effect,
  space,
  transform,
  transition,
  typography,
} from "./config"
import { pseudoPropNames, pseudoSelectors } from "./pseudos"

export const systemProps = mergeWith(
  {},
  background,
  border,
  color,
  flexbox,
  layout,
  filter,
  ring,
  grid,
  others,
  position,
  effect,
  space,
  typography,
  transform,
  list,
  transition,
)

const layoutSystem = mergeWith({}, space, layout, flexbox, grid, position)
export const layoutPropNames = objectKeys(layoutSystem)

export const propNames = [...objectKeys(systemProps), ...pseudoPropNames]

const styleProps = { ...systemProps, ...pseudoSelectors }

export const isStyleProp = (prop: string) => prop in styleProps
