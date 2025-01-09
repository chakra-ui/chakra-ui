import type { CompositionStyleObject } from "./css.types"

interface Token<T> {
  value: T
  description?: string
}

interface Recursive<T> {
  [key: string]: Recursive<T> | T
}

/* -----------------------------------------------------------------------------
 * Text styles
 * -----------------------------------------------------------------------------*/

type TextStyleProperty =
  | "fontSize"
  | "fontSizeAdjust"
  | "fontVariationSettings"
  | "fontVariantPosition"
  | "fontVariantCaps"
  | "fontVariantNumeric"
  | "fontVariantAlternates"
  | "fontVariantLigatures"
  | "fontFamily"
  | "fontWeight"
  | "fontSynthesis"
  | "fontStyle"
  | "fontVariant"
  | "lineHeight"
  | "letterSpacing"
  | "textDecoration"
  | "textTransform"
  | "textIndent"
  | "textDecorationColor"
  | "textDecorationLine"
  | "textDecorationStyle"
  | "textEmphasisColor"
  | "textEmphasisPosition"
  | "textEmphasisStyle"
  | "hyphenateCharacter"
  | "textOrientation"
  | "textOverflow"
  | "textRendering"

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
  | "background"
  | "bg"
  | "backgroundColor"
  | "bgColor"
  | "backgroundImage"
  | "bgImage"
  | "content"
  | "borderRadius"
  | "border"
  | "borderWidth"
  | "borderColor"
  | "borderStyle"
  | "boxShadow"
  | "boxShadowColor"
  | "filter"
  | "backdropFilter"
  | "transform"
  | "cursor"
  | "color"
  | "opacity"
  | "backgroundBlendMode"
  | "backgroundAttachment"
  | "backgroundClip"
  | "backgroundOrigin"
  | "backgroundPosition"
  | "backgroundRepeat"
  | "backgroundSize"
  | `border${Placement}`
  | `border${Placement}Width`
  | "borderRadius"
  | `border${Radius}Radius`
  | `border${Placement}Color`
  | `border${Placement}Style`
  | "padding"
  | "position"
  | "zIndex"
  | `padding${Placement}`
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
  | "outline"
  | "outlineColor"
  | "outlineStyle"
  | "outlineWidth"
  | "outlineOffset"

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
