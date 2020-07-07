import * as CSS from "csstype"
import { ResponsiveValue, Length } from "../utils"
import { createParser, Config } from "@styled-system/core"

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
  rounded: {
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
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii",
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii",
  },
  roundedTopRight: {
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
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii",
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii",
  },
  roundedBottomRight: {
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
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii",
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii",
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii",
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  roundedRight: {
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
  border?: ResponsiveValue<CSS.BorderProperty<Length>>
  /**
   * The CSS `border-width` property
   */
  borderWidth?: ResponsiveValue<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-style` property
   */
  borderStyle?: ResponsiveValue<CSS.BorderStyleProperty>
  /**
   * The CSS `border-color` property
   */
  borderColor?: ResponsiveValue<CSS.BorderTopColorProperty>
  /**
   * The CSS `border-radius` property
   */
  borderRadius?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-radius` property
   * @deprecated
   */
  rounded?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-top` property
   */
  borderTop?: ResponsiveValue<CSS.BorderTopProperty<Length>>
  /**
   * The CSS `border-top-width` property
   */
  borderTopWidth?: ResponsiveValue<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-bottom-width` property
   */
  borderBottomWidth?: ResponsiveValue<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-left-width` property
   */
  borderLeftWidth?: ResponsiveValue<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-right-width` property
   */
  borderRightWidth?: ResponsiveValue<CSS.BorderWidthProperty<Length>>
  /**
   * The CSS `border-top-style` property
   */
  borderTopStyle?: ResponsiveValue<CSS.BorderTopStyleProperty>
  /**
   * The CSS `border-bottom-style` property
   */
  borderBottomStyle?: ResponsiveValue<CSS.BorderBottomStyleProperty>
  /**
   * The CSS `border-left-style` property
   */
  borderLeftStyle?: ResponsiveValue<CSS.BorderLeftStyleProperty>
  /**
   * The CSS `border-right-styles` property
   */
  borderRightStyle?: ResponsiveValue<CSS.BorderRightStyleProperty>
  /**
   * The CSS `border-top-color` property
   */
  borderTopColor?: ResponsiveValue<CSS.BorderTopColorProperty>
  /**
   * The CSS `border-bottom-color` property
   */
  borderBottomColor?: ResponsiveValue<CSS.BorderBottomColorProperty>
  /**
   * The CSS `border-left-color` property
   */
  borderLeftColor?: ResponsiveValue<CSS.BorderLeftColorProperty>
  /**
   * The CSS `border-right-color` property
   */
  borderRightColor?: ResponsiveValue<CSS.BorderRightColorProperty>
  /**
   * The CSS `border-right` property
   */
  borderRight?: ResponsiveValue<CSS.BorderRightProperty<Length>>
  /**
   * The CSS `border-bottom` property
   */
  borderBottom?: ResponsiveValue<CSS.BorderBottomProperty<Length>>
  /**
   * The CSS `border-left` property
   */
  borderLeft?: ResponsiveValue<CSS.BorderLeftProperty<Length>>
  /**
   * The CSS `border-top-radius` property
   */
  borderTopRadius?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-top-radius` property
   * @deprecated
   */
  roundedTop?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-right-radius` property
   */
  borderRightRadius?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-right-radius` property
   * @deprecated
   */
  roundedRight?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-bottom-radius` property
   */
  borderBottomRadius?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-bottom-radius` property
   * @deprecated
   */
  roundedBottom?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-left-radius` property
   */
  borderLeftRadius?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-left-radius` property
   * @deprecated
   */
  roundedLeft?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-top-left-radius` property
   */
  borderTopLeftRadius?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-top-left-radius` property
   * @deprecated
   */
  roundedTopLeft?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-top-right-radius` property
   */
  borderTopRightRadius?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-top-right-radius` property
   * @deprecated
   */
  roundedTopRight?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-bottom-left-radius` property
   */
  borderBottomLeftRadius?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-bottom-left-radius` property
   * @deprecated
   */
  roundedBottomLeft?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-bottom-right-radius` property
   */
  borderBottomRightRadius?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-bottom-right-radius` property
   * @deprecated
   */
  roundedBottomRight?: ResponsiveValue<CSS.BorderRadiusProperty<Length>>
  /**
   * The CSS `border-right` and `border-left` property
   */
  borderX?: ResponsiveValue<CSS.BorderProperty<Length>>
  /**
   * The CSS `border-top` and `border-bottom` property
   */
  borderY?: ResponsiveValue<CSS.BorderProperty<Length>>
}

export const border = createParser(config)
