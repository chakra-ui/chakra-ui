import { Config, createParser, system } from "@styled-system/core"
import * as CSS from "csstype"
import { Length, polyfill, ResponsiveValue, t } from "../utils"

/**
 * The parser configuration for common border properties
 */
const config: Config = {
  border: t.borders("border"),
  borderWidth: t.borderWidths("borderWidth"),
  borderStyle: t.borderStyles("borderStyle"),
  borderColor: t.colors("borderColor"),
  borderRadius: t.radii("borderRadius"),
  borderTop: t.borders("borderTop"),
  borderBlockStart: t.borders("borderBlockStart"),
  borderTopLeftRadius: t.radii("borderTopLeftRadius"),
  borderStartStartRadius: {
    property: "&",
    scale: "radii",
    transform: polyfill({
      ltr: "borderTopLeftRadius",
      rtl: "borderTopRightRadius",
    }),
  },
  borderEndStartRadius: {
    property: "&",
    scale: "radii",
    transform: polyfill({
      ltr: "borderBottomLeftRadius",
      rtl: "borderBottomRightRadius",
    }),
  },
  borderTopRightRadius: t.radii("borderTopRightRadius"),
  borderStartEndRadius: {
    property: "&",
    scale: "radii",
    transform: polyfill({
      ltr: "borderTopRightRadius",
      rtl: "borderTopLeftRadius",
    }),
  },
  borderEndEndRadius: {
    property: "&",
    scale: "radii",
    transform: polyfill({
      ltr: "borderBottomRightRadius",
      rtl: "borderBottomLeftRadius",
    }),
  },
  borderRight: t.borders("borderRight"),
  borderInlineEnd: t.borders("borderInlineEnd"),
  borderBottom: t.borders("borderBottom"),
  borderBlockEnd: t.borders("borderBlockEnd"),
  borderBottomLeftRadius: t.radii("borderBottomLeftRadius"),
  borderBottomRightRadius: t.radii("borderBottomRightRadius"),
  borderLeft: t.borders("borderLeft"),
  borderInlineStart: {
    property: "borderInlineStart",
    scale: "borders",
  },
  borderInlineStartRadius: {
    scale: "radii",
    property: "&",
    transform: polyfill({
      ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      rtl: ["borderTopRightRadius", "borderBottomRightRadius"],
    }),
  },
  borderInlineEndRadius: {
    scale: "radii",
    property: "&",
    transform: polyfill({
      ltr: ["borderTopRightRadius", "borderBottomRightRadius"],
      rtl: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    }),
  },
  borderX: t.borders(["borderLeft", "borderRight"]),
  borderInline: t.borders("borderInline"),
  borderY: t.borders(["borderTop", "borderBottom"]),
  borderBlock: t.borders("borderBlock"),
  borderTopWidth: t.borderWidths("borderTopWidth"),
  borderBlockStartWidth: t.borderWidths("borderBlockStartWidth"),
  borderTopColor: t.colors("borderTopColor"),
  borderBlockStartColor: t.colors("borderBlockStartColor"),
  borderTopStyle: t.borderStyles("borderTopStyle"),
  borderBlockStartStyle: t.borderStyles("borderBlockStartStyle"),
  borderBottomWidth: t.borderWidths("borderBottomWidth"),
  borderBlockEndWidth: t.borderWidths("borderBlockEndWidth"),
  borderBottomColor: t.colors("borderBottomColor"),
  borderBlockEndColor: t.colors("borderBlockEndColor"),
  borderBottomStyle: t.borderStyles("borderBottomStyle"),
  borderBlockEndStyle: t.borderStyles("borderBlockEndStyle"),
  borderLeftWidth: t.borderWidths("borderLeftWidth"),
  borderInlineStartWidth: t.borderWidths("borderInlineStartWidth"),
  borderLeftColor: t.colors("borderLeftColor"),
  borderInlineStartColor: t.colors("borderInlineStartColor"),
  borderLeftStyle: t.borderStyles("borderLeftStyle"),
  borderInlineStartStyle: t.borderStyles("borderInlineStartStyle"),
  borderRightWidth: t.borderWidths("borderRightWidth"),
  borderInlineEndWidth: t.borderWidths("borderInlineEndWidth"),
  borderRightColor: t.colors("borderRightColor"),
  borderInlineEndColor: t.colors("borderInlineEndColor"),
  borderRightStyle: t.borderStyles("borderRightStyle"),
  borderInlineEndStyle: t.borderStyles("borderInlineEndStyle"),
  borderTopRadius: t.radii(["borderTopLeftRadius", "borderTopRightRadius"]),
  borderBottomRadius: t.radii([
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
  ]),
  borderLeftRadius: t.radii(["borderTopLeftRadius", "borderBottomLeftRadius"]),
  borderRightRadius: t.radii([
    "borderTopRightRadius",
    "borderBottomRightRadius",
  ]),
}

config.roundedTopLeft = config.borderTopLeftRadius
config.roundedTopLeftBidi = config.borderStartStartRadius
config.roundedTopRight = config.borderTopRightRadius
config.roundedTopRightBidi = config.borderStartEndRadius
config.roundedBottomLeft = config.borderBottomLeftRadius
config.roundedBottomLeftBidi = config.borderEndStartRadius
config.roundedBottomRight = config.borderBottomRightRadius
config.roundedBottomRightBidi = config.borderEndEndRadius
config.rounded = config.borderRadius
config.roundedTop = config.borderTopRadius
config.roundedBottom = config.borderBottomRadius
config.roundedLeft = config.borderLeftRadius
config.roundedLeftBidi = config.borderInlineStartRadius
config.roundedRight = config.borderRightRadius
config.roundedRightBidi = config.borderInlineEndRadius

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
  roundedRightBidi?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  borderInlineEndRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
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
  roundedLeftBidi?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  borderInlineStartRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-left-radius` property
   */
  borderTopLeftRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  borderStartStartRadius?: ResponsiveValue<
    CSS.Property.BorderStartStartRadius<Length>
  >
  /**
   * The CSS `border-top-left-radius` property
   */
  roundedTopLeft?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  roundedTopLeftBidi?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-top-right-radius` property
   */
  borderTopRightRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  borderStartEndRadius?: ResponsiveValue<
    CSS.Property.BorderStartEndRadius<Length>
  >
  /**
   * The CSS `border-top-right-radius` property
   */
  roundedTopRight?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  roundedTopRightBidi?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-left-radius` property
   */
  borderBottomLeftRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  borderEndStartRadius?: ResponsiveValue<
    CSS.Property.BorderEndStartRadius<Length>
  >
  /**
   * The CSS `border-bottom-left-radius` property
   */
  roundedBottomLeft?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  roundedBottomLeftBidi?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  /**
   * The CSS `border-bottom-right-radius` property
   */
  borderBottomRightRadius?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  borderEndEndRadius?: ResponsiveValue<CSS.Property.BorderEndEndRadius<Length>>
  /**
   * The CSS `border-bottom-right-radius` property
   */
  roundedBottomRight?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
  roundedBottomRightBidi?: ResponsiveValue<CSS.Property.BorderRadius<Length>>
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
