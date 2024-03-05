import type { ConditionalValue, CssProperties } from "../css.types"
import type { Tokens } from "./token.gen"

interface PropertyValueTypes {
  background: Tokens["colors"]
  backgroundColor: Tokens["colors"]
  backgroundGradient:
    | Tokens["gradients"]
    | "to-t"
    | "to-tr"
    | "to-r"
    | "to-br"
    | "to-b"
    | "to-bl"
    | "to-l"
    | "to-tl"
  gradientFrom: Tokens["colors"]
  gradientTo: Tokens["colors"]
  gradientVia: Tokens["colors"]
  backgroundImage: Tokens["gradients"]
  border: Tokens["borders"]
  borderTop: Tokens["borders"]
  borderLeft: Tokens["borders"]
  borderBlockStart: Tokens["borders"]
  borderRight: Tokens["borders"]
  borderInlineEnd: Tokens["borders"]
  borderBottom: Tokens["borders"]
  borderBlockEnd: Tokens["borders"]
  borderInlineStart: Tokens["borders"]
  borderInline: Tokens["borders"]
  borderBlock: Tokens["borders"]
  borderColor: Tokens["colors"]
  borderTopColor: Tokens["colors"]
  borderBlockStartColor: Tokens["colors"]
  borderBottomColor: Tokens["colors"]
  borderBlockEndColor: Tokens["colors"]
  borderLeftColor: Tokens["colors"]
  borderInlineStartColor: Tokens["colors"]
  borderRightColor: Tokens["colors"]
  borderInlineEndColor: Tokens["colors"]
  borderStyle: Tokens["borderStyles"]
  borderTopStyle: Tokens["borderStyles"]
  borderBlockStartStyle: Tokens["borderStyles"]
  borderBottomStyle: Tokens["borderStyles"]
  borderBlockEndStyle: Tokens["borderStyles"]
  borderInlineStartStyle: Tokens["borderStyles"]
  borderInlineEndStyle: Tokens["borderStyles"]
  borderLeftStyle: Tokens["borderStyles"]
  borderRightStyle: Tokens["borderStyles"]
  borderRadius: Tokens["radii"]
  borderTopLeftRadius: Tokens["radii"]
  borderStartStartRadius: Tokens["radii"]
  borderEndStartRadius: Tokens["radii"]
  borderTopRightRadius: Tokens["radii"]
  borderStartEndRadius: Tokens["radii"]
  borderEndEndRadius: Tokens["radii"]
  borderBottomLeftRadius: Tokens["radii"]
  borderBottomRightRadius: Tokens["radii"]
  borderInlineStartRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderInlineEndRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderTopRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderBottomRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderLeftRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderRightRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderWidth: Tokens["borderWidths"]
  borderBlockStartWidth: Tokens["borderWidths"]
  borderTopWidth: Tokens["borderWidths"]
  borderBottomWidth: Tokens["borderWidths"]
  borderBlockEndWidth: Tokens["borderWidths"]
  borderRightWidth: Tokens["borderWidths"]
  borderInlineStartWidth: Tokens["borderWidths"]
  borderInlineEndWidth: Tokens["borderWidths"]
  borderLeftWidth: Tokens["borderWidths"]
  color: Tokens["colors"]
  fill: Tokens["colors"]
  stroke: Tokens["colors"]
  accentColor: Tokens["colors"]
  boxShadow: Tokens["shadows"]
  boxShadowColor: Tokens["colors"]
  opacity: Tokens["opacity"]
  backdropBlur: Tokens["blurs"]
  flexBasis: Tokens["sizes"]
  gap: Tokens["spacing"]
  rowGap: Tokens["spacing"]
  columnGap: Tokens["spacing"]
  gridGap: Tokens["spacing"]
  gridColumnGap: Tokens["spacing"]
  gridRowGap: Tokens["spacing"]
  outlineColor: Tokens["colors"]
  aspectRatio: Tokens["aspectRatios"]
  width: Tokens["sizes"]
  inlineSize: Tokens["sizes"]
  height: Tokens["sizes"]
  blockSize: Tokens["sizes"]
  boxSize: Tokens["sizes"]
  minWidth: Tokens["sizes"]
  minInlineSize: Tokens["sizes"]
  minHeight: Tokens["sizes"]
  minBlockSize: Tokens["sizes"]
  maxWidth: Tokens["sizes"]
  maxInlineSize: Tokens["sizes"]
  maxHeight: Tokens["sizes"]
  maxBlockSize: Tokens["sizes"]
  hideFrom: Tokens["breakpoints"]
  hideBelow: Tokens["breakpoints"]
  scrollMargin: Tokens["spacing"]
  scrollMarginTop: Tokens["spacing"]
  scrollMarginBottom: Tokens["spacing"]
  scrollMarginLeft: Tokens["spacing"]
  scrollMarginRight: Tokens["spacing"]
  scrollMarginX: Tokens["spacing"]
  scrollMarginY: Tokens["spacing"]
  scrollPadding: Tokens["spacing"]
  scrollPaddingTop: Tokens["spacing"]
  scrollPaddingBottom: Tokens["spacing"]
  scrollPaddingLeft: Tokens["spacing"]
  scrollPaddingRight: Tokens["spacing"]
  scrollPaddingX: Tokens["spacing"]
  scrollPaddingY: Tokens["spacing"]
  zIndex: Tokens["zIndex"]
  inset: Tokens["spacing"]
  insetInline: Tokens["spacing"]
  insetBlock: Tokens["spacing"]
  top: Tokens["spacing"]
  insetBlockStart: Tokens["spacing"]
  bottom: Tokens["spacing"]
  insetBlockEnd: Tokens["spacing"]
  left: Tokens["spacing"]
  right: Tokens["spacing"]
  insetInlineStart: Tokens["spacing"]
  insetInlineEnd: Tokens["spacing"]
  ringColor: Tokens["colors"]
  ringOffsetColor: Tokens["colors"]
  margin: Tokens["spacing"]
  marginTop: Tokens["spacing"]
  marginBlockStart: Tokens["spacing"]
  marginRight: Tokens["spacing"]
  marginBottom: Tokens["spacing"]
  marginBlockEnd: Tokens["spacing"]
  marginLeft: Tokens["spacing"]
  marginInlineStart: Tokens["spacing"]
  marginInlineEnd: Tokens["spacing"]
  marginInline: Tokens["spacing"]
  marginBlock: Tokens["spacing"]
  padding: Tokens["spacing"]
  paddingTop: Tokens["spacing"]
  paddingRight: Tokens["spacing"]
  paddingBottom: Tokens["spacing"]
  paddingBlockStart: Tokens["spacing"]
  paddingBlockEnd: Tokens["spacing"]
  paddingLeft: Tokens["spacing"]
  paddingInlineStart: Tokens["spacing"]
  paddingInlineEnd: Tokens["spacing"]
  paddingInline: Tokens["spacing"]
  paddingBlock: Tokens["spacing"]
  textDecorationColor: Tokens["colors"]
  textShadow: Tokens["shadows"]
  translateX: Tokens["spacing"]
  translateY: Tokens["spacing"]
  transitionDuration: Tokens["durations"]
  transitionProperty:
    | "common"
    | "colors"
    | "dimensions"
    | "position"
    | "background"
  transitionTimingFunction: Tokens["easings"]
  animation: Tokens["animations"]
  animationDuration: Tokens["durations"]
  animationDelay: Tokens["durations"]
  fontFamily: Tokens["fonts"]
  fontSize: Tokens["fontSizes"]
  fontWeight: Tokens["fontWeights"]
  lineHeight: Tokens["lineHeights"]
  letterSpacing: Tokens["letterSpacings"]
  truncated: boolean
  srOnly: boolean
  debug: boolean
  caretColor: Tokens["colors"]
  colorPalette:
    | "transparent"
    | "current"
    | "black"
    | "white"
    | "whiteAlpha"
    | "blackAlpha"
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "cyan"
    | "purple"
    | "pink"
    | "bg"
    | "fg"
    | "border"
}

type PropOrCondition<Key, Value> = ConditionalValue<Value | (string & {})>

type CssValue<T> = T extends keyof CssProperties ? CssProperties[T] : never

type Shorthand<T> = T extends keyof PropertyValueTypes
  ? PropertyValueTypes[T] | CssValue<T>
  : CssValue<T>

export interface PropertyTypes extends PropertyValueTypes {
  bg: Shorthand<"background">
  bgColor: Shorthand<"backgroundColor">
  bgSize: Shorthand<"backgroundSize">
  bgPos: Shorthand<"backgroundPosition">
  bgRepeat: Shorthand<"backgroundRepeat">
  bgAttachment: Shorthand<"backgroundAttachment">
  bgClip: Shorthand<"backgroundClip">
  bgGradient: Shorthand<"backgroundGradient">
  bgImg: Shorthand<"backgroundImage">
  bgImage: Shorthand<"backgroundImage">
  borderStart: Shorthand<"borderInlineStart">
  borderX: Shorthand<"borderInline">
  borderY: Shorthand<"borderBlock">
  borderStartColor: Shorthand<"borderInlineStartColor">
  borderEndColor: Shorthand<"borderInlineEndColor">
  borderStartStyle: Shorthand<"borderInlineStartStyle">
  borderEndStyle: Shorthand<"borderInlineEndStyle">
  rounded: Shorthand<"borderRadius">
  roundedTopLeft: Shorthand<"borderTopLeftRadius">
  roundedStartStart: Shorthand<"borderStartStartRadius">
  roundedEndStart: Shorthand<"borderEndStartRadius">
  roundedTopRight: Shorthand<"borderTopRightRadius">
  roundedStartEnd: Shorthand<"borderStartEndRadius">
  roundedEndEnd: Shorthand<"borderEndEndRadius">
  roundedBottomLeft: Shorthand<"borderBottomLeftRadius">
  roundedBottomRight: Shorthand<"borderBottomRightRadius">
  roundedStart: Shorthand<"borderInlineStartRadius">
  borderStartRadius: Shorthand<"borderInlineStartRadius">
  roundedEnd: Shorthand<"borderInlineEndRadius">
  borderEndRadius: Shorthand<"borderInlineEndRadius">
  roundedTop: Shorthand<"borderTopRadius">
  roundedBottom: Shorthand<"borderBottomRadius">
  roundedLeft: Shorthand<"borderLeftRadius">
  roundedRight: Shorthand<"borderRightRadius">
  borderStartWidth: Shorthand<"borderInlineStartWidth">
  borderEndWidth: Shorthand<"borderInlineEndWidth">
  shadow: Shorthand<"boxShadow">
  shadowColor: Shorthand<"boxShadowColor">
  blendMode: Shorthand<"mixBlendMode">
  bgBlendMode: Shorthand<"backgroundBlendMode">
  flexDir: Shorthand<"flexDirection">
  w: Shorthand<"width">
  h: Shorthand<"height">
  minW: Shorthand<"minWidth">
  minH: Shorthand<"minHeight">
  maxW: Shorthand<"maxWidth">
  maxH: Shorthand<"maxHeight">
  overscroll: Shorthand<"overscrollBehavior">
  overscrollX: Shorthand<"overscrollBehaviorX">
  overscrollY: Shorthand<"overscrollBehaviorY">
  listStylePos: Shorthand<"listStylePosition">
  listStyleImg: Shorthand<"listStyleImage">
  pos: Shorthand<"position">
  insetX: Shorthand<"insetInline">
  insetY: Shorthand<"insetBlock">
  insetStart: Shorthand<"insetInlineStart">
  insetEnd: Shorthand<"insetInlineEnd">
  m: Shorthand<"margin">
  mt: Shorthand<"marginBlockStart">
  mr: Shorthand<"marginRight">
  mb: Shorthand<"marginBottom">
  ml: Shorthand<"marginLeft">
  ms: Shorthand<"marginInlineEnd">
  marginStart: Shorthand<"marginInlineStart">
  marginEnd: Shorthand<"marginInlineEnd">
  mx: Shorthand<"marginInline">
  marginX: Shorthand<"marginInline">
  my: Shorthand<"marginBlock">
  marginY: Shorthand<"marginBlock">
  p: Shorthand<"padding">
  pt: Shorthand<"paddingTop">
  pr: Shorthand<"paddingRight">
  pb: Shorthand<"paddingBottom">
  pl: Shorthand<"paddingLeft">
  ps: Shorthand<"paddingInlineStart">
  paddingStart: Shorthand<"paddingInlineStart">
  pe: Shorthand<"paddingInlineEnd">
  paddingEnd: Shorthand<"paddingInlineEnd">
  px: Shorthand<"paddingInline">
  paddingX: Shorthand<"paddingInline">
  py: Shorthand<"paddingBlock">
  paddingY: Shorthand<"paddingBlock">
  textDecor: Shorthand<"textDecoration">
  transitionTiming: Shorthand<"transitionTimingFunction">
}

type PropertyTypeValue<T extends string> = T extends keyof PropertyTypes
  ? PropOrCondition<T, PropertyTypes[T] | CssValue<T>>
  : never

type CssPropertyValue<T extends string> = T extends keyof CssProperties
  ? PropOrCondition<T, CssProperties[T]>
  : never

export type PropertyValue<T extends string> = T extends keyof PropertyTypes
  ? PropertyTypeValue<T>
  : T extends keyof CssProperties
  ? CssPropertyValue<T>
  : PropOrCondition<T, string | number>
