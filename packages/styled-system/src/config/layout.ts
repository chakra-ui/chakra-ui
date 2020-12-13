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
  inlineSize: {
    property: "inlineSize",
    scale: "sizes",
    transform,
  },
  height: {
    property: "height",
    scale: "sizes",
  },
  blockSize: {
    property: "blockSize",
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
  minInlineSize: {
    property: "minInlineSize",
    scale: "sizes",
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes",
  },
  minBlockSize: {
    property: "minBlockSize",
    scale: "sizes",
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes",
  },
  maxInlineSize: {
    property: "maxInlineSize",
    scale: "sizes",
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes",
  },
  maxBlockSize: {
    property: "maxBlockSize",
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

config.w = config.width
config.wBidi = config.inlineSize

config.h = config.height
config.hBidi = config.blockSize

config.minW = config.minWidth
config.minWBidi = config.minInlineSize

config.maxW = config.maxWidth
config.maxWBidi = config.maxInlineSize

config.minH = config.minHeight
config.minHBidi = config.minBlockSize

config.maxH = config.maxHeight
config.maxHBidi = config.maxBlockSize

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
  inlineSize?: ResponsiveValue<CSS.Property.InlineSize<Length>>
  wBidi?: ResponsiveValue<CSS.Property.InlineSize<Length>>
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
  maxInlineSize?: ResponsiveValue<CSS.Property.MaxInlineSize<Length>>
  maxWBidi?: ResponsiveValue<CSS.Property.MaxInlineSize<Length>>
  /**
   * The CSS `min-width` property
   */
  minWidth?: ResponsiveValue<CSS.Property.MinWidth<Length>>
  /**
   * The CSS `min-width` property
   */
  minW?: ResponsiveValue<CSS.Property.MinWidth<Length>>
  minInlineSize?: ResponsiveValue<CSS.Property.MinInlineSize<Length>>
  minWBidi?: ResponsiveValue<CSS.Property.MinInlineSize<Length>>
  /**
   * The CSS `height` property
   */
  height?: ResponsiveValue<CSS.Property.Height<Length>>
  /**
   * The CSS `height` property
   */
  h?: ResponsiveValue<CSS.Property.Height<Length>>
  blockSize?: ResponsiveValue<CSS.Property.BlockSize<Length>>
  hBidi?: ResponsiveValue<CSS.Property.BlockSize<Length>>
  /**
   * The CSS `max-height` property
   */
  maxHeight?: ResponsiveValue<CSS.Property.MaxHeight<Length>>
  /**
   * The CSS `max-height` property
   */
  maxH?: ResponsiveValue<CSS.Property.MaxHeight<Length>>
  maxBlockSize?: ResponsiveValue<CSS.Property.MaxBlockSize<Length>>
  maxHBidi?: ResponsiveValue<CSS.Property.MaxBlockSize<Length>>
  /**
   * The CSS `min-height` property
   */
  minHeight?: ResponsiveValue<CSS.Property.MinHeight<Length>>
  /**
   * The CSS `min-height` property
   */
  minH?: ResponsiveValue<CSS.Property.MinHeight<Length>>
  minBlockSize?: ResponsiveValue<CSS.Property.MinBlockSize<Length>>
  minHBidi?: ResponsiveValue<CSS.Property.MinBlockSize<Length>>
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
