import type { ConditionalValue, CssProperties } from "../css.types"
import type { UtilityValues } from "./prop-types.gen"
import type { Token } from "./token.gen"
type AnyString = string & {}
type AnyNumber = number & {}
type CssVars = `var(--${string})`
type CssVarValue = ConditionalValue<Token | CssVars | AnyString | AnyNumber>
type CssVarKey = `--${string}`
export type CssVarProperties = {
  [key in CssVarKey]?: CssVarValue | undefined
}

export interface SystemProperties {
  WebkitAppearance?: ConditionalValue<CssProperties["WebkitAppearance"] | undefined | AnyString> | undefined
  WebkitBorderBefore?: ConditionalValue<CssProperties["WebkitBorderBefore"] | undefined | AnyString> | undefined
  WebkitBorderBeforeColor?: ConditionalValue<CssProperties["WebkitBorderBeforeColor"] | undefined | AnyString> | undefined
  WebkitBorderBeforeStyle?: ConditionalValue<CssProperties["WebkitBorderBeforeStyle"] | undefined | AnyString> | undefined
  WebkitBorderBeforeWidth?: ConditionalValue<CssProperties["WebkitBorderBeforeWidth"] | undefined | AnyString> | undefined
  WebkitBoxReflect?: ConditionalValue<CssProperties["WebkitBoxReflect"] | undefined | AnyString> | undefined
  WebkitLineClamp?: ConditionalValue<CssProperties["WebkitLineClamp"] | undefined | AnyString> | undefined
  WebkitMask?: ConditionalValue<CssProperties["WebkitMask"] | undefined | AnyString> | undefined
  WebkitMaskAttachment?: ConditionalValue<CssProperties["WebkitMaskAttachment"] | undefined | AnyString> | undefined
  WebkitMaskClip?: ConditionalValue<CssProperties["WebkitMaskClip"] | undefined | AnyString> | undefined
  WebkitMaskComposite?: ConditionalValue<CssProperties["WebkitMaskComposite"] | undefined | AnyString> | undefined
  WebkitMaskImage?: ConditionalValue<CssProperties["WebkitMaskImage"] | undefined | AnyString> | undefined
  WebkitMaskOrigin?: ConditionalValue<CssProperties["WebkitMaskOrigin"] | undefined | AnyString> | undefined
  WebkitMaskPosition?: ConditionalValue<CssProperties["WebkitMaskPosition"] | undefined | AnyString> | undefined
  WebkitMaskPositionX?: ConditionalValue<CssProperties["WebkitMaskPositionX"] | undefined | AnyString> | undefined
  WebkitMaskPositionY?: ConditionalValue<CssProperties["WebkitMaskPositionY"] | undefined | AnyString> | undefined
  WebkitMaskRepeat?: ConditionalValue<CssProperties["WebkitMaskRepeat"] | undefined | AnyString> | undefined
  WebkitMaskRepeatX?: ConditionalValue<CssProperties["WebkitMaskRepeatX"] | undefined | AnyString> | undefined
  WebkitMaskRepeatY?: ConditionalValue<CssProperties["WebkitMaskRepeatY"] | undefined | AnyString> | undefined
  WebkitMaskSize?: ConditionalValue<CssProperties["WebkitMaskSize"] | undefined | AnyString> | undefined
  WebkitOverflowScrolling?: ConditionalValue<CssProperties["WebkitOverflowScrolling"] | undefined | AnyString> | undefined
  WebkitTapHighlightColor?: ConditionalValue<CssProperties["WebkitTapHighlightColor"] | undefined | AnyString> | undefined
  WebkitTextFillColor?: ConditionalValue<CssProperties["WebkitTextFillColor"] | undefined | AnyString> | undefined
  WebkitTextStroke?: ConditionalValue<CssProperties["WebkitTextStroke"] | undefined | AnyString> | undefined
  WebkitTextStrokeColor?: ConditionalValue<CssProperties["WebkitTextStrokeColor"] | undefined | AnyString> | undefined
  WebkitTextStrokeWidth?: ConditionalValue<CssProperties["WebkitTextStrokeWidth"] | undefined | AnyString> | undefined
  WebkitTouchCallout?: ConditionalValue<CssProperties["WebkitTouchCallout"] | undefined | AnyString> | undefined
  WebkitUserModify?: ConditionalValue<CssProperties["WebkitUserModify"] | undefined | AnyString> | undefined
  WebkitUserSelect?: ConditionalValue<CssProperties["WebkitUserSelect"] | undefined | AnyString> | undefined
  accentColor?: ConditionalValue<UtilityValues["accentColor"] | CssVars | CssProperties["accentColor"] | undefined | AnyString> | undefined
  alignContent?: ConditionalValue<CssProperties["alignContent"] | undefined | AnyString> | undefined
  alignItems?: ConditionalValue<CssProperties["alignItems"] | undefined | AnyString> | undefined
  alignSelf?: ConditionalValue<CssProperties["alignSelf"] | undefined | AnyString> | undefined
  alignTracks?: ConditionalValue<CssProperties["alignTracks"] | undefined | AnyString> | undefined
  all?: ConditionalValue<CssProperties["all"] | undefined | AnyString> | undefined
  anchorName?: ConditionalValue<CssProperties["anchorName"] | undefined | AnyString> | undefined
  anchorScope?: ConditionalValue<CssProperties["anchorScope"] | undefined | AnyString> | undefined
  animation?: ConditionalValue<UtilityValues["animation"] | CssVars | CssProperties["animation"] | undefined | AnyString> | undefined
  animationComposition?: ConditionalValue<CssProperties["animationComposition"] | undefined | AnyString> | undefined
  animationDelay?: ConditionalValue<UtilityValues["animationDelay"] | CssVars | CssProperties["animationDelay"] | undefined | AnyString> | undefined
  animationDirection?: ConditionalValue<CssProperties["animationDirection"] | undefined | AnyString> | undefined
  animationDuration?: ConditionalValue<UtilityValues["animationDuration"] | CssVars | CssProperties["animationDuration"] | undefined | AnyString> | undefined
  animationFillMode?: ConditionalValue<CssProperties["animationFillMode"] | undefined | AnyString> | undefined
  animationIterationCount?: ConditionalValue<CssProperties["animationIterationCount"] | undefined | AnyString> | undefined
  animationName?: ConditionalValue<UtilityValues["animationName"] | CssVars | CssProperties["animationName"] | undefined | AnyString> | undefined
  animationPlayState?: ConditionalValue<CssProperties["animationPlayState"] | undefined | AnyString> | undefined
  animationRange?: ConditionalValue<CssProperties["animationRange"] | undefined | AnyString> | undefined
  animationRangeEnd?: ConditionalValue<CssProperties["animationRangeEnd"] | undefined | AnyString> | undefined
  animationRangeStart?: ConditionalValue<CssProperties["animationRangeStart"] | undefined | AnyString> | undefined
  animationTimeline?: ConditionalValue<CssProperties["animationTimeline"] | undefined | AnyString> | undefined
  animationTimingFunction?:
    | ConditionalValue<UtilityValues["animationTimingFunction"] | CssVars | CssProperties["animationTimingFunction"] | undefined | AnyString>
    | undefined
  appearance?: ConditionalValue<CssProperties["appearance"] | undefined | AnyString> | undefined
  aspectRatio?: ConditionalValue<UtilityValues["aspectRatio"] | CssVars | CssProperties["aspectRatio"] | undefined | AnyString> | undefined
  backdropFilter?: ConditionalValue<CssProperties["backdropFilter"] | undefined | AnyString> | undefined
  backfaceVisibility?: ConditionalValue<CssProperties["backfaceVisibility"] | undefined | AnyString> | undefined
  background?: ConditionalValue<UtilityValues["background"] | CssVars | CssProperties["background"] | undefined | AnyString> | undefined
  backgroundAttachment?: ConditionalValue<CssProperties["backgroundAttachment"] | undefined | AnyString> | undefined
  backgroundBlendMode?: ConditionalValue<CssProperties["backgroundBlendMode"] | undefined | AnyString> | undefined
  backgroundClip?: ConditionalValue<UtilityValues["backgroundClip"] | CssVars | CssProperties["backgroundClip"] | undefined | AnyString> | undefined
  backgroundColor?: ConditionalValue<UtilityValues["backgroundColor"] | CssVars | CssProperties["backgroundColor"] | undefined | AnyString> | undefined
  backgroundImage?: ConditionalValue<UtilityValues["backgroundImage"] | CssVars | CssProperties["backgroundImage"] | undefined | AnyString> | undefined
  backgroundOrigin?: ConditionalValue<CssProperties["backgroundOrigin"] | undefined | AnyString> | undefined
  backgroundPosition?: ConditionalValue<CssProperties["backgroundPosition"] | undefined | AnyString> | undefined
  backgroundPositionX?: ConditionalValue<CssProperties["backgroundPositionX"] | undefined | AnyString> | undefined
  backgroundPositionY?: ConditionalValue<CssProperties["backgroundPositionY"] | undefined | AnyString> | undefined
  backgroundRepeat?: ConditionalValue<CssProperties["backgroundRepeat"] | undefined | AnyString> | undefined
  backgroundSize?: ConditionalValue<CssProperties["backgroundSize"] | undefined | AnyString> | undefined
  blockSize?: ConditionalValue<UtilityValues["blockSize"] | CssVars | CssProperties["blockSize"] | undefined | AnyString> | undefined
  border?: ConditionalValue<UtilityValues["border"] | CssVars | CssProperties["border"] | undefined | AnyString> | undefined
  borderBlock?: ConditionalValue<UtilityValues["borderBlock"] | CssVars | CssProperties["borderBlock"] | undefined | AnyString> | undefined
  borderBlockColor?: ConditionalValue<CssProperties["borderBlockColor"] | undefined | AnyString> | undefined
  borderBlockEnd?: ConditionalValue<UtilityValues["borderBlockEnd"] | CssVars | CssProperties["borderBlockEnd"] | undefined | AnyString> | undefined
  borderBlockEndColor?:
    | ConditionalValue<UtilityValues["borderBlockEndColor"] | CssVars | CssProperties["borderBlockEndColor"] | undefined | AnyString>
    | undefined
  borderBlockEndStyle?:
    | ConditionalValue<UtilityValues["borderBlockEndStyle"] | CssVars | CssProperties["borderBlockEndStyle"] | undefined | AnyString>
    | undefined
  borderBlockEndWidth?:
    | ConditionalValue<UtilityValues["borderBlockEndWidth"] | CssVars | CssProperties["borderBlockEndWidth"] | undefined | AnyString>
    | undefined
  borderBlockStart?: ConditionalValue<UtilityValues["borderBlockStart"] | CssVars | CssProperties["borderBlockStart"] | undefined | AnyString> | undefined
  borderBlockStartColor?:
    | ConditionalValue<UtilityValues["borderBlockStartColor"] | CssVars | CssProperties["borderBlockStartColor"] | undefined | AnyString>
    | undefined
  borderBlockStartStyle?:
    | ConditionalValue<UtilityValues["borderBlockStartStyle"] | CssVars | CssProperties["borderBlockStartStyle"] | undefined | AnyString>
    | undefined
  borderBlockStartWidth?:
    | ConditionalValue<UtilityValues["borderBlockStartWidth"] | CssVars | CssProperties["borderBlockStartWidth"] | undefined | AnyString>
    | undefined
  borderBlockStyle?: ConditionalValue<CssProperties["borderBlockStyle"] | undefined | AnyString> | undefined
  borderBlockWidth?: ConditionalValue<UtilityValues["borderBlockWidth"] | CssVars | CssProperties["borderBlockWidth"] | undefined | AnyString> | undefined
  borderBottom?: ConditionalValue<UtilityValues["borderBottom"] | CssVars | CssProperties["borderBottom"] | undefined | AnyString> | undefined
  borderBottomColor?: ConditionalValue<UtilityValues["borderBottomColor"] | CssVars | CssProperties["borderBottomColor"] | undefined | AnyString> | undefined
  borderBottomLeftRadius?:
    | ConditionalValue<UtilityValues["borderBottomLeftRadius"] | CssVars | CssProperties["borderBottomLeftRadius"] | undefined | AnyString>
    | undefined
  borderBottomRightRadius?:
    | ConditionalValue<UtilityValues["borderBottomRightRadius"] | CssVars | CssProperties["borderBottomRightRadius"] | undefined | AnyString>
    | undefined
  borderBottomStyle?: ConditionalValue<UtilityValues["borderBottomStyle"] | CssVars | CssProperties["borderBottomStyle"] | undefined | AnyString> | undefined
  borderBottomWidth?: ConditionalValue<UtilityValues["borderBottomWidth"] | CssVars | CssProperties["borderBottomWidth"] | undefined | AnyString> | undefined
  borderCollapse?: ConditionalValue<CssProperties["borderCollapse"] | undefined | AnyString> | undefined
  borderColor?: ConditionalValue<UtilityValues["borderColor"] | CssVars | CssProperties["borderColor"] | undefined | AnyString> | undefined
  borderEndEndRadius?: ConditionalValue<UtilityValues["borderEndEndRadius"] | CssVars | CssProperties["borderEndEndRadius"] | undefined | AnyString> | undefined
  borderEndStartRadius?:
    | ConditionalValue<UtilityValues["borderEndStartRadius"] | CssVars | CssProperties["borderEndStartRadius"] | undefined | AnyString>
    | undefined
  borderImage?: ConditionalValue<CssProperties["borderImage"] | undefined | AnyString> | undefined
  borderImageOutset?: ConditionalValue<CssProperties["borderImageOutset"] | undefined | AnyString> | undefined
  borderImageRepeat?: ConditionalValue<CssProperties["borderImageRepeat"] | undefined | AnyString> | undefined
  borderImageSlice?: ConditionalValue<CssProperties["borderImageSlice"] | undefined | AnyString> | undefined
  borderImageSource?: ConditionalValue<CssProperties["borderImageSource"] | undefined | AnyString> | undefined
  borderImageWidth?: ConditionalValue<CssProperties["borderImageWidth"] | undefined | AnyString> | undefined
  borderInline?: ConditionalValue<UtilityValues["borderInline"] | CssVars | CssProperties["borderInline"] | undefined | AnyString> | undefined
  borderInlineColor?: ConditionalValue<CssProperties["borderInlineColor"] | undefined | AnyString> | undefined
  borderInlineEnd?: ConditionalValue<UtilityValues["borderInlineEnd"] | CssVars | CssProperties["borderInlineEnd"] | undefined | AnyString> | undefined
  borderInlineEndColor?:
    | ConditionalValue<UtilityValues["borderInlineEndColor"] | CssVars | CssProperties["borderInlineEndColor"] | undefined | AnyString>
    | undefined
  borderInlineEndStyle?:
    | ConditionalValue<UtilityValues["borderInlineEndStyle"] | CssVars | CssProperties["borderInlineEndStyle"] | undefined | AnyString>
    | undefined
  borderInlineEndWidth?:
    | ConditionalValue<UtilityValues["borderInlineEndWidth"] | CssVars | CssProperties["borderInlineEndWidth"] | undefined | AnyString>
    | undefined
  borderInlineStart?: ConditionalValue<UtilityValues["borderInlineStart"] | CssVars | CssProperties["borderInlineStart"] | undefined | AnyString> | undefined
  borderInlineStartColor?:
    | ConditionalValue<UtilityValues["borderInlineStartColor"] | CssVars | CssProperties["borderInlineStartColor"] | undefined | AnyString>
    | undefined
  borderInlineStartStyle?:
    | ConditionalValue<UtilityValues["borderInlineStartStyle"] | CssVars | CssProperties["borderInlineStartStyle"] | undefined | AnyString>
    | undefined
  borderInlineStartWidth?:
    | ConditionalValue<UtilityValues["borderInlineStartWidth"] | CssVars | CssProperties["borderInlineStartWidth"] | undefined | AnyString>
    | undefined
  borderInlineStyle?: ConditionalValue<CssProperties["borderInlineStyle"] | undefined | AnyString> | undefined
  borderInlineWidth?: ConditionalValue<UtilityValues["borderInlineWidth"] | CssVars | CssProperties["borderInlineWidth"] | undefined | AnyString> | undefined
  borderLeft?: ConditionalValue<UtilityValues["borderLeft"] | CssVars | CssProperties["borderLeft"] | undefined | AnyString> | undefined
  borderLeftColor?: ConditionalValue<UtilityValues["borderLeftColor"] | CssVars | CssProperties["borderLeftColor"] | undefined | AnyString> | undefined
  borderLeftStyle?: ConditionalValue<UtilityValues["borderLeftStyle"] | CssVars | CssProperties["borderLeftStyle"] | undefined | AnyString> | undefined
  borderLeftWidth?: ConditionalValue<UtilityValues["borderLeftWidth"] | CssVars | CssProperties["borderLeftWidth"] | undefined | AnyString> | undefined
  borderRadius?: ConditionalValue<UtilityValues["borderRadius"] | CssVars | CssProperties["borderRadius"] | undefined | AnyString> | undefined
  borderRight?: ConditionalValue<UtilityValues["borderRight"] | CssVars | CssProperties["borderRight"] | undefined | AnyString> | undefined
  borderRightColor?: ConditionalValue<UtilityValues["borderRightColor"] | CssVars | CssProperties["borderRightColor"] | undefined | AnyString> | undefined
  borderRightStyle?: ConditionalValue<UtilityValues["borderRightStyle"] | CssVars | CssProperties["borderRightStyle"] | undefined | AnyString> | undefined
  borderRightWidth?: ConditionalValue<UtilityValues["borderRightWidth"] | CssVars | CssProperties["borderRightWidth"] | undefined | AnyString> | undefined
  borderSpacing?: ConditionalValue<UtilityValues["borderSpacing"] | CssVars | CssProperties["borderSpacing"] | undefined | AnyString> | undefined
  borderStartEndRadius?:
    | ConditionalValue<UtilityValues["borderStartEndRadius"] | CssVars | CssProperties["borderStartEndRadius"] | undefined | AnyString>
    | undefined
  borderStartStartRadius?:
    | ConditionalValue<UtilityValues["borderStartStartRadius"] | CssVars | CssProperties["borderStartStartRadius"] | undefined | AnyString>
    | undefined
  borderStyle?: ConditionalValue<UtilityValues["borderStyle"] | CssVars | CssProperties["borderStyle"] | undefined | AnyString> | undefined
  borderTop?: ConditionalValue<UtilityValues["borderTop"] | CssVars | CssProperties["borderTop"] | undefined | AnyString> | undefined
  borderTopColor?: ConditionalValue<UtilityValues["borderTopColor"] | CssVars | CssProperties["borderTopColor"] | undefined | AnyString> | undefined
  borderTopLeftRadius?:
    | ConditionalValue<UtilityValues["borderTopLeftRadius"] | CssVars | CssProperties["borderTopLeftRadius"] | undefined | AnyString>
    | undefined
  borderTopRightRadius?:
    | ConditionalValue<UtilityValues["borderTopRightRadius"] | CssVars | CssProperties["borderTopRightRadius"] | undefined | AnyString>
    | undefined
  borderTopStyle?: ConditionalValue<UtilityValues["borderTopStyle"] | CssVars | CssProperties["borderTopStyle"] | undefined | AnyString> | undefined
  borderTopWidth?: ConditionalValue<UtilityValues["borderTopWidth"] | CssVars | CssProperties["borderTopWidth"] | undefined | AnyString> | undefined
  borderWidth?: ConditionalValue<UtilityValues["borderWidth"] | CssVars | CssProperties["borderWidth"] | undefined | AnyString> | undefined
  bottom?: ConditionalValue<UtilityValues["bottom"] | CssVars | CssProperties["bottom"] | undefined | AnyString> | undefined
  boxAlign?: ConditionalValue<CssProperties["boxAlign"] | undefined | AnyString> | undefined
  boxDecorationBreak?: ConditionalValue<CssProperties["boxDecorationBreak"] | undefined | AnyString> | undefined
  boxDirection?: ConditionalValue<CssProperties["boxDirection"] | undefined | AnyString> | undefined
  boxFlex?: ConditionalValue<CssProperties["boxFlex"] | undefined | AnyString> | undefined
  boxFlexGroup?: ConditionalValue<CssProperties["boxFlexGroup"] | undefined | AnyString> | undefined
  boxLines?: ConditionalValue<CssProperties["boxLines"] | undefined | AnyString> | undefined
  boxOrdinalGroup?: ConditionalValue<CssProperties["boxOrdinalGroup"] | undefined | AnyString> | undefined
  boxOrient?: ConditionalValue<CssProperties["boxOrient"] | undefined | AnyString> | undefined
  boxPack?: ConditionalValue<CssProperties["boxPack"] | undefined | AnyString> | undefined
  boxShadow?: ConditionalValue<UtilityValues["boxShadow"] | CssVars | CssProperties["boxShadow"] | undefined | AnyString> | undefined
  boxSizing?: ConditionalValue<CssProperties["boxSizing"] | undefined | AnyString> | undefined
  breakAfter?: ConditionalValue<CssProperties["breakAfter"] | undefined | AnyString> | undefined
  breakBefore?: ConditionalValue<CssProperties["breakBefore"] | undefined | AnyString> | undefined
  breakInside?: ConditionalValue<CssProperties["breakInside"] | undefined | AnyString> | undefined
  captionSide?: ConditionalValue<CssProperties["captionSide"] | undefined | AnyString> | undefined
  caret?: ConditionalValue<CssProperties["caret"] | undefined | AnyString> | undefined
  caretColor?: ConditionalValue<UtilityValues["caretColor"] | CssVars | CssProperties["caretColor"] | undefined | AnyString> | undefined
  caretShape?: ConditionalValue<CssProperties["caretShape"] | undefined | AnyString> | undefined
  clear?: ConditionalValue<CssProperties["clear"] | undefined | AnyString> | undefined
  clip?: ConditionalValue<CssProperties["clip"] | undefined | AnyString> | undefined
  clipPath?: ConditionalValue<CssProperties["clipPath"] | undefined | AnyString> | undefined
  clipRule?: ConditionalValue<CssProperties["clipRule"] | undefined | AnyString> | undefined
  color?: ConditionalValue<UtilityValues["color"] | CssVars | CssProperties["color"] | undefined | AnyString> | undefined
  colorInterpolationFilters?: ConditionalValue<CssProperties["colorInterpolationFilters"] | undefined | AnyString> | undefined
  colorScheme?: ConditionalValue<CssProperties["colorScheme"] | undefined | AnyString> | undefined
  columnCount?: ConditionalValue<CssProperties["columnCount"] | undefined | AnyString> | undefined
  columnFill?: ConditionalValue<CssProperties["columnFill"] | undefined | AnyString> | undefined
  columnGap?: ConditionalValue<UtilityValues["columnGap"] | CssVars | CssProperties["columnGap"] | undefined | AnyString> | undefined
  columnRule?: ConditionalValue<CssProperties["columnRule"] | undefined | AnyString> | undefined
  columnRuleColor?: ConditionalValue<CssProperties["columnRuleColor"] | undefined | AnyString> | undefined
  columnRuleStyle?: ConditionalValue<CssProperties["columnRuleStyle"] | undefined | AnyString> | undefined
  columnRuleWidth?: ConditionalValue<CssProperties["columnRuleWidth"] | undefined | AnyString> | undefined
  columnSpan?: ConditionalValue<CssProperties["columnSpan"] | undefined | AnyString> | undefined
  columnWidth?: ConditionalValue<CssProperties["columnWidth"] | undefined | AnyString> | undefined
  columns?: ConditionalValue<CssProperties["columns"] | undefined | AnyString> | undefined
  contain?: ConditionalValue<CssProperties["contain"] | undefined | AnyString> | undefined
  containIntrinsicBlockSize?: ConditionalValue<CssProperties["containIntrinsicBlockSize"] | undefined | AnyString> | undefined
  containIntrinsicHeight?: ConditionalValue<CssProperties["containIntrinsicHeight"] | undefined | AnyString> | undefined
  containIntrinsicInlineSize?: ConditionalValue<CssProperties["containIntrinsicInlineSize"] | undefined | AnyString> | undefined
  containIntrinsicSize?: ConditionalValue<CssProperties["containIntrinsicSize"] | undefined | AnyString> | undefined
  containIntrinsicWidth?: ConditionalValue<CssProperties["containIntrinsicWidth"] | undefined | AnyString> | undefined
  container?: ConditionalValue<CssProperties["container"] | undefined | AnyString> | undefined
  containerName?: ConditionalValue<CssProperties["containerName"] | undefined | AnyString> | undefined
  containerType?: ConditionalValue<CssProperties["containerType"] | undefined | AnyString> | undefined
  content?: ConditionalValue<CssProperties["content"] | undefined | AnyString> | undefined
  contentVisibility?: ConditionalValue<CssProperties["contentVisibility"] | undefined | AnyString> | undefined
  counterIncrement?: ConditionalValue<CssProperties["counterIncrement"] | undefined | AnyString> | undefined
  counterReset?: ConditionalValue<CssProperties["counterReset"] | undefined | AnyString> | undefined
  counterSet?: ConditionalValue<CssProperties["counterSet"] | undefined | AnyString> | undefined
  cursor?: ConditionalValue<UtilityValues["cursor"] | CssVars | CssProperties["cursor"] | undefined | AnyString> | undefined
  cx?: ConditionalValue<CssProperties["cx"] | undefined | AnyString> | undefined
  cy?: ConditionalValue<CssProperties["cy"] | undefined | AnyString> | undefined
  d?: ConditionalValue<CssProperties["d"] | undefined | AnyString> | undefined
  direction?: ConditionalValue<CssProperties["direction"] | undefined | AnyString> | undefined
  display?: ConditionalValue<CssProperties["display"] | undefined | AnyString> | undefined
  dominantBaseline?: ConditionalValue<CssProperties["dominantBaseline"] | undefined | AnyString> | undefined
  emptyCells?: ConditionalValue<CssProperties["emptyCells"] | undefined | AnyString> | undefined
  fieldSizing?: ConditionalValue<CssProperties["fieldSizing"] | undefined | AnyString> | undefined
  fill?: ConditionalValue<UtilityValues["fill"] | CssVars | CssProperties["fill"] | undefined | AnyString> | undefined
  fillOpacity?: ConditionalValue<CssProperties["fillOpacity"] | undefined | AnyString> | undefined
  fillRule?: ConditionalValue<CssProperties["fillRule"] | undefined | AnyString> | undefined
  filter?: ConditionalValue<CssProperties["filter"] | undefined | AnyString> | undefined
  flex?: ConditionalValue<CssProperties["flex"] | undefined | AnyString> | undefined
  flexBasis?: ConditionalValue<UtilityValues["flexBasis"] | CssVars | CssProperties["flexBasis"] | undefined | AnyString> | undefined
  flexDirection?: ConditionalValue<CssProperties["flexDirection"] | undefined | AnyString> | undefined
  flexFlow?: ConditionalValue<CssProperties["flexFlow"] | undefined | AnyString> | undefined
  flexGrow?: ConditionalValue<CssProperties["flexGrow"] | undefined | AnyString> | undefined
  flexShrink?: ConditionalValue<CssProperties["flexShrink"] | undefined | AnyString> | undefined
  flexWrap?: ConditionalValue<CssProperties["flexWrap"] | undefined | AnyString> | undefined
  float?: ConditionalValue<CssProperties["float"] | undefined | AnyString> | undefined
  floodColor?: ConditionalValue<CssProperties["floodColor"] | undefined | AnyString> | undefined
  floodOpacity?: ConditionalValue<CssProperties["floodOpacity"] | undefined | AnyString> | undefined
  font?: ConditionalValue<CssProperties["font"] | undefined | AnyString> | undefined
  fontFamily?: ConditionalValue<UtilityValues["fontFamily"] | CssVars | CssProperties["fontFamily"] | undefined | AnyString> | undefined
  fontFeatureSettings?: ConditionalValue<CssProperties["fontFeatureSettings"] | undefined | AnyString> | undefined
  fontKerning?: ConditionalValue<CssProperties["fontKerning"] | undefined | AnyString> | undefined
  fontLanguageOverride?: ConditionalValue<CssProperties["fontLanguageOverride"] | undefined | AnyString> | undefined
  fontOpticalSizing?: ConditionalValue<CssProperties["fontOpticalSizing"] | undefined | AnyString> | undefined
  fontPalette?: ConditionalValue<CssProperties["fontPalette"] | undefined | AnyString> | undefined
  fontSize?: ConditionalValue<UtilityValues["fontSize"] | CssVars | CssProperties["fontSize"] | undefined | AnyString> | undefined
  fontSizeAdjust?: ConditionalValue<CssProperties["fontSizeAdjust"] | undefined | AnyString> | undefined
  fontSmooth?: ConditionalValue<CssProperties["fontSmooth"] | undefined | AnyString> | undefined
  fontStretch?: ConditionalValue<CssProperties["fontStretch"] | undefined | AnyString> | undefined
  fontStyle?: ConditionalValue<CssProperties["fontStyle"] | undefined | AnyString> | undefined
  fontSynthesis?: ConditionalValue<CssProperties["fontSynthesis"] | undefined | AnyString> | undefined
  fontSynthesisPosition?: ConditionalValue<CssProperties["fontSynthesisPosition"] | undefined | AnyString> | undefined
  fontSynthesisSmallCaps?: ConditionalValue<CssProperties["fontSynthesisSmallCaps"] | undefined | AnyString> | undefined
  fontSynthesisStyle?: ConditionalValue<CssProperties["fontSynthesisStyle"] | undefined | AnyString> | undefined
  fontSynthesisWeight?: ConditionalValue<CssProperties["fontSynthesisWeight"] | undefined | AnyString> | undefined
  fontVariant?: ConditionalValue<CssProperties["fontVariant"] | undefined | AnyString> | undefined
  fontVariantAlternates?: ConditionalValue<CssProperties["fontVariantAlternates"] | undefined | AnyString> | undefined
  fontVariantCaps?: ConditionalValue<CssProperties["fontVariantCaps"] | undefined | AnyString> | undefined
  fontVariantEastAsian?: ConditionalValue<CssProperties["fontVariantEastAsian"] | undefined | AnyString> | undefined
  fontVariantEmoji?: ConditionalValue<CssProperties["fontVariantEmoji"] | undefined | AnyString> | undefined
  fontVariantLigatures?: ConditionalValue<CssProperties["fontVariantLigatures"] | undefined | AnyString> | undefined
  fontVariantNumeric?: ConditionalValue<CssProperties["fontVariantNumeric"] | undefined | AnyString> | undefined
  fontVariantPosition?: ConditionalValue<CssProperties["fontVariantPosition"] | undefined | AnyString> | undefined
  fontVariationSettings?: ConditionalValue<CssProperties["fontVariationSettings"] | undefined | AnyString> | undefined
  fontWeight?: ConditionalValue<UtilityValues["fontWeight"] | CssVars | CssProperties["fontWeight"] | undefined | AnyString> | undefined
  forcedColorAdjust?: ConditionalValue<CssProperties["forcedColorAdjust"] | undefined | AnyString> | undefined
  gap?: ConditionalValue<UtilityValues["gap"] | CssVars | CssProperties["gap"] | undefined | AnyString> | undefined
  grid?: ConditionalValue<CssProperties["grid"] | undefined | AnyString> | undefined
  gridArea?: ConditionalValue<CssProperties["gridArea"] | undefined | AnyString> | undefined
  gridAutoColumns?: ConditionalValue<CssProperties["gridAutoColumns"] | undefined | AnyString> | undefined
  gridAutoFlow?: ConditionalValue<CssProperties["gridAutoFlow"] | undefined | AnyString> | undefined
  gridAutoRows?: ConditionalValue<CssProperties["gridAutoRows"] | undefined | AnyString> | undefined
  gridColumn?: ConditionalValue<CssProperties["gridColumn"] | undefined | AnyString> | undefined
  gridColumnEnd?: ConditionalValue<CssProperties["gridColumnEnd"] | undefined | AnyString> | undefined
  gridColumnGap?: ConditionalValue<UtilityValues["gridColumnGap"] | CssVars | CssProperties["gridColumnGap"] | undefined | AnyString> | undefined
  gridColumnStart?: ConditionalValue<CssProperties["gridColumnStart"] | undefined | AnyString> | undefined
  gridGap?: ConditionalValue<UtilityValues["gridGap"] | CssVars | CssProperties["gridGap"] | undefined | AnyString> | undefined
  gridRow?: ConditionalValue<CssProperties["gridRow"] | undefined | AnyString> | undefined
  gridRowEnd?: ConditionalValue<CssProperties["gridRowEnd"] | undefined | AnyString> | undefined
  gridRowGap?: ConditionalValue<UtilityValues["gridRowGap"] | CssVars | CssProperties["gridRowGap"] | undefined | AnyString> | undefined
  gridRowStart?: ConditionalValue<CssProperties["gridRowStart"] | undefined | AnyString> | undefined
  gridTemplate?: ConditionalValue<CssProperties["gridTemplate"] | undefined | AnyString> | undefined
  gridTemplateAreas?: ConditionalValue<CssProperties["gridTemplateAreas"] | undefined | AnyString> | undefined
  gridTemplateColumns?: ConditionalValue<CssProperties["gridTemplateColumns"] | undefined | AnyString> | undefined
  gridTemplateRows?: ConditionalValue<CssProperties["gridTemplateRows"] | undefined | AnyString> | undefined
  hangingPunctuation?: ConditionalValue<CssProperties["hangingPunctuation"] | undefined | AnyString> | undefined
  height?: ConditionalValue<UtilityValues["height"] | CssVars | CssProperties["height"] | undefined | AnyString> | undefined
  hyphenateCharacter?: ConditionalValue<CssProperties["hyphenateCharacter"] | undefined | AnyString> | undefined
  hyphenateLimitChars?: ConditionalValue<CssProperties["hyphenateLimitChars"] | undefined | AnyString> | undefined
  hyphens?: ConditionalValue<CssProperties["hyphens"] | undefined | AnyString> | undefined
  imageOrientation?: ConditionalValue<CssProperties["imageOrientation"] | undefined | AnyString> | undefined
  imageRendering?: ConditionalValue<CssProperties["imageRendering"] | undefined | AnyString> | undefined
  imageResolution?: ConditionalValue<CssProperties["imageResolution"] | undefined | AnyString> | undefined
  imeMode?: ConditionalValue<CssProperties["imeMode"] | undefined | AnyString> | undefined
  initialLetter?: ConditionalValue<CssProperties["initialLetter"] | undefined | AnyString> | undefined
  initialLetterAlign?: ConditionalValue<CssProperties["initialLetterAlign"] | undefined | AnyString> | undefined
  inlineSize?: ConditionalValue<UtilityValues["inlineSize"] | CssVars | CssProperties["inlineSize"] | undefined | AnyString> | undefined
  inset?: ConditionalValue<UtilityValues["inset"] | CssVars | CssProperties["inset"] | undefined | AnyString> | undefined
  insetBlock?: ConditionalValue<UtilityValues["insetBlock"] | CssVars | CssProperties["insetBlock"] | undefined | AnyString> | undefined
  insetBlockEnd?: ConditionalValue<UtilityValues["insetBlockEnd"] | CssVars | CssProperties["insetBlockEnd"] | undefined | AnyString> | undefined
  insetBlockStart?: ConditionalValue<UtilityValues["insetBlockStart"] | CssVars | CssProperties["insetBlockStart"] | undefined | AnyString> | undefined
  insetInline?: ConditionalValue<UtilityValues["insetInline"] | CssVars | CssProperties["insetInline"] | undefined | AnyString> | undefined
  insetInlineEnd?: ConditionalValue<UtilityValues["insetInlineEnd"] | CssVars | CssProperties["insetInlineEnd"] | undefined | AnyString> | undefined
  insetInlineStart?: ConditionalValue<UtilityValues["insetInlineStart"] | CssVars | CssProperties["insetInlineStart"] | undefined | AnyString> | undefined
  interpolateSize?: ConditionalValue<CssProperties["interpolateSize"] | undefined | AnyString> | undefined
  isolation?: ConditionalValue<CssProperties["isolation"] | undefined | AnyString> | undefined
  justifyContent?: ConditionalValue<CssProperties["justifyContent"] | undefined | AnyString> | undefined
  justifyItems?: ConditionalValue<CssProperties["justifyItems"] | undefined | AnyString> | undefined
  justifySelf?: ConditionalValue<CssProperties["justifySelf"] | undefined | AnyString> | undefined
  justifyTracks?: ConditionalValue<CssProperties["justifyTracks"] | undefined | AnyString> | undefined
  left?: ConditionalValue<UtilityValues["left"] | CssVars | CssProperties["left"] | undefined | AnyString> | undefined
  letterSpacing?: ConditionalValue<UtilityValues["letterSpacing"] | CssVars | CssProperties["letterSpacing"] | undefined | AnyString> | undefined
  lightingColor?: ConditionalValue<CssProperties["lightingColor"] | undefined | AnyString> | undefined
  lineBreak?: ConditionalValue<CssProperties["lineBreak"] | undefined | AnyString> | undefined
  lineClamp?: ConditionalValue<CssProperties["lineClamp"] | undefined | AnyString> | undefined
  lineHeight?: ConditionalValue<UtilityValues["lineHeight"] | CssVars | CssProperties["lineHeight"] | undefined | AnyString> | undefined
  lineHeightStep?: ConditionalValue<CssProperties["lineHeightStep"] | undefined | AnyString> | undefined
  listStyle?: ConditionalValue<CssProperties["listStyle"] | undefined | AnyString> | undefined
  listStyleImage?: ConditionalValue<UtilityValues["listStyleImage"] | CssVars | CssProperties["listStyleImage"] | undefined | AnyString> | undefined
  listStylePosition?: ConditionalValue<CssProperties["listStylePosition"] | undefined | AnyString> | undefined
  listStyleType?: ConditionalValue<CssProperties["listStyleType"] | undefined | AnyString> | undefined
  margin?: ConditionalValue<UtilityValues["margin"] | CssVars | CssProperties["margin"] | undefined | AnyString> | undefined
  marginBlock?: ConditionalValue<UtilityValues["marginBlock"] | CssVars | CssProperties["marginBlock"] | undefined | AnyString> | undefined
  marginBlockEnd?: ConditionalValue<UtilityValues["marginBlockEnd"] | CssVars | CssProperties["marginBlockEnd"] | undefined | AnyString> | undefined
  marginBlockStart?: ConditionalValue<UtilityValues["marginBlockStart"] | CssVars | CssProperties["marginBlockStart"] | undefined | AnyString> | undefined
  marginBottom?: ConditionalValue<UtilityValues["marginBottom"] | CssVars | CssProperties["marginBottom"] | undefined | AnyString> | undefined
  marginInline?: ConditionalValue<UtilityValues["marginInline"] | CssVars | CssProperties["marginInline"] | undefined | AnyString> | undefined
  marginInlineEnd?: ConditionalValue<UtilityValues["marginInlineEnd"] | CssVars | CssProperties["marginInlineEnd"] | undefined | AnyString> | undefined
  marginInlineStart?: ConditionalValue<UtilityValues["marginInlineStart"] | CssVars | CssProperties["marginInlineStart"] | undefined | AnyString> | undefined
  marginLeft?: ConditionalValue<UtilityValues["marginLeft"] | CssVars | CssProperties["marginLeft"] | undefined | AnyString> | undefined
  marginRight?: ConditionalValue<UtilityValues["marginRight"] | CssVars | CssProperties["marginRight"] | undefined | AnyString> | undefined
  marginTop?: ConditionalValue<UtilityValues["marginTop"] | CssVars | CssProperties["marginTop"] | undefined | AnyString> | undefined
  marginTrim?: ConditionalValue<CssProperties["marginTrim"] | undefined | AnyString> | undefined
  marker?: ConditionalValue<CssProperties["marker"] | undefined | AnyString> | undefined
  markerEnd?: ConditionalValue<CssProperties["markerEnd"] | undefined | AnyString> | undefined
  markerMid?: ConditionalValue<CssProperties["markerMid"] | undefined | AnyString> | undefined
  markerStart?: ConditionalValue<CssProperties["markerStart"] | undefined | AnyString> | undefined
  mask?: ConditionalValue<CssProperties["mask"] | undefined | AnyString> | undefined
  maskBorder?: ConditionalValue<CssProperties["maskBorder"] | undefined | AnyString> | undefined
  maskBorderMode?: ConditionalValue<CssProperties["maskBorderMode"] | undefined | AnyString> | undefined
  maskBorderOutset?: ConditionalValue<CssProperties["maskBorderOutset"] | undefined | AnyString> | undefined
  maskBorderRepeat?: ConditionalValue<CssProperties["maskBorderRepeat"] | undefined | AnyString> | undefined
  maskBorderSlice?: ConditionalValue<CssProperties["maskBorderSlice"] | undefined | AnyString> | undefined
  maskBorderSource?: ConditionalValue<CssProperties["maskBorderSource"] | undefined | AnyString> | undefined
  maskBorderWidth?: ConditionalValue<CssProperties["maskBorderWidth"] | undefined | AnyString> | undefined
  maskClip?: ConditionalValue<CssProperties["maskClip"] | undefined | AnyString> | undefined
  maskComposite?: ConditionalValue<CssProperties["maskComposite"] | undefined | AnyString> | undefined
  maskImage?: ConditionalValue<CssProperties["maskImage"] | undefined | AnyString> | undefined
  maskMode?: ConditionalValue<CssProperties["maskMode"] | undefined | AnyString> | undefined
  maskOrigin?: ConditionalValue<CssProperties["maskOrigin"] | undefined | AnyString> | undefined
  maskPosition?: ConditionalValue<CssProperties["maskPosition"] | undefined | AnyString> | undefined
  maskRepeat?: ConditionalValue<CssProperties["maskRepeat"] | undefined | AnyString> | undefined
  maskSize?: ConditionalValue<CssProperties["maskSize"] | undefined | AnyString> | undefined
  maskType?: ConditionalValue<CssProperties["maskType"] | undefined | AnyString> | undefined
  masonryAutoFlow?: ConditionalValue<CssProperties["masonryAutoFlow"] | undefined | AnyString> | undefined
  mathDepth?: ConditionalValue<CssProperties["mathDepth"] | undefined | AnyString> | undefined
  mathShift?: ConditionalValue<CssProperties["mathShift"] | undefined | AnyString> | undefined
  mathStyle?: ConditionalValue<CssProperties["mathStyle"] | undefined | AnyString> | undefined
  maxBlockSize?: ConditionalValue<UtilityValues["maxBlockSize"] | CssVars | CssProperties["maxBlockSize"] | undefined | AnyString> | undefined
  maxHeight?: ConditionalValue<UtilityValues["maxHeight"] | CssVars | CssProperties["maxHeight"] | undefined | AnyString> | undefined
  maxInlineSize?: ConditionalValue<UtilityValues["maxInlineSize"] | CssVars | CssProperties["maxInlineSize"] | undefined | AnyString> | undefined
  maxLines?: ConditionalValue<CssProperties["maxLines"] | undefined | AnyString> | undefined
  maxWidth?: ConditionalValue<UtilityValues["maxWidth"] | CssVars | CssProperties["maxWidth"] | undefined | AnyString> | undefined
  minBlockSize?: ConditionalValue<UtilityValues["minBlockSize"] | CssVars | CssProperties["minBlockSize"] | undefined | AnyString> | undefined
  minHeight?: ConditionalValue<UtilityValues["minHeight"] | CssVars | CssProperties["minHeight"] | undefined | AnyString> | undefined
  minInlineSize?: ConditionalValue<UtilityValues["minInlineSize"] | CssVars | CssProperties["minInlineSize"] | undefined | AnyString> | undefined
  minWidth?: ConditionalValue<UtilityValues["minWidth"] | CssVars | CssProperties["minWidth"] | undefined | AnyString> | undefined
  mixBlendMode?: ConditionalValue<CssProperties["mixBlendMode"] | undefined | AnyString> | undefined
  objectFit?: ConditionalValue<CssProperties["objectFit"] | undefined | AnyString> | undefined
  objectPosition?: ConditionalValue<CssProperties["objectPosition"] | undefined | AnyString> | undefined
  offset?: ConditionalValue<CssProperties["offset"] | undefined | AnyString> | undefined
  offsetAnchor?: ConditionalValue<CssProperties["offsetAnchor"] | undefined | AnyString> | undefined
  offsetDistance?: ConditionalValue<CssProperties["offsetDistance"] | undefined | AnyString> | undefined
  offsetPath?: ConditionalValue<CssProperties["offsetPath"] | undefined | AnyString> | undefined
  offsetPosition?: ConditionalValue<CssProperties["offsetPosition"] | undefined | AnyString> | undefined
  offsetRotate?: ConditionalValue<CssProperties["offsetRotate"] | undefined | AnyString> | undefined
  opacity?: ConditionalValue<UtilityValues["opacity"] | CssVars | CssProperties["opacity"] | undefined | AnyString> | undefined
  order?: ConditionalValue<CssProperties["order"] | undefined | AnyString> | undefined
  orphans?: ConditionalValue<CssProperties["orphans"] | undefined | AnyString> | undefined
  outline?: ConditionalValue<CssProperties["outline"] | undefined | AnyString> | undefined
  outlineColor?: ConditionalValue<UtilityValues["outlineColor"] | CssVars | CssProperties["outlineColor"] | undefined | AnyString> | undefined
  outlineOffset?: ConditionalValue<CssProperties["outlineOffset"] | undefined | AnyString> | undefined
  outlineStyle?: ConditionalValue<CssProperties["outlineStyle"] | undefined | AnyString> | undefined
  outlineWidth?: ConditionalValue<CssProperties["outlineWidth"] | undefined | AnyString> | undefined
  overflow?: ConditionalValue<CssProperties["overflow"] | undefined | AnyString> | undefined
  overflowAnchor?: ConditionalValue<CssProperties["overflowAnchor"] | undefined | AnyString> | undefined
  overflowBlock?: ConditionalValue<CssProperties["overflowBlock"] | undefined | AnyString> | undefined
  overflowClipBox?: ConditionalValue<CssProperties["overflowClipBox"] | undefined | AnyString> | undefined
  overflowClipMargin?: ConditionalValue<CssProperties["overflowClipMargin"] | undefined | AnyString> | undefined
  overflowInline?: ConditionalValue<CssProperties["overflowInline"] | undefined | AnyString> | undefined
  overflowWrap?: ConditionalValue<CssProperties["overflowWrap"] | undefined | AnyString> | undefined
  overflowX?: ConditionalValue<CssProperties["overflowX"] | undefined | AnyString> | undefined
  overflowY?: ConditionalValue<CssProperties["overflowY"] | undefined | AnyString> | undefined
  overlay?: ConditionalValue<CssProperties["overlay"] | undefined | AnyString> | undefined
  overscrollBehavior?: ConditionalValue<CssProperties["overscrollBehavior"] | undefined | AnyString> | undefined
  overscrollBehaviorBlock?: ConditionalValue<CssProperties["overscrollBehaviorBlock"] | undefined | AnyString> | undefined
  overscrollBehaviorInline?: ConditionalValue<CssProperties["overscrollBehaviorInline"] | undefined | AnyString> | undefined
  overscrollBehaviorX?: ConditionalValue<CssProperties["overscrollBehaviorX"] | undefined | AnyString> | undefined
  overscrollBehaviorY?: ConditionalValue<CssProperties["overscrollBehaviorY"] | undefined | AnyString> | undefined
  padding?: ConditionalValue<UtilityValues["padding"] | CssVars | CssProperties["padding"] | undefined | AnyString> | undefined
  paddingBlock?: ConditionalValue<UtilityValues["paddingBlock"] | CssVars | CssProperties["paddingBlock"] | undefined | AnyString> | undefined
  paddingBlockEnd?: ConditionalValue<UtilityValues["paddingBlockEnd"] | CssVars | CssProperties["paddingBlockEnd"] | undefined | AnyString> | undefined
  paddingBlockStart?: ConditionalValue<UtilityValues["paddingBlockStart"] | CssVars | CssProperties["paddingBlockStart"] | undefined | AnyString> | undefined
  paddingBottom?: ConditionalValue<UtilityValues["paddingBottom"] | CssVars | CssProperties["paddingBottom"] | undefined | AnyString> | undefined
  paddingInline?: ConditionalValue<UtilityValues["paddingInline"] | CssVars | CssProperties["paddingInline"] | undefined | AnyString> | undefined
  paddingInlineEnd?: ConditionalValue<UtilityValues["paddingInlineEnd"] | CssVars | CssProperties["paddingInlineEnd"] | undefined | AnyString> | undefined
  paddingInlineStart?: ConditionalValue<UtilityValues["paddingInlineStart"] | CssVars | CssProperties["paddingInlineStart"] | undefined | AnyString> | undefined
  paddingLeft?: ConditionalValue<UtilityValues["paddingLeft"] | CssVars | CssProperties["paddingLeft"] | undefined | AnyString> | undefined
  paddingRight?: ConditionalValue<UtilityValues["paddingRight"] | CssVars | CssProperties["paddingRight"] | undefined | AnyString> | undefined
  paddingTop?: ConditionalValue<UtilityValues["paddingTop"] | CssVars | CssProperties["paddingTop"] | undefined | AnyString> | undefined
  page?: ConditionalValue<CssProperties["page"] | undefined | AnyString> | undefined
  pageBreakAfter?: ConditionalValue<CssProperties["pageBreakAfter"] | undefined | AnyString> | undefined
  pageBreakBefore?: ConditionalValue<CssProperties["pageBreakBefore"] | undefined | AnyString> | undefined
  pageBreakInside?: ConditionalValue<CssProperties["pageBreakInside"] | undefined | AnyString> | undefined
  paintOrder?: ConditionalValue<CssProperties["paintOrder"] | undefined | AnyString> | undefined
  perspective?: ConditionalValue<CssProperties["perspective"] | undefined | AnyString> | undefined
  perspectiveOrigin?: ConditionalValue<CssProperties["perspectiveOrigin"] | undefined | AnyString> | undefined
  placeContent?: ConditionalValue<CssProperties["placeContent"] | undefined | AnyString> | undefined
  placeItems?: ConditionalValue<CssProperties["placeItems"] | undefined | AnyString> | undefined
  placeSelf?: ConditionalValue<CssProperties["placeSelf"] | undefined | AnyString> | undefined
  pointerEvents?: ConditionalValue<CssProperties["pointerEvents"] | undefined | AnyString> | undefined
  position?: ConditionalValue<CssProperties["position"] | undefined | AnyString> | undefined
  positionAnchor?: ConditionalValue<CssProperties["positionAnchor"] | undefined | AnyString> | undefined
  positionArea?: ConditionalValue<CssProperties["positionArea"] | undefined | AnyString> | undefined
  positionTry?: ConditionalValue<CssProperties["positionTry"] | undefined | AnyString> | undefined
  positionTryFallbacks?: ConditionalValue<CssProperties["positionTryFallbacks"] | undefined | AnyString> | undefined
  positionTryOrder?: ConditionalValue<CssProperties["positionTryOrder"] | undefined | AnyString> | undefined
  positionVisibility?: ConditionalValue<CssProperties["positionVisibility"] | undefined | AnyString> | undefined
  printColorAdjust?: ConditionalValue<CssProperties["printColorAdjust"] | undefined | AnyString> | undefined
  quotes?: ConditionalValue<CssProperties["quotes"] | undefined | AnyString> | undefined
  r?: ConditionalValue<CssProperties["r"] | undefined | AnyString> | undefined
  resize?: ConditionalValue<CssProperties["resize"] | undefined | AnyString> | undefined
  right?: ConditionalValue<UtilityValues["right"] | CssVars | CssProperties["right"] | undefined | AnyString> | undefined
  rotate?: ConditionalValue<CssProperties["rotate"] | undefined | AnyString> | undefined
  rowGap?: ConditionalValue<UtilityValues["rowGap"] | CssVars | CssProperties["rowGap"] | undefined | AnyString> | undefined
  rubyAlign?: ConditionalValue<CssProperties["rubyAlign"] | undefined | AnyString> | undefined
  rubyMerge?: ConditionalValue<CssProperties["rubyMerge"] | undefined | AnyString> | undefined
  rubyPosition?: ConditionalValue<CssProperties["rubyPosition"] | undefined | AnyString> | undefined
  rx?: ConditionalValue<CssProperties["rx"] | undefined | AnyString> | undefined
  ry?: ConditionalValue<CssProperties["ry"] | undefined | AnyString> | undefined
  scale?: ConditionalValue<CssProperties["scale"] | undefined | AnyString> | undefined
  scrollBehavior?: ConditionalValue<CssProperties["scrollBehavior"] | undefined | AnyString> | undefined
  scrollMargin?: ConditionalValue<UtilityValues["scrollMargin"] | CssVars | CssProperties["scrollMargin"] | undefined | AnyString> | undefined
  scrollMarginBlock?: ConditionalValue<CssProperties["scrollMarginBlock"] | undefined | AnyString> | undefined
  scrollMarginBlockEnd?: ConditionalValue<CssProperties["scrollMarginBlockEnd"] | undefined | AnyString> | undefined
  scrollMarginBlockStart?: ConditionalValue<CssProperties["scrollMarginBlockStart"] | undefined | AnyString> | undefined
  scrollMarginBottom?: ConditionalValue<UtilityValues["scrollMarginBottom"] | CssVars | CssProperties["scrollMarginBottom"] | undefined | AnyString> | undefined
  scrollMarginInline?: ConditionalValue<CssProperties["scrollMarginInline"] | undefined | AnyString> | undefined
  scrollMarginInlineEnd?: ConditionalValue<CssProperties["scrollMarginInlineEnd"] | undefined | AnyString> | undefined
  scrollMarginInlineStart?: ConditionalValue<CssProperties["scrollMarginInlineStart"] | undefined | AnyString> | undefined
  scrollMarginLeft?: ConditionalValue<UtilityValues["scrollMarginLeft"] | CssVars | CssProperties["scrollMarginLeft"] | undefined | AnyString> | undefined
  scrollMarginRight?: ConditionalValue<UtilityValues["scrollMarginRight"] | CssVars | CssProperties["scrollMarginRight"] | undefined | AnyString> | undefined
  scrollMarginTop?: ConditionalValue<UtilityValues["scrollMarginTop"] | CssVars | CssProperties["scrollMarginTop"] | undefined | AnyString> | undefined
  scrollPadding?: ConditionalValue<UtilityValues["scrollPadding"] | CssVars | CssProperties["scrollPadding"] | undefined | AnyString> | undefined
  scrollPaddingBlock?: ConditionalValue<UtilityValues["scrollPaddingBlock"] | CssVars | CssProperties["scrollPaddingBlock"] | undefined | AnyString> | undefined
  scrollPaddingBlockEnd?: ConditionalValue<CssProperties["scrollPaddingBlockEnd"] | undefined | AnyString> | undefined
  scrollPaddingBlockStart?: ConditionalValue<CssProperties["scrollPaddingBlockStart"] | undefined | AnyString> | undefined
  scrollPaddingBottom?:
    | ConditionalValue<UtilityValues["scrollPaddingBottom"] | CssVars | CssProperties["scrollPaddingBottom"] | undefined | AnyString>
    | undefined
  scrollPaddingInline?:
    | ConditionalValue<UtilityValues["scrollPaddingInline"] | CssVars | CssProperties["scrollPaddingInline"] | undefined | AnyString>
    | undefined
  scrollPaddingInlineEnd?: ConditionalValue<CssProperties["scrollPaddingInlineEnd"] | undefined | AnyString> | undefined
  scrollPaddingInlineStart?: ConditionalValue<CssProperties["scrollPaddingInlineStart"] | undefined | AnyString> | undefined
  scrollPaddingLeft?: ConditionalValue<UtilityValues["scrollPaddingLeft"] | CssVars | CssProperties["scrollPaddingLeft"] | undefined | AnyString> | undefined
  scrollPaddingRight?: ConditionalValue<UtilityValues["scrollPaddingRight"] | CssVars | CssProperties["scrollPaddingRight"] | undefined | AnyString> | undefined
  scrollPaddingTop?: ConditionalValue<UtilityValues["scrollPaddingTop"] | CssVars | CssProperties["scrollPaddingTop"] | undefined | AnyString> | undefined
  scrollSnapAlign?: ConditionalValue<CssProperties["scrollSnapAlign"] | undefined | AnyString> | undefined
  scrollSnapCoordinate?: ConditionalValue<CssProperties["scrollSnapCoordinate"] | undefined | AnyString> | undefined
  scrollSnapDestination?: ConditionalValue<CssProperties["scrollSnapDestination"] | undefined | AnyString> | undefined
  scrollSnapPointsX?: ConditionalValue<CssProperties["scrollSnapPointsX"] | undefined | AnyString> | undefined
  scrollSnapPointsY?: ConditionalValue<CssProperties["scrollSnapPointsY"] | undefined | AnyString> | undefined
  scrollSnapStop?: ConditionalValue<CssProperties["scrollSnapStop"] | undefined | AnyString> | undefined
  scrollSnapType?: ConditionalValue<UtilityValues["scrollSnapType"] | CssVars | CssProperties["scrollSnapType"] | undefined | AnyString> | undefined
  scrollSnapTypeX?: ConditionalValue<CssProperties["scrollSnapTypeX"] | undefined | AnyString> | undefined
  scrollSnapTypeY?: ConditionalValue<CssProperties["scrollSnapTypeY"] | undefined | AnyString> | undefined
  scrollTimeline?: ConditionalValue<CssProperties["scrollTimeline"] | undefined | AnyString> | undefined
  scrollTimelineAxis?: ConditionalValue<CssProperties["scrollTimelineAxis"] | undefined | AnyString> | undefined
  scrollTimelineName?: ConditionalValue<CssProperties["scrollTimelineName"] | undefined | AnyString> | undefined
  scrollbarColor?: ConditionalValue<UtilityValues["scrollbarColor"] | CssVars | CssProperties["scrollbarColor"] | undefined | AnyString> | undefined
  scrollbarGutter?: ConditionalValue<UtilityValues["scrollbarGutter"] | CssVars | CssProperties["scrollbarGutter"] | undefined | AnyString> | undefined
  scrollbarWidth?: ConditionalValue<UtilityValues["scrollbarWidth"] | CssVars | CssProperties["scrollbarWidth"] | undefined | AnyString> | undefined
  shapeImageThreshold?: ConditionalValue<CssProperties["shapeImageThreshold"] | undefined | AnyString> | undefined
  shapeMargin?: ConditionalValue<CssProperties["shapeMargin"] | undefined | AnyString> | undefined
  shapeOutside?: ConditionalValue<CssProperties["shapeOutside"] | undefined | AnyString> | undefined
  shapeRendering?: ConditionalValue<CssProperties["shapeRendering"] | undefined | AnyString> | undefined
  stopColor?: ConditionalValue<CssProperties["stopColor"] | undefined | AnyString> | undefined
  stopOpacity?: ConditionalValue<CssProperties["stopOpacity"] | undefined | AnyString> | undefined
  stroke?: ConditionalValue<UtilityValues["stroke"] | CssVars | CssProperties["stroke"] | undefined | AnyString> | undefined
  strokeDasharray?: ConditionalValue<CssProperties["strokeDasharray"] | undefined | AnyString> | undefined
  strokeDashoffset?: ConditionalValue<CssProperties["strokeDashoffset"] | undefined | AnyString> | undefined
  strokeLinecap?: ConditionalValue<CssProperties["strokeLinecap"] | undefined | AnyString> | undefined
  strokeLinejoin?: ConditionalValue<CssProperties["strokeLinejoin"] | undefined | AnyString> | undefined
  strokeMiterlimit?: ConditionalValue<CssProperties["strokeMiterlimit"] | undefined | AnyString> | undefined
  strokeOpacity?: ConditionalValue<CssProperties["strokeOpacity"] | undefined | AnyString> | undefined
  strokeWidth?: ConditionalValue<CssProperties["strokeWidth"] | undefined | AnyString> | undefined
  tabSize?: ConditionalValue<CssProperties["tabSize"] | undefined | AnyString> | undefined
  tableLayout?: ConditionalValue<CssProperties["tableLayout"] | undefined | AnyString> | undefined
  textAlign?: ConditionalValue<CssProperties["textAlign"] | undefined | AnyString> | undefined
  textAlignLast?: ConditionalValue<CssProperties["textAlignLast"] | undefined | AnyString> | undefined
  textAnchor?: ConditionalValue<CssProperties["textAnchor"] | undefined | AnyString> | undefined
  textBox?: ConditionalValue<CssProperties["textBox"] | undefined | AnyString> | undefined
  textBoxEdge?: ConditionalValue<CssProperties["textBoxEdge"] | undefined | AnyString> | undefined
  textBoxTrim?: ConditionalValue<CssProperties["textBoxTrim"] | undefined | AnyString> | undefined
  textCombineUpright?: ConditionalValue<CssProperties["textCombineUpright"] | undefined | AnyString> | undefined
  textDecoration?: ConditionalValue<CssProperties["textDecoration"] | undefined | AnyString> | undefined
  textDecorationColor?:
    | ConditionalValue<UtilityValues["textDecorationColor"] | CssVars | CssProperties["textDecorationColor"] | undefined | AnyString>
    | undefined
  textDecorationLine?: ConditionalValue<CssProperties["textDecorationLine"] | undefined | AnyString> | undefined
  textDecorationSkip?: ConditionalValue<CssProperties["textDecorationSkip"] | undefined | AnyString> | undefined
  textDecorationSkipInk?: ConditionalValue<CssProperties["textDecorationSkipInk"] | undefined | AnyString> | undefined
  textDecorationStyle?: ConditionalValue<CssProperties["textDecorationStyle"] | undefined | AnyString> | undefined
  textDecorationThickness?: ConditionalValue<CssProperties["textDecorationThickness"] | undefined | AnyString> | undefined
  textEmphasis?: ConditionalValue<CssProperties["textEmphasis"] | undefined | AnyString> | undefined
  textEmphasisColor?: ConditionalValue<CssProperties["textEmphasisColor"] | undefined | AnyString> | undefined
  textEmphasisPosition?: ConditionalValue<CssProperties["textEmphasisPosition"] | undefined | AnyString> | undefined
  textEmphasisStyle?: ConditionalValue<CssProperties["textEmphasisStyle"] | undefined | AnyString> | undefined
  textIndent?: ConditionalValue<UtilityValues["textIndent"] | CssVars | CssProperties["textIndent"] | undefined | AnyString> | undefined
  textJustify?: ConditionalValue<CssProperties["textJustify"] | undefined | AnyString> | undefined
  textOrientation?: ConditionalValue<CssProperties["textOrientation"] | undefined | AnyString> | undefined
  textOverflow?: ConditionalValue<CssProperties["textOverflow"] | undefined | AnyString> | undefined
  textRendering?: ConditionalValue<CssProperties["textRendering"] | undefined | AnyString> | undefined
  textShadow?: ConditionalValue<UtilityValues["textShadow"] | CssVars | CssProperties["textShadow"] | undefined | AnyString> | undefined
  textSizeAdjust?: ConditionalValue<CssProperties["textSizeAdjust"] | undefined | AnyString> | undefined
  textSpacingTrim?: ConditionalValue<CssProperties["textSpacingTrim"] | undefined | AnyString> | undefined
  textTransform?: ConditionalValue<CssProperties["textTransform"] | undefined | AnyString> | undefined
  textUnderlineOffset?: ConditionalValue<CssProperties["textUnderlineOffset"] | undefined | AnyString> | undefined
  textUnderlinePosition?: ConditionalValue<CssProperties["textUnderlinePosition"] | undefined | AnyString> | undefined
  textWrap?: ConditionalValue<CssProperties["textWrap"] | undefined | AnyString> | undefined
  textWrapMode?: ConditionalValue<CssProperties["textWrapMode"] | undefined | AnyString> | undefined
  textWrapStyle?: ConditionalValue<CssProperties["textWrapStyle"] | undefined | AnyString> | undefined
  timelineScope?: ConditionalValue<CssProperties["timelineScope"] | undefined | AnyString> | undefined
  top?: ConditionalValue<UtilityValues["top"] | CssVars | CssProperties["top"] | undefined | AnyString> | undefined
  touchAction?: ConditionalValue<CssProperties["touchAction"] | undefined | AnyString> | undefined
  transform?: ConditionalValue<CssProperties["transform"] | undefined | AnyString> | undefined
  transformBox?: ConditionalValue<CssProperties["transformBox"] | undefined | AnyString> | undefined
  transformOrigin?: ConditionalValue<CssProperties["transformOrigin"] | undefined | AnyString> | undefined
  transformStyle?: ConditionalValue<CssProperties["transformStyle"] | undefined | AnyString> | undefined
  transition?: ConditionalValue<UtilityValues["transition"] | CssVars | CssProperties["transition"] | undefined | AnyString> | undefined
  transitionBehavior?: ConditionalValue<CssProperties["transitionBehavior"] | undefined | AnyString> | undefined
  transitionDelay?: ConditionalValue<CssProperties["transitionDelay"] | undefined | AnyString> | undefined
  transitionDuration?: ConditionalValue<UtilityValues["transitionDuration"] | CssVars | CssProperties["transitionDuration"] | undefined | AnyString> | undefined
  transitionProperty?: ConditionalValue<UtilityValues["transitionProperty"] | CssVars | CssProperties["transitionProperty"] | undefined | AnyString> | undefined
  transitionTimingFunction?:
    | ConditionalValue<UtilityValues["transitionTimingFunction"] | CssVars | CssProperties["transitionTimingFunction"] | undefined | AnyString>
    | undefined
  translate?: ConditionalValue<CssProperties["translate"] | undefined | AnyString> | undefined
  unicodeBidi?: ConditionalValue<CssProperties["unicodeBidi"] | undefined | AnyString> | undefined
  userSelect?: ConditionalValue<CssProperties["userSelect"] | undefined | AnyString> | undefined
  vectorEffect?: ConditionalValue<CssProperties["vectorEffect"] | undefined | AnyString> | undefined
  verticalAlign?: ConditionalValue<CssProperties["verticalAlign"] | undefined | AnyString> | undefined
  viewTimeline?: ConditionalValue<CssProperties["viewTimeline"] | undefined | AnyString> | undefined
  viewTimelineAxis?: ConditionalValue<CssProperties["viewTimelineAxis"] | undefined | AnyString> | undefined
  viewTimelineInset?: ConditionalValue<CssProperties["viewTimelineInset"] | undefined | AnyString> | undefined
  viewTimelineName?: ConditionalValue<CssProperties["viewTimelineName"] | undefined | AnyString> | undefined
  viewTransitionName?: ConditionalValue<CssProperties["viewTransitionName"] | undefined | AnyString> | undefined
  visibility?: ConditionalValue<CssProperties["visibility"] | undefined | AnyString> | undefined
  whiteSpace?: ConditionalValue<CssProperties["whiteSpace"] | undefined | AnyString> | undefined
  whiteSpaceCollapse?: ConditionalValue<CssProperties["whiteSpaceCollapse"] | undefined | AnyString> | undefined
  widows?: ConditionalValue<CssProperties["widows"] | undefined | AnyString> | undefined
  width?: ConditionalValue<UtilityValues["width"] | CssVars | CssProperties["width"] | undefined | AnyString> | undefined
  willChange?: ConditionalValue<CssProperties["willChange"] | undefined | AnyString> | undefined
  wordBreak?: ConditionalValue<CssProperties["wordBreak"] | undefined | AnyString> | undefined
  wordSpacing?: ConditionalValue<CssProperties["wordSpacing"] | undefined | AnyString> | undefined
  wordWrap?: ConditionalValue<CssProperties["wordWrap"] | undefined | AnyString> | undefined
  writingMode?: ConditionalValue<CssProperties["writingMode"] | undefined | AnyString> | undefined
  x?: ConditionalValue<CssProperties["x"] | undefined | AnyString> | undefined
  y?: ConditionalValue<CssProperties["y"] | undefined | AnyString> | undefined
  zIndex?: ConditionalValue<UtilityValues["zIndex"] | CssVars | CssProperties["zIndex"] | undefined | AnyString> | undefined
  zoom?: ConditionalValue<CssProperties["zoom"] | undefined | AnyString> | undefined
  alignmentBaseline?: ConditionalValue<CssProperties["alignmentBaseline"] | undefined | AnyString> | undefined
  baselineShift?: ConditionalValue<CssProperties["baselineShift"] | undefined | AnyString> | undefined
  colorInterpolation?: ConditionalValue<CssProperties["colorInterpolation"] | undefined | AnyString> | undefined
  colorRendering?: ConditionalValue<CssProperties["colorRendering"] | undefined | AnyString> | undefined
  glyphOrientationVertical?: ConditionalValue<CssProperties["glyphOrientationVertical"] | undefined | AnyString> | undefined
  bg?: ConditionalValue<UtilityValues["background"] | CssVars | CssProperties["background"] | undefined | AnyString> | undefined
  bgColor?: ConditionalValue<UtilityValues["backgroundColor"] | CssVars | CssProperties["backgroundColor"] | undefined | AnyString> | undefined
  bgSize?: ConditionalValue<CssProperties["backgroundSize"] | undefined | AnyString> | undefined
  bgPos?: ConditionalValue<CssProperties["backgroundPosition"] | undefined | AnyString> | undefined
  bgRepeat?: ConditionalValue<CssProperties["backgroundRepeat"] | undefined | AnyString> | undefined
  bgAttachment?: ConditionalValue<CssProperties["backgroundAttachment"] | undefined | AnyString> | undefined
  bgClip?: ConditionalValue<UtilityValues["backgroundClip"] | CssVars | CssProperties["backgroundClip"] | undefined | AnyString> | undefined
  bgGradient?: ConditionalValue<UtilityValues["backgroundGradient"] | CssVars | undefined | AnyString> | undefined
  bgImg?: ConditionalValue<UtilityValues["backgroundImage"] | CssVars | CssProperties["backgroundImage"] | undefined | AnyString> | undefined
  bgImage?: ConditionalValue<UtilityValues["backgroundImage"] | CssVars | CssProperties["backgroundImage"] | undefined | AnyString> | undefined
  borderStart?: ConditionalValue<UtilityValues["borderInlineStart"] | CssVars | CssProperties["borderInlineStart"] | undefined | AnyString> | undefined
  borderEnd?: ConditionalValue<UtilityValues["borderInlineEnd"] | CssVars | CssProperties["borderInlineEnd"] | undefined | AnyString> | undefined
  borderX?: ConditionalValue<UtilityValues["borderInline"] | CssVars | CssProperties["borderInline"] | undefined | AnyString> | undefined
  borderY?: ConditionalValue<UtilityValues["borderBlock"] | CssVars | CssProperties["borderBlock"] | undefined | AnyString> | undefined
  borderStartColor?:
    | ConditionalValue<UtilityValues["borderInlineStartColor"] | CssVars | CssProperties["borderInlineStartColor"] | undefined | AnyString>
    | undefined
  borderEndColor?: ConditionalValue<UtilityValues["borderInlineEndColor"] | CssVars | CssProperties["borderInlineEndColor"] | undefined | AnyString> | undefined
  borderStartStyle?:
    | ConditionalValue<UtilityValues["borderInlineStartStyle"] | CssVars | CssProperties["borderInlineStartStyle"] | undefined | AnyString>
    | undefined
  borderEndStyle?: ConditionalValue<UtilityValues["borderInlineEndStyle"] | CssVars | CssProperties["borderInlineEndStyle"] | undefined | AnyString> | undefined
  rounded?: ConditionalValue<UtilityValues["borderRadius"] | CssVars | CssProperties["borderRadius"] | undefined | AnyString> | undefined
  roundedTopLeft?: ConditionalValue<UtilityValues["borderTopLeftRadius"] | CssVars | CssProperties["borderTopLeftRadius"] | undefined | AnyString> | undefined
  roundedStartStart?:
    | ConditionalValue<UtilityValues["borderStartStartRadius"] | CssVars | CssProperties["borderStartStartRadius"] | undefined | AnyString>
    | undefined
  borderTopStartRadius?:
    | ConditionalValue<UtilityValues["borderStartStartRadius"] | CssVars | CssProperties["borderStartStartRadius"] | undefined | AnyString>
    | undefined
  roundedEndStart?:
    | ConditionalValue<UtilityValues["borderEndStartRadius"] | CssVars | CssProperties["borderEndStartRadius"] | undefined | AnyString>
    | undefined
  borderBottomStartRadius?:
    | ConditionalValue<UtilityValues["borderEndStartRadius"] | CssVars | CssProperties["borderEndStartRadius"] | undefined | AnyString>
    | undefined
  roundedTopRight?:
    | ConditionalValue<UtilityValues["borderTopRightRadius"] | CssVars | CssProperties["borderTopRightRadius"] | undefined | AnyString>
    | undefined
  roundedStartEnd?:
    | ConditionalValue<UtilityValues["borderStartEndRadius"] | CssVars | CssProperties["borderStartEndRadius"] | undefined | AnyString>
    | undefined
  borderTopEndRadius?:
    | ConditionalValue<UtilityValues["borderStartEndRadius"] | CssVars | CssProperties["borderStartEndRadius"] | undefined | AnyString>
    | undefined
  roundedEndEnd?: ConditionalValue<UtilityValues["borderEndEndRadius"] | CssVars | CssProperties["borderEndEndRadius"] | undefined | AnyString> | undefined
  borderBottomEndRadius?:
    | ConditionalValue<UtilityValues["borderEndEndRadius"] | CssVars | CssProperties["borderEndEndRadius"] | undefined | AnyString>
    | undefined
  roundedBottomLeft?:
    | ConditionalValue<UtilityValues["borderBottomLeftRadius"] | CssVars | CssProperties["borderBottomLeftRadius"] | undefined | AnyString>
    | undefined
  roundedBottomRight?:
    | ConditionalValue<UtilityValues["borderBottomRightRadius"] | CssVars | CssProperties["borderBottomRightRadius"] | undefined | AnyString>
    | undefined
  roundedStart?: ConditionalValue<UtilityValues["borderInlineStartRadius"] | CssVars | undefined | AnyString> | undefined
  borderStartRadius?: ConditionalValue<UtilityValues["borderInlineStartRadius"] | CssVars | undefined | AnyString> | undefined
  roundedEnd?: ConditionalValue<UtilityValues["borderInlineEndRadius"] | CssVars | undefined | AnyString> | undefined
  borderEndRadius?: ConditionalValue<UtilityValues["borderInlineEndRadius"] | CssVars | undefined | AnyString> | undefined
  roundedTop?: ConditionalValue<UtilityValues["borderTopRadius"] | CssVars | undefined | AnyString> | undefined
  roundedBottom?: ConditionalValue<UtilityValues["borderBottomRadius"] | CssVars | undefined | AnyString> | undefined
  roundedLeft?: ConditionalValue<UtilityValues["borderLeftRadius"] | CssVars | undefined | AnyString> | undefined
  roundedRight?: ConditionalValue<UtilityValues["borderRightRadius"] | CssVars | undefined | AnyString> | undefined
  borderXWidth?: ConditionalValue<UtilityValues["borderInlineWidth"] | CssVars | CssProperties["borderInlineWidth"] | undefined | AnyString> | undefined
  borderStartWidth?:
    | ConditionalValue<UtilityValues["borderInlineStartWidth"] | CssVars | CssProperties["borderInlineStartWidth"] | undefined | AnyString>
    | undefined
  borderEndWidth?: ConditionalValue<UtilityValues["borderInlineEndWidth"] | CssVars | CssProperties["borderInlineEndWidth"] | undefined | AnyString> | undefined
  borderYWidth?: ConditionalValue<UtilityValues["borderBlockWidth"] | CssVars | CssProperties["borderBlockWidth"] | undefined | AnyString> | undefined
  shadow?: ConditionalValue<UtilityValues["boxShadow"] | CssVars | CssProperties["boxShadow"] | undefined | AnyString> | undefined
  shadowColor?: ConditionalValue<UtilityValues["boxShadowColor"] | CssVars | undefined | AnyString> | undefined
  blendMode?: ConditionalValue<CssProperties["mixBlendMode"] | undefined | AnyString> | undefined
  bgBlendMode?: ConditionalValue<CssProperties["backgroundBlendMode"] | undefined | AnyString> | undefined
  gapY?: ConditionalValue<UtilityValues["rowGap"] | CssVars | CssProperties["rowGap"] | undefined | AnyString> | undefined
  gapX?: ConditionalValue<UtilityValues["columnGap"] | CssVars | CssProperties["columnGap"] | undefined | AnyString> | undefined
  flexDir?: ConditionalValue<CssProperties["flexDirection"] | undefined | AnyString> | undefined
  w?: ConditionalValue<UtilityValues["width"] | CssVars | CssProperties["width"] | undefined | AnyString> | undefined
  h?: ConditionalValue<UtilityValues["height"] | CssVars | CssProperties["height"] | undefined | AnyString> | undefined
  minW?: ConditionalValue<UtilityValues["minWidth"] | CssVars | CssProperties["minWidth"] | undefined | AnyString> | undefined
  minH?: ConditionalValue<UtilityValues["minHeight"] | CssVars | CssProperties["minHeight"] | undefined | AnyString> | undefined
  maxW?: ConditionalValue<UtilityValues["maxWidth"] | CssVars | CssProperties["maxWidth"] | undefined | AnyString> | undefined
  maxH?: ConditionalValue<UtilityValues["maxHeight"] | CssVars | CssProperties["maxHeight"] | undefined | AnyString> | undefined
  overscroll?: ConditionalValue<CssProperties["overscrollBehavior"] | undefined | AnyString> | undefined
  overscrollX?: ConditionalValue<CssProperties["overscrollBehaviorX"] | undefined | AnyString> | undefined
  overscrollY?: ConditionalValue<CssProperties["overscrollBehaviorY"] | undefined | AnyString> | undefined
  scrollPaddingX?: ConditionalValue<UtilityValues["scrollPaddingInline"] | CssVars | CssProperties["scrollPaddingInline"] | undefined | AnyString> | undefined
  scrollPaddingY?: ConditionalValue<UtilityValues["scrollPaddingBlock"] | CssVars | CssProperties["scrollPaddingBlock"] | undefined | AnyString> | undefined
  listStylePos?: ConditionalValue<CssProperties["listStylePosition"] | undefined | AnyString> | undefined
  listStyleImg?: ConditionalValue<UtilityValues["listStyleImage"] | CssVars | CssProperties["listStyleImage"] | undefined | AnyString> | undefined
  pos?: ConditionalValue<CssProperties["position"] | undefined | AnyString> | undefined
  insetX?: ConditionalValue<UtilityValues["insetInline"] | CssVars | CssProperties["insetInline"] | undefined | AnyString> | undefined
  insetY?: ConditionalValue<UtilityValues["insetBlock"] | CssVars | CssProperties["insetBlock"] | undefined | AnyString> | undefined
  insetStart?: ConditionalValue<UtilityValues["insetInlineStart"] | CssVars | CssProperties["insetInlineStart"] | undefined | AnyString> | undefined
  insetEnd?: ConditionalValue<UtilityValues["insetInlineEnd"] | CssVars | CssProperties["insetInlineEnd"] | undefined | AnyString> | undefined
  m?: ConditionalValue<UtilityValues["margin"] | CssVars | CssProperties["margin"] | undefined | AnyString> | undefined
  mt?: ConditionalValue<UtilityValues["marginTop"] | CssVars | CssProperties["marginTop"] | undefined | AnyString> | undefined
  mr?: ConditionalValue<UtilityValues["marginRight"] | CssVars | CssProperties["marginRight"] | undefined | AnyString> | undefined
  mb?: ConditionalValue<UtilityValues["marginBottom"] | CssVars | CssProperties["marginBottom"] | undefined | AnyString> | undefined
  ml?: ConditionalValue<UtilityValues["marginLeft"] | CssVars | CssProperties["marginLeft"] | undefined | AnyString> | undefined
  ms?: ConditionalValue<UtilityValues["marginInlineStart"] | CssVars | CssProperties["marginInlineStart"] | undefined | AnyString> | undefined
  marginStart?: ConditionalValue<UtilityValues["marginInlineStart"] | CssVars | CssProperties["marginInlineStart"] | undefined | AnyString> | undefined
  me?: ConditionalValue<UtilityValues["marginInlineEnd"] | CssVars | CssProperties["marginInlineEnd"] | undefined | AnyString> | undefined
  marginEnd?: ConditionalValue<UtilityValues["marginInlineEnd"] | CssVars | CssProperties["marginInlineEnd"] | undefined | AnyString> | undefined
  mx?: ConditionalValue<UtilityValues["marginInline"] | CssVars | CssProperties["marginInline"] | undefined | AnyString> | undefined
  marginX?: ConditionalValue<UtilityValues["marginInline"] | CssVars | CssProperties["marginInline"] | undefined | AnyString> | undefined
  my?: ConditionalValue<UtilityValues["marginBlock"] | CssVars | CssProperties["marginBlock"] | undefined | AnyString> | undefined
  marginY?: ConditionalValue<UtilityValues["marginBlock"] | CssVars | CssProperties["marginBlock"] | undefined | AnyString> | undefined
  p?: ConditionalValue<UtilityValues["padding"] | CssVars | CssProperties["padding"] | undefined | AnyString> | undefined
  pt?: ConditionalValue<UtilityValues["paddingTop"] | CssVars | CssProperties["paddingTop"] | undefined | AnyString> | undefined
  pr?: ConditionalValue<UtilityValues["paddingRight"] | CssVars | CssProperties["paddingRight"] | undefined | AnyString> | undefined
  pb?: ConditionalValue<UtilityValues["paddingBottom"] | CssVars | CssProperties["paddingBottom"] | undefined | AnyString> | undefined
  pl?: ConditionalValue<UtilityValues["paddingLeft"] | CssVars | CssProperties["paddingLeft"] | undefined | AnyString> | undefined
  ps?: ConditionalValue<UtilityValues["paddingInlineStart"] | CssVars | CssProperties["paddingInlineStart"] | undefined | AnyString> | undefined
  paddingStart?: ConditionalValue<UtilityValues["paddingInlineStart"] | CssVars | CssProperties["paddingInlineStart"] | undefined | AnyString> | undefined
  pe?: ConditionalValue<UtilityValues["paddingInlineEnd"] | CssVars | CssProperties["paddingInlineEnd"] | undefined | AnyString> | undefined
  paddingEnd?: ConditionalValue<UtilityValues["paddingInlineEnd"] | CssVars | CssProperties["paddingInlineEnd"] | undefined | AnyString> | undefined
  px?: ConditionalValue<UtilityValues["paddingInline"] | CssVars | CssProperties["paddingInline"] | undefined | AnyString> | undefined
  paddingX?: ConditionalValue<UtilityValues["paddingInline"] | CssVars | CssProperties["paddingInline"] | undefined | AnyString> | undefined
  py?: ConditionalValue<UtilityValues["paddingBlock"] | CssVars | CssProperties["paddingBlock"] | undefined | AnyString> | undefined
  paddingY?: ConditionalValue<UtilityValues["paddingBlock"] | CssVars | CssProperties["paddingBlock"] | undefined | AnyString> | undefined
  textDecor?: ConditionalValue<CssProperties["textDecoration"] | undefined | AnyString> | undefined
  backgroundGradient?: ConditionalValue<UtilityValues["backgroundGradient"] | CssVars | undefined | AnyString> | undefined
  gradientFrom?: ConditionalValue<UtilityValues["gradientFrom"] | CssVars | undefined | AnyString> | undefined
  gradientTo?: ConditionalValue<UtilityValues["gradientTo"] | CssVars | undefined | AnyString> | undefined
  gradientVia?: ConditionalValue<UtilityValues["gradientVia"] | CssVars | undefined | AnyString> | undefined
  borderInlineStartRadius?: ConditionalValue<UtilityValues["borderInlineStartRadius"] | CssVars | undefined | AnyString> | undefined
  borderInlineEndRadius?: ConditionalValue<UtilityValues["borderInlineEndRadius"] | CssVars | undefined | AnyString> | undefined
  borderTopRadius?: ConditionalValue<UtilityValues["borderTopRadius"] | CssVars | undefined | AnyString> | undefined
  borderBottomRadius?: ConditionalValue<UtilityValues["borderBottomRadius"] | CssVars | undefined | AnyString> | undefined
  borderLeftRadius?: ConditionalValue<UtilityValues["borderLeftRadius"] | CssVars | undefined | AnyString> | undefined
  borderRightRadius?: ConditionalValue<UtilityValues["borderRightRadius"] | CssVars | undefined | AnyString> | undefined
  divideX?: ConditionalValue<UtilityValues["divideX"] | CssVars | undefined | AnyString> | undefined
  divideY?: ConditionalValue<UtilityValues["divideY"] | CssVars | undefined | AnyString> | undefined
  divideColor?: ConditionalValue<UtilityValues["divideColor"] | CssVars | undefined | AnyString> | undefined
  divideStyle?: ConditionalValue<UtilityValues["divideStyle"] | CssVars | undefined | AnyString> | undefined
  boxShadowColor?: ConditionalValue<UtilityValues["boxShadowColor"] | CssVars | undefined | AnyString> | undefined
  blur?: ConditionalValue<UtilityValues["blur"] | CssVars | undefined | AnyString> | undefined
  brightness?: ConditionalValue<string | number | undefined | AnyString> | undefined
  contrast?: ConditionalValue<string | number | undefined | AnyString> | undefined
  grayscale?: ConditionalValue<string | number | undefined | AnyString> | undefined
  hueRotate?: ConditionalValue<string | number | undefined | AnyString> | undefined
  invert?: ConditionalValue<string | number | undefined | AnyString> | undefined
  saturate?: ConditionalValue<string | number | undefined | AnyString> | undefined
  sepia?: ConditionalValue<string | number | undefined | AnyString> | undefined
  dropShadow?: ConditionalValue<string | number | undefined | AnyString> | undefined
  backdropBlur?: ConditionalValue<UtilityValues["backdropBlur"] | CssVars | undefined | AnyString> | undefined
  backdropBrightness?: ConditionalValue<string | number | undefined | AnyString> | undefined
  backdropContrast?: ConditionalValue<string | number | undefined | AnyString> | undefined
  backdropGrayscale?: ConditionalValue<string | number | undefined | AnyString> | undefined
  backdropHueRotate?: ConditionalValue<string | number | undefined | AnyString> | undefined
  backdropInvert?: ConditionalValue<string | number | undefined | AnyString> | undefined
  backdropOpacity?: ConditionalValue<string | number | undefined | AnyString> | undefined
  backdropSaturate?: ConditionalValue<string | number | undefined | AnyString> | undefined
  backdropSepia?: ConditionalValue<string | number | undefined | AnyString> | undefined
  focusRing?: ConditionalValue<UtilityValues["focusRing"] | CssVars | undefined | AnyString> | undefined
  focusVisibleRing?: ConditionalValue<UtilityValues["focusVisibleRing"] | CssVars | undefined | AnyString> | undefined
  focusRingColor?: ConditionalValue<UtilityValues["focusRingColor"] | CssVars | undefined | AnyString> | undefined
  focusRingOffset?: ConditionalValue<UtilityValues["focusRingOffset"] | CssVars | undefined | AnyString> | undefined
  focusRingWidth?: ConditionalValue<UtilityValues["focusRingWidth"] | CssVars | undefined | AnyString> | undefined
  focusRingStyle?: ConditionalValue<UtilityValues["focusRingStyle"] | CssVars | undefined | AnyString> | undefined
  boxSize?: ConditionalValue<UtilityValues["boxSize"] | CssVars | undefined | AnyString> | undefined
  hideFrom?: ConditionalValue<UtilityValues["hideFrom"] | CssVars | undefined | AnyString> | undefined
  hideBelow?: ConditionalValue<UtilityValues["hideBelow"] | CssVars | undefined | AnyString> | undefined
  scrollbar?: ConditionalValue<UtilityValues["scrollbar"] | CssVars | undefined | AnyString> | undefined
  scrollMarginX?: ConditionalValue<UtilityValues["scrollMarginX"] | CssVars | undefined | AnyString> | undefined
  scrollMarginY?: ConditionalValue<UtilityValues["scrollMarginY"] | CssVars | undefined | AnyString> | undefined
  scrollSnapStrictness?: ConditionalValue<UtilityValues["scrollSnapStrictness"] | CssVars | undefined | AnyString> | undefined
  scrollSnapMargin?: ConditionalValue<UtilityValues["scrollSnapMargin"] | CssVars | undefined | AnyString> | undefined
  scrollSnapMarginTop?: ConditionalValue<UtilityValues["scrollSnapMarginTop"] | CssVars | undefined | AnyString> | undefined
  scrollSnapMarginBottom?: ConditionalValue<UtilityValues["scrollSnapMarginBottom"] | CssVars | undefined | AnyString> | undefined
  scrollSnapMarginLeft?: ConditionalValue<UtilityValues["scrollSnapMarginLeft"] | CssVars | undefined | AnyString> | undefined
  scrollSnapMarginRight?: ConditionalValue<UtilityValues["scrollSnapMarginRight"] | CssVars | undefined | AnyString> | undefined
  ring?: ConditionalValue<string | number | undefined | AnyString> | undefined
  ringColor?: ConditionalValue<UtilityValues["ringColor"] | CssVars | undefined | AnyString> | undefined
  ringOffset?: ConditionalValue<string | number | undefined | AnyString> | undefined
  ringOffsetColor?: ConditionalValue<UtilityValues["ringOffsetColor"] | CssVars | undefined | AnyString> | undefined
  ringInset?: ConditionalValue<string | number | undefined | AnyString> | undefined
  skewX?: ConditionalValue<string | number | undefined | AnyString> | undefined
  skewY?: ConditionalValue<string | number | undefined | AnyString> | undefined
  scaleX?: ConditionalValue<string | number | undefined | AnyString> | undefined
  scaleY?: ConditionalValue<string | number | undefined | AnyString> | undefined
  spaceXReverse?: ConditionalValue<UtilityValues["spaceXReverse"] | CssVars | undefined | AnyString> | undefined
  spaceX?: ConditionalValue<UtilityValues["spaceX"] | CssVars | undefined | AnyString> | undefined
  spaceYReverse?: ConditionalValue<UtilityValues["spaceYReverse"] | CssVars | undefined | AnyString> | undefined
  spaceY?: ConditionalValue<UtilityValues["spaceY"] | CssVars | undefined | AnyString> | undefined
  rotateX?: ConditionalValue<string | number | undefined | AnyString> | undefined
  rotateY?: ConditionalValue<string | number | undefined | AnyString> | undefined
  translateX?: ConditionalValue<UtilityValues["translateX"] | CssVars | undefined | AnyString> | undefined
  translateY?: ConditionalValue<UtilityValues["translateY"] | CssVars | undefined | AnyString> | undefined
  truncate?: ConditionalValue<UtilityValues["truncate"] | CssVars | undefined | AnyString> | undefined
  borderSpacingX?: ConditionalValue<UtilityValues["borderSpacingX"] | CssVars | undefined | AnyString> | undefined
  borderSpacingY?: ConditionalValue<UtilityValues["borderSpacingY"] | CssVars | undefined | AnyString> | undefined
  srOnly?: ConditionalValue<UtilityValues["srOnly"] | CssVars | undefined | AnyString> | undefined
  debug?: ConditionalValue<UtilityValues["debug"] | CssVars | undefined | AnyString> | undefined
  colorPalette?: ConditionalValue<UtilityValues["colorPalette"] | CssVars | undefined | AnyString> | undefined
  textStyle?: ConditionalValue<UtilityValues["textStyle"] | CssVars | undefined | AnyString> | undefined
  layerStyle?: ConditionalValue<UtilityValues["layerStyle"] | CssVars | undefined | AnyString> | undefined
  animationStyle?: ConditionalValue<UtilityValues["animationStyle"] | CssVars | undefined | AnyString> | undefined
}
