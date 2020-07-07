import * as CSS from "csstype"
import { Config, createParser, system } from "@styled-system/core"
import { ResponsiveValue, Length } from "../utils"

const config: Config = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts",
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes",
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights",
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights",
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings",
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: true,
  textDecor: { property: "textDecoration" },
}

/**
 * Types for typography related CSS properties
 */
export interface TypographyProps {
  /**
   * The CSS `font-weight` property
   */
  fontWeight?: ResponsiveValue<string | number>
  /**
   * The CSS `line-height` property
   */
  lineHeight?: ResponsiveValue<CSS.LineHeightProperty<Length>>
  /**
   * The CSS `line-height` property
   */
  letterSpacing?: ResponsiveValue<CSS.LetterSpacingProperty<Length>>
  /**
   * The CSS `font-size` property
   */
  fontSize?: ResponsiveValue<CSS.FontSizeProperty<Length>>
  /**
   * The CSS `font-family` property
   */
  fontFamily?: ResponsiveValue<CSS.FontFamilyProperty>
  /**
   * The CSS `text-align` property
   */
  textAlign?: ResponsiveValue<CSS.TextAlignProperty>
  /**
   * The CSS `font-style` property
   */
  fontStyle?: ResponsiveValue<CSS.FontStyleProperty>
  /**
   * The CSS `word-break` property
   */
  wordBreak?: ResponsiveValue<CSS.WordBreakProperty>
  /**
   * The CSS `overflow-wrap` property
   */
  overflowWrap?: ResponsiveValue<CSS.OverflowWrapProperty>
  /**
   * The CSS `text-overflow` property
   */
  textOverflow?: ResponsiveValue<CSS.TextOverflowProperty>
  /**
   * The CSS `text-transform` property
   */
  textTransform?: ResponsiveValue<CSS.TextTransformProperty>
  /**
   * The CSS `white-space` property
   */
  whiteSpace?: ResponsiveValue<CSS.WhiteSpaceProperty>
  /**
   * The CSS `text-decoration` property
   */
  textDecoration?: ResponsiveValue<CSS.TextDecorationProperty<Length>>
  /**
   * The CSS `text-decoration` property
   */
  textDecor?: ResponsiveValue<CSS.TextDecorationProperty<Length>>
}

export const typography = system(config)
export const typographyParser = createParser(config)
