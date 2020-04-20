import * as CSS from "csstype"
import { Config, Prop, Length } from "../utils"
import { createParser } from "../create-parser"

/**
 * The parser configuration for common border properties
 */
const config: Config = {
  border: {
    property: "border",
    scale: "borders",
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths",
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles",
  },
  borderColor: {
    property: "borderColor",
    scale: "colors",
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii",
  },
  borderTop: {
    property: "borderTop",
    scale: "borders",
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii",
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii",
  },
  borderRight: {
    property: "borderRight",
    scale: "borders",
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders",
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii",
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii",
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders",
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders",
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders",
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths",
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors",
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles",
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths",
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors",
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles",
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths",
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors",
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles",
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths",
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors",
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles",
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii",
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii",
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
}

/**
 * The prop types for border properties listed above
 */
export interface BorderProps {
  /**
   * The CSS `border` property
   */
  border?: Prop<CSS.BorderProperty<Length>>
  /**
   * The CSS `border-width` property
   */
  borderWidth?: Prop<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-style` property
   */
  borderStyle?: Prop<CSS.BorderStyleProperty>
  /**
   * The CSS `border-color` property
   */
  borderColor?: Prop<CSS.BorderTopColorProperty>
  /**
   * The CSS `border-radius` property
   */
  borderRadius?: Prop<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-top` property
   */
  borderTop?: Prop<CSS.BorderTopProperty<Length>>
  /**
   * The CSS `border-top-width` property
   */
  borderTopWidth?: Prop<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-bottom-width` property
   */
  borderBottomWidth?: Prop<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-left-width` property
   */
  borderLeftWidth?: Prop<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-right-width` property
   */
  borderRightWidth?: Prop<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-top-style` property
   */
  borderTopStyle?: Prop<CSS.BorderTopStyleProperty>
  /**
   * The CSS `border-bottom-style` property
   */
  borderBottomStyle?: Prop<CSS.BorderBottomStyleProperty>
  /**
   * The CSS `border-left-style` property
   */
  borderLeftStyle?: Prop<CSS.BorderLeftStyleProperty>
  /**
   * The CSS `border-right-styles` property
   */
  borderRightStyle?: Prop<CSS.BorderRightStyleProperty>
  /**
   * The CSS `border-top-color` property
   */
  borderTopColor?: Prop<CSS.BorderTopColorProperty>
  /**
   * The CSS `border-bottom-color` property
   */
  borderBottomColor?: Prop<CSS.BorderBottomColorProperty>
  /**
   * The CSS `border-left-color` property
   */
  borderLeftColor?: Prop<CSS.BorderLeftColorProperty>
  /**
   * The CSS `border-right-color` property
   */
  borderRightColor?: Prop<CSS.BorderRightColorProperty>
  /**
   * The CSS `border-right` property
   */
  borderRight?: Prop<CSS.BorderRightProperty<Length>>
  /**
   * The CSS `border-bottom` property
   */
  borderBottom?: Prop<CSS.BorderBottomProperty<Length>>
  /**
   * The CSS `border-left` property
   */
  borderLeft?: Prop<CSS.BorderLeftProperty<Length>>
  /**
   * The CSS `border-top-radius` property
   */
  borderTopRadius?: Prop<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-right-radius` property
   */
  borderRightRadius?: Prop<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-bottom-radius` property
   */
  borderBottomRadius?: Prop<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-left-radius` property
   */
  borderLeftRadius?: Prop<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-top-left-radius` property
   */
  borderTopLeftRadius?: Prop<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-top-right-radius` property
   */
  borderTopRightRadius?: Prop<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-bottom-left-radius` property
   */
  borderBottomLeftRadius?: Prop<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-bottom-right-radius` property
   */
  borderBottomRightRadius?: Prop<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-right` and `border-left` property
   */
  borderX?: Prop<CSS.BorderProperty<Length>>
  /**
   * The CSS `border-top` and `border-bottom` property
   */
  borderY?: Prop<CSS.BorderProperty<Length>>
}

/**
 * Create the parser for the config object
 */
export const border = createParser(config)
