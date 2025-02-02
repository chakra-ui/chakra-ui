import type { CssProperties } from "../css.types"
import type { Tokens } from "./token.gen"

type WithColorOpacityModifier<T> = T extends string ? `${T}/${string}` : T
type ImportantMark = "!" | "!important"
type WhitespaceImportant = ` ${ImportantMark}`
type Important = ImportantMark | WhitespaceImportant

type WithImportant<T> = T extends string ? `${T}${Important}` & { __important?: true } : T

export type WithEscapeHatch<T> = T | `[${string}]` | WithColorOpacityModifier<T> | WithImportant<T>
// eslint-disable-next-line
export type OnlyKnown<Value> = Value extends boolean ? Value : Value extends `${infer _}` ? Value : never

export interface UtilityValues {
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
  background: Tokens["colors"] | "currentBg"
  backgroundColor: Tokens["colors"] | "currentBg"
  backgroundClip: "text"
  backgroundGradient: Tokens["gradients"] | "to-t" | "to-tr" | "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl"
  gradientFrom: Tokens["colors"] | "currentBg"
  gradientTo: Tokens["colors"] | "currentBg"
  gradientVia: Tokens["colors"] | "currentBg"
  backgroundImage: Tokens["gradients"] | Tokens["assets"]
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
  borderColor: Tokens["colors"] | "currentBg"
  borderTopColor: Tokens["colors"] | "currentBg"
  borderBlockStartColor: Tokens["colors"] | "currentBg"
  borderBottomColor: Tokens["colors"] | "currentBg"
  borderBlockEndColor: Tokens["colors"] | "currentBg"
  borderLeftColor: Tokens["colors"] | "currentBg"
  borderInlineStartColor: Tokens["colors"] | "currentBg"
  borderRightColor: Tokens["colors"] | "currentBg"
  borderInlineEndColor: Tokens["colors"] | "currentBg"
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
  borderInlineWidth: Tokens["borderWidths"]
  borderInlineStartWidth: Tokens["borderWidths"]
  borderInlineEndWidth: Tokens["borderWidths"]
  borderLeftWidth: Tokens["borderWidths"]
  borderBlockWidth: Tokens["borderWidths"]
  color: Tokens["colors"] | "currentBg"
  fill: Tokens["colors"] | "currentBg"
  stroke: Tokens["colors"] | "currentBg"
  accentColor: Tokens["colors"] | "currentBg"
  divideX: string
  divideY: string
  divideColor: Tokens["colors"] | "currentBg"
  boxShadow: Tokens["shadows"]
  boxShadowColor: Tokens["colors"] | "currentBg"
  opacity: Tokens["opacity"]
  blur: Tokens["blurs"]
  backdropBlur: Tokens["blurs"]
  flexBasis: Tokens["sizes"]
  gap: Tokens["spacing"]
  rowGap: Tokens["spacing"]
  columnGap: Tokens["spacing"]
  gridGap: Tokens["spacing"]
  gridColumnGap: Tokens["spacing"]
  gridRowGap: Tokens["spacing"]
  outlineColor: Tokens["colors"] | "currentBg"
  focusRing: "outside" | "inside" | "mixed" | "none"
  focusVisibleRing: "outside" | "inside" | "mixed" | "none"
  focusRingColor: Tokens["colors"] | "currentBg"
  focusRingOffset: Tokens["spacing"]
  focusRingWidth: Tokens["borderWidths"] | CssProperties["outlineWidth"]
  focusRingStyle: Tokens["borderStyles"] | CssProperties["outlineStyle"]
  aspectRatio: Tokens["aspectRatios"]
  width: Tokens["sizes"]
  inlineSize: Tokens["sizes"]
  height: Tokens["sizes"]
  blockSize: Tokens["sizes"]
  boxSize: Tokens["sizes"] | CssProperties["width"]
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
  scrollbar: "visible" | "hidden"
  scrollbarColor: Tokens["colors"] | "currentBg"
  scrollbarGutter: Tokens["spacing"]
  scrollbarWidth: Tokens["sizes"]
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
  scrollPaddingInline: Tokens["spacing"]
  scrollPaddingBlock: Tokens["spacing"]
  scrollSnapType: "none" | "x" | "y" | "both"
  scrollSnapStrictness: "mandatory" | "proximity"
  scrollSnapMargin: Tokens["spacing"]
  scrollSnapMarginTop: Tokens["spacing"]
  scrollSnapMarginBottom: Tokens["spacing"]
  scrollSnapMarginLeft: Tokens["spacing"]
  scrollSnapMarginRight: Tokens["spacing"]
  listStyleImage: Tokens["assets"]
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
  ringColor: Tokens["colors"] | "currentBg"
  ringOffsetColor: Tokens["colors"] | "currentBg"
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
  textDecorationColor: Tokens["colors"] | "currentBg"
  textShadow: Tokens["shadows"]
  spaceXReverse: boolean
  spaceX: Tokens["spacing"] | CssProperties["marginInlineStart"]
  spaceYReverse: boolean
  spaceY: Tokens["spacing"] | CssProperties["marginTop"]
  translateX: Tokens["spacing"]
  translateY: Tokens["spacing"]
  transition: "all" | "common" | "colors" | "opacity" | "position" | "backgrounds" | "size" | "shadow" | "transform"
  transitionDuration: Tokens["durations"]
  transitionProperty: "common" | "colors" | "size" | "position" | "background"
  transitionTimingFunction: Tokens["easings"]
  animation: Tokens["animations"]
  animationDuration: Tokens["durations"]
  animationDelay: Tokens["durations"]
  animationTimingFunction: Tokens["easings"]
  fontFamily: Tokens["fonts"]
  fontSize: Tokens["fontSizes"]
  fontWeight: Tokens["fontWeights"]
  lineHeight: Tokens["lineHeights"]
  letterSpacing: Tokens["letterSpacings"]
  textIndent: Tokens["spacing"]
  truncate: boolean
  srOnly: boolean
  debug: boolean
  caretColor: Tokens["colors"] | "currentBg"
  cursor: Tokens["cursor"]
  divideStyle: CssProperties["borderStyle"]
  textStyle: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "none"
  layerStyle:
    | "fill.muted"
    | "fill.subtle"
    | "fill.surface"
    | "fill.solid"
    | "outline.subtle"
    | "outline.solid"
    | "indicator.bottom"
    | "indicator.top"
    | "indicator.start"
    | "indicator.end"
    | "disabled"
    | "none"
  animationStyle: "slide-fade-in" | "slide-fade-out" | "scale-fade-in" | "scale-fade-out"
  animationName:
    | "spin"
    | "pulse"
    | "ping"
    | "bounce"
    | "bg-position"
    | "position"
    | "circular-progress"
    | "expand-height"
    | "collapse-height"
    | "expand-width"
    | "collapse-width"
    | "fade-in"
    | "fade-out"
    | "slide-from-left-full"
    | "slide-from-right-full"
    | "slide-from-top-full"
    | "slide-from-bottom-full"
    | "slide-to-left-full"
    | "slide-to-right-full"
    | "slide-to-top-full"
    | "slide-to-bottom-full"
    | "slide-from-top"
    | "slide-from-bottom"
    | "slide-from-left"
    | "slide-from-right"
    | "slide-to-top"
    | "slide-to-bottom"
    | "slide-to-left"
    | "slide-to-right"
    | "scale-in"
    | "scale-out"
}
