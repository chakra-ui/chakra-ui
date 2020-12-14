import { Config, createParser, system } from "@styled-system/core"
import * as CSS from "csstype"
import { Length, t, ResponsiveValue } from "../utils"

const config: Config = {
  position: true,
  pos: t.prop("position"),
  zIndex: { property: "zIndex", scale: "zIndices" },
  inset: t.spaceT("inset"),
  insetX: t.spaceT(["left", "right"]),
  insetInline: t.spaceT("insetInline"),
  insetY: t.spaceT(["top", "bottom"]),
  insetBlock: t.spaceT("insetBlock"),
  top: t.spaceT("top"),
  insetBlockStart: t.spaceT("insetBlockStart"),
  bottom: t.spaceT("bottom"),
  insetBlockEnd: t.spaceT("insetBlockEnd"),
  left: t.spaceT("left"),
  insetInlineStart: t.spaceT("insetInlineStart"),
  right: t.spaceT("right"),
  insetInlineEnd: t.spaceT("insetInlineEnd"),
}

config.topBidi = config.insetBlockStart
config.bottomBidi = config.insetBlockEnd
config.leftBidi = config.insetInlineStart
config.rightBidi = config.insetInlineEnd

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
  top?: ResponsiveValue<CSS.Property.Top<Length>>
  insetBlockStart?: ResponsiveValue<CSS.Property.InsetBlockStart<Length>>
  topBidi?: ResponsiveValue<CSS.Property.InsetBlockStart<Length>>
  /**
   * The CSS `right` property
   */
  right?: ResponsiveValue<CSS.Property.Right<Length>>
  insetInlineEnd?: ResponsiveValue<CSS.Property.InsetInlineEnd<Length>>
  rightBidi?: ResponsiveValue<CSS.Property.InsetInlineEnd<Length>>
  /**
   * The CSS `bottom` property
   */
  bottom?: ResponsiveValue<CSS.Property.Bottom<Length>>
  insetBlockEnd?: ResponsiveValue<CSS.Property.InsetBlockEnd<Length>>
  bottomBidi?: ResponsiveValue<CSS.Property.InsetBlockEnd<Length>>
  /**
   * The CSS `left` property
   */
  left?: ResponsiveValue<CSS.Property.Left<Length>>
  insetInlineStart?: ResponsiveValue<CSS.Property.InsetInlineStart<Length>>
  leftBidi?: ResponsiveValue<CSS.Property.InsetInlineStart<Length>>
  /**
   * The CSS `left`, `right`, `top`, `bottom` property
   */
  inset?: ResponsiveValue<CSS.Property.Left<Length>>
  /**
   * The CSS `left`, and `right` property
   */
  insetX?: ResponsiveValue<CSS.Property.Left<Length>>
  /**
   * The CSS `top`, and `bottom` property
   */
  insetY?: ResponsiveValue<CSS.Property.Left<Length>>
  /**
   * The CSS `position` property
   */
  pos?: ResponsiveValue<CSS.Property.Position>
  /**
   * The CSS `position` property
   */
  position?: ResponsiveValue<CSS.Property.Position>
  insetInline: ResponsiveValue<CSS.Property.InsetInline>
  insetBlock: ResponsiveValue<CSS.Property.InsetBlock>
}

export const position = system(config)
export const positionParser = createParser(config)
