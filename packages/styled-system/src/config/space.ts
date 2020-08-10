import * as CSS from "csstype"
import { createParser, Config, system } from "@styled-system/core"
import { positiveOrNegative, ResponsiveValue, Length } from "../utils"

const config: Config = {
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
  m?: ResponsiveValue<CSS.Property.Margin<Length>>
  /**
   * Margin on top, left, bottom and right
   */
  margin?: ResponsiveValue<CSS.Property.Margin<Length>>
  /**
   * Margin on top
   */
  mt?: ResponsiveValue<CSS.Property.Margin<Length>>
  /**
   * Margin on top
   */
  marginTop?: ResponsiveValue<CSS.Property.MarginTop<Length>>
  /**
   * Margin on right
   */
  mr?: ResponsiveValue<CSS.Property.MarginRight<Length>>
  /**
   * Margin on right
   */
  marginRight?: ResponsiveValue<CSS.Property.MarginRight<Length>>
  /**
   * Margin on bottom
   */
  mb?: ResponsiveValue<CSS.Property.MarginBottom<Length>>
  /**
   * Margin on bottom
   */
  marginBottom?: ResponsiveValue<CSS.Property.MarginBottom<Length>>
  /**
   * Margin on left
   */
  ml?: ResponsiveValue<CSS.Property.MarginLeft<Length>>
  /**
   * Margin on left
   */
  marginLeft?: ResponsiveValue<CSS.Property.MarginLeft<Length>>
  /**
   * Margin on left and right
   */
  mx?: ResponsiveValue<CSS.Property.Margin<Length>>
  /**
   * Margin on left and right
   */
  marginX?: ResponsiveValue<CSS.Property.Margin<Length>>
  /**
   * Margin on top and bottom
   */
  my?: ResponsiveValue<CSS.Property.Margin<Length>>
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
  /**
   * Padding on top
   */
  paddingTop?: ResponsiveValue<CSS.Property.PaddingTop<Length>>
  /**
   * Padding on right
   */
  pr?: ResponsiveValue<CSS.Property.PaddingRight<Length>>
  /**
   * Padding on right
   */
  paddingRight?: ResponsiveValue<CSS.Property.PaddingRight<Length>>
  /**
   * Padding on bottom
   */
  pb?: ResponsiveValue<CSS.Property.PaddingBottom<Length>>
  /**
   * Padding on bottom
   */
  paddingBottom?: ResponsiveValue<CSS.Property.PaddingBottom<Length>>
  /**
   * Padding on left
   */
  pl?: ResponsiveValue<CSS.Property.PaddingLeft<Length>>
  /**
   * Padding on left
   */
  paddingLeft?: ResponsiveValue<CSS.Property.PaddingLeft<Length>>
  /**
   * Padding on left and right
   */
  px?: ResponsiveValue<CSS.Property.Padding<Length>>
  /**
   * Padding on left and right
   */
  paddingX?: ResponsiveValue<CSS.Property.Padding<Length>>
  /**
   * Padding on top and bottom
   */
  py?: ResponsiveValue<CSS.Property.Padding<Length>>
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
