import * as CSS from "csstype"
import { Config } from "../prop-config"
import { Length, ResponsiveValue, t, Token } from "../utils"

/**
 * The parser configuration for common outline properties
 */
export const outline: Config = {
  outline: true,
  outlineOffset: true,
  outlineColor: t.colors("outlineColor"),
  ringColor: t.prop("--chakra-ring-color", "colors"),
  ringOffsetWidth: t.prop("--chakra-ring-offset"),
  ringOffsetColor: t.prop("--chakra-ring-offset-color", "colors"),
  ringWidth: t.prop("--chakra-ring-offset"),
  ringInset: t.prop("--chakra-ring-inset"),
}

export interface OutlineProps {
  /**
   * The CSS `outline` property
   */
  outline?: ResponsiveValue<CSS.Property.Outline<Length>>
  /**
   * The CSS `outline-offset` property
   */
  outlineOffset?: ResponsiveValue<CSS.Property.OutlineOffset<Length>>
  /**
   * The CSS `outline-color` property
   */
  outlineColor?: Token<CSS.Property.Color, "colors">
  /**
   * The color of the outline ring
   */
  ringColor?: Token<CSS.Property.Color, "colors">
  /**
   * The thickness of the offset shadow when using outline rings
   */
  ringOffsetWidth?: Token<CSS.Property.OutlineOffset>
  /**
   * The color of the offset shadow when adding outline rings
   */
  ringOffsetColor?: Token<CSS.Property.Color, "colors">
  /**
   * The thickness of the outline rings
   */
  ringWidth?: Token<CSS.Property.OutlineWidth>
  /**
   * If the outline ring should an `inset`
   */
  ringInset?: "inset"
}
