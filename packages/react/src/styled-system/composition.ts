import type { CompositionStyleObject } from "./css.types"

interface Token<T> {
  value: T
  description?: string | undefined
}

interface Recursive<T> {
  [key: string]: Recursive<T> | T
}

/* -----------------------------------------------------------------------------
 * Text styles
 * -----------------------------------------------------------------------------*/

type TextStyleProperty =
  | "color"
  | "direction"
  | "font"
  | "fontFamily"
  | "fontFeatureSettings"
  | "fontKerning"
  | "fontLanguageOverride"
  | "fontOpticalSizing"
  | "fontPalette"
  | "fontSize"
  | "fontSizeAdjust"
  | "fontStretch"
  | "fontStyle"
  | "fontSynthesis"
  | "fontVariant"
  | "fontVariantAlternates"
  | "fontVariantCaps"
  | "fontVariantLigatures"
  | "fontVariantNumeric"
  | "fontVariantPosition"
  | "fontVariationSettings"
  | "fontWeight"
  | "hangingPunctuation"
  | "hyphens"
  | "hyphenateCharacter"
  | "hyphenateLimitChars"
  | "letterSpacing"
  | "lineBreak"
  | "lineHeight"
  | "quotes"
  | "overflowWrap"
  | "tabSize"
  | "textAlign"
  | "textAlignLast"
  | "textCombineUpright"
  | "textDecoration"
  | "textDecorationColor"
  | "textDecorationLine"
  | "textDecorationSkip"
  | "textDecorationSkipBox"
  | "textDecorationSkipInk"
  | "textDecorationSkipInset"
  | "textDecorationStyle"
  | "textDecorationThickness"
  | "textEmphasis"
  | "textEmphasisColor"
  | "textEmphasisPosition"
  | "textEmphasisStyle"
  | "textIndent"
  | "textJustify"
  | "textOrientation"
  | "textOverflow"
  | "textRendering"
  | "textShadow"
  | "textStroke"
  | "textStrokeColor"
  | "textStrokeWidth"
  | "textTransform"
  | "textUnderlineOffset"
  | "textUnderlinePosition"
  | "textWrap"
  | "textWrapMode"
  | "textWrapStyle"
  | "unicodeBidi"
  | "verticalAlign"
  | "whiteSpace"
  | "wordBreak"
  | "wordSpacing"
  | "writingMode"

export type TextStyle = CompositionStyleObject<TextStyleProperty>

export type TextStyles = Recursive<Token<TextStyle>>

/* -----------------------------------------------------------------------------
 * Layer styles
 * -----------------------------------------------------------------------------*/

type LogicalPlacement =
  | "Inline"
  | "Block"
  | "InlineStart"
  | "InlineEnd"
  | "BlockStart"
  | "BlockEnd"

type PhysicalPlacement = "Top" | "Right" | "Bottom" | "Left"

type Placement = PhysicalPlacement | LogicalPlacement

type Radius =
  | `Top${"Right" | "Left"}`
  | `Bottom${"Right" | "Left"}`
  | `Start${"Start" | "End"}`
  | `End${"Start" | "End"}`

type LayerStyleProperty =
  | "aspectRatio"
  | "background"
  | "bg"
  | "backgroundColor"
  | "bgColor"
  | "backgroundImage"
  | "bgImage"
  | "backgroundBlendMode"
  | "backgroundAttachment"
  | "backgroundClip"
  | "backgroundOrigin"
  | "backgroundPosition"
  | "backgroundRepeat"
  | "backgroundSize"
  | "border"
  | "borderColor"
  | "borderImage"
  | "borderImageOutset"
  | "borderImageRepeat"
  | "borderImageSlice"
  | "borderImageSource"
  | "borderImageWidth"
  | `border${Placement}`
  | `border${Placement}Color`
  | `border${Placement}Style`
  | `border${Placement}Width`
  | "borderRadius"
  | `border${Radius}Radius`
  | "borderStyle"
  | "borderWidth"
  | "boxShadow"
  | "boxShadowColor"
  | "clipPath"
  | "color"
  | "contain"
  | "content"
  | "contentVisibility"
  | "cursor"
  | "display"
  | "filter"
  | "backdropFilter"
  | "height"
  | "width"
  | "minHeight"
  | "minWidth"
  | "maxHeight"
  | "maxWidth"
  | `margin${Placement}`
  | "inset"
  | `inset${LogicalPlacement}`
  | Lowercase<PhysicalPlacement>
  | "isolation"
  | "mask"
  | "maskClip"
  | "maskComposite"
  | "maskImage"
  | "maskMode"
  | "maskOrigin"
  | "maskPosition"
  | "maskRepeat"
  | "maskSize"
  | "mixBlendMode"
  | "objectFit"
  | "objectPosition"
  | "opacity"
  | "outline"
  | "outlineColor"
  | "outlineOffset"
  | "outlineStyle"
  | "outlineWidth"
  | "overflow"
  | "overflowX"
  | "overflowY"
  | "padding"
  | `padding${Placement}`
  | "pointerEvents"
  | "position"
  | "resize"
  | "transform"
  | "transition"
  | "visibility"
  | "willChange"
  | "zIndex"

export type LayerStyle = CompositionStyleObject<LayerStyleProperty>

export type LayerStyles = Recursive<Token<LayerStyle>>

/* -----------------------------------------------------------------------------
 * Motion styles
 * -----------------------------------------------------------------------------*/

type AnimationStyleProperty =
  | "animation"
  | "animationComposition"
  | "animationDelay"
  | "animationDirection"
  | "animationDuration"
  | "animationFillMode"
  | "animationIterationCount"
  | "animationName"
  | "animationPlayState"
  | "animationTimingFunction"
  | "animationRange"
  | "animationRangeStart"
  | "animationRangeEnd"
  | "animationTimeline"
  | "transformOrigin"

export type AnimationStyle = CompositionStyleObject<AnimationStyleProperty>

export type AnimationStyles = Recursive<Token<AnimationStyle>>

export interface CompositionStyles {
  textStyles: TextStyles
  layerStyles: LayerStyles
  animationStyles: AnimationStyles
}
