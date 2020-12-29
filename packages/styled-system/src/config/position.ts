import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Length, positiveOrNegative, ResponsiveValue, t } from "../utils"
import { PropsPath } from "../utils.types"
import { ChakraTheme } from ".."

const config: Config = {
  position: true,
  pos: t.prop("position"),
  zIndex: { property: "zIndex", scale: "zIndices" },
  inset: t.spaceT(["top", "right", "bottom", "left"]),
  insetX: t.spaceT(["left", "right"]),
  insetInline: t.spaceT("insetInline"),
  insetY: t.spaceT(["top", "bottom"]),
  insetBlock: t.spaceT("insetBlock"),
  top: t.spaceT("top"),
  insetBlockStart: t.spaceT("insetBlockStart"),
  bottom: t.spaceT("bottom"),
  insetBlockEnd: t.spaceT("insetBlockEnd"),
  left: t.spaceT("left"),
  insetInlineStart: t.logical({
    scale: "space",
    property: {
      ltr: "left",
      rtl: "right",
    },
    transform: positiveOrNegative,
  }),
  right: t.spaceT("right"),
  insetInlineEnd: t.logical({
    scale: "space",
    property: {
      ltr: "right",
      rtl: "left",
    },
    transform: positiveOrNegative,
  }),
}

Object.assign(config, {
  insetStart: config.insetInlineStart,
  insetEnd: config.insetInlineEnd,
})

/**
 * Types for position CSS properties
 */
export interface PositionProps<Theme extends ChakraTheme = ChakraTheme> {
  /**
   * The CSS `z-index` property
   */
  zIndex?: ResponsiveValue<string | CSS.Property.ZIndex>
  /**
   * The CSS `top` property
   */
  top?: ResponsiveValue<CSS.Property.Top<Length> & PropsPath<Theme["sizes"]>>
  insetBlockStart?: ResponsiveValue<
    CSS.Property.InsetBlockStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `right` property
   */
  right?: ResponsiveValue<
    CSS.Property.Right<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When the direction is `ltr`, `insetInlineEnd` is equivalent to `right`.
   * When the direction is `rtl`, `insetInlineEnd` is equivalent to `left`.
   */
  insetInlineEnd?: ResponsiveValue<
    CSS.Property.InsetInlineEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When the direction is `ltr`, `insetEnd` is equivalent to `right`.
   * When the direction is `rtl`, `insetEnd` is equivalent to `left`.
   */
  insetEnd?: ResponsiveValue<
    CSS.Property.InsetInlineEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `bottom` property
   */
  bottom?: ResponsiveValue<
    CSS.Property.Bottom<Length> & PropsPath<Theme["sizes"]>
  >
  insetBlockEnd?: ResponsiveValue<
    CSS.Property.InsetBlockEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `left` property
   */
  left?: ResponsiveValue<CSS.Property.Left<Length> & PropsPath<Theme["sizes"]>>
  insetInlineStart?: ResponsiveValue<
    CSS.Property.InsetInlineStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When the direction is `start`, `end` is equivalent to `left`.
   * When the direction is `start`, `end` is equivalent to `right`.
   */
  insetStart?: ResponsiveValue<
    CSS.Property.InsetInlineStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `left`, `right`, `top`, `bottom` property
   */
  inset?: ResponsiveValue<CSS.Property.Left<Length> & PropsPath<Theme["sizes"]>>
  /**
   * The CSS `left`, and `right` property
   */
  insetX?: ResponsiveValue<
    CSS.Property.Left<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `top`, and `bottom` property
   */
  insetY?: ResponsiveValue<
    CSS.Property.Left<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `position` property
   */
  pos?: ResponsiveValue<CSS.Property.Position>
  /**
   * The CSS `position` property
   */
  position?: ResponsiveValue<CSS.Property.Position>
  insetInline?: ResponsiveValue<CSS.Property.InsetInline>
  insetBlock?: ResponsiveValue<CSS.Property.InsetBlock>
}

export const position = system(config)
export const positionParser = createParser(config)
