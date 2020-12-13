import { Config, createParser, system } from "@styled-system/core"
import * as CSS from "csstype"
import { Length, ResponsiveValue } from "../utils"

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
  borderBlockStart: {
    property: "borderBlockStart",
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
  borderInlineEnd: {
    property: "borderInlineEnd",
    scale: "borders",
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders",
  },
  borderBlockEnd: {
    property: "borderBlockEnd",
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
  borderInlineStart: {
    property: "borderInlineStart",
    scale: "borders",
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders",
  },
  borderInline: {
    property: "borderInline",
    scale: "borders",
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders",
  },
  borderBlock: {
    property: "borderBlock",
    scale: "borders",
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths",
  },
  borderBlockStartWidth: {
    property: "borderBlockStartWidth",
    scale: "borderWidths",
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors",
  },
  borderBlockStartColor: {
    property: "borderBlockStartColor",
    scale: "colors",
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles",
  },
  borderBlockStartStyle: {
    property: "borderBlockStartStyle",
    scale: "borderStyles",
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths",
  },
  borderBlockEndWidth: {
    property: "borderBlockEndWidth",
    scale: "borderWidths",
  },

  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors",
  },
  borderBlockEndColor: {
    property: "borderBlockEndColor",
    scale: "colors",
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles",
  },
  borderBlockEndStyle: {
    property: "borderBlockEndStyle",
    scale: "borderStyles",
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths",
  },
  borderInlineStartWidth: {
    property: "borderInlineStartWidth",
    scale: "borderWidths",
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors",
  },
  borderInlineStartColor: {
    property: "borderInlineStartColor",
    scale: "colors",
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles",
  },
  borderInlineStartStyle: {
    property: "borderInlineStartStyle",
    scale: "borderStyles",
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths",
  },
  borderInlineEndWidth: {
    property: "borderInlineEndWidth",
    scale: "borderWidths",
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors",
  },
  borderInlineEndColor: {
    property: "borderInlineEndColor",
    scale: "colors",
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles",
  },
  borderInlineEndStyle: {
    property: "borderInlineEndStyle",
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

config.rounded = config.borderRadius
config.roundedTop = config.borderTopRadius
config.roundedBottom = config.borderBottomRadius
config.roundedLeft = config.borderLeftRadius
config.roundedRight = config.borderRightRadius
config.roundedTopLeft = config.borderTopLeftRadius
config.roundedTopRight = config.borderTopRightRadius
config.roundedBottomLeft = config.borderBottomLeftRadius
config.roundedBottomRight = config.borderBottomRightRadius

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
   */
  rounded?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top` property
   */
  borderTop?: ResponsiveValue<CSS.Property.BorderTop<Length>>
  borderBlockStart?: ResponsiveValue<CSS.Property.BorderBlockStart<Length>>
  /**
   * The CSS `border-top-width` property
   */
  borderTopWidth?: ResponsiveValue<CSS.Property.BorderWidth<Length>>
  borderBlockStartWidth?: ResponsiveValue<
    CSS.Property.BorderBlockStartWidth<Length>
  >
  /**
   * The CSS `border-bottom-width` property
   */
  borderBottomWidth?: ResponsiveValue<CSS.Property.BorderWidth<Length>>
  borderBlockEndWidth?: ResponsiveValue<
    CSS.Property.BorderBlockEndWidth<Length>
  >
  /**
   * The CSS `border-left-width` property
   */
  borderLeftWidth?: ResponsiveValue<CSS.Property.BorderWidth<Length>>
  borderInlineStartWidth?: ResponsiveValue<
    CSS.Property.BorderInlineStartWidth<Length>
  >
  /**
   * The CSS `border-right-width` property
   */
  borderRightWidth?: ResponsiveValue<CSS.Property.BorderWidth<Length>>
  borderInlineEndWidth?: ResponsiveValue<
    CSS.Property.BorderInlineEndWidth<Length>
  >
  /**
   * The CSS `border-top-style` property
   */
  borderTopStyle?: ResponsiveValue<CSS.Property.BorderTopStyle>
  borderBlockStartStyle?: ResponsiveValue<CSS.Property.BorderBlockStartStyle>
  /**
   * The CSS `border-bottom-style` property
   */
  borderBottomStyle?: ResponsiveValue<CSS.Property.BorderBottomStyle>
  borderBlockEndStyle?: ResponsiveValue<CSS.Property.BorderBlockEndStyle>
  /**
   * The CSS `border-left-style` property
   */
  borderLeftStyle?: ResponsiveValue<CSS.Property.BorderLeftStyle>
  borderInlineStartStyle?: ResponsiveValue<CSS.Property.BorderInlineStartStyle>
  /**
   * The CSS `border-right-styles` property
   */
  borderRightStyle?: ResponsiveValue<CSS.Property.BorderRightStyle>
  borderInlineEndStyle?: ResponsiveValue<CSS.Property.BorderInlineEndStyle>
  /**
   * The CSS `border-top-color` property
   */
  borderTopColor?: ResponsiveValue<CSS.Property.BorderTopColor>
  borderBlockStartColor?: ResponsiveValue<CSS.Property.BorderBlockStartColor>
  /**
   * The CSS `border-bottom-color` property
   */
  borderBottomColor?: ResponsiveValue<CSS.Property.BorderBottomColor>
  borderBlockEndColor?: ResponsiveValue<CSS.Property.BorderBlockEndColor>
  /**
   * The CSS `border-left-color` property
   */
  borderLeftColor?: ResponsiveValue<CSS.Property.BorderLeftColor>
  borderInlineStartColor?: ResponsiveValue<CSS.Property.BorderInlineStartColor>
  /**
   * The CSS `border-right-color` property
   */
  borderRightColor?: ResponsiveValue<CSS.Property.BorderRightColor>
  borderInlineEndColor?: ResponsiveValue<CSS.Property.BorderInlineEndColor>
  /**
   * The CSS `border-right` property
   */
  borderRight?: ResponsiveValue<CSS.Property.BorderRight<Length>>
  borderInlineEnd?: ResponsiveValue<CSS.Property.BorderInlineEnd<Length>>
  /**
   * The CSS `border-bottom` property
   */
  borderBottom?: ResponsiveValue<CSS.Property.BorderBottom<Length>>
  borderBlockEnd?: ResponsiveValue<CSS.Property.BorderBlockEnd<Length>>
  /**
   * The CSS `border-left` property
   */
  borderLeft?: ResponsiveValue<CSS.Property.BorderLeft<Length>>
  borderInlineStart?: ResponsiveValue<CSS.Property.BorderInlineStart<Length>>
  /**
   * The CSS `border-top-radius` property
   */
  borderTopRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-radius` property
   */
  roundedTop?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-right-radius` property
   */
  borderRightRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-right-radius` property
   */
  roundedRight?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-radius` property
   */
  borderBottomRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-radius` property
   */
  roundedBottom?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-left-radius` property
   */
  borderLeftRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-left-radius` property
   */
  roundedLeft?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-left-radius` property
   */
  borderTopLeftRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-left-radius` property
   */
  roundedTopLeft?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-right-radius` property
   */
  borderTopRightRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-right-radius` property
   */
  roundedTopRight?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-left-radius` property
   */
  borderBottomLeftRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-left-radius` property
   */
  roundedBottomLeft?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-right-radius` property
   */
  borderBottomRightRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-right-radius` property
   */
  roundedBottomRight?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-right` and `border-left` property
   */
  borderX?: ResponsiveValue<CSS.Property.Border<Length>>
  borderInline?: ResponsiveValue<CSS.Property.BorderInline<Length>>
  /**
   * The CSS `border-top` and `border-bottom` property
   */
  borderY?: ResponsiveValue<CSS.Property.Border<Length>>
  borderBlock?: ResponsiveValue<CSS.Property.BorderBlock<Length>>
}

export const border = system(config)

export const borderParser = createParser(config)
