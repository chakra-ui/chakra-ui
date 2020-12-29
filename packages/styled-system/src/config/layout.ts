import * as CSS from "csstype"
import { Config, createParser, system } from "../core"
import { Length, ResponsiveValue, t } from "../utils"
import { PropsPath } from "../utils.types"
import { ChakraTheme } from ".."

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
export interface LayoutProps<Theme extends ChakraTheme = ChakraTheme> {
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
  width?: ResponsiveValue<
    CSS.Property.Width<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `width` property
   */
  w?: ResponsiveValue<CSS.Property.Width<Length> & PropsPath<Theme["sizes"]>>
  inlineSize?: ResponsiveValue<
    CSS.Property.InlineSize<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `width` and `height` property
   */
  boxSize?: ResponsiveValue<
    CSS.Property.Width<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `max-width` property
   */
  maxWidth?: ResponsiveValue<
    CSS.Property.MaxWidth<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `max-width` property
   */
  maxW?: ResponsiveValue<
    CSS.Property.MaxWidth<Length> & PropsPath<Theme["sizes"]>
  >
  maxInlineSize?: ResponsiveValue<
    CSS.Property.MaxInlineSize<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `min-width` property
   */
  minWidth?: ResponsiveValue<
    CSS.Property.MinWidth<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `min-width` property
   */
  minW?: ResponsiveValue<
    CSS.Property.MinWidth<Length> & PropsPath<Theme["sizes"]>
  >
  minInlineSize?: ResponsiveValue<
    CSS.Property.MinInlineSize<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `height` property
   */
  height?: ResponsiveValue<
    CSS.Property.Height<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `height` property
   */
  h?: ResponsiveValue<CSS.Property.Height<Length> & PropsPath<Theme["sizes"]>>
  blockSize?: ResponsiveValue<
    CSS.Property.BlockSize<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `max-height` property
   */
  maxHeight?: ResponsiveValue<
    CSS.Property.MaxHeight<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `max-height` property
   */
  maxH?: ResponsiveValue<
    CSS.Property.MaxHeight<Length> & PropsPath<Theme["sizes"]>
  >
  maxBlockSize?: ResponsiveValue<
    CSS.Property.MaxBlockSize<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `min-height` property
   */
  minHeight?: ResponsiveValue<
    CSS.Property.MinHeight<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `min-height` property
   */
  minH?: ResponsiveValue<
    CSS.Property.MinHeight<Length> & PropsPath<Theme["sizes"]>
  >
  minBlockSize?: ResponsiveValue<
    CSS.Property.MinBlockSize<Length> & PropsPath<Theme["sizes"]>
  >
  /**
   * The CSS `vertical-align` property
   */
  verticalAlign?: ResponsiveValue<
    CSS.Property.VerticalAlign<Length> & PropsPath<Theme["sizes"]>
  >
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
