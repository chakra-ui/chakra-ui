import { memoizedGet as get } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { Config } from "../prop-config"
import { Transform } from "../types"
import { Length, ResponsiveValue, Token } from "../utils"

const floatTransform: Transform = (value, theme) => {
  const map = { left: "right", right: "left" }
  return theme.direction === "rtl" ? map[value] : value
}

const srOnly = {
  border: "0px",
  clip: "rect(0, 0, 0, 0)",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
}

const srFocusable = {
  position: "static",
  width: "auto",
  height: "auto",
  clip: "auto",
  padding: "0",
  margin: "0",
  overflow: "visible",
  whiteSpace: "normal",
}

const getWithPriority = (theme: any, key: any, styles: any) => {
  const result = {}
  const obj = get(theme, key, {})
  for (const prop in obj) {
    const isInStyles = prop in styles && styles[prop] != null
    if (!isInStyles) result[prop] = obj[prop]
  }
  return result
}

export const others: Config = {
  animation: true,
  appearance: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  objectFit: true,
  objectPosition: true,
  float: {
    property: "float",
    transform: floatTransform,
  },
  willChange: true,
  filter: true,
  clipPath: true,
  srOnly: {
    transform(value) {
      if (value === true) return srOnly
      if (value === "focusable") return srFocusable
      return {}
    },
  },
  layerStyle: {
    processResult: true,
    transform: (value, theme, styles) =>
      getWithPriority(theme, `layerStyles.${value}`, styles),
  },
  textStyle: {
    processResult: true,
    transform: (value, theme, styles) =>
      getWithPriority(theme, `textStyles.${value}`, styles),
  },
  apply: {
    processResult: true,
    transform: (value, theme, styles) => getWithPriority(theme, value, styles),
  },
}

export interface OtherProps {
  /**
   * The CSS `animation` property
   */
  animation?: ResponsiveValue<CSS.Property.Animation>
  /**
   * The CSS `appearance` property
   */
  appearance?: ResponsiveValue<CSS.Property.Appearance>
  /**
   * The CSS `visibility` property
   */
  visibility?: ResponsiveValue<CSS.Property.Visibility>
  /**
   * The CSS `user-select` property
   */
  userSelect?: ResponsiveValue<CSS.Property.UserSelect>
  /**
   * The CSS `pointer-events` property
   */
  pointerEvents?: ResponsiveValue<CSS.Property.PointerEvents>
  /**
   * The CSS `cursor` property
   */
  cursor?: ResponsiveValue<CSS.Property.Cursor>
  /**
   * The CSS `resize` property
   */
  resize?: ResponsiveValue<CSS.Property.Resize>
  /**
   * The CSS `object-fit` property
   */
  objectFit?: ResponsiveValue<CSS.Property.ObjectFit>
  /**
   * The CSS `object-position` property
   */
  objectPosition?: ResponsiveValue<CSS.Property.ObjectPosition<Length>>
  /**
   * The CSS `float` property
   */
  float?: ResponsiveValue<CSS.Property.Float>
  /**
   * The CSS `will-change` property
   */
  willChange?: ResponsiveValue<CSS.Property.WillChange>
  /**
   * The CSS `filter` property
   */
  filter?: ResponsiveValue<CSS.Property.Filter>
  /**
   * If `true`, hide an element visually without hiding it from screen readers.
   *
   * If `focusable`, the sr-only styles will be undone, making the element visible
   * to sighted users as well as screen readers.
   */
  srOnly?: true | "focusable"
  /**
   * The CSS `clip-path` property.
   *
   * It creates a clipping region that sets what part of an element should be shown.
   */
  clipPath?: ResponsiveValue<CSS.Property.ClipPath>
  /**
   * The layer style object to apply.
   * Note: Styles must be located in `theme.layerStyles`
   */
  layerStyle?: Token<string & {}, "layerStyles">
  /**
   * The text style object to apply.
   * Note: Styles must be located in `theme.textStyles`
   */
  textStyle?: Token<string & {}, "textStyles">
  /**
   * Apply theme-aware style objects in `theme`
   */
  apply?: ResponsiveValue<string>
}
