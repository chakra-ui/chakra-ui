import * as CSS from "csstype"
import { ResponsiveValue, Length } from "../utils"
import { createParser, Config, system } from "@styled-system/core"

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
  border?: ResponsiveValue<CSS.Property.Border<Length>>
  /**
   * The CSS `border-width` property
   */
  borderWidth?: ResponsiveValue<CSS.Property.BorderWidth<Length>>
  /**
   * The CSS `border-style` property
   */
  borderStyle?: ResponsiveValue<CSS.Property.BorderStyle>
  /**
   * The CSS `border-color` property
   */
  borderColor?: ResponsiveValue<CSS.Property.BorderTopColor>
  /**
   * The CSS `border-radius` property
   */
  borderRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-radius` property
   * @deprecated
   */
  rounded?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top` property
   */
  borderTop?: ResponsiveValue<CSS.Property.BorderTop<Length>>
  /**
   * The CSS `border-top-width` property
   */
  borderTopWidth?: ResponsiveValue<CSS.Property.BorderWidth<Length>>
  /**
   * The CSS `border-bottom-width` property
   */
  borderBottomWidth?: ResponsiveValue<CSS.Property.BorderWidth<Length>>
  /**
   * The CSS `border-left-width` property
   */
  borderLeftWidth?: ResponsiveValue<CSS.Property.BorderWidth<Length>>
  /**
   * The CSS `border-right-width` property
   */
  borderRightWidth?: ResponsiveValue<CSS.Property.BorderWidth<Length>>
  /**
   * The CSS `border-top-style` property
   */
  borderTopStyle?: ResponsiveValue<CSS.Property.BorderTopStyle>
  /**
   * The CSS `border-bottom-style` property
   */
  borderBottomStyle?: ResponsiveValue<CSS.Property.BorderBottomStyle>
  /**
   * The CSS `border-left-style` property
   */
  borderLeftStyle?: ResponsiveValue<CSS.Property.BorderLeftStyle>
  /**
   * The CSS `border-right-styles` property
   */
  borderRightStyle?: ResponsiveValue<CSS.Property.BorderRightStyle>
  /**
   * The CSS `border-top-color` property
   */
  borderTopColor?: ResponsiveValue<CSS.Property.BorderTopColor>
  /**
   * The CSS `border-bottom-color` property
   */
  borderBottomColor?: ResponsiveValue<CSS.Property.BorderBottomColor>
  /**
   * The CSS `border-left-color` property
   */
  borderLeftColor?: ResponsiveValue<CSS.Property.BorderLeftColor>
  /**
   * The CSS `border-right-color` property
   */
  borderRightColor?: ResponsiveValue<CSS.Property.BorderRightColor>
  /**
   * The CSS `border-right` property
   */
  borderRight?: ResponsiveValue<CSS.Property.BorderRight<Length>>
  /**
   * The CSS `border-bottom` property
   */
  borderBottom?: ResponsiveValue<CSS.Property.BorderBottom<Length>>
  /**
   * The CSS `border-left` property
   */
  borderLeft?: ResponsiveValue<CSS.Property.BorderLeft<Length>>
  /**
   * The CSS `border-top-radius` property
   */
  borderTopRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-radius` property
   * @deprecated
   */
  roundedTop?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-right-radius` property
   */
  borderRightRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-right-radius` property
   * @deprecated
   */
  roundedRight?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-radius` property
   */
  borderBottomRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-radius` property
   * @deprecated
   */
  roundedBottom?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-left-radius` property
   */
  borderLeftRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-left-radius` property
   * @deprecated
   */
  roundedLeft?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-left-radius` property
   */
  borderTopLeftRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-left-radius` property
   * @deprecated
   */
  roundedTopLeft?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-right-radius` property
   */
  borderTopRightRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-right-radius` property
   * @deprecated
   */
  roundedTopRight?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-left-radius` property
   */
  borderBottomLeftRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-left-radius` property
   * @deprecated
   */
  roundedBottomLeft?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-right-radius` property
   */
  borderBottomRightRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-right-radius` property
   * @deprecated
   */
  roundedBottomRight?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-right` and `border-left` property
   */
  borderX?: ResponsiveValue<CSS.Property.Border<Length>>
  /**
   * The CSS `border-top` and `border-bottom` property
   */
  borderY?: ResponsiveValue<CSS.Property.Border<Length>>
}

export const border = system(config)

export const borderParser = createParser(config)
