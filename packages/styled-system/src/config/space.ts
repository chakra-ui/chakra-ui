import { Config, createParser, system } from "@styled-system/core"
import * as CSS from "csstype"
import {
  Length,
  positiveOrNegative,
  ResponsiveValue,
  makeConfig,
} from "../utils"

const m = makeConfig("space", positiveOrNegative)
const p = makeConfig("space")

const config: Config = {
  margin: m("margin"),
  marginTop: m("marginTop"),
  marginBlockStart: m("marginBlockStart"),
  marginRight: m("marginRight"),
  marginInlineEnd: m("marginInlineEnd"),
  marginBottom: m("marginBottom"),
  marginBlockEnd: m("marginBlockEnd"),
  marginLeft: m("marginLeft"),
  marginInlineStart: m("marginInlineStart"),
  marginX: m(["marginLeft", "marginRight"]),
  marginInline: m("marginInline"),
  marginY: m(["marginTop", "marginBottom"]),
  marginBlock: m("marginBlock"),
  padding: p("padding"),
  paddingTop: p("paddingTop"),
  paddingBlockStart: p("paddingBlockStart"),
  paddingRight: p("paddingRight"),
  paddingBottom: p("paddingBottom"),
  paddingBlockEnd: p("paddingBlockEnd"),
  paddingLeft: p("paddingLeft"),
  paddingInlineStart: p("paddingInlineStart"),
  paddingInlineEnd: p("paddingInlineEnd"),
  paddingX: p(["paddingLeft", "paddingRight"]),
  paddingInline: p("paddingInline"),
  paddingY: p(["paddingTop", "paddingBottom"]),
  paddingBlock: p("paddingBlock"),
}

config.m = config.margin
config.mt = config.marginTop
config.mtBidi = config.marginBlockStart
config.mr = config.marginRight
config.mrBidi = config.marginInlineEnd
config.mb = config.marginBottom
config.mbBidi = config.marginBlockEnd
config.ml = config.marginLeft
config.mlBidi = config.marginInlineStart
config.mx = config.marginX
config.mxBidi = config.marginInline
config.my = config.marginY
config.myBidi = config.marginBlock
config.p = config.padding
config.pt = config.paddingTop
config.py = config.paddingY
config.px = config.paddingX
config.ptBidi = config.paddingBlockStart
config.pb = config.paddingBottom
config.pbBidi = config.paddingBlockEnd
config.pl = config.paddingLeft
config.plBidi = config.paddingInlineStart
config.pr = config.paddingRight
config.prBidi = config.paddingInlineEnd

/**
 * Types for space related CSS properties
 */
export interface SpaceProps {
  /**
   * Margin on top, left, bottom and right
   */
  m?: ResponsiveValue<CSS.Property.Margin<Length>>
  /**
   * Margin on top, left, bottom and right
   */
  margin?: ResponsiveValue<CSS.Property.Margin<Length>>
  /**
   * Margin on top
   */
  mt?: ResponsiveValue<CSS.Property.Margin<Length>>
  marginBlockStart?: ResponsiveValue<CSS.Property.MarginBlockStart<Length>>
  mtBidi?: ResponsiveValue<CSS.Property.MarginBlockStart<Length>>
  /**
   * Margin on top
   */
  marginTop?: ResponsiveValue<CSS.Property.MarginTop<Length>>
  /**
   * Margin on right
   */
  mr?: ResponsiveValue<CSS.Property.MarginRight<Length>>
  marginInlineEnd?: ResponsiveValue<CSS.Property.MarginInlineEnd<Length>>
  mrBidi?: ResponsiveValue<CSS.Property.MarginInlineEnd<Length>>
  /**
   * Margin on right
   */
  marginRight?: ResponsiveValue<CSS.Property.MarginRight<Length>>
  /**
   * Margin on bottom
   */
  mb?: ResponsiveValue<CSS.Property.MarginBottom<Length>>
  marginBlockEnd?: ResponsiveValue<CSS.Property.MarginBlockEnd<Length>>
  mbBidi?: ResponsiveValue<CSS.Property.MarginBlockEnd<Length>>
  /**
   * Margin on bottom
   */
  marginBottom?: ResponsiveValue<CSS.Property.MarginBottom<Length>>
  /**
   * Margin on left
   */
  ml?: ResponsiveValue<CSS.Property.MarginLeft<Length>>
  marginInlineStart?: ResponsiveValue<CSS.Property.MarginInlineStart<Length>>
  mlBidi?: ResponsiveValue<CSS.Property.MarginInlineStart<Length>>
  /**
   * Margin on left
   */
  marginLeft?: ResponsiveValue<CSS.Property.MarginLeft<Length>>
  /**
   * Margin on left and right
   */
  mx?: ResponsiveValue<CSS.Property.Margin<Length>>
  marginInline?: ResponsiveValue<CSS.Property.MarginInline<Length>>
  mxBidi?: ResponsiveValue<CSS.Property.MarginInline<Length>>
  /**
   * Margin on left and right
   */
  marginX?: ResponsiveValue<CSS.Property.Margin<Length>>
  /**
   * Margin on top and bottom
   */
  my?: ResponsiveValue<CSS.Property.Margin<Length>>
  marginBlock?: ResponsiveValue<CSS.Property.MarginBlock<Length>>
  myBidi?: ResponsiveValue<CSS.Property.MarginBlock<Length>>
  /**
   * Margin on top and bottom
   */
  marginY?: ResponsiveValue<CSS.Property.Margin<Length>>
  /**
   * Padding on top, left, bottom and right
   */
  p?: ResponsiveValue<CSS.Property.Padding<Length>>
  /**
   * Padding on top, left, bottom and right
   */
  padding?: ResponsiveValue<CSS.Property.Padding<Length>>
  /**
   * Padding on top
   */
  pt?: ResponsiveValue<CSS.Property.PaddingTop<Length>>
  paddingBlockStart?: ResponsiveValue<CSS.Property.PaddingBlockStart<Length>>
  ptBidi?: ResponsiveValue<CSS.Property.PaddingBlockStart<Length>>
  /**
   * Padding on top
   */
  paddingTop?: ResponsiveValue<CSS.Property.PaddingTop<Length>>
  /**
   * Padding on right
   */
  pr?: ResponsiveValue<CSS.Property.PaddingRight<Length>>
  paddingInlineEnd?: ResponsiveValue<CSS.Property.PaddingInlineEnd<Length>>
  prBidi?: ResponsiveValue<CSS.Property.PaddingInlineEnd<Length>>
  /**
   * Padding on right
   */
  paddingRight?: ResponsiveValue<CSS.Property.PaddingRight<Length>>
  /**
   * Padding on bottom
   */
  pb?: ResponsiveValue<CSS.Property.PaddingBottom<Length>>
  paddingBlockEnd?: ResponsiveValue<CSS.Property.PaddingBlockEnd<Length>>
  pbBidi?: ResponsiveValue<CSS.Property.PaddingBlockEnd<Length>>
  /**
   * Padding on bottom
   */
  paddingBottom?: ResponsiveValue<CSS.Property.PaddingBottom<Length>>
  /**
   * Padding on left
   */
  pl?: ResponsiveValue<CSS.Property.PaddingLeft<Length>>
  paddingInlineStart?: ResponsiveValue<CSS.Property.PaddingInlineStart<Length>>
  plBidi?: ResponsiveValue<CSS.Property.PaddingInlineStart<Length>>
  /**
   * Padding on left
   */
  paddingLeft?: ResponsiveValue<CSS.Property.PaddingLeft<Length>>
  /**
   * Padding on left and right
   */
  px?: ResponsiveValue<CSS.Property.Padding<Length>>
  paddingInline?: ResponsiveValue<CSS.Property.PaddingInline<Length>>
  pxBidi?: ResponsiveValue<CSS.Property.PaddingInline<Length>>
  /**
   * Padding on left and right
   */
  paddingX?: ResponsiveValue<CSS.Property.Padding<Length>>
  /**
   * Padding on top and bottom
   */
  py?: ResponsiveValue<CSS.Property.Padding<Length>>
  paddingBlock?: ResponsiveValue<CSS.Property.PaddingBlock<Length>>
  pyBidi?: ResponsiveValue<CSS.Property.PaddingBlock<Length>>
  /**
   * Padding on top and bottom
   */
  paddingY?: ResponsiveValue<CSS.Property.Padding<Length>>
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
