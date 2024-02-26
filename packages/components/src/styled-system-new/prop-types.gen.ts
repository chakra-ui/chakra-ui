import type { ConditionalValue } from "./conditions.gen"
import type { CssProperties } from "./system"
import type { Tokens } from "./token.gen"

interface PropertyValueTypes {
  aspectRatio: Tokens["aspectRatios"]
  zIndex: Tokens["zIndices"]
  top: Tokens["spacing"]
  left: Tokens["spacing"]
  insetInline: Tokens["spacing"]
  insetBlock: Tokens["spacing"]
  inset: "auto" | Tokens["spacing"]
  insetBlockEnd: Tokens["spacing"]
  insetBlockStart: Tokens["spacing"]
  insetInlineEnd: Tokens["spacing"]
  insetInlineStart: Tokens["spacing"]
  right: Tokens["spacing"]
  bottom: Tokens["spacing"]
  insetX: Tokens["spacing"] | CssProperties["insetInline"]
  insetY: Tokens["spacing"] | CssProperties["insetBlock"]
  float: "left" | "right" | "start" | "end"
  hideFrom: Tokens["breakpoints"]
  hideBelow: Tokens["breakpoints"]
  flexBasis:
    | Tokens["spacing"]
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
    | "1/12"
    | "2/12"
    | "3/12"
    | "4/12"
    | "5/12"
    | "6/12"
    | "7/12"
    | "8/12"
    | "9/12"
    | "10/12"
    | "11/12"
    | "full"
  flex: "1" | "auto" | "initial" | "none"
  gridTemplateColumns:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
  gridTemplateRows:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
  gridColumn:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "full"
  gridRow:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "full"
  gridAutoColumns: "min" | "max" | "fr"
  gridAutoRows: "min" | "max" | "fr"
  gap: Tokens["spacing"]
  gridGap: Tokens["spacing"]
  gridRowGap: Tokens["spacing"]
  gridColumnGap: Tokens["spacing"]
  rowGap: Tokens["spacing"]
  columnGap: Tokens["spacing"]
  padding: Tokens["spacing"]
  paddingLeft: Tokens["spacing"]
  paddingRight: Tokens["spacing"]
  paddingTop: Tokens["spacing"]
  paddingBottom: Tokens["spacing"]
  paddingBlock: Tokens["spacing"]
  paddingBlockEnd: Tokens["spacing"]
  paddingBlockStart: Tokens["spacing"]
  paddingInline: Tokens["spacing"]
  paddingInlineEnd: Tokens["spacing"]
  paddingInlineStart: Tokens["spacing"]
  marginLeft: "auto" | Tokens["spacing"]
  marginRight: "auto" | Tokens["spacing"]
  marginTop: "auto" | Tokens["spacing"]
  marginBottom: "auto" | Tokens["spacing"]
  margin: "auto" | Tokens["spacing"]
  marginBlock: "auto" | Tokens["spacing"]
  marginBlockEnd: "auto" | Tokens["spacing"]
  marginBlockStart: "auto" | Tokens["spacing"]
  marginInline: "auto" | Tokens["spacing"]
  marginInlineEnd: "auto" | Tokens["spacing"]
  marginInlineStart: "auto" | Tokens["spacing"]
  outlineWidth: Tokens["borderWidths"]
  outlineColor: Tokens["colors"]
  outline: Tokens["borders"]
  outlineOffset: Tokens["spacing"]
  divideX: string
  divideY: string
  divideColor: Tokens["colors"]
  divideStyle: CssProperties["borderStyle"]
  width:
    | "auto"
    | Tokens["sizes"]
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
    | "1/12"
    | "2/12"
    | "3/12"
    | "4/12"
    | "5/12"
    | "6/12"
    | "7/12"
    | "8/12"
    | "9/12"
    | "10/12"
    | "11/12"
    | "screen"
  inlineSize:
    | "auto"
    | Tokens["sizes"]
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
    | "1/12"
    | "2/12"
    | "3/12"
    | "4/12"
    | "5/12"
    | "6/12"
    | "7/12"
    | "8/12"
    | "9/12"
    | "10/12"
    | "11/12"
    | "screen"
  minWidth:
    | "auto"
    | Tokens["sizes"]
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
    | "1/12"
    | "2/12"
    | "3/12"
    | "4/12"
    | "5/12"
    | "6/12"
    | "7/12"
    | "8/12"
    | "9/12"
    | "10/12"
    | "11/12"
    | "screen"
  minInlineSize:
    | "auto"
    | Tokens["sizes"]
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
    | "1/12"
    | "2/12"
    | "3/12"
    | "4/12"
    | "5/12"
    | "6/12"
    | "7/12"
    | "8/12"
    | "9/12"
    | "10/12"
    | "11/12"
    | "screen"
  maxWidth:
    | "auto"
    | Tokens["sizes"]
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
    | "1/12"
    | "2/12"
    | "3/12"
    | "4/12"
    | "5/12"
    | "6/12"
    | "7/12"
    | "8/12"
    | "9/12"
    | "10/12"
    | "11/12"
    | "screen"
  maxInlineSize:
    | "auto"
    | Tokens["sizes"]
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
    | "1/12"
    | "2/12"
    | "3/12"
    | "4/12"
    | "5/12"
    | "6/12"
    | "7/12"
    | "8/12"
    | "9/12"
    | "10/12"
    | "11/12"
    | "screen"
  height:
    | "auto"
    | Tokens["sizes"]
    | "svh"
    | "lvh"
    | "dvh"
    | "screen"
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
  blockSize:
    | "auto"
    | Tokens["sizes"]
    | "svh"
    | "lvh"
    | "dvh"
    | "screen"
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
  minHeight:
    | "auto"
    | Tokens["sizes"]
    | "svh"
    | "lvh"
    | "dvh"
    | "screen"
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
  minBlockSize:
    | "auto"
    | Tokens["sizes"]
    | "svh"
    | "lvh"
    | "dvh"
    | "screen"
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
  maxHeight:
    | "auto"
    | Tokens["sizes"]
    | "svh"
    | "lvh"
    | "dvh"
    | "screen"
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
  maxBlockSize:
    | "auto"
    | Tokens["sizes"]
    | "svh"
    | "lvh"
    | "dvh"
    | "screen"
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "1/5"
    | "2/5"
    | "3/5"
    | "4/5"
    | "1/6"
    | "2/6"
    | "3/6"
    | "4/6"
    | "5/6"
  color: Tokens["colors"]
  fontFamily: Tokens["fonts"]
  fontSize: Tokens["fontSizes"]
  fontWeight: Tokens["fontWeights"]
  fontSmoothing: "antialiased" | "subpixel-antialiased"
  letterSpacing: Tokens["letterSpacings"]
  lineHeight: Tokens["lineHeights"]
  textDecorationColor: Tokens["colors"]
  textEmphasisColor: Tokens["colors"]
  textIndent: Tokens["spacing"]
  textShadow: Tokens["shadows"]
  textWrap: "wrap" | "balance" | "nowrap"
  truncate: boolean
  listStyleImage: Tokens["assets"]
  background: Tokens["colors"]
  backgroundColor: Tokens["colors"]
  backgroundImage: Tokens["assets"]
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
  textGradient:
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
  borderRadius: Tokens["radii"]
  borderTopLeftRadius: Tokens["radii"]
  borderTopRightRadius: Tokens["radii"]
  borderBottomRightRadius: Tokens["radii"]
  borderBottomLeftRadius: Tokens["radii"]
  borderTopRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderRightRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderBottomRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderLeftRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderStartStartRadius: Tokens["radii"]
  borderStartEndRadius: Tokens["radii"]
  borderStartRadius: Tokens["radii"] | CssProperties["borderRadius"]
  borderEndStartRadius: Tokens["radii"]
  borderEndEndRadius: Tokens["radii"]
  borderEndRadius: Tokens["radii"] | CssProperties["borderRadius"]
  border: Tokens["borders"]
  borderWidth: Tokens["borderWidths"]
  borderTopWidth: Tokens["borderWidths"]
  borderLeftWidth: Tokens["borderWidths"]
  borderRightWidth: Tokens["borderWidths"]
  borderBottomWidth: Tokens["borderWidths"]
  borderColor: Tokens["colors"]
  borderInline: Tokens["borders"]
  borderInlineWidth: Tokens["borderWidths"]
  borderInlineColor: Tokens["colors"]
  borderBlock: Tokens["borders"]
  borderBlockWidth: Tokens["borderWidths"]
  borderBlockColor: Tokens["colors"]
  borderLeft: Tokens["borders"]
  borderLeftColor: Tokens["colors"]
  borderInlineStart: Tokens["borders"]
  borderInlineStartWidth: Tokens["borderWidths"]
  borderInlineStartColor: Tokens["colors"]
  borderRight: Tokens["borders"]
  borderRightColor: Tokens["colors"]
  borderInlineEnd: Tokens["borders"]
  borderInlineEndWidth: Tokens["borderWidths"]
  borderInlineEndColor: Tokens["colors"]
  borderTop: Tokens["borders"]
  borderTopColor: Tokens["colors"]
  borderBottom: Tokens["borders"]
  borderBottomColor: Tokens["colors"]
  borderBlockEnd: Tokens["borders"]
  borderBlockEndColor: Tokens["colors"]
  borderBlockStart: Tokens["borders"]
  borderBlockStartColor: Tokens["colors"]
  opacity: Tokens["opacity"]
  boxShadow: Tokens["shadows"]
  boxShadowColor: Tokens["colors"]
  filter: "auto"
  dropShadow: Tokens["dropShadows"]
  blur: Tokens["blurs"]
  backdropFilter: "auto"
  backdropBlur: Tokens["blurs"]
  borderSpacing: Tokens["spacing"]
  borderSpacingX: Tokens["spacing"]
  borderSpacingY: Tokens["spacing"]
  transitionTimingFunction: Tokens["easings"]
  transitionDelay: Tokens["durations"]
  transitionDuration: Tokens["durations"]
  transition:
    | "all"
    | "common"
    | "background"
    | "colors"
    | "opacity"
    | "shadow"
    | "transform"
  animation: Tokens["animations"]
  animationName: Tokens["animationName"]
  animationDelay: Tokens["durations"]
  scale: "auto" | CssProperties["scale"]
  translate: "auto" | CssProperties["translate"]
  translateX:
    | Tokens["spacing"]
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "full"
    | "-1/2"
    | "-1/3"
    | "-2/3"
    | "-1/4"
    | "-2/4"
    | "-3/4"
    | "-full"
  translateY:
    | Tokens["spacing"]
    | "1/2"
    | "1/3"
    | "2/3"
    | "1/4"
    | "2/4"
    | "3/4"
    | "full"
    | "-1/2"
    | "-1/3"
    | "-2/3"
    | "-1/4"
    | "-2/4"
    | "-3/4"
    | "-full"
  accentColor: Tokens["colors"]
  caretColor: Tokens["colors"]
  scrollbar: "visible" | "hidden"
  scrollMargin: Tokens["spacing"]
  scrollMarginX: Tokens["spacing"] | CssProperties["scrollMarginInline"]
  scrollMarginY: Tokens["spacing"] | CssProperties["scrollMarginBlock"]
  scrollMarginLeft: Tokens["spacing"]
  scrollMarginRight: Tokens["spacing"]
  scrollMarginTop: Tokens["spacing"]
  scrollMarginBottom: Tokens["spacing"]
  scrollMarginBlock: Tokens["spacing"]
  scrollMarginBlockEnd: Tokens["spacing"]
  scrollMarginBlockStart: Tokens["spacing"]
  scrollMarginInline: Tokens["spacing"]
  scrollMarginInlineEnd: Tokens["spacing"]
  scrollMarginInlineStart: Tokens["spacing"]
  scrollPadding: Tokens["spacing"]
  scrollPaddingBlock: Tokens["spacing"]
  scrollPaddingBlockStart: Tokens["spacing"]
  scrollPaddingBlockEnd: Tokens["spacing"]
  scrollPaddingInline: Tokens["spacing"]
  scrollPaddingInlineEnd: Tokens["spacing"]
  scrollPaddingInlineStart: Tokens["spacing"]
  scrollPaddingX: Tokens["spacing"] | CssProperties["scrollPaddingInline"]
  scrollPaddingY: Tokens["spacing"] | CssProperties["scrollPaddingBlock"]
  scrollPaddingLeft: Tokens["spacing"]
  scrollPaddingRight: Tokens["spacing"]
  scrollPaddingTop: Tokens["spacing"]
  scrollPaddingBottom: Tokens["spacing"]
  scrollSnapType: "none" | "x" | "y" | "both"
  scrollSnapStrictness: "mandatory" | "proximity"
  scrollSnapMargin: Tokens["spacing"]
  scrollSnapMarginTop: Tokens["spacing"]
  scrollSnapMarginBottom: Tokens["spacing"]
  scrollSnapMarginLeft: Tokens["spacing"]
  scrollSnapMarginRight: Tokens["spacing"]
  fill: Tokens["colors"]
  stroke: Tokens["colors"]
  strokeWidth: Tokens["borderWidths"]
  srOnly: boolean
  debug: boolean
  containerName: Tokens["containerNames"] | CssProperties["containerName"]
  colorPalette:
    | "current"
    | "black"
    | "white"
    | "transparent"
    | "rose"
    | "pink"
    | "fuchsia"
    | "purple"
    | "violet"
    | "indigo"
    | "blue"
    | "sky"
    | "cyan"
    | "teal"
    | "emerald"
    | "green"
    | "lime"
    | "yellow"
    | "amber"
    | "orange"
    | "red"
    | "neutral"
    | "stone"
    | "zinc"
    | "gray"
    | "slate"
    | "text"
  textStyle:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
}

type CssValue<T> = T extends keyof CssProperties ? CssProperties[T] : never

type Shorthand<T> = T extends keyof PropertyValueTypes
  ? PropertyValueTypes[T] | CssValue<T>
  : CssValue<T>

export interface PropertyTypes extends PropertyValueTypes {
  pos: Shorthand<"position">
  insetEnd: Shorthand<"insetInlineEnd">
  end: Shorthand<"insetInlineEnd">
  insetStart: Shorthand<"insetInlineStart">
  start: Shorthand<"insetInlineStart">
  flexDir: Shorthand<"flexDirection">
  p: Shorthand<"padding">
  pl: Shorthand<"paddingLeft">
  pr: Shorthand<"paddingRight">
  pt: Shorthand<"paddingTop">
  pb: Shorthand<"paddingBottom">
  py: Shorthand<"paddingBlock">
  paddingY: Shorthand<"paddingBlock">
  paddingX: Shorthand<"paddingInline">
  px: Shorthand<"paddingInline">
  pe: Shorthand<"paddingInlineEnd">
  paddingEnd: Shorthand<"paddingInlineEnd">
  ps: Shorthand<"paddingInlineStart">
  paddingStart: Shorthand<"paddingInlineStart">
  ml: Shorthand<"marginLeft">
  mr: Shorthand<"marginRight">
  mt: Shorthand<"marginTop">
  mb: Shorthand<"marginBottom">
  m: Shorthand<"margin">
  my: Shorthand<"marginBlock">
  marginY: Shorthand<"marginBlock">
  mx: Shorthand<"marginInline">
  marginX: Shorthand<"marginInline">
  me: Shorthand<"marginInlineEnd">
  marginEnd: Shorthand<"marginInlineEnd">
  ms: Shorthand<"marginInlineStart">
  marginStart: Shorthand<"marginInlineStart">
  ringWidth: Shorthand<"outlineWidth">
  ringColor: Shorthand<"outlineColor">
  ring: Shorthand<"outline">
  ringOffset: Shorthand<"outlineOffset">
  w: Shorthand<"width">
  minW: Shorthand<"minWidth">
  maxW: Shorthand<"maxWidth">
  h: Shorthand<"height">
  minH: Shorthand<"minHeight">
  maxH: Shorthand<"maxHeight">
  bgPosition: Shorthand<"backgroundPosition">
  bgPositionX: Shorthand<"backgroundPositionX">
  bgPositionY: Shorthand<"backgroundPositionY">
  bgAttachment: Shorthand<"backgroundAttachment">
  bgClip: Shorthand<"backgroundClip">
  bg: Shorthand<"background">
  bgColor: Shorthand<"backgroundColor">
  bgOrigin: Shorthand<"backgroundOrigin">
  bgImage: Shorthand<"backgroundImage">
  bgRepeat: Shorthand<"backgroundRepeat">
  bgBlendMode: Shorthand<"backgroundBlendMode">
  bgSize: Shorthand<"backgroundSize">
  bgGradient: Shorthand<"backgroundGradient">
  rounded: Shorthand<"borderRadius">
  roundedTopLeft: Shorthand<"borderTopLeftRadius">
  roundedTopRight: Shorthand<"borderTopRightRadius">
  roundedBottomRight: Shorthand<"borderBottomRightRadius">
  roundedBottomLeft: Shorthand<"borderBottomLeftRadius">
  roundedTop: Shorthand<"borderTopRadius">
  roundedRight: Shorthand<"borderRightRadius">
  roundedBottom: Shorthand<"borderBottomRadius">
  roundedLeft: Shorthand<"borderLeftRadius">
  roundedStartStart: Shorthand<"borderStartStartRadius">
  roundedStartEnd: Shorthand<"borderStartEndRadius">
  roundedStart: Shorthand<"borderStartRadius">
  roundedEndStart: Shorthand<"borderEndStartRadius">
  roundedEndEnd: Shorthand<"borderEndEndRadius">
  roundedEnd: Shorthand<"borderEndRadius">
  borderX: Shorthand<"borderInline">
  borderXWidth: Shorthand<"borderInlineWidth">
  borderXColor: Shorthand<"borderInlineColor">
  borderY: Shorthand<"borderBlock">
  borderYWidth: Shorthand<"borderBlockWidth">
  borderYColor: Shorthand<"borderBlockColor">
  borderStart: Shorthand<"borderInlineStart">
  borderStartWidth: Shorthand<"borderInlineStartWidth">
  borderStartColor: Shorthand<"borderInlineStartColor">
  borderEnd: Shorthand<"borderInlineEnd">
  borderEndWidth: Shorthand<"borderInlineEndWidth">
  borderEndColor: Shorthand<"borderInlineEndColor">
  shadow: Shorthand<"boxShadow">
  shadowColor: Shorthand<"boxShadowColor">
  x: Shorthand<"translateX">
  y: Shorthand<"translateY">
}

type PropOrCondition<Value> = ConditionalValue<Value | (string & {})>

type PropertyTypeValue<T extends string> = T extends keyof PropertyTypes
  ? PropOrCondition<PropertyTypes[T] | CssValue<T>>
  : never

type CssPropertyValue<T extends string> = T extends keyof CssProperties
  ? PropOrCondition<CssProperties[T]>
  : never

export type PropertyValue<T extends string> = T extends keyof PropertyTypes
  ? PropertyTypeValue<T>
  : T extends keyof CssProperties
  ? CssPropertyValue<T>
  : PropOrCondition<string | number>
