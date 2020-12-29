import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Length, ResponsiveValue, t } from "../utils"
import { PropsPath } from "../utils.types"
import { ChakraTheme } from ".."

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
export interface SpaceProps<Theme extends ChakraTheme = ChakraTheme> {
  /**
   * Margin on top, left, bottom and right
   */
  m?: ResponsiveValue<CSS.Property.Margin<Length> & PropsPath<Theme["sizes"]>>
  /**
   * Margin on top, left, bottom and right
   */
  margin?: ResponsiveValue<
    CSS.Property.Margin<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on top
   */
  mt?: ResponsiveValue<CSS.Property.Margin<Length> & PropsPath<Theme["sizes"]>>
  marginBlockStart?: ResponsiveValue<
    CSS.Property.MarginBlockStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on top
   */
  marginTop?: ResponsiveValue<
    CSS.Property.MarginTop<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on right
   */
  mr?: ResponsiveValue<
    CSS.Property.MarginRight<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `marginInlineEnd` is equivalent to `marginRight`.
   * When direction is `rtl`, `marginInlineEnd` is equivalent to `marginLeft`.
   */
  marginInlineEnd?: ResponsiveValue<
    CSS.Property.MarginInlineEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `marginEnd` is equivalent to `marginRight`.
   * When direction is `rtl`, `marginEnd` is equivalent to `marginLeft`.
   */
  marginEnd?: ResponsiveValue<
    CSS.Property.MarginInlineEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `me` is equivalent to `marginRight`.
   * When direction is `rtl`, `me` is equivalent to `marginLeft`.
   */
  me?: ResponsiveValue<
    CSS.Property.MarginInlineEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on right
   */
  marginRight?: ResponsiveValue<
    CSS.Property.MarginRight<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on bottom
   */
  mb?: ResponsiveValue<
    CSS.Property.MarginBottom<Length> & PropsPath<Theme["sizes"]>
  >
  marginBlockEnd?: ResponsiveValue<
    CSS.Property.MarginBlockEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on bottom
   */
  marginBottom?: ResponsiveValue<
    CSS.Property.MarginBottom<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on left
   */
  ml?: ResponsiveValue<
    CSS.Property.MarginLeft<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `marginInlineStart` is equivalent to `marginLeft`.
   * When direction is `rtl`, `marginInlineStart` is equivalent to `marginRight`.
   */
  marginInlineStart?: ResponsiveValue<
    CSS.Property.MarginInlineStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `marginStart` is equivalent to `marginLeft`.
   * When direction is `rtl`, `marginStart` is equivalent to `marginRight`.
   */
  marginStart?: ResponsiveValue<
    CSS.Property.MarginInlineStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `ms` is equivalent to `marginLeft`.
   * When direction is `rtl`, `ms` is equivalent to `marginRight`.
   */
  ms?: ResponsiveValue<
    CSS.Property.MarginInlineStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on left
   */
  marginLeft?: ResponsiveValue<
    CSS.Property.MarginLeft<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on left and right
   */
  mx?: ResponsiveValue<CSS.Property.Margin<Length> & PropsPath<Theme["sizes"]>>
  marginInline?: ResponsiveValue<
    CSS.Property.MarginInline<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on left and right
   */
  marginX?: ResponsiveValue<
    CSS.Property.Margin<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on top and bottom
   */
  my?: ResponsiveValue<CSS.Property.Margin<Length> & PropsPath<Theme["sizes"]>>
  marginBlock?: ResponsiveValue<
    CSS.Property.MarginBlock<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Margin on top and bottom
   */
  marginY?: ResponsiveValue<
    CSS.Property.Margin<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on top, left, bottom and right
   */
  p?: ResponsiveValue<CSS.Property.Padding<Length> & PropsPath<Theme["sizes"]>>
  /**
   * Padding on top, left, bottom and right
   */
  padding?: ResponsiveValue<
    CSS.Property.Padding<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on top
   */
  pt?: ResponsiveValue<
    CSS.Property.PaddingTop<Length> & PropsPath<Theme["sizes"]>
  >
  paddingBlockStart?: ResponsiveValue<
    CSS.Property.PaddingBlockStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on top
   */
  paddingTop?: ResponsiveValue<
    CSS.Property.PaddingTop<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on right
   */
  pr?: ResponsiveValue<
    CSS.Property.PaddingRight<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `paddingInlineEnd` is equivalent to `paddingRight`.
   * When direction is `rtl`, `paddingInlineEnd` is equivalent to `paddingLeft`.
   */
  paddingInlineEnd?: ResponsiveValue<
    CSS.Property.PaddingInlineEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `paddingEnd` is equivalent to `paddingRight`.
   * When direction is `rtl`, `paddingEnd` is equivalent to `paddingLeft`.
   */
  paddingEnd?: ResponsiveValue<
    CSS.Property.PaddingInlineEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `pe` is equivalent to `paddingRight`.
   * When direction is `rtl`, `pe` is equivalent to `paddingLeft`.
   */
  pe?: ResponsiveValue<
    CSS.Property.PaddingInlineEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on right
   */
  paddingRight?: ResponsiveValue<
    CSS.Property.PaddingRight<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on bottom
   */
  pb?: ResponsiveValue<
    CSS.Property.PaddingBottom<Length> & PropsPath<Theme["sizes"]>
  >
  paddingBlockEnd?: ResponsiveValue<
    CSS.Property.PaddingBlockEnd<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on bottom
   */
  paddingBottom?: ResponsiveValue<
    CSS.Property.PaddingBottom<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on left
   */
  pl?: ResponsiveValue<
    CSS.Property.PaddingLeft<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `paddingInlineStart` is equivalent to `paddingLeft`.
   * When direction is `rtl`, `paddingInlineStart` is equivalent to `paddingRight`.
   */
  paddingInlineStart?: ResponsiveValue<
    CSS.Property.PaddingInlineStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `paddingStart` is equivalent to `paddingLeft`.
   * When direction is `rtl`, `paddingStart` is equivalent to `paddingRight`.
   */
  paddingStart?: ResponsiveValue<
    CSS.Property.PaddingInlineStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * When direction is `ltr`, `ps` is equivalent to `paddingLeft`.
   * When direction is `rtl`, `ps` is equivalent to `paddingRight`.
   */
  ps?: ResponsiveValue<
    CSS.Property.PaddingInlineStart<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on left
   */
  paddingLeft?: ResponsiveValue<
    CSS.Property.PaddingLeft<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on left and right
   */
  px?: ResponsiveValue<CSS.Property.Padding<Length> & PropsPath<Theme["sizes"]>>
  paddingInline?: ResponsiveValue<
    CSS.Property.PaddingInline<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on left and right
   */
  paddingX?: ResponsiveValue<
    CSS.Property.Padding<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on top and bottom
   */
  py?: ResponsiveValue<CSS.Property.Padding<Length> & PropsPath<Theme["sizes"]>>
  paddingBlock?: ResponsiveValue<
    CSS.Property.PaddingBlock<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * Padding on top and bottom
   */
  paddingY?: ResponsiveValue<
    CSS.Property.Padding<Length> & PropsPath<Theme["sizes"]>
  >
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
