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
export interface PositionProps {
  /**
   * The CSS `z-index` property
   */
  zIndex?: ResponsiveValue<string | CSS.Property.ZIndex>
  /**
   * The CSS `top` property
   */
  top?: ResponsiveValue<CSS.Property.Top<ThemeTypings["sizes"] | Length>>
  insetBlockStart?: ResponsiveValue<
    CSS.Property.InsetBlockStart<ThemeTypings["sizes"] | Length>
  >
  /**
   * The CSS `right` property
   */
  right?: ResponsiveValue<CSS.Property.Right<ThemeTypings["sizes"] | Length>>
  /**
   * When the direction is `ltr`, `insetInlineEnd` is equivalent to `right`.
   * When the direction is `rtl`, `insetInlineEnd` is equivalent to `left`.
   */
  insetInlineEnd?: ResponsiveValue<
    CSS.Property.InsetInlineEnd<ThemeTypings["sizes"] | Length>
  >
  /**
   * When the direction is `ltr`, `insetEnd` is equivalent to `right`.
   * When the direction is `rtl`, `insetEnd` is equivalent to `left`.
   */
  insetEnd?: ResponsiveValue<
    CSS.Property.InsetInlineEnd<ThemeTypings["sizes"] | Length>
  >
  /**
   * The CSS `bottom` property
   */
  bottom?: ResponsiveValue<CSS.Property.Bottom<ThemeTypings["sizes"] | Length>>
  insetBlockEnd?: ResponsiveValue<
    CSS.Property.InsetBlockEnd<ThemeTypings["sizes"] | Length>
  >
  /**
   * The CSS `left` property
   */
  left?: ResponsiveValue<CSS.Property.Left<ThemeTypings["sizes"] | Length>>
  insetInlineStart?: ResponsiveValue<
    CSS.Property.InsetInlineStart<ThemeTypings["sizes"] | Length>
  >
  /**
   * When the direction is `start`, `end` is equivalent to `left`.
   * When the direction is `start`, `end` is equivalent to `right`.
   */
  insetStart?: ResponsiveValue<
    CSS.Property.InsetInlineStart<ThemeTypings["sizes"] | Length>
  >
  /**
   * The CSS `left`, `right`, `top`, `bottom` property
   */
  inset?: ResponsiveValue<CSS.Property.Left<ThemeTypings["sizes"] | Length>>
  /**
   * The CSS `left`, and `right` property
   */
  insetX?: ResponsiveValue<CSS.Property.Left<ThemeTypings["sizes"] | Length>>
  /**
   * The CSS `top`, and `bottom` property
   */
  insetY?: ResponsiveValue<CSS.Property.Left<ThemeTypings["sizes"] | Length>>
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
