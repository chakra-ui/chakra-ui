import { mergeWith } from "@chakra-ui/utils/merge"
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
import { getPseudoPropNames, getPseudoSelectors } from "./pseudos"

export const systemProps = mergeWith(
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

export const getPropNames = (theme: any) => [
  ...Object.keys(systemProps),
  ...getPseudoPropNames(theme),
]

export const isStylePropFn = (theme: any) => {
  const pseudoSelectors = getPseudoSelectors(theme)
  return (prop: string) => {
    const styleProps = { ...systemProps, ...pseudoSelectors }
    return Object.hasOwnProperty.call(styleProps, prop)
  }
}
