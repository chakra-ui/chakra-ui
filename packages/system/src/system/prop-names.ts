import {
  compose,
  space,
  typography,
  color,
  layout,
  flexbox,
  border,
  background,
  position,
  grid,
  shadow,
  buttonStyle,
  textStyle,
  colorStyle,
} from "styled-system"
import customProps from "./custom/custom"
import selectors from "./pseudo/pseudo.selectors"

const SS = compose(
  space,
  typography,
  color,
  layout,
  flexbox,
  border,
  background,
  position,
  grid,
  shadow,
  buttonStyle,
  textStyle,
  colorStyle,
)

const pseudoPropNames = Object.keys(selectors).map(prop => `_${prop}`)

let propNames: string[] = []

if (SS.propNames) {
  propNames = propNames.concat(SS.propNames)
}

if (customProps.propNames) {
  propNames = propNames.concat(customProps.propNames)
}

propNames = propNames.concat(
  pseudoPropNames,
  "variant",
  "variantColor",
  "variantSize",
  "orientation",
)

export default propNames
