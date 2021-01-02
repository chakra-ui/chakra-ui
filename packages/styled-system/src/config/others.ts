import * as CSS from "csstype"
import { Config, createParser, PropConfig, system } from "../core"
import { getIsRtl } from "../utils/directionality"
import { Length, ResponsiveValue } from "../utils/types"
import { ThemeTypings } from "../theming.types"

const floatTransform: PropConfig["transform"] = (value, _, props = {}) => {
  const map = { left: "right", right: "left" }
  return getIsRtl(props) ? map[value] : value
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

const config: Config = {
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
    property: "&",
    transform(value) {
      if (value === true) return srOnly
      if (value === "focusable") return srFocusable
      return {}
    },
  },
}

export interface OtherProps<Theme extends ThemeTypings = ThemeTypings> {
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
  objectPosition?: ResponsiveValue<
    Theme["sizes"] | CSS.Property.ObjectPosition<Length>
  >
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
}

export const others = system(config)
export const othersParser = createParser(config)
