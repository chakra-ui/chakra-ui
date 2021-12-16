import { mergeWith, objectKeys, omit } from "@chakra-ui/utils"
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
  othersPropNames,
  position,
  ring,
  space,
  textDecoration,
  transform,
  transition,
  typography,
} from "./config"
import { pseudoPropNames } from "./pseudos"
import { Config } from "./utils/prop-config"

export const systemProps: Config = mergeWith(
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
  typography,
  textDecoration,
  transform,
  list,
  transition,
)

const layoutSystem = Object.assign({}, space, layout, flexbox, grid, position)
export const layoutPropNames = objectKeys(layoutSystem)

export const propNames = [...objectKeys(systemProps), ...pseudoPropNames]

export const stylePropNames = [
  ...objectKeys(omit(systemProps, othersPropNames)),
  ...pseudoPropNames,
]
