import _css from "@styled-system/css"
import { transformProps } from "./system/custom"
import { replacePseudo } from "./system/pseudo"

export const css = (styles: object): any =>
  _css(transformProps(replacePseudo(styles)))

export const layoutPropNames = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginY",
  "marginX",
  "flex",
  "flexBasis",
  "width",
  "minWidth",
  "maxWidth",
  "maxW",
  "minW",
  "w",
  "zIndex",
  "top",
  "right",
  "bottom",
  "left",
  "position",
  "pos",
] as const

export default css
