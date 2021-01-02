import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Length, ResponsiveValue, t } from "../utils"
import { ThemeTypings } from "../theming.types"

const config: Config = {
  margin: t.spaceT("margin"),
  marginTop: t.spaceT("marginTop"),
  marginBlockStart: t.spaceT("marginBlockStart"),
  marginRight: t.spaceT("marginRight"),
  marginInlineEnd: t.spaceT("marginInlineEnd"),
  marginBottom: t.spaceT("marginBottom"),
  marginBlockEnd: t.spaceT("marginBlockEnd"),
  marginLeft: t.spaceT("marginLeft"),
  marginInlineStart: t.spaceT("marginInlineStart"),
  marginX: t.spaceT(["marginLeft", "marginRight"]),
  marginInline: t.spaceT("marginInline"),
  marginY: t.spaceT(["marginTop", "marginBottom"]),
  marginBlock: t.spaceT("marginBlock"),
  padding: t.space("padding"),
  paddingTop: t.space("paddingTop"),
  paddingBlockStart: t.space("paddingBlockStart"),
  paddingRight: t.space("paddingRight"),
  paddingBottom: t.space("paddingBottom"),
  paddingBlockEnd: t.space("paddingBlockEnd"),
  paddingLeft: t.space("paddingLeft"),
  paddingInlineStart: t.space("paddingInlineStart"),
  paddingInlineEnd: t.space("paddingInlineEnd"),
  paddingX: t.space(["paddingLeft", "paddingRight"]),
  paddingInline: t.space("paddingInline"),
  paddingY: t.space(["paddingTop", "paddingBottom"]),
  paddingBlock: t.space("paddingBlock"),
}

Object.assign(config, {
  m: config.margin,
  mt: config.marginTop,
  mr: config.marginRight,
  me: config.marginInlineEnd,
  marginEnd: config.marginInlineEnd,
  mb: config.marginBottom,
  ml: config.marginLeft,
  ms: config.marginInlineStart,
  marginStart: config.marginInlineStart,
  mx: config.marginX,
  my: config.marginY,
  p: config.padding,
  pt: config.paddingTop,
  py: config.paddingY,
  px: config.paddingX,
  pb: config.paddingBottom,
  pl: config.paddingLeft,
  ps: config.paddingInlineStart,
  paddingStart: config.paddingInlineStart,
  pr: config.paddingRight,
  pe: config.paddingInlineEnd,
  paddingEnd: config.paddingInlineEnd,
})

/**
 * Types for space related CSS properties
 */
export interface SpaceProps<Theme extends ThemeTypings = ThemeTypings> {
  /**
   * Margin on top, left, bottom and right
   */
  m?: ResponsiveValue<Theme["space"] | CSS.Property.Margin<Length>>
  /**
   * Margin on top, left, bottom and right
   */
  margin?: ResponsiveValue<Theme["space"] | CSS.Property.Margin<Length>>
  /**
   * Margin on top
   */
  mt?: ResponsiveValue<Theme["space"] | CSS.Property.Margin<Length>>
  marginBlockStart?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginBlockStart<Length>
  >
  /**
   * Margin on top
   */
  marginTop?: ResponsiveValue<Theme["space"] | CSS.Property.MarginTop<Length>>
  /**
   * Margin on right
   */
  mr?: ResponsiveValue<Theme["space"] | CSS.Property.MarginRight<Length>>
  /**
   * When direction is `ltr`, `marginInlineEnd` is equivalent to `marginRight`.
   * When direction is `rtl`, `marginInlineEnd` is equivalent to `marginLeft`.
   */
  marginInlineEnd?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginInlineEnd<Length>
  >
  /**
   * When direction is `ltr`, `marginEnd` is equivalent to `marginRight`.
   * When direction is `rtl`, `marginEnd` is equivalent to `marginLeft`.
   */
  marginEnd?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginInlineEnd<Length>
  >
  /**
   * When direction is `ltr`, `me` is equivalent to `marginRight`.
   * When direction is `rtl`, `me` is equivalent to `marginLeft`.
   */
  me?: ResponsiveValue<Theme["space"] | CSS.Property.MarginInlineEnd<Length>>
  /**
   * Margin on right
   */
  marginRight?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginRight<Length>
  >
  /**
   * Margin on bottom
   */
  mb?: ResponsiveValue<Theme["space"] | CSS.Property.MarginBottom<Length>>
  marginBlockEnd?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginBlockEnd<Length>
  >
  /**
   * Margin on bottom
   */
  marginBottom?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginBottom<Length>
  >
  /**
   * Margin on left
   */
  ml?: ResponsiveValue<Theme["space"] | CSS.Property.MarginLeft<Length>>
  /**
   * When direction is `ltr`, `marginInlineStart` is equivalent to `marginLeft`.
   * When direction is `rtl`, `marginInlineStart` is equivalent to `marginRight`.
   */
  marginInlineStart?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginInlineStart<Length>
  >
  /**
   * When direction is `ltr`, `marginStart` is equivalent to `marginLeft`.
   * When direction is `rtl`, `marginStart` is equivalent to `marginRight`.
   */
  marginStart?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginInlineStart<Length>
  >
  /**
   * When direction is `ltr`, `ms` is equivalent to `marginLeft`.
   * When direction is `rtl`, `ms` is equivalent to `marginRight`.
   */
  ms?: ResponsiveValue<Theme["space"] | CSS.Property.MarginInlineStart<Length>>
  /**
   * Margin on left
   */
  marginLeft?: ResponsiveValue<Theme["space"] | CSS.Property.MarginLeft<Length>>
  /**
   * Margin on left and right
   */
  mx?: ResponsiveValue<Theme["space"] | CSS.Property.Margin<Length>>
  marginInline?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginInline<Length>
  >
  /**
   * Margin on left and right
   */
  marginX?: ResponsiveValue<Theme["space"] | CSS.Property.Margin<Length>>
  /**
   * Margin on top and bottom
   */
  my?: ResponsiveValue<Theme["space"] | CSS.Property.Margin<Length>>
  marginBlock?: ResponsiveValue<
    Theme["space"] | CSS.Property.MarginBlock<Length>
  >
  /**
   * Margin on top and bottom
   */
  marginY?: ResponsiveValue<Theme["space"] | CSS.Property.Margin<Length>>
  /**
   * Padding on top, left, bottom and right
   */
  p?: ResponsiveValue<Theme["space"] | CSS.Property.Padding<Length>>
  /**
   * Padding on top, left, bottom and right
   */
  padding?: ResponsiveValue<Theme["space"] | CSS.Property.Padding<Length>>
  /**
   * Padding on top
   */
  pt?: ResponsiveValue<Theme["space"] | CSS.Property.PaddingTop<Length>>
  paddingBlockStart?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingBlockStart<Length>
  >
  /**
   * Padding on top
   */
  paddingTop?: ResponsiveValue<Theme["space"] | CSS.Property.PaddingTop<Length>>
  /**
   * Padding on right
   */
  pr?: ResponsiveValue<Theme["space"] | CSS.Property.PaddingRight<Length>>
  /**
   * When direction is `ltr`, `paddingInlineEnd` is equivalent to `paddingRight`.
   * When direction is `rtl`, `paddingInlineEnd` is equivalent to `paddingLeft`.
   */
  paddingInlineEnd?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingInlineEnd<Length>
  >
  /**
   * When direction is `ltr`, `paddingEnd` is equivalent to `paddingRight`.
   * When direction is `rtl`, `paddingEnd` is equivalent to `paddingLeft`.
   */
  paddingEnd?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingInlineEnd<Length>
  >
  /**
   * When direction is `ltr`, `pe` is equivalent to `paddingRight`.
   * When direction is `rtl`, `pe` is equivalent to `paddingLeft`.
   */
  pe?: ResponsiveValue<Theme["space"] | CSS.Property.PaddingInlineEnd<Length>>
  /**
   * Padding on right
   */
  paddingRight?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingRight<Length>
  >
  /**
   * Padding on bottom
   */
  pb?: ResponsiveValue<Theme["space"] | CSS.Property.PaddingBottom<Length>>
  paddingBlockEnd?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingBlockEnd<Length>
  >
  /**
   * Padding on bottom
   */
  paddingBottom?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingBottom<Length>
  >
  /**
   * Padding on left
   */
  pl?: ResponsiveValue<Theme["space"] | CSS.Property.PaddingLeft<Length>>
  /**
   * When direction is `ltr`, `paddingInlineStart` is equivalent to `paddingLeft`.
   * When direction is `rtl`, `paddingInlineStart` is equivalent to `paddingRight`.
   */
  paddingInlineStart?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingInlineStart<Length>
  >
  /**
   * When direction is `ltr`, `paddingStart` is equivalent to `paddingLeft`.
   * When direction is `rtl`, `paddingStart` is equivalent to `paddingRight`.
   */
  paddingStart?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingInlineStart<Length>
  >
  /**
   * When direction is `ltr`, `ps` is equivalent to `paddingLeft`.
   * When direction is `rtl`, `ps` is equivalent to `paddingRight`.
   */
  ps?: ResponsiveValue<Theme["space"] | CSS.Property.PaddingInlineStart<Length>>
  /**
   * Padding on left
   */
  paddingLeft?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingLeft<Length>
  >
  /**
   * Padding on left and right
   */
  px?: ResponsiveValue<Theme["space"] | CSS.Property.Padding<Length>>
  paddingInline?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingInline<Length>
  >
  /**
   * Padding on left and right
   */
  paddingX?: ResponsiveValue<Theme["space"] | CSS.Property.Padding<Length>>
  /**
   * Padding on top and bottom
   */
  py?: ResponsiveValue<Theme["space"] | CSS.Property.Padding<Length>>
  paddingBlock?: ResponsiveValue<
    Theme["space"] | CSS.Property.PaddingBlock<Length>
  >
  /**
   * Padding on top and bottom
   */
  paddingY?: ResponsiveValue<Theme["space"] | CSS.Property.Padding<Length>>
}

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */
export const space = system(config)
export const spaceParser = createParser(config)
