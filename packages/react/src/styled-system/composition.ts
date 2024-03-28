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

type Placement =
  | "Top"
  | "Right"
  | "Bottom"
  | "Left"
  | "Inline"
  | "Block"
  | "InlineStart"
  | "InlineEnd"
  | "BlockStart"
  | "BlockEnd"

type Radius =
  | `Top${"Right" | "Left"}`
  | `Bottom${"Right" | "Left"}`
  | `Start${"Start" | "End"}`
  | `End${"Start" | "End"}`

type LayerStyleProperty =
  | "background"
  | "backgroundColor"
  | "backgroundImage"
  | "borderRadius"
  | "border"
  | "borderWidth"
  | "borderColor"
  | "borderStyle"
  | "boxShadow"
  | "filter"
  | "backdropFilter"
  | "transform"
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
  | `padding${Placement}`

export type LayerStyle = CompositionStyleObject<LayerStyleProperty>

export type LayerStyles = Recursive<Token<LayerStyle>>

export interface CompositionStyles {
  textStyles: TextStyles
  layerStyles: LayerStyles
}
