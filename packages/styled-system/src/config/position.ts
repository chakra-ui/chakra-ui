import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Length, positiveOrNegative, ResponsiveValue, t } from "../utils"
import { ThemeTypings } from "../theming.types"

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
export interface PositionProps<Theme extends ThemeTypings = ThemeTypings> {
  /**
   * The CSS `z-index` property
   */
  zIndex?: ResponsiveValue<string | CSS.Property.ZIndex>
  /**
   * The CSS `top` property
   */
  top?: ResponsiveValue<Theme["sizes"] | CSS.Property.Top<Length>>
  insetBlockStart?: ResponsiveValue<
    Theme["sizes"] | CSS.Property.InsetBlockStart<Length>
  >
  /**
   * The CSS `right` property
   */
  right?: ResponsiveValue<Theme["sizes"] | CSS.Property.Right<Length>>
  /**
   * When the direction is `ltr`, `insetInlineEnd` is equivalent to `right`.
   * When the direction is `rtl`, `insetInlineEnd` is equivalent to `left`.
   */
  insetInlineEnd?: ResponsiveValue<
    Theme["sizes"] | CSS.Property.InsetInlineEnd<Length>
  >
  /**
   * When the direction is `ltr`, `insetEnd` is equivalent to `right`.
   * When the direction is `rtl`, `insetEnd` is equivalent to `left`.
   */
  insetEnd?: ResponsiveValue<
    Theme["sizes"] | CSS.Property.InsetInlineEnd<Length>
  >
  /**
   * The CSS `bottom` property
   */
  bottom?: ResponsiveValue<Theme["sizes"] | CSS.Property.Bottom<Length>>
  insetBlockEnd?: ResponsiveValue<
    Theme["sizes"] | CSS.Property.InsetBlockEnd<Length>
  >
  /**
   * The CSS `left` property
   */
  left?: ResponsiveValue<Theme["sizes"] | CSS.Property.Left<Length>>
  insetInlineStart?: ResponsiveValue<
    Theme["sizes"] | CSS.Property.InsetInlineStart<Length>
  >
  /**
   * When the direction is `start`, `end` is equivalent to `left`.
   * When the direction is `start`, `end` is equivalent to `right`.
   */
  insetStart?: ResponsiveValue<
    Theme["sizes"] | CSS.Property.InsetInlineStart<Length>
  >
  /**
   * The CSS `left`, `right`, `top`, `bottom` property
   */
  inset?: ResponsiveValue<Theme["sizes"] | CSS.Property.Left<Length>>
  /**
   * The CSS `left`, and `right` property
   */
  insetX?: ResponsiveValue<Theme["sizes"] | CSS.Property.Left<Length>>
  /**
   * The CSS `top`, and `bottom` property
   */
  insetY?: ResponsiveValue<Theme["sizes"] | CSS.Property.Left<Length>>
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
