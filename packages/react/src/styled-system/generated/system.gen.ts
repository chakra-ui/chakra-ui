import type { ConditionalValue, CssProperties } from "../css.types"
import type { UtilityValues } from "./prop-types.gen"
import type { Token } from "./token.gen"
type AnyString = string & {}
type AnyNumber = number & {}
type CssVars = `var(--${string})`
type CssVarValue = ConditionalValue<Token | CssVars | AnyString | AnyNumber>
type CssVarKey = `--${string}`
export type CssVarProperties = {
  [key in CssVarKey]?: CssVarValue
}

export interface SystemProperties {
  WebkitAppearance?: ConditionalValue<CssProperties["WebkitAppearance"] | AnyString> | undefined
  WebkitBorderBefore?: ConditionalValue<CssProperties["WebkitBorderBefore"] | AnyString> | undefined
  WebkitBorderBeforeColor?: ConditionalValue<CssProperties["WebkitBorderBeforeColor"] | AnyString> | undefined
  WebkitBorderBeforeStyle?: ConditionalValue<CssProperties["WebkitBorderBeforeStyle"] | AnyString> | undefined
  WebkitBorderBeforeWidth?: ConditionalValue<CssProperties["WebkitBorderBeforeWidth"] | AnyString> | undefined
  WebkitBoxReflect?: ConditionalValue<CssProperties["WebkitBoxReflect"] | AnyString> | undefined
  WebkitLineClamp?: ConditionalValue<CssProperties["WebkitLineClamp"] | AnyString> | undefined
  WebkitMask?: ConditionalValue<CssProperties["WebkitMask"] | AnyString> | undefined
  WebkitMaskAttachment?: ConditionalValue<CssProperties["WebkitMaskAttachment"] | AnyString> | undefined
  WebkitMaskClip?: ConditionalValue<CssProperties["WebkitMaskClip"] | AnyString> | undefined
  WebkitMaskComposite?: ConditionalValue<CssProperties["WebkitMaskComposite"] | AnyString> | undefined
  WebkitMaskImage?: ConditionalValue<CssProperties["WebkitMaskImage"] | AnyString> | undefined
  WebkitMaskOrigin?: ConditionalValue<CssProperties["WebkitMaskOrigin"] | AnyString> | undefined
  WebkitMaskPosition?: ConditionalValue<CssProperties["WebkitMaskPosition"] | AnyString> | undefined
  WebkitMaskPositionX?: ConditionalValue<CssProperties["WebkitMaskPositionX"] | AnyString> | undefined
  WebkitMaskPositionY?: ConditionalValue<CssProperties["WebkitMaskPositionY"] | AnyString> | undefined
  WebkitMaskRepeat?: ConditionalValue<CssProperties["WebkitMaskRepeat"] | AnyString> | undefined
  WebkitMaskRepeatX?: ConditionalValue<CssProperties["WebkitMaskRepeatX"] | AnyString> | undefined
  WebkitMaskRepeatY?: ConditionalValue<CssProperties["WebkitMaskRepeatY"] | AnyString> | undefined
  WebkitMaskSize?: ConditionalValue<CssProperties["WebkitMaskSize"] | AnyString> | undefined
  WebkitOverflowScrolling?: ConditionalValue<CssProperties["WebkitOverflowScrolling"] | AnyString> | undefined
  WebkitTapHighlightColor?: ConditionalValue<CssProperties["WebkitTapHighlightColor"] | AnyString> | undefined
  WebkitTextFillColor?: ConditionalValue<CssProperties["WebkitTextFillColor"] | AnyString> | undefined
  WebkitTextStroke?: ConditionalValue<CssProperties["WebkitTextStroke"] | AnyString> | undefined
  WebkitTextStrokeColor?: ConditionalValue<CssProperties["WebkitTextStrokeColor"] | AnyString> | undefined
  WebkitTextStrokeWidth?: ConditionalValue<CssProperties["WebkitTextStrokeWidth"] | AnyString> | undefined
  WebkitTouchCallout?: ConditionalValue<CssProperties["WebkitTouchCallout"] | AnyString> | undefined
  WebkitUserModify?: ConditionalValue<CssProperties["WebkitUserModify"] | AnyString> | undefined
  WebkitUserSelect?: ConditionalValue<CssProperties["WebkitUserSelect"] | AnyString> | undefined
  accentColor?: ConditionalValue<UtilityValues["accentColor"] | CssVars | CssProperties["accentColor"] | AnyString> | undefined
  alignContent?: ConditionalValue<CssProperties["alignContent"] | AnyString> | undefined
  alignItems?: ConditionalValue<CssProperties["alignItems"] | AnyString> | undefined
  alignSelf?: ConditionalValue<CssProperties["alignSelf"] | AnyString> | undefined
  alignTracks?: ConditionalValue<CssProperties["alignTracks"] | AnyString> | undefined
  all?: ConditionalValue<CssProperties["all"] | AnyString> | undefined
  anchorName?: ConditionalValue<CssProperties["anchorName"] | AnyString> | undefined
  anchorScope?: ConditionalValue<CssProperties["anchorScope"] | AnyString> | undefined
  animation?: ConditionalValue<UtilityValues["animation"] | CssVars | CssProperties["animation"] | AnyString> | undefined
  animationComposition?: ConditionalValue<CssProperties["animationComposition"] | AnyString> | undefined
  animationDelay?: ConditionalValue<UtilityValues["animationDelay"] | CssVars | CssProperties["animationDelay"] | AnyString> | undefined
  animationDirection?: ConditionalValue<CssProperties["animationDirection"] | AnyString> | undefined
  animationDuration?: ConditionalValue<UtilityValues["animationDuration"] | CssVars | CssProperties["animationDuration"] | AnyString> | undefined
  animationFillMode?: ConditionalValue<CssProperties["animationFillMode"] | AnyString> | undefined
  animationIterationCount?: ConditionalValue<CssProperties["animationIterationCount"] | AnyString> | undefined
  animationName?: ConditionalValue<UtilityValues["animationName"] | CssVars | CssProperties["animationName"] | AnyString> | undefined
  animationPlayState?: ConditionalValue<CssProperties["animationPlayState"] | AnyString> | undefined
  animationRange?: ConditionalValue<CssProperties["animationRange"] | AnyString> | undefined
  animationRangeEnd?: ConditionalValue<CssProperties["animationRangeEnd"] | AnyString> | undefined
  animationRangeStart?: ConditionalValue<CssProperties["animationRangeStart"] | AnyString> | undefined
  animationTimeline?: ConditionalValue<CssProperties["animationTimeline"] | AnyString> | undefined
  animationTimingFunction?: ConditionalValue<UtilityValues["animationTimingFunction"] | CssVars | CssProperties["animationTimingFunction"] | AnyString> | undefined
  appearance?: ConditionalValue<CssProperties["appearance"] | AnyString> | undefined
  aspectRatio?: ConditionalValue<UtilityValues["aspectRatio"] | CssVars | CssProperties["aspectRatio"] | AnyString> | undefined
  backdropFilter?: ConditionalValue<CssProperties["backdropFilter"] | AnyString> | undefined
  backfaceVisibility?: ConditionalValue<CssProperties["backfaceVisibility"] | AnyString> | undefined
  background?: ConditionalValue<UtilityValues["background"] | CssVars | CssProperties["background"] | AnyString> | undefined
  backgroundAttachment?: ConditionalValue<CssProperties["backgroundAttachment"] | AnyString> | undefined
  backgroundBlendMode?: ConditionalValue<CssProperties["backgroundBlendMode"] | AnyString> | undefined
  backgroundClip?: ConditionalValue<UtilityValues["backgroundClip"] | CssVars | CssProperties["backgroundClip"] | AnyString> | undefined
  backgroundColor?: ConditionalValue<UtilityValues["backgroundColor"] | CssVars | CssProperties["backgroundColor"] | AnyString> | undefined
  backgroundImage?: ConditionalValue<UtilityValues["backgroundImage"] | CssVars | CssProperties["backgroundImage"] | AnyString> | undefined
  backgroundOrigin?: ConditionalValue<CssProperties["backgroundOrigin"] | AnyString> | undefined
  backgroundPosition?: ConditionalValue<CssProperties["backgroundPosition"] | AnyString> | undefined
  backgroundPositionX?: ConditionalValue<CssProperties["backgroundPositionX"] | AnyString> | undefined
  backgroundPositionY?: ConditionalValue<CssProperties["backgroundPositionY"] | AnyString> | undefined
  backgroundRepeat?: ConditionalValue<CssProperties["backgroundRepeat"] | AnyString> | undefined
  backgroundSize?: ConditionalValue<CssProperties["backgroundSize"] | AnyString> | undefined
  blockSize?: ConditionalValue<UtilityValues["blockSize"] | CssVars | CssProperties["blockSize"] | AnyString> | undefined
  border?: ConditionalValue<UtilityValues["border"] | CssVars | CssProperties["border"] | AnyString> | undefined
  borderBlock?: ConditionalValue<UtilityValues["borderBlock"] | CssVars | CssProperties["borderBlock"] | AnyString> | undefined
  borderBlockColor?: ConditionalValue<CssProperties["borderBlockColor"] | AnyString> | undefined
  borderBlockEnd?: ConditionalValue<UtilityValues["borderBlockEnd"] | CssVars | CssProperties["borderBlockEnd"] | AnyString> | undefined
  borderBlockEndColor?: ConditionalValue<UtilityValues["borderBlockEndColor"] | CssVars | CssProperties["borderBlockEndColor"] | AnyString> | undefined
  borderBlockEndStyle?: ConditionalValue<UtilityValues["borderBlockEndStyle"] | CssVars | CssProperties["borderBlockEndStyle"] | AnyString> | undefined
  borderBlockEndWidth?: ConditionalValue<UtilityValues["borderBlockEndWidth"] | CssVars | CssProperties["borderBlockEndWidth"] | AnyString> | undefined
  borderBlockStart?: ConditionalValue<UtilityValues["borderBlockStart"] | CssVars | CssProperties["borderBlockStart"] | AnyString> | undefined
  borderBlockStartColor?: ConditionalValue<UtilityValues["borderBlockStartColor"] | CssVars | CssProperties["borderBlockStartColor"] | AnyString> | undefined
  borderBlockStartStyle?: ConditionalValue<UtilityValues["borderBlockStartStyle"] | CssVars | CssProperties["borderBlockStartStyle"] | AnyString> | undefined
  borderBlockStartWidth?: ConditionalValue<UtilityValues["borderBlockStartWidth"] | CssVars | CssProperties["borderBlockStartWidth"] | AnyString> | undefined
  borderBlockStyle?: ConditionalValue<CssProperties["borderBlockStyle"] | AnyString> | undefined
  borderBlockWidth?: ConditionalValue<UtilityValues["borderBlockWidth"] | CssVars | CssProperties["borderBlockWidth"] | AnyString> | undefined
  borderBottom?: ConditionalValue<UtilityValues["borderBottom"] | CssVars | CssProperties["borderBottom"] | AnyString> | undefined
  borderBottomColor?: ConditionalValue<UtilityValues["borderBottomColor"] | CssVars | CssProperties["borderBottomColor"] | AnyString> | undefined
  borderBottomLeftRadius?: ConditionalValue<UtilityValues["borderBottomLeftRadius"] | CssVars | CssProperties["borderBottomLeftRadius"] | AnyString> | undefined
  borderBottomRightRadius?: ConditionalValue<UtilityValues["borderBottomRightRadius"] | CssVars | CssProperties["borderBottomRightRadius"] | AnyString> | undefined
  borderBottomStyle?: ConditionalValue<UtilityValues["borderBottomStyle"] | CssVars | CssProperties["borderBottomStyle"] | AnyString> | undefined
  borderBottomWidth?: ConditionalValue<UtilityValues["borderBottomWidth"] | CssVars | CssProperties["borderBottomWidth"] | AnyString> | undefined
  borderCollapse?: ConditionalValue<CssProperties["borderCollapse"] | AnyString> | undefined
  borderColor?: ConditionalValue<UtilityValues["borderColor"] | CssVars | CssProperties["borderColor"] | AnyString> | undefined
  borderEndEndRadius?: ConditionalValue<UtilityValues["borderEndEndRadius"] | CssVars | CssProperties["borderEndEndRadius"] | AnyString> | undefined
  borderEndStartRadius?: ConditionalValue<UtilityValues["borderEndStartRadius"] | CssVars | CssProperties["borderEndStartRadius"] | AnyString> | undefined
  borderImage?: ConditionalValue<CssProperties["borderImage"] | AnyString> | undefined
  borderImageOutset?: ConditionalValue<CssProperties["borderImageOutset"] | AnyString> | undefined
  borderImageRepeat?: ConditionalValue<CssProperties["borderImageRepeat"] | AnyString> | undefined
  borderImageSlice?: ConditionalValue<CssProperties["borderImageSlice"] | AnyString> | undefined
  borderImageSource?: ConditionalValue<CssProperties["borderImageSource"] | AnyString> | undefined
  borderImageWidth?: ConditionalValue<CssProperties["borderImageWidth"] | AnyString> | undefined
  borderInline?: ConditionalValue<UtilityValues["borderInline"] | CssVars | CssProperties["borderInline"] | AnyString> | undefined
  borderInlineColor?: ConditionalValue<CssProperties["borderInlineColor"] | AnyString> | undefined
  borderInlineEnd?: ConditionalValue<UtilityValues["borderInlineEnd"] | CssVars | CssProperties["borderInlineEnd"] | AnyString> | undefined
  borderInlineEndColor?: ConditionalValue<UtilityValues["borderInlineEndColor"] | CssVars | CssProperties["borderInlineEndColor"] | AnyString> | undefined
  borderInlineEndStyle?: ConditionalValue<UtilityValues["borderInlineEndStyle"] | CssVars | CssProperties["borderInlineEndStyle"] | AnyString> | undefined
  borderInlineEndWidth?: ConditionalValue<UtilityValues["borderInlineEndWidth"] | CssVars | CssProperties["borderInlineEndWidth"] | AnyString> | undefined
  borderInlineStart?: ConditionalValue<UtilityValues["borderInlineStart"] | CssVars | CssProperties["borderInlineStart"] | AnyString> | undefined
  borderInlineStartColor?: ConditionalValue<UtilityValues["borderInlineStartColor"] | CssVars | CssProperties["borderInlineStartColor"] | AnyString> | undefined
  borderInlineStartStyle?: ConditionalValue<UtilityValues["borderInlineStartStyle"] | CssVars | CssProperties["borderInlineStartStyle"] | AnyString> | undefined
  borderInlineStartWidth?: ConditionalValue<UtilityValues["borderInlineStartWidth"] | CssVars | CssProperties["borderInlineStartWidth"] | AnyString> | undefined
  borderInlineStyle?: ConditionalValue<CssProperties["borderInlineStyle"] | AnyString> | undefined
  borderInlineWidth?: ConditionalValue<UtilityValues["borderInlineWidth"] | CssVars | CssProperties["borderInlineWidth"] | AnyString> | undefined
  borderLeft?: ConditionalValue<UtilityValues["borderLeft"] | CssVars | CssProperties["borderLeft"] | AnyString> | undefined
  borderLeftColor?: ConditionalValue<UtilityValues["borderLeftColor"] | CssVars | CssProperties["borderLeftColor"] | AnyString> | undefined
  borderLeftStyle?: ConditionalValue<UtilityValues["borderLeftStyle"] | CssVars | CssProperties["borderLeftStyle"] | AnyString> | undefined
  borderLeftWidth?: ConditionalValue<UtilityValues["borderLeftWidth"] | CssVars | CssProperties["borderLeftWidth"] | AnyString> | undefined
  borderRadius?: ConditionalValue<UtilityValues["borderRadius"] | CssVars | CssProperties["borderRadius"] | AnyString> | undefined
  borderRight?: ConditionalValue<UtilityValues["borderRight"] | CssVars | CssProperties["borderRight"] | AnyString> | undefined
  borderRightColor?: ConditionalValue<UtilityValues["borderRightColor"] | CssVars | CssProperties["borderRightColor"] | AnyString> | undefined
  borderRightStyle?: ConditionalValue<UtilityValues["borderRightStyle"] | CssVars | CssProperties["borderRightStyle"] | AnyString> | undefined
  borderRightWidth?: ConditionalValue<UtilityValues["borderRightWidth"] | CssVars | CssProperties["borderRightWidth"] | AnyString> | undefined
  borderSpacing?: ConditionalValue<CssProperties["borderSpacing"] | AnyString> | undefined
  borderStartEndRadius?: ConditionalValue<UtilityValues["borderStartEndRadius"] | CssVars | CssProperties["borderStartEndRadius"] | AnyString> | undefined
  borderStartStartRadius?: ConditionalValue<UtilityValues["borderStartStartRadius"] | CssVars | CssProperties["borderStartStartRadius"] | AnyString> | undefined
  borderStyle?: ConditionalValue<UtilityValues["borderStyle"] | CssVars | CssProperties["borderStyle"] | AnyString> | undefined
  borderTop?: ConditionalValue<UtilityValues["borderTop"] | CssVars | CssProperties["borderTop"] | AnyString> | undefined
  borderTopColor?: ConditionalValue<UtilityValues["borderTopColor"] | CssVars | CssProperties["borderTopColor"] | AnyString> | undefined
  borderTopLeftRadius?: ConditionalValue<UtilityValues["borderTopLeftRadius"] | CssVars | CssProperties["borderTopLeftRadius"] | AnyString> | undefined
  borderTopRightRadius?: ConditionalValue<UtilityValues["borderTopRightRadius"] | CssVars | CssProperties["borderTopRightRadius"] | AnyString> | undefined
  borderTopStyle?: ConditionalValue<UtilityValues["borderTopStyle"] | CssVars | CssProperties["borderTopStyle"] | AnyString> | undefined
  borderTopWidth?: ConditionalValue<UtilityValues["borderTopWidth"] | CssVars | CssProperties["borderTopWidth"] | AnyString> | undefined
  borderWidth?: ConditionalValue<UtilityValues["borderWidth"] | CssVars | CssProperties["borderWidth"] | AnyString> | undefined
  bottom?: ConditionalValue<UtilityValues["bottom"] | CssVars | CssProperties["bottom"] | AnyString> | undefined
  boxAlign?: ConditionalValue<CssProperties["boxAlign"] | AnyString> | undefined
  boxDecorationBreak?: ConditionalValue<CssProperties["boxDecorationBreak"] | AnyString> | undefined
  boxDirection?: ConditionalValue<CssProperties["boxDirection"] | AnyString> | undefined
  boxFlex?: ConditionalValue<CssProperties["boxFlex"] | AnyString> | undefined
  boxFlexGroup?: ConditionalValue<CssProperties["boxFlexGroup"] | AnyString> | undefined
  boxLines?: ConditionalValue<CssProperties["boxLines"] | AnyString> | undefined
  boxOrdinalGroup?: ConditionalValue<CssProperties["boxOrdinalGroup"] | AnyString> | undefined
  boxOrient?: ConditionalValue<CssProperties["boxOrient"] | AnyString> | undefined
  boxPack?: ConditionalValue<CssProperties["boxPack"] | AnyString> | undefined
  boxShadow?: ConditionalValue<UtilityValues["boxShadow"] | CssVars | CssProperties["boxShadow"] | AnyString> | undefined
  boxSizing?: ConditionalValue<CssProperties["boxSizing"] | AnyString> | undefined
  breakAfter?: ConditionalValue<CssProperties["breakAfter"] | AnyString> | undefined
  breakBefore?: ConditionalValue<CssProperties["breakBefore"] | AnyString> | undefined
  breakInside?: ConditionalValue<CssProperties["breakInside"] | AnyString> | undefined
  captionSide?: ConditionalValue<CssProperties["captionSide"] | AnyString> | undefined
  caret?: ConditionalValue<CssProperties["caret"] | AnyString> | undefined
  caretColor?: ConditionalValue<UtilityValues["caretColor"] | CssVars | CssProperties["caretColor"] | AnyString> | undefined
  caretShape?: ConditionalValue<CssProperties["caretShape"] | AnyString> | undefined
  clear?: ConditionalValue<CssProperties["clear"] | AnyString> | undefined
  clip?: ConditionalValue<CssProperties["clip"] | AnyString> | undefined
  clipPath?: ConditionalValue<CssProperties["clipPath"] | AnyString> | undefined
  clipRule?: ConditionalValue<CssProperties["clipRule"] | AnyString> | undefined
  color?: ConditionalValue<UtilityValues["color"] | CssVars | CssProperties["color"] | AnyString> | undefined
  colorInterpolationFilters?: ConditionalValue<CssProperties["colorInterpolationFilters"] | AnyString> | undefined
  colorScheme?: ConditionalValue<CssProperties["colorScheme"] | AnyString> | undefined
  columnCount?: ConditionalValue<CssProperties["columnCount"] | AnyString> | undefined
  columnFill?: ConditionalValue<CssProperties["columnFill"] | AnyString> | undefined
  columnGap?: ConditionalValue<UtilityValues["columnGap"] | CssVars | CssProperties["columnGap"] | AnyString> | undefined
  columnRule?: ConditionalValue<CssProperties["columnRule"] | AnyString> | undefined
  columnRuleColor?: ConditionalValue<CssProperties["columnRuleColor"] | AnyString> | undefined
  columnRuleStyle?: ConditionalValue<CssProperties["columnRuleStyle"] | AnyString> | undefined
  columnRuleWidth?: ConditionalValue<CssProperties["columnRuleWidth"] | AnyString> | undefined
  columnSpan?: ConditionalValue<CssProperties["columnSpan"] | AnyString> | undefined
  columnWidth?: ConditionalValue<CssProperties["columnWidth"] | AnyString> | undefined
  columns?: ConditionalValue<CssProperties["columns"] | AnyString> | undefined
  contain?: ConditionalValue<CssProperties["contain"] | AnyString> | undefined
  containIntrinsicBlockSize?: ConditionalValue<CssProperties["containIntrinsicBlockSize"] | AnyString> | undefined
  containIntrinsicHeight?: ConditionalValue<CssProperties["containIntrinsicHeight"] | AnyString> | undefined
  containIntrinsicInlineSize?: ConditionalValue<CssProperties["containIntrinsicInlineSize"] | AnyString> | undefined
  containIntrinsicSize?: ConditionalValue<CssProperties["containIntrinsicSize"] | AnyString> | undefined
  containIntrinsicWidth?: ConditionalValue<CssProperties["containIntrinsicWidth"] | AnyString> | undefined
  container?: ConditionalValue<CssProperties["container"] | AnyString> | undefined
  containerName?: ConditionalValue<CssProperties["containerName"] | AnyString> | undefined
  containerType?: ConditionalValue<CssProperties["containerType"] | AnyString> | undefined
  content?: ConditionalValue<CssProperties["content"] | AnyString> | undefined
  contentVisibility?: ConditionalValue<CssProperties["contentVisibility"] | AnyString> | undefined
  counterIncrement?: ConditionalValue<CssProperties["counterIncrement"] | AnyString> | undefined
  counterReset?: ConditionalValue<CssProperties["counterReset"] | AnyString> | undefined
  counterSet?: ConditionalValue<CssProperties["counterSet"] | AnyString> | undefined
  cursor?: ConditionalValue<UtilityValues["cursor"] | CssVars | CssProperties["cursor"] | AnyString> | undefined
  cx?: ConditionalValue<CssProperties["cx"] | AnyString> | undefined
  cy?: ConditionalValue<CssProperties["cy"] | AnyString> | undefined
  d?: ConditionalValue<CssProperties["d"] | AnyString> | undefined
  direction?: ConditionalValue<CssProperties["direction"] | AnyString> | undefined
  display?: ConditionalValue<CssProperties["display"] | AnyString> | undefined
  dominantBaseline?: ConditionalValue<CssProperties["dominantBaseline"] | AnyString> | undefined
  emptyCells?: ConditionalValue<CssProperties["emptyCells"] | AnyString> | undefined
  fieldSizing?: ConditionalValue<CssProperties["fieldSizing"] | AnyString> | undefined
  fill?: ConditionalValue<UtilityValues["fill"] | CssVars | CssProperties["fill"] | AnyString> | undefined
  fillOpacity?: ConditionalValue<CssProperties["fillOpacity"] | AnyString> | undefined
  fillRule?: ConditionalValue<CssProperties["fillRule"] | AnyString> | undefined
  filter?: ConditionalValue<CssProperties["filter"] | AnyString> | undefined
  flex?: ConditionalValue<CssProperties["flex"] | AnyString> | undefined
  flexBasis?: ConditionalValue<UtilityValues["flexBasis"] | CssVars | CssProperties["flexBasis"] | AnyString> | undefined
  flexDirection?: ConditionalValue<CssProperties["flexDirection"] | AnyString> | undefined
  flexFlow?: ConditionalValue<CssProperties["flexFlow"] | AnyString> | undefined
  flexGrow?: ConditionalValue<CssProperties["flexGrow"] | AnyString> | undefined
  flexShrink?: ConditionalValue<CssProperties["flexShrink"] | AnyString> | undefined
  flexWrap?: ConditionalValue<CssProperties["flexWrap"] | AnyString> | undefined
  float?: ConditionalValue<CssProperties["float"] | AnyString> | undefined
  floodColor?: ConditionalValue<CssProperties["floodColor"] | AnyString> | undefined
  floodOpacity?: ConditionalValue<CssProperties["floodOpacity"] | AnyString> | undefined
  font?: ConditionalValue<CssProperties["font"] | AnyString> | undefined
  fontFamily?: ConditionalValue<UtilityValues["fontFamily"] | CssVars | CssProperties["fontFamily"] | AnyString> | undefined
  fontFeatureSettings?: ConditionalValue<CssProperties["fontFeatureSettings"] | AnyString> | undefined
  fontKerning?: ConditionalValue<CssProperties["fontKerning"] | AnyString> | undefined
  fontLanguageOverride?: ConditionalValue<CssProperties["fontLanguageOverride"] | AnyString> | undefined
  fontOpticalSizing?: ConditionalValue<CssProperties["fontOpticalSizing"] | AnyString> | undefined
  fontPalette?: ConditionalValue<CssProperties["fontPalette"] | AnyString> | undefined
  fontSize?: ConditionalValue<UtilityValues["fontSize"] | CssVars | CssProperties["fontSize"] | AnyString> | undefined
  fontSizeAdjust?: ConditionalValue<CssProperties["fontSizeAdjust"] | AnyString> | undefined
  fontSmooth?: ConditionalValue<CssProperties["fontSmooth"] | AnyString> | undefined
  fontStretch?: ConditionalValue<CssProperties["fontStretch"] | AnyString> | undefined
  fontStyle?: ConditionalValue<CssProperties["fontStyle"] | AnyString> | undefined
  fontSynthesis?: ConditionalValue<CssProperties["fontSynthesis"] | AnyString> | undefined
  fontSynthesisPosition?: ConditionalValue<CssProperties["fontSynthesisPosition"] | AnyString> | undefined
  fontSynthesisSmallCaps?: ConditionalValue<CssProperties["fontSynthesisSmallCaps"] | AnyString> | undefined
  fontSynthesisStyle?: ConditionalValue<CssProperties["fontSynthesisStyle"] | AnyString> | undefined
  fontSynthesisWeight?: ConditionalValue<CssProperties["fontSynthesisWeight"] | AnyString> | undefined
  fontVariant?: ConditionalValue<CssProperties["fontVariant"] | AnyString> | undefined
  fontVariantAlternates?: ConditionalValue<CssProperties["fontVariantAlternates"] | AnyString> | undefined
  fontVariantCaps?: ConditionalValue<CssProperties["fontVariantCaps"] | AnyString> | undefined
  fontVariantEastAsian?: ConditionalValue<CssProperties["fontVariantEastAsian"] | AnyString> | undefined
  fontVariantEmoji?: ConditionalValue<CssProperties["fontVariantEmoji"] | AnyString> | undefined
  fontVariantLigatures?: ConditionalValue<CssProperties["fontVariantLigatures"] | AnyString> | undefined
  fontVariantNumeric?: ConditionalValue<CssProperties["fontVariantNumeric"] | AnyString> | undefined
  fontVariantPosition?: ConditionalValue<CssProperties["fontVariantPosition"] | AnyString> | undefined
  fontVariationSettings?: ConditionalValue<CssProperties["fontVariationSettings"] | AnyString> | undefined
  fontWeight?: ConditionalValue<UtilityValues["fontWeight"] | CssVars | CssProperties["fontWeight"] | AnyString> | undefined
  forcedColorAdjust?: ConditionalValue<CssProperties["forcedColorAdjust"] | AnyString> | undefined
  gap?: ConditionalValue<UtilityValues["gap"] | CssVars | CssProperties["gap"] | AnyString> | undefined
  grid?: ConditionalValue<CssProperties["grid"] | AnyString> | undefined
  gridArea?: ConditionalValue<CssProperties["gridArea"] | AnyString> | undefined
  gridAutoColumns?: ConditionalValue<CssProperties["gridAutoColumns"] | AnyString> | undefined
  gridAutoFlow?: ConditionalValue<CssProperties["gridAutoFlow"] | AnyString> | undefined
  gridAutoRows?: ConditionalValue<CssProperties["gridAutoRows"] | AnyString> | undefined
  gridColumn?: ConditionalValue<CssProperties["gridColumn"] | AnyString> | undefined
  gridColumnEnd?: ConditionalValue<CssProperties["gridColumnEnd"] | AnyString> | undefined
  gridColumnGap?: ConditionalValue<UtilityValues["gridColumnGap"] | CssVars | CssProperties["gridColumnGap"] | AnyString> | undefined
  gridColumnStart?: ConditionalValue<CssProperties["gridColumnStart"] | AnyString> | undefined
  gridGap?: ConditionalValue<UtilityValues["gridGap"] | CssVars | CssProperties["gridGap"] | AnyString> | undefined
  gridRow?: ConditionalValue<CssProperties["gridRow"] | AnyString> | undefined
  gridRowEnd?: ConditionalValue<CssProperties["gridRowEnd"] | AnyString> | undefined
  gridRowGap?: ConditionalValue<UtilityValues["gridRowGap"] | CssVars | CssProperties["gridRowGap"] | AnyString> | undefined
  gridRowStart?: ConditionalValue<CssProperties["gridRowStart"] | AnyString> | undefined
  gridTemplate?: ConditionalValue<CssProperties["gridTemplate"] | AnyString> | undefined
  gridTemplateAreas?: ConditionalValue<CssProperties["gridTemplateAreas"] | AnyString> | undefined
  gridTemplateColumns?: ConditionalValue<CssProperties["gridTemplateColumns"] | AnyString> | undefined
  gridTemplateRows?: ConditionalValue<CssProperties["gridTemplateRows"] | AnyString> | undefined
  hangingPunctuation?: ConditionalValue<CssProperties["hangingPunctuation"] | AnyString> | undefined
  height?: ConditionalValue<UtilityValues["height"] | CssVars | CssProperties["height"] | AnyString> | undefined
  hyphenateCharacter?: ConditionalValue<CssProperties["hyphenateCharacter"] | AnyString> | undefined
  hyphenateLimitChars?: ConditionalValue<CssProperties["hyphenateLimitChars"] | AnyString> | undefined
  hyphens?: ConditionalValue<CssProperties["hyphens"] | AnyString> | undefined
  imageOrientation?: ConditionalValue<CssProperties["imageOrientation"] | AnyString> | undefined
  imageRendering?: ConditionalValue<CssProperties["imageRendering"] | AnyString> | undefined
  imageResolution?: ConditionalValue<CssProperties["imageResolution"] | AnyString> | undefined
  imeMode?: ConditionalValue<CssProperties["imeMode"] | AnyString> | undefined
  initialLetter?: ConditionalValue<CssProperties["initialLetter"] | AnyString> | undefined
  initialLetterAlign?: ConditionalValue<CssProperties["initialLetterAlign"] | AnyString> | undefined
  inlineSize?: ConditionalValue<UtilityValues["inlineSize"] | CssVars | CssProperties["inlineSize"] | AnyString> | undefined
  inset?: ConditionalValue<UtilityValues["inset"] | CssVars | CssProperties["inset"] | AnyString> | undefined
  insetBlock?: ConditionalValue<UtilityValues["insetBlock"] | CssVars | CssProperties["insetBlock"] | AnyString> | undefined
  insetBlockEnd?: ConditionalValue<UtilityValues["insetBlockEnd"] | CssVars | CssProperties["insetBlockEnd"] | AnyString> | undefined
  insetBlockStart?: ConditionalValue<UtilityValues["insetBlockStart"] | CssVars | CssProperties["insetBlockStart"] | AnyString> | undefined
  insetInline?: ConditionalValue<UtilityValues["insetInline"] | CssVars | CssProperties["insetInline"] | AnyString> | undefined
  insetInlineEnd?: ConditionalValue<UtilityValues["insetInlineEnd"] | CssVars | CssProperties["insetInlineEnd"] | AnyString> | undefined
  insetInlineStart?: ConditionalValue<UtilityValues["insetInlineStart"] | CssVars | CssProperties["insetInlineStart"] | AnyString> | undefined
  interpolateSize?: ConditionalValue<CssProperties["interpolateSize"] | AnyString> | undefined
  isolation?: ConditionalValue<CssProperties["isolation"] | AnyString> | undefined
  justifyContent?: ConditionalValue<CssProperties["justifyContent"] | AnyString> | undefined
  justifyItems?: ConditionalValue<CssProperties["justifyItems"] | AnyString> | undefined
  justifySelf?: ConditionalValue<CssProperties["justifySelf"] | AnyString> | undefined
  justifyTracks?: ConditionalValue<CssProperties["justifyTracks"] | AnyString> | undefined
  left?: ConditionalValue<UtilityValues["left"] | CssVars | CssProperties["left"] | AnyString> | undefined
  letterSpacing?: ConditionalValue<UtilityValues["letterSpacing"] | CssVars | CssProperties["letterSpacing"] | AnyString> | undefined
  lightingColor?: ConditionalValue<CssProperties["lightingColor"] | AnyString> | undefined
  lineBreak?: ConditionalValue<CssProperties["lineBreak"] | AnyString> | undefined
  lineClamp?: ConditionalValue<CssProperties["lineClamp"] | AnyString> | undefined
  lineHeight?: ConditionalValue<UtilityValues["lineHeight"] | CssVars | CssProperties["lineHeight"] | AnyString> | undefined
  lineHeightStep?: ConditionalValue<CssProperties["lineHeightStep"] | AnyString> | undefined
  listStyle?: ConditionalValue<CssProperties["listStyle"] | AnyString> | undefined
  listStyleImage?: ConditionalValue<UtilityValues["listStyleImage"] | CssVars | CssProperties["listStyleImage"] | AnyString> | undefined
  listStylePosition?: ConditionalValue<CssProperties["listStylePosition"] | AnyString> | undefined
  listStyleType?: ConditionalValue<CssProperties["listStyleType"] | AnyString> | undefined
  margin?: ConditionalValue<UtilityValues["margin"] | CssVars | CssProperties["margin"] | AnyString> | undefined
  marginBlock?: ConditionalValue<UtilityValues["marginBlock"] | CssVars | CssProperties["marginBlock"] | AnyString> | undefined
  marginBlockEnd?: ConditionalValue<UtilityValues["marginBlockEnd"] | CssVars | CssProperties["marginBlockEnd"] | AnyString> | undefined
  marginBlockStart?: ConditionalValue<UtilityValues["marginBlockStart"] | CssVars | CssProperties["marginBlockStart"] | AnyString> | undefined
  marginBottom?: ConditionalValue<UtilityValues["marginBottom"] | CssVars | CssProperties["marginBottom"] | AnyString> | undefined
  marginInline?: ConditionalValue<UtilityValues["marginInline"] | CssVars | CssProperties["marginInline"] | AnyString> | undefined
  marginInlineEnd?: ConditionalValue<UtilityValues["marginInlineEnd"] | CssVars | CssProperties["marginInlineEnd"] | AnyString> | undefined
  marginInlineStart?: ConditionalValue<UtilityValues["marginInlineStart"] | CssVars | CssProperties["marginInlineStart"] | AnyString> | undefined
  marginLeft?: ConditionalValue<UtilityValues["marginLeft"] | CssVars | CssProperties["marginLeft"] | AnyString> | undefined
  marginRight?: ConditionalValue<UtilityValues["marginRight"] | CssVars | CssProperties["marginRight"] | AnyString> | undefined
  marginTop?: ConditionalValue<UtilityValues["marginTop"] | CssVars | CssProperties["marginTop"] | AnyString> | undefined
  marginTrim?: ConditionalValue<CssProperties["marginTrim"] | AnyString> | undefined
  marker?: ConditionalValue<CssProperties["marker"] | AnyString> | undefined
  markerEnd?: ConditionalValue<CssProperties["markerEnd"] | AnyString> | undefined
  markerMid?: ConditionalValue<CssProperties["markerMid"] | AnyString> | undefined
  markerStart?: ConditionalValue<CssProperties["markerStart"] | AnyString> | undefined
  mask?: ConditionalValue<CssProperties["mask"] | AnyString> | undefined
  maskBorder?: ConditionalValue<CssProperties["maskBorder"] | AnyString> | undefined
  maskBorderMode?: ConditionalValue<CssProperties["maskBorderMode"] | AnyString> | undefined
  maskBorderOutset?: ConditionalValue<CssProperties["maskBorderOutset"] | AnyString> | undefined
  maskBorderRepeat?: ConditionalValue<CssProperties["maskBorderRepeat"] | AnyString> | undefined
  maskBorderSlice?: ConditionalValue<CssProperties["maskBorderSlice"] | AnyString> | undefined
  maskBorderSource?: ConditionalValue<CssProperties["maskBorderSource"] | AnyString> | undefined
  maskBorderWidth?: ConditionalValue<CssProperties["maskBorderWidth"] | AnyString> | undefined
  maskClip?: ConditionalValue<CssProperties["maskClip"] | AnyString> | undefined
  maskComposite?: ConditionalValue<CssProperties["maskComposite"] | AnyString> | undefined
  maskImage?: ConditionalValue<CssProperties["maskImage"] | AnyString> | undefined
  maskMode?: ConditionalValue<CssProperties["maskMode"] | AnyString> | undefined
  maskOrigin?: ConditionalValue<CssProperties["maskOrigin"] | AnyString> | undefined
  maskPosition?: ConditionalValue<CssProperties["maskPosition"] | AnyString> | undefined
  maskRepeat?: ConditionalValue<CssProperties["maskRepeat"] | AnyString> | undefined
  maskSize?: ConditionalValue<CssProperties["maskSize"] | AnyString> | undefined
  maskType?: ConditionalValue<CssProperties["maskType"] | AnyString> | undefined
  masonryAutoFlow?: ConditionalValue<CssProperties["masonryAutoFlow"] | AnyString> | undefined
  mathDepth?: ConditionalValue<CssProperties["mathDepth"] | AnyString> | undefined
  mathShift?: ConditionalValue<CssProperties["mathShift"] | AnyString> | undefined
  mathStyle?: ConditionalValue<CssProperties["mathStyle"] | AnyString> | undefined
  maxBlockSize?: ConditionalValue<UtilityValues["maxBlockSize"] | CssVars | CssProperties["maxBlockSize"] | AnyString> | undefined
  maxHeight?: ConditionalValue<UtilityValues["maxHeight"] | CssVars | CssProperties["maxHeight"] | AnyString> | undefined
  maxInlineSize?: ConditionalValue<UtilityValues["maxInlineSize"] | CssVars | CssProperties["maxInlineSize"] | AnyString> | undefined
  maxLines?: ConditionalValue<CssProperties["maxLines"] | AnyString> | undefined
  maxWidth?: ConditionalValue<UtilityValues["maxWidth"] | CssVars | CssProperties["maxWidth"] | AnyString> | undefined
  minBlockSize?: ConditionalValue<UtilityValues["minBlockSize"] | CssVars | CssProperties["minBlockSize"] | AnyString> | undefined
  minHeight?: ConditionalValue<UtilityValues["minHeight"] | CssVars | CssProperties["minHeight"] | AnyString> | undefined
  minInlineSize?: ConditionalValue<UtilityValues["minInlineSize"] | CssVars | CssProperties["minInlineSize"] | AnyString> | undefined
  minWidth?: ConditionalValue<UtilityValues["minWidth"] | CssVars | CssProperties["minWidth"] | AnyString> | undefined
  mixBlendMode?: ConditionalValue<CssProperties["mixBlendMode"] | AnyString> | undefined
  objectFit?: ConditionalValue<CssProperties["objectFit"] | AnyString> | undefined
  objectPosition?: ConditionalValue<CssProperties["objectPosition"] | AnyString> | undefined
  offset?: ConditionalValue<CssProperties["offset"] | AnyString> | undefined
  offsetAnchor?: ConditionalValue<CssProperties["offsetAnchor"] | AnyString> | undefined
  offsetDistance?: ConditionalValue<CssProperties["offsetDistance"] | AnyString> | undefined
  offsetPath?: ConditionalValue<CssProperties["offsetPath"] | AnyString> | undefined
  offsetPosition?: ConditionalValue<CssProperties["offsetPosition"] | AnyString> | undefined
  offsetRotate?: ConditionalValue<CssProperties["offsetRotate"] | AnyString> | undefined
  opacity?: ConditionalValue<UtilityValues["opacity"] | CssVars | CssProperties["opacity"] | AnyString> | undefined
  order?: ConditionalValue<CssProperties["order"] | AnyString> | undefined
  orphans?: ConditionalValue<CssProperties["orphans"] | AnyString> | undefined
  outline?: ConditionalValue<CssProperties["outline"] | AnyString> | undefined
  outlineColor?: ConditionalValue<UtilityValues["outlineColor"] | CssVars | CssProperties["outlineColor"] | AnyString> | undefined
  outlineOffset?: ConditionalValue<CssProperties["outlineOffset"] | AnyString> | undefined
  outlineStyle?: ConditionalValue<CssProperties["outlineStyle"] | AnyString> | undefined
  outlineWidth?: ConditionalValue<CssProperties["outlineWidth"] | AnyString> | undefined
  overflow?: ConditionalValue<CssProperties["overflow"] | AnyString> | undefined
  overflowAnchor?: ConditionalValue<CssProperties["overflowAnchor"] | AnyString> | undefined
  overflowBlock?: ConditionalValue<CssProperties["overflowBlock"] | AnyString> | undefined
  overflowClipBox?: ConditionalValue<CssProperties["overflowClipBox"] | AnyString> | undefined
  overflowClipMargin?: ConditionalValue<CssProperties["overflowClipMargin"] | AnyString> | undefined
  overflowInline?: ConditionalValue<CssProperties["overflowInline"] | AnyString> | undefined
  overflowWrap?: ConditionalValue<CssProperties["overflowWrap"] | AnyString> | undefined
  overflowX?: ConditionalValue<CssProperties["overflowX"] | AnyString> | undefined
  overflowY?: ConditionalValue<CssProperties["overflowY"] | AnyString> | undefined
  overlay?: ConditionalValue<CssProperties["overlay"] | AnyString> | undefined
  overscrollBehavior?: ConditionalValue<CssProperties["overscrollBehavior"] | AnyString> | undefined
  overscrollBehaviorBlock?: ConditionalValue<CssProperties["overscrollBehaviorBlock"] | AnyString> | undefined
  overscrollBehaviorInline?: ConditionalValue<CssProperties["overscrollBehaviorInline"] | AnyString> | undefined
  overscrollBehaviorX?: ConditionalValue<CssProperties["overscrollBehaviorX"] | AnyString> | undefined
  overscrollBehaviorY?: ConditionalValue<CssProperties["overscrollBehaviorY"] | AnyString> | undefined
  padding?: ConditionalValue<UtilityValues["padding"] | CssVars | CssProperties["padding"] | AnyString> | undefined
  paddingBlock?: ConditionalValue<UtilityValues["paddingBlock"] | CssVars | CssProperties["paddingBlock"] | AnyString> | undefined
  paddingBlockEnd?: ConditionalValue<UtilityValues["paddingBlockEnd"] | CssVars | CssProperties["paddingBlockEnd"] | AnyString> | undefined
  paddingBlockStart?: ConditionalValue<UtilityValues["paddingBlockStart"] | CssVars | CssProperties["paddingBlockStart"] | AnyString> | undefined
  paddingBottom?: ConditionalValue<UtilityValues["paddingBottom"] | CssVars | CssProperties["paddingBottom"] | AnyString> | undefined
  paddingInline?: ConditionalValue<UtilityValues["paddingInline"] | CssVars | CssProperties["paddingInline"] | AnyString> | undefined
  paddingInlineEnd?: ConditionalValue<UtilityValues["paddingInlineEnd"] | CssVars | CssProperties["paddingInlineEnd"] | AnyString> | undefined
  paddingInlineStart?: ConditionalValue<UtilityValues["paddingInlineStart"] | CssVars | CssProperties["paddingInlineStart"] | AnyString> | undefined
  paddingLeft?: ConditionalValue<UtilityValues["paddingLeft"] | CssVars | CssProperties["paddingLeft"] | AnyString> | undefined
  paddingRight?: ConditionalValue<UtilityValues["paddingRight"] | CssVars | CssProperties["paddingRight"] | AnyString> | undefined
  paddingTop?: ConditionalValue<UtilityValues["paddingTop"] | CssVars | CssProperties["paddingTop"] | AnyString> | undefined
  page?: ConditionalValue<CssProperties["page"] | AnyString> | undefined
  pageBreakAfter?: ConditionalValue<CssProperties["pageBreakAfter"] | AnyString> | undefined
  pageBreakBefore?: ConditionalValue<CssProperties["pageBreakBefore"] | AnyString> | undefined
  pageBreakInside?: ConditionalValue<CssProperties["pageBreakInside"] | AnyString> | undefined
  paintOrder?: ConditionalValue<CssProperties["paintOrder"] | AnyString> | undefined
  perspective?: ConditionalValue<CssProperties["perspective"] | AnyString> | undefined
  perspectiveOrigin?: ConditionalValue<CssProperties["perspectiveOrigin"] | AnyString> | undefined
  placeContent?: ConditionalValue<CssProperties["placeContent"] | AnyString> | undefined
  placeItems?: ConditionalValue<CssProperties["placeItems"] | AnyString> | undefined
  placeSelf?: ConditionalValue<CssProperties["placeSelf"] | AnyString> | undefined
  pointerEvents?: ConditionalValue<CssProperties["pointerEvents"] | AnyString> | undefined
  position?: ConditionalValue<CssProperties["position"] | AnyString> | undefined
  positionAnchor?: ConditionalValue<CssProperties["positionAnchor"] | AnyString> | undefined
  positionArea?: ConditionalValue<CssProperties["positionArea"] | AnyString> | undefined
  positionTry?: ConditionalValue<CssProperties["positionTry"] | AnyString> | undefined
  positionTryFallbacks?: ConditionalValue<CssProperties["positionTryFallbacks"] | AnyString> | undefined
  positionTryOrder?: ConditionalValue<CssProperties["positionTryOrder"] | AnyString> | undefined
  positionVisibility?: ConditionalValue<CssProperties["positionVisibility"] | AnyString> | undefined
  printColorAdjust?: ConditionalValue<CssProperties["printColorAdjust"] | AnyString> | undefined
  quotes?: ConditionalValue<CssProperties["quotes"] | AnyString> | undefined
  r?: ConditionalValue<CssProperties["r"] | AnyString> | undefined
  resize?: ConditionalValue<CssProperties["resize"] | AnyString> | undefined
  right?: ConditionalValue<UtilityValues["right"] | CssVars | CssProperties["right"] | AnyString> | undefined
  rotate?: ConditionalValue<CssProperties["rotate"] | AnyString> | undefined
  rowGap?: ConditionalValue<UtilityValues["rowGap"] | CssVars | CssProperties["rowGap"] | AnyString> | undefined
  rubyAlign?: ConditionalValue<CssProperties["rubyAlign"] | AnyString> | undefined
  rubyMerge?: ConditionalValue<CssProperties["rubyMerge"] | AnyString> | undefined
  rubyPosition?: ConditionalValue<CssProperties["rubyPosition"] | AnyString> | undefined
  rx?: ConditionalValue<CssProperties["rx"] | AnyString> | undefined
  ry?: ConditionalValue<CssProperties["ry"] | AnyString> | undefined
  scale?: ConditionalValue<CssProperties["scale"] | AnyString> | undefined
  scrollBehavior?: ConditionalValue<CssProperties["scrollBehavior"] | AnyString> | undefined
  scrollMargin?: ConditionalValue<UtilityValues["scrollMargin"] | CssVars | CssProperties["scrollMargin"] | AnyString> | undefined
  scrollMarginBlock?: ConditionalValue<CssProperties["scrollMarginBlock"] | AnyString> | undefined
  scrollMarginBlockEnd?: ConditionalValue<CssProperties["scrollMarginBlockEnd"] | AnyString> | undefined
  scrollMarginBlockStart?: ConditionalValue<CssProperties["scrollMarginBlockStart"] | AnyString> | undefined
  scrollMarginBottom?: ConditionalValue<UtilityValues["scrollMarginBottom"] | CssVars | CssProperties["scrollMarginBottom"] | AnyString> | undefined
  scrollMarginInline?: ConditionalValue<CssProperties["scrollMarginInline"] | AnyString> | undefined
  scrollMarginInlineEnd?: ConditionalValue<CssProperties["scrollMarginInlineEnd"] | AnyString> | undefined
  scrollMarginInlineStart?: ConditionalValue<CssProperties["scrollMarginInlineStart"] | AnyString> | undefined
  scrollMarginLeft?: ConditionalValue<UtilityValues["scrollMarginLeft"] | CssVars | CssProperties["scrollMarginLeft"] | AnyString> | undefined
  scrollMarginRight?: ConditionalValue<UtilityValues["scrollMarginRight"] | CssVars | CssProperties["scrollMarginRight"] | AnyString> | undefined
  scrollMarginTop?: ConditionalValue<UtilityValues["scrollMarginTop"] | CssVars | CssProperties["scrollMarginTop"] | AnyString> | undefined
  scrollPadding?: ConditionalValue<UtilityValues["scrollPadding"] | CssVars | CssProperties["scrollPadding"] | AnyString> | undefined
  scrollPaddingBlock?: ConditionalValue<UtilityValues["scrollPaddingBlock"] | CssVars | CssProperties["scrollPaddingBlock"] | AnyString> | undefined
  scrollPaddingBlockEnd?: ConditionalValue<CssProperties["scrollPaddingBlockEnd"] | AnyString> | undefined
  scrollPaddingBlockStart?: ConditionalValue<CssProperties["scrollPaddingBlockStart"] | AnyString> | undefined
  scrollPaddingBottom?: ConditionalValue<UtilityValues["scrollPaddingBottom"] | CssVars | CssProperties["scrollPaddingBottom"] | AnyString> | undefined
  scrollPaddingInline?: ConditionalValue<UtilityValues["scrollPaddingInline"] | CssVars | CssProperties["scrollPaddingInline"] | AnyString> | undefined
  scrollPaddingInlineEnd?: ConditionalValue<CssProperties["scrollPaddingInlineEnd"] | AnyString> | undefined
  scrollPaddingInlineStart?: ConditionalValue<CssProperties["scrollPaddingInlineStart"] | AnyString> | undefined
  scrollPaddingLeft?: ConditionalValue<UtilityValues["scrollPaddingLeft"] | CssVars | CssProperties["scrollPaddingLeft"] | AnyString> | undefined
  scrollPaddingRight?: ConditionalValue<UtilityValues["scrollPaddingRight"] | CssVars | CssProperties["scrollPaddingRight"] | AnyString> | undefined
  scrollPaddingTop?: ConditionalValue<UtilityValues["scrollPaddingTop"] | CssVars | CssProperties["scrollPaddingTop"] | AnyString> | undefined
  scrollSnapAlign?: ConditionalValue<CssProperties["scrollSnapAlign"] | AnyString> | undefined
  scrollSnapCoordinate?: ConditionalValue<CssProperties["scrollSnapCoordinate"] | AnyString> | undefined
  scrollSnapDestination?: ConditionalValue<CssProperties["scrollSnapDestination"] | AnyString> | undefined
  scrollSnapPointsX?: ConditionalValue<CssProperties["scrollSnapPointsX"] | AnyString> | undefined
  scrollSnapPointsY?: ConditionalValue<CssProperties["scrollSnapPointsY"] | AnyString> | undefined
  scrollSnapStop?: ConditionalValue<CssProperties["scrollSnapStop"] | AnyString> | undefined
  scrollSnapType?: ConditionalValue<UtilityValues["scrollSnapType"] | CssVars | CssProperties["scrollSnapType"] | AnyString> | undefined
  scrollSnapTypeX?: ConditionalValue<CssProperties["scrollSnapTypeX"] | AnyString> | undefined
  scrollSnapTypeY?: ConditionalValue<CssProperties["scrollSnapTypeY"] | AnyString> | undefined
  scrollTimeline?: ConditionalValue<CssProperties["scrollTimeline"] | AnyString> | undefined
  scrollTimelineAxis?: ConditionalValue<CssProperties["scrollTimelineAxis"] | AnyString> | undefined
  scrollTimelineName?: ConditionalValue<CssProperties["scrollTimelineName"] | AnyString> | undefined
  scrollbarColor?: ConditionalValue<UtilityValues["scrollbarColor"] | CssVars | CssProperties["scrollbarColor"] | AnyString> | undefined
  scrollbarGutter?: ConditionalValue<UtilityValues["scrollbarGutter"] | CssVars | CssProperties["scrollbarGutter"] | AnyString> | undefined
  scrollbarWidth?: ConditionalValue<UtilityValues["scrollbarWidth"] | CssVars | CssProperties["scrollbarWidth"] | AnyString> | undefined
  shapeImageThreshold?: ConditionalValue<CssProperties["shapeImageThreshold"] | AnyString> | undefined
  shapeMargin?: ConditionalValue<CssProperties["shapeMargin"] | AnyString> | undefined
  shapeOutside?: ConditionalValue<CssProperties["shapeOutside"] | AnyString> | undefined
  shapeRendering?: ConditionalValue<CssProperties["shapeRendering"] | AnyString> | undefined
  stopColor?: ConditionalValue<CssProperties["stopColor"] | AnyString> | undefined
  stopOpacity?: ConditionalValue<CssProperties["stopOpacity"] | AnyString> | undefined
  stroke?: ConditionalValue<UtilityValues["stroke"] | CssVars | CssProperties["stroke"] | AnyString> | undefined
  strokeDasharray?: ConditionalValue<CssProperties["strokeDasharray"] | AnyString> | undefined
  strokeDashoffset?: ConditionalValue<CssProperties["strokeDashoffset"] | AnyString> | undefined
  strokeLinecap?: ConditionalValue<CssProperties["strokeLinecap"] | AnyString> | undefined
  strokeLinejoin?: ConditionalValue<CssProperties["strokeLinejoin"] | AnyString> | undefined
  strokeMiterlimit?: ConditionalValue<CssProperties["strokeMiterlimit"] | AnyString> | undefined
  strokeOpacity?: ConditionalValue<CssProperties["strokeOpacity"] | AnyString> | undefined
  strokeWidth?: ConditionalValue<CssProperties["strokeWidth"] | AnyString> | undefined
  tabSize?: ConditionalValue<CssProperties["tabSize"] | AnyString> | undefined
  tableLayout?: ConditionalValue<CssProperties["tableLayout"] | AnyString> | undefined
  textAlign?: ConditionalValue<CssProperties["textAlign"] | AnyString> | undefined
  textAlignLast?: ConditionalValue<CssProperties["textAlignLast"] | AnyString> | undefined
  textAnchor?: ConditionalValue<CssProperties["textAnchor"] | AnyString> | undefined
  textBox?: ConditionalValue<CssProperties["textBox"] | AnyString> | undefined
  textBoxEdge?: ConditionalValue<CssProperties["textBoxEdge"] | AnyString> | undefined
  textBoxTrim?: ConditionalValue<CssProperties["textBoxTrim"] | AnyString> | undefined
  textCombineUpright?: ConditionalValue<CssProperties["textCombineUpright"] | AnyString> | undefined
  textDecoration?: ConditionalValue<CssProperties["textDecoration"] | AnyString> | undefined
  textDecorationColor?: ConditionalValue<UtilityValues["textDecorationColor"] | CssVars | CssProperties["textDecorationColor"] | AnyString> | undefined
  textDecorationLine?: ConditionalValue<CssProperties["textDecorationLine"] | AnyString> | undefined
  textDecorationSkip?: ConditionalValue<CssProperties["textDecorationSkip"] | AnyString> | undefined
  textDecorationSkipInk?: ConditionalValue<CssProperties["textDecorationSkipInk"] | AnyString> | undefined
  textDecorationStyle?: ConditionalValue<CssProperties["textDecorationStyle"] | AnyString> | undefined
  textDecorationThickness?: ConditionalValue<CssProperties["textDecorationThickness"] | AnyString> | undefined
  textEmphasis?: ConditionalValue<CssProperties["textEmphasis"] | AnyString> | undefined
  textEmphasisColor?: ConditionalValue<CssProperties["textEmphasisColor"] | AnyString> | undefined
  textEmphasisPosition?: ConditionalValue<CssProperties["textEmphasisPosition"] | AnyString> | undefined
  textEmphasisStyle?: ConditionalValue<CssProperties["textEmphasisStyle"] | AnyString> | undefined
  textIndent?: ConditionalValue<UtilityValues["textIndent"] | CssVars | CssProperties["textIndent"] | AnyString> | undefined
  textJustify?: ConditionalValue<CssProperties["textJustify"] | AnyString> | undefined
  textOrientation?: ConditionalValue<CssProperties["textOrientation"] | AnyString> | undefined
  textOverflow?: ConditionalValue<CssProperties["textOverflow"] | AnyString> | undefined
  textRendering?: ConditionalValue<CssProperties["textRendering"] | AnyString> | undefined
  textShadow?: ConditionalValue<UtilityValues["textShadow"] | CssVars | CssProperties["textShadow"] | AnyString> | undefined
  textSizeAdjust?: ConditionalValue<CssProperties["textSizeAdjust"] | AnyString> | undefined
  textSpacingTrim?: ConditionalValue<CssProperties["textSpacingTrim"] | AnyString> | undefined
  textTransform?: ConditionalValue<CssProperties["textTransform"] | AnyString> | undefined
  textUnderlineOffset?: ConditionalValue<CssProperties["textUnderlineOffset"] | AnyString> | undefined
  textUnderlinePosition?: ConditionalValue<CssProperties["textUnderlinePosition"] | AnyString> | undefined
  textWrap?: ConditionalValue<CssProperties["textWrap"] | AnyString> | undefined
  textWrapMode?: ConditionalValue<CssProperties["textWrapMode"] | AnyString> | undefined
  textWrapStyle?: ConditionalValue<CssProperties["textWrapStyle"] | AnyString> | undefined
  timelineScope?: ConditionalValue<CssProperties["timelineScope"] | AnyString> | undefined
  top?: ConditionalValue<UtilityValues["top"] | CssVars | CssProperties["top"] | AnyString> | undefined
  touchAction?: ConditionalValue<CssProperties["touchAction"] | AnyString> | undefined
  transform?: ConditionalValue<CssProperties["transform"] | AnyString> | undefined
  transformBox?: ConditionalValue<CssProperties["transformBox"] | AnyString> | undefined
  transformOrigin?: ConditionalValue<CssProperties["transformOrigin"] | AnyString> | undefined
  transformStyle?: ConditionalValue<CssProperties["transformStyle"] | AnyString> | undefined
  transition?: ConditionalValue<UtilityValues["transition"] | CssVars | CssProperties["transition"] | AnyString> | undefined
  transitionBehavior?: ConditionalValue<CssProperties["transitionBehavior"] | AnyString> | undefined
  transitionDelay?: ConditionalValue<CssProperties["transitionDelay"] | AnyString> | undefined
  transitionDuration?: ConditionalValue<UtilityValues["transitionDuration"] | CssVars | CssProperties["transitionDuration"] | AnyString> | undefined
  transitionProperty?: ConditionalValue<UtilityValues["transitionProperty"] | CssVars | CssProperties["transitionProperty"] | AnyString> | undefined
  transitionTimingFunction?: ConditionalValue<UtilityValues["transitionTimingFunction"] | CssVars | CssProperties["transitionTimingFunction"] | AnyString> | undefined
  translate?: ConditionalValue<CssProperties["translate"] | AnyString> | undefined
  unicodeBidi?: ConditionalValue<CssProperties["unicodeBidi"] | AnyString> | undefined
  userSelect?: ConditionalValue<CssProperties["userSelect"] | AnyString> | undefined
  vectorEffect?: ConditionalValue<CssProperties["vectorEffect"] | AnyString> | undefined
  verticalAlign?: ConditionalValue<CssProperties["verticalAlign"] | AnyString> | undefined
  viewTimeline?: ConditionalValue<CssProperties["viewTimeline"] | AnyString> | undefined
  viewTimelineAxis?: ConditionalValue<CssProperties["viewTimelineAxis"] | AnyString> | undefined
  viewTimelineInset?: ConditionalValue<CssProperties["viewTimelineInset"] | AnyString> | undefined
  viewTimelineName?: ConditionalValue<CssProperties["viewTimelineName"] | AnyString> | undefined
  viewTransitionName?: ConditionalValue<CssProperties["viewTransitionName"] | AnyString> | undefined
  visibility?: ConditionalValue<CssProperties["visibility"] | AnyString> | undefined
  whiteSpace?: ConditionalValue<CssProperties["whiteSpace"] | AnyString> | undefined
  whiteSpaceCollapse?: ConditionalValue<CssProperties["whiteSpaceCollapse"] | AnyString> | undefined
  widows?: ConditionalValue<CssProperties["widows"] | AnyString> | undefined
  width?: ConditionalValue<UtilityValues["width"] | CssVars | CssProperties["width"] | AnyString> | undefined
  willChange?: ConditionalValue<CssProperties["willChange"] | AnyString> | undefined
  wordBreak?: ConditionalValue<CssProperties["wordBreak"] | AnyString> | undefined
  wordSpacing?: ConditionalValue<CssProperties["wordSpacing"] | AnyString> | undefined
  wordWrap?: ConditionalValue<CssProperties["wordWrap"] | AnyString> | undefined
  writingMode?: ConditionalValue<CssProperties["writingMode"] | AnyString> | undefined
  x?: ConditionalValue<CssProperties["x"] | AnyString> | undefined
  y?: ConditionalValue<CssProperties["y"] | AnyString> | undefined
  zIndex?: ConditionalValue<UtilityValues["zIndex"] | CssVars | CssProperties["zIndex"] | AnyString> | undefined
  zoom?: ConditionalValue<CssProperties["zoom"] | AnyString> | undefined
  alignmentBaseline?: ConditionalValue<CssProperties["alignmentBaseline"] | AnyString> | undefined
  baselineShift?: ConditionalValue<CssProperties["baselineShift"] | AnyString> | undefined
  colorInterpolation?: ConditionalValue<CssProperties["colorInterpolation"] | AnyString> | undefined
  colorRendering?: ConditionalValue<CssProperties["colorRendering"] | AnyString> | undefined
  glyphOrientationVertical?: ConditionalValue<CssProperties["glyphOrientationVertical"] | AnyString> | undefined
  bg?: ConditionalValue<UtilityValues["background"] | CssVars | CssProperties["background"] | AnyString> | undefined
  bgColor?: ConditionalValue<UtilityValues["backgroundColor"] | CssVars | CssProperties["backgroundColor"] | AnyString> | undefined
  bgSize?: ConditionalValue<CssProperties["backgroundSize"] | AnyString> | undefined
  bgPos?: ConditionalValue<CssProperties["backgroundPosition"] | AnyString> | undefined
  bgRepeat?: ConditionalValue<CssProperties["backgroundRepeat"] | AnyString> | undefined
  bgAttachment?: ConditionalValue<CssProperties["backgroundAttachment"] | AnyString> | undefined
  bgClip?: ConditionalValue<UtilityValues["backgroundClip"] | CssVars | CssProperties["backgroundClip"] | AnyString> | undefined
  bgGradient?: ConditionalValue<UtilityValues["backgroundGradient"] | CssVars | AnyString> | undefined
  bgImg?: ConditionalValue<UtilityValues["backgroundImage"] | CssVars | CssProperties["backgroundImage"] | AnyString> | undefined
  bgImage?: ConditionalValue<UtilityValues["backgroundImage"] | CssVars | CssProperties["backgroundImage"] | AnyString> | undefined
  borderStart?: ConditionalValue<UtilityValues["borderInlineStart"] | CssVars | CssProperties["borderInlineStart"] | AnyString> | undefined
  borderEnd?: ConditionalValue<UtilityValues["borderInlineEnd"] | CssVars | CssProperties["borderInlineEnd"] | AnyString> | undefined
  borderX?: ConditionalValue<UtilityValues["borderInline"] | CssVars | CssProperties["borderInline"] | AnyString> | undefined
  borderY?: ConditionalValue<UtilityValues["borderBlock"] | CssVars | CssProperties["borderBlock"] | AnyString> | undefined
  borderStartColor?: ConditionalValue<UtilityValues["borderInlineStartColor"] | CssVars | CssProperties["borderInlineStartColor"] | AnyString> | undefined
  borderEndColor?: ConditionalValue<UtilityValues["borderInlineEndColor"] | CssVars | CssProperties["borderInlineEndColor"] | AnyString> | undefined
  borderStartStyle?: ConditionalValue<UtilityValues["borderInlineStartStyle"] | CssVars | CssProperties["borderInlineStartStyle"] | AnyString> | undefined
  borderEndStyle?: ConditionalValue<UtilityValues["borderInlineEndStyle"] | CssVars | CssProperties["borderInlineEndStyle"] | AnyString> | undefined
  rounded?: ConditionalValue<UtilityValues["borderRadius"] | CssVars | CssProperties["borderRadius"] | AnyString> | undefined
  roundedTopLeft?: ConditionalValue<UtilityValues["borderTopLeftRadius"] | CssVars | CssProperties["borderTopLeftRadius"] | AnyString> | undefined
  roundedStartStart?: ConditionalValue<UtilityValues["borderStartStartRadius"] | CssVars | CssProperties["borderStartStartRadius"] | AnyString> | undefined
  borderTopStartRadius?: ConditionalValue<UtilityValues["borderStartStartRadius"] | CssVars | CssProperties["borderStartStartRadius"] | AnyString> | undefined
  roundedEndStart?: ConditionalValue<UtilityValues["borderEndStartRadius"] | CssVars | CssProperties["borderEndStartRadius"] | AnyString> | undefined
  borderBottomStartRadius?: ConditionalValue<UtilityValues["borderEndStartRadius"] | CssVars | CssProperties["borderEndStartRadius"] | AnyString> | undefined
  roundedTopRight?: ConditionalValue<UtilityValues["borderTopRightRadius"] | CssVars | CssProperties["borderTopRightRadius"] | AnyString> | undefined
  roundedStartEnd?: ConditionalValue<UtilityValues["borderStartEndRadius"] | CssVars | CssProperties["borderStartEndRadius"] | AnyString> | undefined
  borderTopEndRadius?: ConditionalValue<UtilityValues["borderStartEndRadius"] | CssVars | CssProperties["borderStartEndRadius"] | AnyString> | undefined
  roundedEndEnd?: ConditionalValue<UtilityValues["borderEndEndRadius"] | CssVars | CssProperties["borderEndEndRadius"] | AnyString> | undefined
  borderBottomEndRadius?: ConditionalValue<UtilityValues["borderEndEndRadius"] | CssVars | CssProperties["borderEndEndRadius"] | AnyString> | undefined
  roundedBottomLeft?: ConditionalValue<UtilityValues["borderBottomLeftRadius"] | CssVars | CssProperties["borderBottomLeftRadius"] | AnyString> | undefined
  roundedBottomRight?: ConditionalValue<UtilityValues["borderBottomRightRadius"] | CssVars | CssProperties["borderBottomRightRadius"] | AnyString> | undefined
  roundedStart?: ConditionalValue<UtilityValues["borderInlineStartRadius"] | CssVars | AnyString> | undefined
  borderStartRadius?: ConditionalValue<UtilityValues["borderInlineStartRadius"] | CssVars | AnyString> | undefined
  roundedEnd?: ConditionalValue<UtilityValues["borderInlineEndRadius"] | CssVars | AnyString> | undefined
  borderEndRadius?: ConditionalValue<UtilityValues["borderInlineEndRadius"] | CssVars | AnyString> | undefined
  roundedTop?: ConditionalValue<UtilityValues["borderTopRadius"] | CssVars | AnyString> | undefined
  roundedBottom?: ConditionalValue<UtilityValues["borderBottomRadius"] | CssVars | AnyString> | undefined
  roundedLeft?: ConditionalValue<UtilityValues["borderLeftRadius"] | CssVars | AnyString> | undefined
  roundedRight?: ConditionalValue<UtilityValues["borderRightRadius"] | CssVars | AnyString> | undefined
  borderXWidth?: ConditionalValue<UtilityValues["borderInlineWidth"] | CssVars | CssProperties["borderInlineWidth"] | AnyString> | undefined
  borderStartWidth?: ConditionalValue<UtilityValues["borderInlineStartWidth"] | CssVars | CssProperties["borderInlineStartWidth"] | AnyString> | undefined
  borderEndWidth?: ConditionalValue<UtilityValues["borderInlineEndWidth"] | CssVars | CssProperties["borderInlineEndWidth"] | AnyString> | undefined
  borderYWidth?: ConditionalValue<UtilityValues["borderBlockWidth"] | CssVars | CssProperties["borderBlockWidth"] | AnyString> | undefined
  shadow?: ConditionalValue<UtilityValues["boxShadow"] | CssVars | CssProperties["boxShadow"] | AnyString> | undefined
  shadowColor?: ConditionalValue<UtilityValues["boxShadowColor"] | CssVars | AnyString> | undefined
  blendMode?: ConditionalValue<CssProperties["mixBlendMode"] | AnyString> | undefined
  bgBlendMode?: ConditionalValue<CssProperties["backgroundBlendMode"] | AnyString> | undefined
  gapY?: ConditionalValue<UtilityValues["rowGap"] | CssVars | CssProperties["rowGap"] | AnyString> | undefined
  gapX?: ConditionalValue<UtilityValues["columnGap"] | CssVars | CssProperties["columnGap"] | AnyString> | undefined
  flexDir?: ConditionalValue<CssProperties["flexDirection"] | AnyString> | undefined
  w?: ConditionalValue<UtilityValues["width"] | CssVars | CssProperties["width"] | AnyString> | undefined
  h?: ConditionalValue<UtilityValues["height"] | CssVars | CssProperties["height"] | AnyString> | undefined
  minW?: ConditionalValue<UtilityValues["minWidth"] | CssVars | CssProperties["minWidth"] | AnyString> | undefined
  minH?: ConditionalValue<UtilityValues["minHeight"] | CssVars | CssProperties["minHeight"] | AnyString> | undefined
  maxW?: ConditionalValue<UtilityValues["maxWidth"] | CssVars | CssProperties["maxWidth"] | AnyString> | undefined
  maxH?: ConditionalValue<UtilityValues["maxHeight"] | CssVars | CssProperties["maxHeight"] | AnyString> | undefined
  overscroll?: ConditionalValue<CssProperties["overscrollBehavior"] | AnyString> | undefined
  overscrollX?: ConditionalValue<CssProperties["overscrollBehaviorX"] | AnyString> | undefined
  overscrollY?: ConditionalValue<CssProperties["overscrollBehaviorY"] | AnyString> | undefined
  scrollPaddingX?: ConditionalValue<UtilityValues["scrollPaddingInline"] | CssVars | CssProperties["scrollPaddingInline"] | AnyString> | undefined
  scrollPaddingY?: ConditionalValue<UtilityValues["scrollPaddingBlock"] | CssVars | CssProperties["scrollPaddingBlock"] | AnyString> | undefined
  listStylePos?: ConditionalValue<CssProperties["listStylePosition"] | AnyString> | undefined
  listStyleImg?: ConditionalValue<UtilityValues["listStyleImage"] | CssVars | CssProperties["listStyleImage"] | AnyString> | undefined
  pos?: ConditionalValue<CssProperties["position"] | AnyString> | undefined
  insetX?: ConditionalValue<UtilityValues["insetInline"] | CssVars | CssProperties["insetInline"] | AnyString> | undefined
  insetY?: ConditionalValue<UtilityValues["insetBlock"] | CssVars | CssProperties["insetBlock"] | AnyString> | undefined
  insetStart?: ConditionalValue<UtilityValues["insetInlineStart"] | CssVars | CssProperties["insetInlineStart"] | AnyString> | undefined
  insetEnd?: ConditionalValue<UtilityValues["insetInlineEnd"] | CssVars | CssProperties["insetInlineEnd"] | AnyString> | undefined
  m?: ConditionalValue<UtilityValues["margin"] | CssVars | CssProperties["margin"] | AnyString> | undefined
  mt?: ConditionalValue<UtilityValues["marginTop"] | CssVars | CssProperties["marginTop"] | AnyString> | undefined
  mr?: ConditionalValue<UtilityValues["marginRight"] | CssVars | CssProperties["marginRight"] | AnyString> | undefined
  mb?: ConditionalValue<UtilityValues["marginBottom"] | CssVars | CssProperties["marginBottom"] | AnyString> | undefined
  ml?: ConditionalValue<UtilityValues["marginLeft"] | CssVars | CssProperties["marginLeft"] | AnyString> | undefined
  ms?: ConditionalValue<UtilityValues["marginInlineStart"] | CssVars | CssProperties["marginInlineStart"] | AnyString> | undefined
  marginStart?: ConditionalValue<UtilityValues["marginInlineStart"] | CssVars | CssProperties["marginInlineStart"] | AnyString> | undefined
  me?: ConditionalValue<UtilityValues["marginInlineEnd"] | CssVars | CssProperties["marginInlineEnd"] | AnyString> | undefined
  marginEnd?: ConditionalValue<UtilityValues["marginInlineEnd"] | CssVars | CssProperties["marginInlineEnd"] | AnyString> | undefined
  mx?: ConditionalValue<UtilityValues["marginInline"] | CssVars | CssProperties["marginInline"] | AnyString> | undefined
  marginX?: ConditionalValue<UtilityValues["marginInline"] | CssVars | CssProperties["marginInline"] | AnyString> | undefined
  my?: ConditionalValue<UtilityValues["marginBlock"] | CssVars | CssProperties["marginBlock"] | AnyString> | undefined
  marginY?: ConditionalValue<UtilityValues["marginBlock"] | CssVars | CssProperties["marginBlock"] | AnyString> | undefined
  p?: ConditionalValue<UtilityValues["padding"] | CssVars | CssProperties["padding"] | AnyString> | undefined
  pt?: ConditionalValue<UtilityValues["paddingTop"] | CssVars | CssProperties["paddingTop"] | AnyString> | undefined
  pr?: ConditionalValue<UtilityValues["paddingRight"] | CssVars | CssProperties["paddingRight"] | AnyString> | undefined
  pb?: ConditionalValue<UtilityValues["paddingBottom"] | CssVars | CssProperties["paddingBottom"] | AnyString> | undefined
  pl?: ConditionalValue<UtilityValues["paddingLeft"] | CssVars | CssProperties["paddingLeft"] | AnyString> | undefined
  ps?: ConditionalValue<UtilityValues["paddingInlineStart"] | CssVars | CssProperties["paddingInlineStart"] | AnyString> | undefined
  paddingStart?: ConditionalValue<UtilityValues["paddingInlineStart"] | CssVars | CssProperties["paddingInlineStart"] | AnyString> | undefined
  pe?: ConditionalValue<UtilityValues["paddingInlineEnd"] | CssVars | CssProperties["paddingInlineEnd"] | AnyString> | undefined
  paddingEnd?: ConditionalValue<UtilityValues["paddingInlineEnd"] | CssVars | CssProperties["paddingInlineEnd"] | AnyString> | undefined
  px?: ConditionalValue<UtilityValues["paddingInline"] | CssVars | CssProperties["paddingInline"] | AnyString> | undefined
  paddingX?: ConditionalValue<UtilityValues["paddingInline"] | CssVars | CssProperties["paddingInline"] | AnyString> | undefined
  py?: ConditionalValue<UtilityValues["paddingBlock"] | CssVars | CssProperties["paddingBlock"] | AnyString> | undefined
  paddingY?: ConditionalValue<UtilityValues["paddingBlock"] | CssVars | CssProperties["paddingBlock"] | AnyString> | undefined
  textDecor?: ConditionalValue<CssProperties["textDecoration"] | AnyString> | undefined
  backgroundGradient?: ConditionalValue<UtilityValues["backgroundGradient"] | CssVars | AnyString> | undefined
  gradientFrom?: ConditionalValue<UtilityValues["gradientFrom"] | CssVars | AnyString> | undefined
  gradientTo?: ConditionalValue<UtilityValues["gradientTo"] | CssVars | AnyString> | undefined
  gradientVia?: ConditionalValue<UtilityValues["gradientVia"] | CssVars | AnyString> | undefined
  borderInlineStartRadius?: ConditionalValue<UtilityValues["borderInlineStartRadius"] | CssVars | AnyString> | undefined
  borderInlineEndRadius?: ConditionalValue<UtilityValues["borderInlineEndRadius"] | CssVars | AnyString> | undefined
  borderTopRadius?: ConditionalValue<UtilityValues["borderTopRadius"] | CssVars | AnyString> | undefined
  borderBottomRadius?: ConditionalValue<UtilityValues["borderBottomRadius"] | CssVars | AnyString> | undefined
  borderLeftRadius?: ConditionalValue<UtilityValues["borderLeftRadius"] | CssVars | AnyString> | undefined
  borderRightRadius?: ConditionalValue<UtilityValues["borderRightRadius"] | CssVars | AnyString> | undefined
  divideX?: ConditionalValue<UtilityValues["divideX"] | CssVars | AnyString> | undefined
  divideY?: ConditionalValue<UtilityValues["divideY"] | CssVars | AnyString> | undefined
  divideColor?: ConditionalValue<UtilityValues["divideColor"] | CssVars | AnyString> | undefined
  divideStyle?: ConditionalValue<UtilityValues["divideStyle"] | CssVars | AnyString> | undefined
  boxShadowColor?: ConditionalValue<UtilityValues["boxShadowColor"] | CssVars | AnyString> | undefined
  blur?: ConditionalValue<UtilityValues["blur"] | CssVars | AnyString> | undefined
  brightness?: ConditionalValue<string | number | AnyString> | undefined
  contrast?: ConditionalValue<string | number | AnyString> | undefined
  grayscale?: ConditionalValue<string | number | AnyString> | undefined
  hueRotate?: ConditionalValue<string | number | AnyString> | undefined
  invert?: ConditionalValue<string | number | AnyString> | undefined
  saturate?: ConditionalValue<string | number | AnyString> | undefined
  sepia?: ConditionalValue<string | number | AnyString> | undefined
  dropShadow?: ConditionalValue<string | number | AnyString> | undefined
  backdropBlur?: ConditionalValue<UtilityValues["backdropBlur"] | CssVars | AnyString> | undefined
  backdropBrightness?: ConditionalValue<string | number | AnyString> | undefined
  backdropContrast?: ConditionalValue<string | number | AnyString> | undefined
  backdropGrayscale?: ConditionalValue<string | number | AnyString> | undefined
  backdropHueRotate?: ConditionalValue<string | number | AnyString> | undefined
  backdropInvert?: ConditionalValue<string | number | AnyString> | undefined
  backdropOpacity?: ConditionalValue<string | number | AnyString> | undefined
  backdropSaturate?: ConditionalValue<string | number | AnyString> | undefined
  backdropSepia?: ConditionalValue<string | number | AnyString> | undefined
  focusRing?: ConditionalValue<UtilityValues["focusRing"] | CssVars | AnyString> | undefined
  focusVisibleRing?: ConditionalValue<UtilityValues["focusVisibleRing"] | CssVars | AnyString> | undefined
  focusRingColor?: ConditionalValue<UtilityValues["focusRingColor"] | CssVars | AnyString> | undefined
  focusRingOffset?: ConditionalValue<UtilityValues["focusRingOffset"] | CssVars | AnyString> | undefined
  focusRingWidth?: ConditionalValue<UtilityValues["focusRingWidth"] | CssVars | AnyString> | undefined
  focusRingStyle?: ConditionalValue<UtilityValues["focusRingStyle"] | CssVars | AnyString> | undefined
  boxSize?: ConditionalValue<UtilityValues["boxSize"] | CssVars | AnyString> | undefined
  hideFrom?: ConditionalValue<UtilityValues["hideFrom"] | CssVars | AnyString> | undefined
  hideBelow?: ConditionalValue<UtilityValues["hideBelow"] | CssVars | AnyString> | undefined
  scrollbar?: ConditionalValue<UtilityValues["scrollbar"] | CssVars | AnyString> | undefined
  scrollMarginX?: ConditionalValue<UtilityValues["scrollMarginX"] | CssVars | AnyString> | undefined
  scrollMarginY?: ConditionalValue<UtilityValues["scrollMarginY"] | CssVars | AnyString> | undefined
  scrollSnapStrictness?: ConditionalValue<UtilityValues["scrollSnapStrictness"] | CssVars | AnyString> | undefined
  scrollSnapMargin?: ConditionalValue<UtilityValues["scrollSnapMargin"] | CssVars | AnyString> | undefined
  scrollSnapMarginTop?: ConditionalValue<UtilityValues["scrollSnapMarginTop"] | CssVars | AnyString> | undefined
  scrollSnapMarginBottom?: ConditionalValue<UtilityValues["scrollSnapMarginBottom"] | CssVars | AnyString> | undefined
  scrollSnapMarginLeft?: ConditionalValue<UtilityValues["scrollSnapMarginLeft"] | CssVars | AnyString> | undefined
  scrollSnapMarginRight?: ConditionalValue<UtilityValues["scrollSnapMarginRight"] | CssVars | AnyString> | undefined
  ring?: ConditionalValue<string | number | AnyString> | undefined
  ringColor?: ConditionalValue<UtilityValues["ringColor"] | CssVars | AnyString> | undefined
  ringOffset?: ConditionalValue<string | number | AnyString> | undefined
  ringOffsetColor?: ConditionalValue<UtilityValues["ringOffsetColor"] | CssVars | AnyString> | undefined
  ringInset?: ConditionalValue<string | number | AnyString> | undefined
  skewX?: ConditionalValue<string | number | AnyString> | undefined
  skewY?: ConditionalValue<string | number | AnyString> | undefined
  scaleX?: ConditionalValue<string | number | AnyString> | undefined
  scaleY?: ConditionalValue<string | number | AnyString> | undefined
  spaceXReverse?: ConditionalValue<UtilityValues["spaceXReverse"] | CssVars | AnyString> | undefined
  spaceX?: ConditionalValue<UtilityValues["spaceX"] | CssVars | AnyString> | undefined
  spaceYReverse?: ConditionalValue<UtilityValues["spaceYReverse"] | CssVars | AnyString> | undefined
  spaceY?: ConditionalValue<UtilityValues["spaceY"] | CssVars | AnyString> | undefined
  rotateX?: ConditionalValue<string | number | AnyString> | undefined
  rotateY?: ConditionalValue<string | number | AnyString> | undefined
  translateX?: ConditionalValue<UtilityValues["translateX"] | CssVars | AnyString> | undefined
  translateY?: ConditionalValue<UtilityValues["translateY"] | CssVars | AnyString> | undefined
  truncate?: ConditionalValue<UtilityValues["truncate"] | CssVars | AnyString> | undefined
  srOnly?: ConditionalValue<UtilityValues["srOnly"] | CssVars | AnyString> | undefined
  debug?: ConditionalValue<UtilityValues["debug"] | CssVars | AnyString> | undefined
  colorPalette?: ConditionalValue<UtilityValues["colorPalette"] | CssVars | AnyString> | undefined
  textStyle?: ConditionalValue<UtilityValues["textStyle"] | CssVars | AnyString> | undefined
  layerStyle?: ConditionalValue<UtilityValues["layerStyle"] | CssVars | AnyString> | undefined
  animationStyle?: ConditionalValue<UtilityValues["animationStyle"] | CssVars | AnyString> | undefined
}
