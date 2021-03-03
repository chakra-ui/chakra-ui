import { mergeWith, objectKeys } from "@chakra-ui/utils"
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
import { pseudoPropNames, pseudoSelectors } from "./pseudos"

export const systemProps = mergeWith(
  {},
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

const layoutSystem = mergeWith({}, space, layout, flexbox, grid, position)
export const layoutPropNames = objectKeys(layoutSystem)

export const propNames = [...objectKeys(systemProps), ...pseudoPropNames]

const styleProps = { ...systemProps, ...pseudoSelectors }

export const isStyleProp = (prop: string) => prop in styleProps
