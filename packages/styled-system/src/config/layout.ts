import { get, isNumber } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { createParser, Config, system } from "@styled-system/core"
import { Length, ResponsiveValue } from "../utils"

function transform(value: any, scale: any) {
  const defaultValue = !isNumber(value) || value > 1 ? value : value * 100 + "%"
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
  display?: ResponsiveValue<CSS.DisplayProperty>
  /**
   * The CSS `display` property
   */
  d?: ResponsiveValue<CSS.DisplayProperty>
  /**
   * The CSS `width` property
   */
  width?: ResponsiveValue<CSS.WidthProperty<Length>>
  /**
   * The CSS `width` property
   */
  w?: ResponsiveValue<CSS.WidthProperty<Length>>
  /**
   * The CSS `width` and `height` property
   */
  boxSize?: ResponsiveValue<CSS.WidthProperty<Length>>
  /**
   * The CSS `max-width` property
   */
  maxWidth?: ResponsiveValue<CSS.MaxWidthProperty<Length>>
  /**
   * The CSS `max-width` property
   */
  maxW?: ResponsiveValue<CSS.MaxWidthProperty<Length>>
  /**
   * The CSS `min-width` property
   */
  minWidth?: ResponsiveValue<CSS.MinWidthProperty<Length>>
  /**
   * The CSS `min-width` property
   */
  minW?: ResponsiveValue<CSS.MinWidthProperty<Length>>
  /**
   * The CSS `height` property
   */
  height?: ResponsiveValue<CSS.HeightProperty<Length>>
  /**
   * The CSS `height` property
   */
  h?: ResponsiveValue<CSS.HeightProperty<Length>>
  /**
   * The CSS `max-height` property
   */
  maxHeight?: ResponsiveValue<CSS.MaxHeightProperty<Length>>
  /**
   * The CSS `max-height` property
   */
  maxH?: ResponsiveValue<CSS.MaxHeightProperty<Length>>
  /**
   * The CSS `min-height` property
   */
  minHeight?: ResponsiveValue<CSS.MinHeightProperty<Length>>
  /**
   * The CSS `min-height` property
   */
  minH?: ResponsiveValue<CSS.MinHeightProperty<Length>>
  /**
   * The CSS `vertical-align` property
   */
  verticalAlign?: ResponsiveValue<CSS.VerticalAlignProperty<Length>>
  /**
   * The CSS `overflow` property
   */
  overflow?: ResponsiveValue<CSS.OverflowProperty>
  /**
   * The CSS `overflow-x` property
   */
  overflowX?: ResponsiveValue<CSS.OverflowXProperty>
  /**
   * The CSS `overflow-y` property
   */
  overflowY?: ResponsiveValue<CSS.OverflowYProperty>
  /**
   * The CSS `box-sizing` property
   */
  boxSizing?: CSS.BoxSizingProperty
}

export const layout = system(config)
export const layoutParser = createParser(config)
