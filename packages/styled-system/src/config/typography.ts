import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Token } from "../utils"

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
  textDecor: {
    property: "textDecoration",
  },
}

/**
 * Types for typography related CSS properties
 */
export interface TypographyProps {
  /**
   * The CSS `font-weight` property
   */
  fontWeight?: Token<string, "fontWeights">
  /**
   * The CSS `line-height` property
   */
  lineHeight?: Token<CSS.Property.LineHeight | number, "lineHeights">
  /**
   * The CSS `letter-spacing` property
   */
  letterSpacing?: Token<CSS.Property.LetterSpacing | number, "letterSpacings">

  /**
   * The CSS `font-size` property
   */
  fontSize?: Token<CSS.Property.FontSize | number, "fontSizes">
  /**
   * The CSS `font-family` property
   */
  fontFamily?: Token<CSS.Property.FontFamily, "fonts">
  /**
   * The CSS `text-align` property
   */
  textAlign?: Token<CSS.Property.TextAlign>
  /**
   * The CSS `font-style` property
   */
  fontStyle?: Token<CSS.Property.FontStyle>
  /**
   * The CSS `word-break` property
   */
  wordBreak?: Token<CSS.Property.WordBreak>
  /**
   * The CSS `overflow-wrap` property
   */
  overflowWrap?: Token<CSS.Property.OverflowWrap>
  /**
   * The CSS `text-overflow` property
   */
  textOverflow?: Token<CSS.Property.TextOverflow>
  /**
   * The CSS `text-transform` property
   */
  textTransform?: Token<CSS.Property.TextTransform>
  /**
   * The CSS `white-space` property
   */
  whiteSpace?: Token<CSS.Property.WhiteSpace>
  /**
   * The CSS `text-decoration` property
   */
  textDecoration?: Token<CSS.Property.TextDecoration | number>
  /**
   * The CSS `text-decoration` property
   */
  textDecor?: Token<CSS.Property.TextDecoration | number>
}

export const typography = system(config)
export const typographyParser = createParser(config)
