import { isNumber, memoizedGet as get } from "@chakra-ui/utils"
import { Config, createParser, system } from "@styled-system/core"
import * as CSS from "csstype"
import { Length, ResponsiveValue } from "../utils"

function transform(value: any, scale: any) {
  const defaultValue = !isNumber(value) || value > 1 ? value : `${value * 100}%`
  return get(scale, value, defaultValue)
}

const config: Config = {
  width: {
    property: "width",
    scale: "sizes",
    transform,
  },
  w: {
    property: "width",
    scale: "sizes",
    transform,
  },
  height: {
    property: "height",
    scale: "sizes",
  },
  h: {
    property: "height",
    scale: "sizes",
  },
  boxSize: {
    properties: ["width", "height"],
    scale: "sizes",
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes",
  },
  minW: {
    property: "minWidth",
    scale: "sizes",
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes",
  },
  minH: {
    property: "minHeight",
    scale: "sizes",
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes",
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes",
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes",
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes",
  },
  d: {
    property: "display",
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true,
}

/**
 * Types for layout related CSS properties
 */
export interface LayoutProps {
  /**
   * The CSS `display` property
   */
  display?: ResponsiveValue<CSS.Property.Display>
  /**
   * The CSS `display` property
   */
  d?: ResponsiveValue<CSS.Property.Display>
  /**
   * The CSS `width` property
   */
  width?: ResponsiveValue<CSS.Property.Width<Length>>
  /**
   * The CSS `width` property
   */
  w?: ResponsiveValue<CSS.Property.Width<Length>>
  /**
   * The CSS `width` and `height` property
   */
  boxSize?: ResponsiveValue<CSS.Property.Width<Length>>
  /**
   * The CSS `max-width` property
   */
  maxWidth?: ResponsiveValue<CSS.Property.MaxWidth<Length>>
  /**
   * The CSS `max-width` property
   */
  maxW?: ResponsiveValue<CSS.Property.MaxWidth<Length>>
  /**
   * The CSS `min-width` property
   */
  minWidth?: ResponsiveValue<CSS.Property.MinWidth<Length>>
  /**
   * The CSS `min-width` property
   */
  minW?: ResponsiveValue<CSS.Property.MinWidth<Length>>
  /**
   * The CSS `height` property
   */
  height?: ResponsiveValue<CSS.Property.Height<Length>>
  /**
   * The CSS `height` property
   */
  h?: ResponsiveValue<CSS.Property.Height<Length>>
  /**
   * The CSS `max-height` property
   */
  maxHeight?: ResponsiveValue<CSS.Property.MaxHeight<Length>>
  /**
   * The CSS `max-height` property
   */
  maxH?: ResponsiveValue<CSS.Property.MaxHeight<Length>>
  /**
   * The CSS `min-height` property
   */
  minHeight?: ResponsiveValue<CSS.Property.MinHeight<Length>>
  /**
   * The CSS `min-height` property
   */
  minH?: ResponsiveValue<CSS.Property.MinHeight<Length>>
  /**
   * The CSS `vertical-align` property
   */
  verticalAlign?: ResponsiveValue<CSS.Property.VerticalAlign<Length>>
  /**
   * The CSS `overflow` property
   */
  overflow?: ResponsiveValue<CSS.Property.Overflow>
  /**
   * The CSS `overflow-x` property
   */
  overflowX?: ResponsiveValue<CSS.Property.OverflowX>
  /**
   * The CSS `overflow-y` property
   */
  overflowY?: ResponsiveValue<CSS.Property.OverflowY>
  /**
   * The CSS `box-sizing` property
   */
  boxSizing?: CSS.Property.BoxSizing
}

export const layout = system(config)
export const layoutParser = createParser(config)
