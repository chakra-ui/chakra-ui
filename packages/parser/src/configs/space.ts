import * as CSS from "csstype"
import { createParser } from "../create-parser"
import { Config, positiveOrNegative, ResponsiveValue, Length } from "../utils"

const configs: Config = {
  margin: {
    property: "margin",
    transform: positiveOrNegative,
    scale: "space",
  },
  m: {
    property: "margin",
    transform: positiveOrNegative,
    scale: "space",
  },
  marginTop: {
    property: "marginTop",
    transform: positiveOrNegative,
    scale: "space",
  },
  mt: {
    property: "marginTop",
    transform: positiveOrNegative,
    scale: "space",
  },
  marginRight: {
    property: "marginRight",
    transform: positiveOrNegative,
    scale: "space",
  },
  mr: {
    property: "marginRight",
    transform: positiveOrNegative,
    scale: "space",
  },
  marginBottom: {
    property: "marginBottom",
    transform: positiveOrNegative,
    scale: "space",
  },
  mb: {
    property: "marginBottom",
    transform: positiveOrNegative,
    scale: "space",
  },
  marginLeft: {
    property: "marginLeft",
    transform: positiveOrNegative,
    scale: "space",
  },
  ml: {
    property: "marginLeft",
    transform: positiveOrNegative,
    scale: "space",
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative,
    scale: "space",
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative,
    scale: "space",
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative,
    scale: "space",
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative,
    scale: "space",
  },
  padding: {
    property: "padding",
    scale: "space",
  },
  p: {
    property: "padding",
    scale: "space",
  },
  paddingTop: {
    property: "paddingTop",
    scale: "space",
  },
  pt: {
    property: "paddingTop",
    scale: "space",
  },
  paddingRight: {
    property: "paddingRight",
    scale: "space",
  },
  pr: {
    property: "paddingRight",
    scale: "space",
  },
  paddingBottom: {
    property: "paddingBottom",
    scale: "space",
  },
  pb: {
    property: "paddingBottom",
    scale: "space",
  },
  paddingLeft: {
    property: "paddingLeft",
    scale: "space",
  },
  pl: {
    property: "paddingLeft",
    scale: "space",
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space",
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space",
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space",
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space",
  },
}

/**
 * Types for space related CSS properties
 */
export interface SpaceProps {
  /**
   * Margin on top, left, bottom and right
   */
  m?: ResponsiveValue<CSS.MarginProperty<Length>>
  /**
   * Margin on top, left, bottom and right
   */
  margin?: ResponsiveValue<CSS.MarginProperty<Length>>
  /**
   * Margin on top
   */
  mt?: ResponsiveValue<CSS.MarginProperty<Length>>
  /**
   * Margin on top
   */
  marginTop?: ResponsiveValue<CSS.MarginTopProperty<Length>>
  /**
   * Margin on right
   */
  mr?: ResponsiveValue<CSS.MarginRightProperty<Length>>
  /**
   * Margin on right
   */
  marginRight?: ResponsiveValue<CSS.MarginRightProperty<Length>>
  /**
   * Margin on bottom
   */
  mb?: ResponsiveValue<CSS.MarginBottomProperty<Length>>
  /**
   * Margin on bottom
   */
  marginBottom?: ResponsiveValue<CSS.MarginBottomProperty<Length>>
  /**
   * Margin on left
   */
  ml?: ResponsiveValue<CSS.MarginLeftProperty<Length>>
  /**
   * Margin on left
   */
  marginLeft?: ResponsiveValue<CSS.MarginLeftProperty<Length>>
  /**
   * Margin on left and right
   */
  mx?: ResponsiveValue<CSS.MarginProperty<Length>>
  /**
   * Margin on left and right
   */
  marginX?: ResponsiveValue<CSS.MarginProperty<Length>>
  /**
   * Margin on top and bottom
   */
  my?: ResponsiveValue<CSS.MarginProperty<Length>>
  /**
   * Margin on top and bottom
   */
  marginY?: ResponsiveValue<CSS.MarginProperty<Length>>
  /**
   * Padding on top, left, bottom and right
   */
  p?: ResponsiveValue<CSS.PaddingProperty<Length>>
  /**
   * Padding on top, left, bottom and right
   */
  padding?: ResponsiveValue<CSS.PaddingProperty<Length>>
  /**
   * Padding on top
   */
  pt?: ResponsiveValue<CSS.PaddingTopProperty<Length>>
  /**
   * Padding on top
   */
  paddingTop?: ResponsiveValue<CSS.PaddingTopProperty<Length>>
  /**
   * Padding on right
   */
  pr?: ResponsiveValue<CSS.PaddingRightProperty<Length>>
  /**
   * Padding on right
   */
  paddingRight?: ResponsiveValue<CSS.PaddingRightProperty<Length>>
  /**
   * Padding on bottom
   */
  pb?: ResponsiveValue<CSS.PaddingBottomProperty<Length>>
  /**
   * Padding on bottom
   */
  paddingBottom?: ResponsiveValue<CSS.PaddingBottomProperty<Length>>
  /**
   * Padding on left
   */
  pl?: ResponsiveValue<CSS.PaddingLeftProperty<Length>>
  /**
   * Padding on left
   */
  paddingLeft?: ResponsiveValue<CSS.PaddingLeftProperty<Length>>
  /**
   * Padding on left and right
   */
  px?: ResponsiveValue<CSS.PaddingProperty<Length>>
  /**
   * Padding on left and right
   */
  paddingX?: ResponsiveValue<CSS.PaddingProperty<Length>>
  /**
   * Padding on top and bottom
   */
  py?: ResponsiveValue<CSS.PaddingProperty<Length>>
  /**
   * Padding on top and bottom
   */
  paddingY?: ResponsiveValue<CSS.PaddingProperty<Length>>
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
export const space = createParser(configs)
