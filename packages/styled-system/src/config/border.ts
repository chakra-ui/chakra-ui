import * as CSS from "csstype"
import { Config } from "../utils/prop-config"
import { t, Token } from "../utils"

export const border: Config = {
  border: t.borders("border"),
  borderWidth: t.borderWidths("borderWidth"),
  borderStyle: t.borderStyles("borderStyle"),
  borderColor: t.colors("borderColor"),
  borderRadius: t.radii("borderRadius"),
  borderTop: t.borders("borderTop"),
  borderBlockStart: t.borders("borderBlockStart"),
  borderTopLeftRadius: t.radii("borderTopLeftRadius"),
  borderStartStartRadius: t.logical({
    scale: "radii",
    property: {
      ltr: "borderTopLeftRadius",
      rtl: "borderTopRightRadius",
    },
  }),
  borderEndStartRadius: t.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomLeftRadius",
      rtl: "borderBottomRightRadius",
    },
  }),
  borderTopRightRadius: t.radii("borderTopRightRadius"),
  borderStartEndRadius: t.logical({
    scale: "radii",
    property: {
      ltr: "borderTopRightRadius",
      rtl: "borderTopLeftRadius",
    },
  }),
  borderEndEndRadius: t.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomRightRadius",
      rtl: "borderBottomLeftRadius",
    },
  }),
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
  borderInlineStartRadius: t.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      rtl: ["borderTopRightRadius", "borderBottomRightRadius"],
    },
  }),
  borderInlineEndRadius: t.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopRightRadius", "borderBottomRightRadius"],
      rtl: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    },
  }),
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

Object.assign(border, {
  rounded: border.borderRadius,
  roundedTop: border.borderTopRadius,
  roundedTopLeft: border.borderTopLeftRadius,
  roundedTopRight: border.borderTopRightRadius,
  roundedTopStart: border.borderStartStartRadius,
  roundedTopEnd: border.borderStartEndRadius,
  roundedBottom: border.borderBottomRadius,
  roundedBottomLeft: border.borderBottomLeftRadius,
  roundedBottomRight: border.borderBottomRightRadius,
  roundedBottomStart: border.borderEndStartRadius,
  roundedBottomEnd: border.borderEndEndRadius,
  roundedLeft: border.borderLeftRadius,
  roundedRight: border.borderRightRadius,
  roundedStart: border.borderInlineStartRadius,
  roundedEnd: border.borderInlineEndRadius,
  borderStart: border.borderInlineStart,
  borderEnd: border.borderInlineEnd,
  borderTopStartRadius: border.borderStartStartRadius,
  borderTopEndRadius: border.borderStartEndRadius,
  borderBottomStartRadius: border.borderEndStartRadius,
  borderBottomEndRadius: border.borderEndEndRadius,
  borderStartRadius: border.borderInlineStartRadius,
  borderEndRadius: border.borderInlineEndRadius,
  borderStartWidth: border.borderInlineStartWidth,
  borderEndWidth: border.borderInlineEndWidth,
  borderStartColor: border.borderInlineStartColor,
  borderEndColor: border.borderInlineEndColor,
  borderStartStyle: border.borderInlineStartStyle,
  borderEndStyle: border.borderInlineEndStyle,
})

/**
 * The prop types for border properties listed above
 */
export interface BorderProps {
  /**
   * The CSS `border` property
   */
  border?: Token<CSS.Property.Border | number, "borders">
  /**
   * The CSS `border-width` property
   */
  borderWidth?: Token<CSS.Property.BorderWidth | number>
  /**
   * The CSS `border-style` property
   */
  borderStyle?: Token<CSS.Property.BorderStyle>
  /**
   * The CSS `border-color` property
   */
  borderColor?: Token<CSS.Property.BorderTopColor, "colors">
  /**
   * The CSS `border-radius` property
   */
  borderRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-radius` property
   */
  rounded?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-top` property
   */
  borderTop?: Token<CSS.Property.BorderTop | number, "borders">
  borderBlockStart?: Token<CSS.Property.BorderBlockStart | number>
  /**
   * The CSS `border-top-width` property
   */
  borderTopWidth?: Token<CSS.Property.BorderWidth | number>
  borderBlockStartWidth?: Token<CSS.Property.BorderBlockStartWidth | number>
  /**
   * The CSS `border-bottom-width` property
   */
  borderBottomWidth?: Token<CSS.Property.BorderWidth | number>
  borderBlockEndWidth?: Token<CSS.Property.BorderBlockEndWidth | number>
  /**
   * The CSS `border-left-width` property
   */
  borderLeftWidth?: Token<CSS.Property.BorderWidth | number>
  borderStartWidth?: Token<CSS.Property.BorderWidth | number>
  borderInlineStartWidth?: Token<CSS.Property.BorderInlineStartWidth | number>
  /**
   * The CSS `border-right-width` property
   */
  borderRightWidth?: Token<CSS.Property.BorderWidth | number>
  borderEndWidth?: Token<CSS.Property.BorderWidth | number>
  borderInlineEndWidth?: Token<CSS.Property.BorderInlineEndWidth | number>
  /**
   * The CSS `border-top-style` property
   */
  borderTopStyle?: Token<CSS.Property.BorderTopStyle>
  borderBlockStartStyle?: Token<CSS.Property.BorderBlockStartStyle>
  /**
   * The CSS `border-bottom-style` property
   */
  borderBottomStyle?: Token<CSS.Property.BorderBottomStyle>
  borderBlockEndStyle?: Token<CSS.Property.BorderBlockEndStyle>
  /**
   * The CSS `border-left-style` property
   */
  borderLeftStyle?: Token<CSS.Property.BorderLeftStyle>
  borderStartStyle?: Token<CSS.Property.BorderInlineStartStyle>
  borderInlineStartStyle?: Token<CSS.Property.BorderInlineStartStyle>
  /**
   * The CSS `border-right-styles` property
   */
  borderRightStyle?: Token<CSS.Property.BorderRightStyle>
  borderEndStyle?: Token<CSS.Property.BorderInlineEndStyle>
  borderInlineEndStyle?: Token<CSS.Property.BorderInlineEndStyle>
  /**
   * The CSS `border-top-color` property
   */
  borderTopColor?: Token<CSS.Property.BorderTopColor, "colors">
  borderBlockStartColor?: Token<CSS.Property.BorderBlockStartColor, "colors">
  /**
   * The CSS `border-bottom-color` property
   */
  borderBottomColor?: Token<CSS.Property.BorderBottomColor, "colors">
  borderBlockEndColor?: Token<CSS.Property.BorderBlockEndColor, "colors">
  /**
   * The CSS `border-left-color` property
   */
  borderLeftColor?: Token<CSS.Property.BorderLeftColor, "colors">
  borderStartColor?: Token<CSS.Property.BorderInlineStartColor>
  borderInlineStartColor?: Token<CSS.Property.BorderInlineStartColor, "colors">
  /**
   * The CSS `border-right-color` property
   */
  borderRightColor?: Token<CSS.Property.BorderRightColor, "colors">
  borderEndColor?: Token<CSS.Property.BorderInlineEndColor>
  borderInlineEndColor?: Token<CSS.Property.BorderInlineEndColor, "colors">
  /**
   * The CSS `border-right` property
   */
  borderRight?: Token<CSS.Property.BorderRight | number, "borders">

  borderEnd?: Token<CSS.Property.BorderInlineStart | number>
  borderInlineEnd?: Token<CSS.Property.BorderInlineEnd | number>
  /**
   * The CSS `border-bottom` property
   */
  borderBottom?: Token<CSS.Property.BorderBottom | number, "borders">

  borderBlockEnd?: Token<CSS.Property.BorderBlockEnd | number>
  /**
   * The CSS `border-left` property
   */
  borderLeft?: Token<CSS.Property.BorderLeft | number, "borders">
  borderStart?: Token<CSS.Property.BorderInlineStart | number>
  borderInlineStart?: Token<CSS.Property.BorderInlineStart | number>
  /**
   * The CSS `border-top-radius` property
   */
  borderTopRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-top-radius` property
   */
  roundedTop?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-right-radius` property
   */
  borderRightRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-right-radius` property
   */
  roundedRight?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * When direction is `ltr`, `roundedEnd` is equivalent to `borderRightRadius`.
   * When direction is `rtl`, `roundedEnd` is equivalent to `borderLeftRadius`.
   */
  roundedEnd?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * When direction is `ltr`, `borderInlineEndRadius` is equivalent to `borderRightRadius`.
   * When direction is `rtl`, `borderInlineEndRadius` is equivalent to `borderLeftRadius`.
   */
  borderInlineEndRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * When direction is `ltr`, `borderEndRadius` is equivalent to `borderRightRadius`.
   * When direction is `rtl`, `borderEndRadius` is equivalent to `borderLeftRadius`.
   */
  borderEndRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-bottom-radius` property
   */
  borderBottomRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-bottom-radius` property
   */
  roundedBottom?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-left-radius` property
   */
  borderLeftRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-left-radius` property
   */
  roundedLeft?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * When direction is `ltr`, `roundedEnd` is equivalent to `borderRightRadius`.
   * When direction is `rtl`, `roundedEnd` is equivalent to `borderLeftRadius`.
   */
  roundedStart?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * When direction is `ltr`, `borderInlineStartRadius` is equivalent to `borderLeftRadius`.
   * When direction is `rtl`, `borderInlineStartRadius` is equivalent to `borderRightRadius`.
   */
  borderInlineStartRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * When direction is `ltr`, `borderStartRadius` is equivalent to `borderLeftRadius`.
   * When direction is `rtl`, `borderStartRadius` is equivalent to `borderRightRadius`.
   */
  borderStartRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-top-left-radius` property
   */
  borderTopLeftRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  borderTopStartRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  borderStartStartRadius?: Token<
    CSS.Property.BorderStartStartRadius | number,
    "radii"
  >
  /**
   * The CSS `border-top-left-radius` property
   */
  roundedTopLeft?: Token<CSS.Property.BorderRadius | number, "radii">
  roundedTopStart?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-top-right-radius` property
   */
  borderTopRightRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  borderTopEndRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  borderStartEndRadius?: Token<
    CSS.Property.BorderStartEndRadius | number,
    "radii"
  >
  /**
   * The CSS `border-top-right-radius` property
   */
  roundedTopRight?: Token<CSS.Property.BorderRadius | number, "radii">
  roundedTopEnd?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-bottom-left-radius` property
   */
  borderBottomLeftRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  borderBottomStartRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  borderEndStartRadius?: Token<
    CSS.Property.BorderEndStartRadius | number,
    "radii"
  >
  /**
   * The CSS `border-bottom-left-radius` property
   */
  roundedBottomLeft?: Token<CSS.Property.BorderRadius | number, "radii">
  roundedBottomStart?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-bottom-right-radius` property
   */
  borderBottomRightRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  borderBottomEndRadius?: Token<CSS.Property.BorderRadius | number, "radii">
  borderEndEndRadius?: Token<CSS.Property.BorderEndEndRadius | number, "radii">
  /**
   * The CSS `border-bottom-right-radius` property
   */
  roundedBottomRight?: Token<CSS.Property.BorderRadius | number, "radii">
  roundedBottomEnd?: Token<CSS.Property.BorderRadius | number, "radii">
  /**
   * The CSS `border-right` and `border-left` property
   */
  borderX?: Token<CSS.Property.Border | number, "borders">
  borderInline?: Token<CSS.Property.BorderInline | number>
  /**
   * The CSS `border-top` and `border-bottom` property
   */
  borderY?: Token<CSS.Property.Border | number, "borders">
  borderBlock?: Token<CSS.Property.BorderBlock | number>
}
