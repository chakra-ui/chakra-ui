import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Length, t, Token } from "../utils"

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
  display?: Token<CSS.Property.Display>
  /**
   * The CSS `display` property
   */
  d?: Token<CSS.Property.Display>
  /**
   * The CSS `width` property
   */
  width?: Token<CSS.Property.Width | number, "sizes">
  /**
   * The CSS `width` property
   */
  w?: Token<CSS.Property.Width | number, "sizes">
  inlineSize?: Token<CSS.Property.InlineSize | number, "sizes">
  /**
   * The CSS `width` and `height` property
   */
  boxSize?: Token<CSS.Property.Width | number, "sizes">
  /**
   * The CSS `max-width` property
   */
  maxWidth?: Token<CSS.Property.MaxWidth | number, "sizes">
  /**
   * The CSS `max-width` property
   */
  maxW?: Token<CSS.Property.MaxWidth | number, "sizes">
  maxInlineSize?: Token<CSS.Property.MaxInlineSize | number, "sizes">
  /**
   * The CSS `min-width` property
   */
  minWidth?: Token<CSS.Property.MinWidth | number, "sizes">
  /**
   * The CSS `min-width` property
   */
  minW?: Token<CSS.Property.MinWidth | number, "sizes">
  minInlineSize?: Token<CSS.Property.MinInlineSize | number, "sizes">
  /**
   * The CSS `height` property
   */
  height?: Token<CSS.Property.Height | number, "sizes">
  /**
   * The CSS `height` property
   */
  h?: Token<CSS.Property.Height | number, "sizes">
  blockSize?: Token<CSS.Property.BlockSize | number, "sizes">
  /**
   * The CSS `max-height` property
   */
  maxHeight?: Token<CSS.Property.MaxHeight | number, "sizes">
  /**
   * The CSS `max-height` property
   */
  maxH?: Token<CSS.Property.MaxHeight | number, "sizes">
  maxBlockSize?: Token<CSS.Property.MaxBlockSize | number, "sizes">
  /**
   * The CSS `min-height` property
   */
  minHeight?: Token<CSS.Property.MinHeight | number, "sizes">
  /**
   * The CSS `min-height` property
   */
  minH?: Token<CSS.Property.MinHeight | number, "sizes">
  minBlockSize?: Token<CSS.Property.MinBlockSize | number, "sizes">
  /**
   * The CSS `vertical-align` property
   */
  verticalAlign?: Token<CSS.Property.VerticalAlign<Length>>
  /**
   * The CSS `overflow` property
   */
  overflow?: Token<CSS.Property.Overflow>
  /**
   * The CSS `overflow-x` property
   */
  overflowX?: Token<CSS.Property.OverflowX>
  /**
   * The CSS `overflow-y` property
   */
  overflowY?: Token<CSS.Property.OverflowY>
  /**
   * The CSS `box-sizing` property
   */
  boxSizing?: CSS.Property.BoxSizing
}

export const layout = system(config)
export const layoutParser = createParser(config)
