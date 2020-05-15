import { get, isNumber } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { createParser } from "../create-parser"
import { Config, Length, Prop } from "../utils"

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
  display?: Prop<CSS.DisplayProperty>
  /**
   * The CSS `display` property
   */
  d?: Prop<CSS.DisplayProperty>
  /**
   * The CSS `width` property
   */
  width?: Prop<CSS.WidthProperty<Length>>
  /**
   * The CSS `width` property
   */
  w?: Prop<CSS.WidthProperty<Length>>
  /**
   * The CSS `width` and `height` property
   */
  boxSize?: Prop<CSS.WidthProperty<Length>>
  /**
   * The CSS `max-width` property
   */
  maxWidth?: Prop<CSS.MaxWidthProperty<Length>>
  /**
   * The CSS `max-width` property
   */
  maxW?: Prop<CSS.MaxWidthProperty<Length>>
  /**
   * The CSS `min-width` property
   */
  minWidth?: Prop<CSS.MinWidthProperty<Length>>
  /**
   * The CSS `min-width` property
   */
  minW?: Prop<CSS.MinWidthProperty<Length>>
  /**
   * The CSS `height` property
   */
  height?: Prop<CSS.HeightProperty<Length>>
  /**
   * The CSS `height` property
   */
  h?: Prop<CSS.HeightProperty<Length>>
  /**
   * The CSS `max-height` property
   */
  maxHeight?: Prop<CSS.MaxHeightProperty<Length>>
  /**
   * The CSS `max-height` property
   */
  maxH?: Prop<CSS.MaxHeightProperty<Length>>
  /**
   * The CSS `min-height` property
   */
  minHeight?: Prop<CSS.MinHeightProperty<Length>>
  /**
   * The CSS `min-height` property
   */
  minH?: Prop<CSS.MinHeightProperty<Length>>
  /**
   * The CSS `vertical-align` property
   */
  verticalAlign?: Prop<CSS.VerticalAlignProperty<Length>>
  /**
   * The CSS `overflow` property
   */
  overflow?: Prop<CSS.OverflowProperty>
  /**
   * The CSS `overflow-x` property
   */
  overflowX?: Prop<CSS.OverflowXProperty>
  /**
   * The CSS `overflow-y` property
   */
  overflowY?: Prop<CSS.OverflowYProperty>
  /**
   * The CSS `box-sizing` property
   */
  boxSizing?: CSS.BoxSizingProperty
}

export const layout = createParser(config)
