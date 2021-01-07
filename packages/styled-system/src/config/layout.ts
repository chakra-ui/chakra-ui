import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Length, ResponsiveValue, t } from "../utils"

const config: Config = {
  width: t.sizesT("width"),
  inlineSize: t.sizesT("inlineSize"),
  height: t.sizes("height"),
  blockSize: t.sizes("blockSize"),
  boxSize: t.sizes(["width", "height"]),
  minWidth: t.sizes("minWidth"),
  minInlineSize: t.sizes("minInlineSize"),
  minHeight: t.sizes("minHeight"),
  minBlockSize: t.sizes("minBlockSize"),
  maxWidth: t.sizes("maxWidth"),
  maxInlineSize: t.sizes("maxInlineSize"),
  maxHeight: t.sizes("maxHeight"),
  maxBlockSize: t.sizes("maxBlockSize"),
  d: t.prop("display"),
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true,
}

Object.assign(config, {
  w: config.width,
  h: config.height,
  minW: config.minWidth,
  maxW: config.maxWidth,
  minH: config.minHeight,
  maxH: config.maxHeight,
})

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
  /**
   * The CSS `min-width` property
   */
  minWidth?: ResponsiveValue<CSS.Property.MinWidth<Length>>
  /**
   * The CSS `min-width` property
   */
  minW?: ResponsiveValue<CSS.Property.MinWidth<Length>>
  minInlineSize?: ResponsiveValue<CSS.Property.MinInlineSize<Length>>
  /**
   * The CSS `height` property
   */
  height?: ResponsiveValue<CSS.Property.Height<Length>>
  /**
   * The CSS `height` property
   */
  h?: ResponsiveValue<CSS.Property.Height<Length>>
  blockSize?: ResponsiveValue<CSS.Property.BlockSize<Length>>
  /**
   * The CSS `max-height` property
   */
  maxHeight?: ResponsiveValue<CSS.Property.MaxHeight<Length>>
  /**
   * The CSS `max-height` property
   */
  maxH?: ResponsiveValue<CSS.Property.MaxHeight<Length>>
  maxBlockSize?: ResponsiveValue<CSS.Property.MaxBlockSize<Length>>
  /**
   * The CSS `min-height` property
   */
  minHeight?: ResponsiveValue<CSS.Property.MinHeight<Length>>
  /**
   * The CSS `min-height` property
   */
  minH?: ResponsiveValue<CSS.Property.MinHeight<Length>>
  minBlockSize?: ResponsiveValue<CSS.Property.MinBlockSize<Length>>
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
