import * as CSS from "csstype"
import { Config } from "../utils/prop-config"
import { ResponsiveValue, t, Token, transforms } from "../utils"

export const typography: Config = {
  fontFamily: t.prop("fontFamily", "fonts"),
  fontSize: t.prop("fontSize", "fontSizes", transforms.px),
  fontWeight: t.prop("fontWeight", "fontWeights"),
  lineHeight: t.prop("lineHeight", "lineHeights"),
  letterSpacing: t.prop("letterSpacing", "letterSpacings"),
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  noOfLines: {
    static: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      //@ts-ignore
      WebkitLineClamp: "var(--chakra-line-clamp)",
    },
    property: "--chakra-line-clamp",
  },
  isTruncated: {
    transform(value) {
      if (value === true) {
        return {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }
      }
    },
  },
}

/**
 * Types for typography related CSS properties
 */
export interface TypographyProps {
  /**
   * The CSS `font-weight` property
   */
  fontWeight?: Token<number | (string & {}), "fontWeights">
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
   * Used to visually truncate a text after a number of lines.
   */
  noOfLines?: ResponsiveValue<number>
  /**
   * If `true`, it clamps truncate a text after one line.
   * @deprecated - Use `noOfLines` instead
   */
  isTruncated?: boolean
}
