import * as CSS from "csstype"
import { Config, positiveOrNegative, Prop, Length } from "../utils"
import { createParser } from "../create-parser"

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
  zIndex?: Prop<string | CSS.ZIndexProperty>
  /**
   * The CSS `top` property
   */
  top?: Prop<CSS.TopProperty<Length>>
  /**
   * The CSS `right` property
   */
  right?: Prop<CSS.RightProperty<Length>>
  /**
   * The CSS `bottom` property
   */
  bottom?: Prop<CSS.BottomProperty<Length>>
  /**
   * The CSS `left` property
   */
  left?: Prop<CSS.LeftProperty<Length>>
  /**
   * The CSS `left`, `right`, `top`, `bottom` property
   */
  inset?: Prop<CSS.LeftProperty<Length>>
  /**
   * The CSS `left`, and `right` property
   */
  insetX?: Prop<CSS.LeftProperty<Length>>
  /**
   * The CSS `top`, and `bottom` property
   */
  insetY?: Prop<CSS.LeftProperty<Length>>
  /**
   * The CSS `position` property
   */
  pos?: Prop<CSS.PositionProperty>
  /**
   * The CSS `position` property
   */
  position?: Prop<CSS.PositionProperty>
}

export const position = createParser(config)
