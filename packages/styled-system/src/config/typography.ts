import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { ResponsiveValue, Length } from "../utils"
import { PropsPath } from "../utils.types"
import { ChakraTheme } from ".."

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
export interface TypographyProps<Theme extends ChakraTheme = ChakraTheme> {
  /**
   * The CSS `font-weight` property
   */
  fontWeight?: ResponsiveValue<
    string & number & PropsPath<Theme["fontWeights"]>
  >
  /**
   * The CSS `line-height` property
   */
  lineHeight?: ResponsiveValue<
    CSS.Property.LineHeight<Length> & PropsPath<Theme["lineHeights"]>
  >
  /**
   * The CSS `letter-spacing` property
   */
  letterSpacing?: ResponsiveValue<
    CSS.Property.LetterSpacing<Length> & PropsPath<Theme["letterSpacings"]>
  >
  /**
   * The CSS `font-size` property
   */
  fontSize?: ResponsiveValue<
    CSS.Property.FontSize<Length> & PropsPath<Theme["fontSizes"]>
  >
  /**
   * The CSS `font-family` property
   */
  fontFamily?: ResponsiveValue<
    CSS.Property.FontFamily & PropsPath<Theme["fonts"]>
  >
  /**
   * The CSS `text-align` property
   */
  textAlign?: ResponsiveValue<CSS.Property.TextAlign>
  /**
   * The CSS `font-style` property
   */
  fontStyle?: ResponsiveValue<CSS.Property.FontStyle>
  /**
   * The CSS `word-break` property
   */
  wordBreak?: ResponsiveValue<CSS.Property.WordBreak>
  /**
   * The CSS `overflow-wrap` property
   */
  overflowWrap?: ResponsiveValue<CSS.Property.OverflowWrap>
  /**
   * The CSS `text-overflow` property
   */
  textOverflow?: ResponsiveValue<CSS.Property.TextOverflow>
  /**
   * The CSS `text-transform` property
   */
  textTransform?: ResponsiveValue<CSS.Property.TextTransform>
  /**
   * The CSS `white-space` property
   */
  whiteSpace?: ResponsiveValue<CSS.Property.WhiteSpace>
  /**
   * The CSS `text-decoration` property
   */
  textDecoration?: ResponsiveValue<CSS.Property.TextDecoration<Length>>
  /**
   * The CSS `text-decoration` property
   */
  textDecor?: ResponsiveValue<CSS.Property.TextDecoration<Length>>
}

export const typography = system(config)
export const typographyParser = createParser(config)
