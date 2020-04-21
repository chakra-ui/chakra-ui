import * as CSS from "csstype"
import { Config, Prop, Length } from "../utils"
import { createParser } from "../create-parser"

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
  textDecoration: { property: "textDecoration" },
  textDecor: { property: "textDecoration" },
}

/**
 * Types for typography related CSS properties
 */
export interface TypographyProps {
  /**
   * The CSS `font-weight` property
   */
  fontWeight?: Prop<CSS.FontWeightProperty | "medium" | "light" | "semibold">
  /**
   * The CSS `line-height` property
   */
  lineHeight?: Prop<CSS.LineHeightProperty<Length>>
  /**
   * The CSS `line-height` property
   */
  letterSpacing?: Prop<CSS.LetterSpacingProperty<Length>>
  /**
   * The CSS `font-size` property
   */
  fontSize?: Prop<CSS.FontSizeProperty<Length>>
  /**
   * The CSS `font-family` property
   */
  fontFamily?: Prop<CSS.FontFamilyProperty>
  /**
   * The CSS `text-align` property
   */
  textAlign?: Prop<CSS.TextAlignProperty>
  /**
   * The CSS `font-style` property
   */
  fontStyle?: Prop<CSS.FontStyleProperty>
  /**
   * The CSS `word-break` property
   */
  wordBreak?: Prop<CSS.WordBreakProperty>
  /**
   * The CSS `overflow-wrap` property
   */
  overflowWrap?: Prop<CSS.OverflowWrapProperty>
  /**
   * The CSS `text-overflow` property
   */
  textOverflow?: Prop<CSS.TextOverflowProperty>
  /**
   * The CSS `text-transform` property
   */
  textTransform?: Prop<CSS.TextTransformProperty>
  /**
   * The CSS `white-space` property
   */
  whiteSpace?: Prop<CSS.WhiteSpaceProperty>
  /**
   * The CSS `text-decoration` property
   */
  textDecoration?: Prop<CSS.TextDecorationProperty<Length>>
  /**
   * The CSS `text-decoration` property
   */
  textDecor?: Prop<CSS.TextDecorationProperty<Length>>
}

export const typography = createParser(config)
