import * as CSS from "csstype"
import { positiveOrNegative, ResponsiveValue, Length } from "../utils"
import { createParser, Config, system } from "@styled-system/core"

const config: Config = {
  position: true,
  pos: {
    property: "position",
  },
  zIndex: {
    property: "zIndex",
    scale: "zIndices",
  },
  inset: {
    properties: ["left", "top", "bottom", "right"],
    scale: "space",
    transform: positiveOrNegative,
  },
  insetX: {
    properties: ["left", "right"],
    scale: "space",
    transform: positiveOrNegative,
  },
  insetY: {
    properties: ["top", "bottom"],
    scale: "space",
    transform: positiveOrNegative,
  },
  top: {
    property: "top",
    scale: "space",
    transform: positiveOrNegative,
  },
  right: {
    property: "right",
    scale: "space",
    transform: positiveOrNegative,
  },
  bottom: {
    property: "bottom",
    scale: "space",
    transform: positiveOrNegative,
  },
  left: {
    property: "left",
    scale: "space",
    transform: positiveOrNegative,
  },
}

/**
 * Types for position CSS properties
 */
export interface PositionProps {
  /**
   * The CSS `z-index` property
   */
  zIndex?: ResponsiveValue<string | CSS.Property.ZIndex>
  /**
   * The CSS `top` property
   */
  top?: ResponsiveValue<CSS.Property.Top<Length>>
  /**
   * The CSS `right` property
   */
  right?: ResponsiveValue<CSS.Property.Right<Length>>
  /**
   * The CSS `bottom` property
   */
  bottom?: ResponsiveValue<CSS.Property.Bottom<Length>>
  /**
   * The CSS `left` property
   */
  left?: ResponsiveValue<CSS.Property.Left<Length>>
  /**
   * The CSS `left`, `right`, `top`, `bottom` property
   */
  inset?: ResponsiveValue<CSS.Property.Left<Length>>
  /**
   * The CSS `left`, and `right` property
   */
  insetX?: ResponsiveValue<CSS.Property.Left<Length>>
  /**
   * The CSS `top`, and `bottom` property
   */
  insetY?: ResponsiveValue<CSS.Property.Left<Length>>
  /**
   * The CSS `position` property
   */
  pos?: ResponsiveValue<CSS.Property.Position>
  /**
   * The CSS `position` property
   */
  position?: ResponsiveValue<CSS.Property.Position>
}

export const position = system(config)
export const positionParser = createParser(config)
