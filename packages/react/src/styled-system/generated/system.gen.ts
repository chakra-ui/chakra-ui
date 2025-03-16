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
  WebkitAppearance?: ConditionalValue<CssProperties["WebkitAppearance"] | AnyString>
  WebkitBorderBefore?: ConditionalValue<CssProperties["WebkitBorderBefore"] | AnyString>
  WebkitBorderBeforeColor?: ConditionalValue<CssProperties["WebkitBorderBeforeColor"] | AnyString>
  WebkitBorderBeforeStyle?: ConditionalValue<CssProperties["WebkitBorderBeforeStyle"] | AnyString>
  WebkitBorderBeforeWidth?: ConditionalValue<CssProperties["WebkitBorderBeforeWidth"] | AnyString>
  WebkitBoxReflect?: ConditionalValue<CssProperties["WebkitBoxReflect"] | AnyString>
  WebkitLineClamp?: ConditionalValue<CssProperties["WebkitLineClamp"] | AnyString>
  WebkitMask?: ConditionalValue<CssProperties["WebkitMask"] | AnyString>
  WebkitMaskAttachment?: ConditionalValue<CssProperties["WebkitMaskAttachment"] | AnyString>
  WebkitMaskClip?: ConditionalValue<CssProperties["WebkitMaskClip"] | AnyString>
  WebkitMaskComposite?: ConditionalValue<CssProperties["WebkitMaskComposite"] | AnyString>
  WebkitMaskImage?: ConditionalValue<CssProperties["WebkitMaskImage"] | AnyString>
  WebkitMaskOrigin?: ConditionalValue<CssProperties["WebkitMaskOrigin"] | AnyString>
  WebkitMaskPosition?: ConditionalValue<CssProperties["WebkitMaskPosition"] | AnyString>
  WebkitMaskPositionX?: ConditionalValue<CssProperties["WebkitMaskPositionX"] | AnyString>
  WebkitMaskPositionY?: ConditionalValue<CssProperties["WebkitMaskPositionY"] | AnyString>
  WebkitMaskRepeat?: ConditionalValue<CssProperties["WebkitMaskRepeat"] | AnyString>
  WebkitMaskRepeatX?: ConditionalValue<CssProperties["WebkitMaskRepeatX"] | AnyString>
  WebkitMaskRepeatY?: ConditionalValue<CssProperties["WebkitMaskRepeatY"] | AnyString>
  WebkitMaskSize?: ConditionalValue<CssProperties["WebkitMaskSize"] | AnyString>
  WebkitOverflowScrolling?: ConditionalValue<CssProperties["WebkitOverflowScrolling"] | AnyString>
  WebkitTapHighlightColor?: ConditionalValue<CssProperties["WebkitTapHighlightColor"] | AnyString>
  WebkitTextFillColor?: ConditionalValue<CssProperties["WebkitTextFillColor"] | AnyString>
  WebkitTextStroke?: ConditionalValue<CssProperties["WebkitTextStroke"] | AnyString>
  WebkitTextStrokeColor?: ConditionalValue<CssProperties["WebkitTextStrokeColor"] | AnyString>
  WebkitTextStrokeWidth?: ConditionalValue<CssProperties["WebkitTextStrokeWidth"] | AnyString>
  WebkitTouchCallout?: ConditionalValue<CssProperties["WebkitTouchCallout"] | AnyString>
  WebkitUserModify?: ConditionalValue<CssProperties["WebkitUserModify"] | AnyString>
  accentColor?: ConditionalValue<UtilityValues["accentColor"] | CssVars | CssProperties["accentColor"] | AnyString>
  alignContent?: ConditionalValue<CssProperties["alignContent"] | AnyString>
  alignItems?: ConditionalValue<CssProperties["alignItems"] | AnyString>
  alignSelf?: ConditionalValue<CssProperties["alignSelf"] | AnyString>
  alignTracks?: ConditionalValue<CssProperties["alignTracks"] | AnyString>
  all?: ConditionalValue<CssProperties["all"] | AnyString>
  animation?: ConditionalValue<UtilityValues["animation"] | CssVars | CssProperties["animation"] | AnyString>
  animationComposition?: ConditionalValue<CssProperties["animationComposition"] | AnyString>
  animationDelay?: ConditionalValue<UtilityValues["animationDelay"] | CssVars | CssProperties["animationDelay"] | AnyString>
  animationDirection?: ConditionalValue<CssProperties["animationDirection"] | AnyString>
  animationDuration?: ConditionalValue<UtilityValues["animationDuration"] | CssVars | CssProperties["animationDuration"] | AnyString>
  animationFillMode?: ConditionalValue<CssProperties["animationFillMode"] | AnyString>
  animationIterationCount?: ConditionalValue<CssProperties["animationIterationCount"] | AnyString>
  animationName?: ConditionalValue<UtilityValues["animationName"] | CssVars | CssProperties["animationName"] | AnyString>
  animationPlayState?: ConditionalValue<CssProperties["animationPlayState"] | AnyString>
  animationRange?: ConditionalValue<CssProperties["animationRange"] | AnyString>
  animationRangeEnd?: ConditionalValue<CssProperties["animationRangeEnd"] | AnyString>
  animationRangeStart?: ConditionalValue<CssProperties["animationRangeStart"] | AnyString>
  animationTimingFunction?: ConditionalValue<UtilityValues["animationTimingFunction"] | CssVars | CssProperties["animationTimingFunction"] | AnyString>
  animationTimeline?: ConditionalValue<CssProperties["animationTimeline"] | AnyString>
  appearance?: ConditionalValue<CssProperties["appearance"] | AnyString>
  aspectRatio?: ConditionalValue<UtilityValues["aspectRatio"] | CssVars | CssProperties["aspectRatio"] | AnyString>
  azimuth?: ConditionalValue<CssProperties["azimuth"] | AnyString>
  backdropFilter?: ConditionalValue<CssProperties["backdropFilter"] | AnyString>
  backfaceVisibility?: ConditionalValue<CssProperties["backfaceVisibility"] | AnyString>
  background?: ConditionalValue<UtilityValues["background"] | CssVars | CssProperties["background"] | AnyString>
  backgroundAttachment?: ConditionalValue<CssProperties["backgroundAttachment"] | AnyString>
  backgroundBlendMode?: ConditionalValue<CssProperties["backgroundBlendMode"] | AnyString>
  backgroundClip?: ConditionalValue<UtilityValues["backgroundClip"] | CssVars | CssProperties["backgroundClip"] | AnyString>
  backgroundColor?: ConditionalValue<UtilityValues["backgroundColor"] | CssVars | CssProperties["backgroundColor"] | AnyString>
  backgroundImage?: ConditionalValue<UtilityValues["backgroundImage"] | CssVars | CssProperties["backgroundImage"] | AnyString>
  backgroundOrigin?: ConditionalValue<CssProperties["backgroundOrigin"] | AnyString>
  backgroundPosition?: ConditionalValue<CssProperties["backgroundPosition"] | AnyString>
  backgroundPositionX?: ConditionalValue<CssProperties["backgroundPositionX"] | AnyString>
  backgroundPositionY?: ConditionalValue<CssProperties["backgroundPositionY"] | AnyString>
  backgroundRepeat?: ConditionalValue<CssProperties["backgroundRepeat"] | AnyString>
  backgroundSize?: ConditionalValue<CssProperties["backgroundSize"] | AnyString>
  blockSize?: ConditionalValue<UtilityValues["blockSize"] | CssVars | CssProperties["blockSize"] | AnyString>
  border?: ConditionalValue<UtilityValues["border"] | CssVars | CssProperties["border"] | AnyString>
  borderBlock?: ConditionalValue<UtilityValues["borderBlock"] | CssVars | CssProperties["borderBlock"] | AnyString>
  borderBlockColor?: ConditionalValue<CssProperties["borderBlockColor"] | AnyString>
  borderBlockStyle?: ConditionalValue<CssProperties["borderBlockStyle"] | AnyString>
  borderBlockWidth?: ConditionalValue<UtilityValues["borderBlockWidth"] | CssVars | CssProperties["borderBlockWidth"] | AnyString>
  borderBlockEnd?: ConditionalValue<UtilityValues["borderBlockEnd"] | CssVars | CssProperties["borderBlockEnd"] | AnyString>
  borderBlockEndColor?: ConditionalValue<UtilityValues["borderBlockEndColor"] | CssVars | CssProperties["borderBlockEndColor"] | AnyString>
  borderBlockEndStyle?: ConditionalValue<UtilityValues["borderBlockEndStyle"] | CssVars | CssProperties["borderBlockEndStyle"] | AnyString>
  borderBlockEndWidth?: ConditionalValue<UtilityValues["borderBlockEndWidth"] | CssVars | CssProperties["borderBlockEndWidth"] | AnyString>
  borderBlockStart?: ConditionalValue<UtilityValues["borderBlockStart"] | CssVars | CssProperties["borderBlockStart"] | AnyString>
  borderBlockStartColor?: ConditionalValue<UtilityValues["borderBlockStartColor"] | CssVars | CssProperties["borderBlockStartColor"] | AnyString>
  borderBlockStartStyle?: ConditionalValue<UtilityValues["borderBlockStartStyle"] | CssVars | CssProperties["borderBlockStartStyle"] | AnyString>
  borderBlockStartWidth?: ConditionalValue<UtilityValues["borderBlockStartWidth"] | CssVars | CssProperties["borderBlockStartWidth"] | AnyString>
  borderBottom?: ConditionalValue<UtilityValues["borderBottom"] | CssVars | CssProperties["borderBottom"] | AnyString>
  borderBottomColor?: ConditionalValue<UtilityValues["borderBottomColor"] | CssVars | CssProperties["borderBottomColor"] | AnyString>
  borderBottomLeftRadius?: ConditionalValue<UtilityValues["borderBottomLeftRadius"] | CssVars | CssProperties["borderBottomLeftRadius"] | AnyString>
  borderBottomRightRadius?: ConditionalValue<UtilityValues["borderBottomRightRadius"] | CssVars | CssProperties["borderBottomRightRadius"] | AnyString>
  borderBottomStyle?: ConditionalValue<UtilityValues["borderBottomStyle"] | CssVars | CssProperties["borderBottomStyle"] | AnyString>
  borderBottomWidth?: ConditionalValue<UtilityValues["borderBottomWidth"] | CssVars | CssProperties["borderBottomWidth"] | AnyString>
  borderCollapse?: ConditionalValue<CssProperties["borderCollapse"] | AnyString>
  borderColor?: ConditionalValue<UtilityValues["borderColor"] | CssVars | CssProperties["borderColor"] | AnyString>
  borderEndEndRadius?: ConditionalValue<UtilityValues["borderEndEndRadius"] | CssVars | CssProperties["borderEndEndRadius"] | AnyString>
  borderEndStartRadius?: ConditionalValue<UtilityValues["borderEndStartRadius"] | CssVars | CssProperties["borderEndStartRadius"] | AnyString>
  borderImage?: ConditionalValue<CssProperties["borderImage"] | AnyString>
  borderImageOutset?: ConditionalValue<CssProperties["borderImageOutset"] | AnyString>
  borderImageRepeat?: ConditionalValue<CssProperties["borderImageRepeat"] | AnyString>
  borderImageSlice?: ConditionalValue<CssProperties["borderImageSlice"] | AnyString>
  borderImageSource?: ConditionalValue<CssProperties["borderImageSource"] | AnyString>
  borderImageWidth?: ConditionalValue<CssProperties["borderImageWidth"] | AnyString>
  borderInline?: ConditionalValue<UtilityValues["borderInline"] | CssVars | CssProperties["borderInline"] | AnyString>
  borderInlineEnd?: ConditionalValue<UtilityValues["borderInlineEnd"] | CssVars | CssProperties["borderInlineEnd"] | AnyString>
  borderInlineColor?: ConditionalValue<CssProperties["borderInlineColor"] | AnyString>
  borderInlineStyle?: ConditionalValue<CssProperties["borderInlineStyle"] | AnyString>
  borderInlineWidth?: ConditionalValue<UtilityValues["borderInlineWidth"] | CssVars | CssProperties["borderInlineWidth"] | AnyString>
  borderInlineEndColor?: ConditionalValue<UtilityValues["borderInlineEndColor"] | CssVars | CssProperties["borderInlineEndColor"] | AnyString>
  borderInlineEndStyle?: ConditionalValue<UtilityValues["borderInlineEndStyle"] | CssVars | CssProperties["borderInlineEndStyle"] | AnyString>
  borderInlineEndWidth?: ConditionalValue<UtilityValues["borderInlineEndWidth"] | CssVars | CssProperties["borderInlineEndWidth"] | AnyString>
  borderInlineStart?: ConditionalValue<UtilityValues["borderInlineStart"] | CssVars | CssProperties["borderInlineStart"] | AnyString>
  borderInlineStartColor?: ConditionalValue<UtilityValues["borderInlineStartColor"] | CssVars | CssProperties["borderInlineStartColor"] | AnyString>
  borderInlineStartStyle?: ConditionalValue<UtilityValues["borderInlineStartStyle"] | CssVars | CssProperties["borderInlineStartStyle"] | AnyString>
  borderInlineStartWidth?: ConditionalValue<UtilityValues["borderInlineStartWidth"] | CssVars | CssProperties["borderInlineStartWidth"] | AnyString>
  borderLeft?: ConditionalValue<UtilityValues["borderLeft"] | CssVars | CssProperties["borderLeft"] | AnyString>
  borderLeftColor?: ConditionalValue<UtilityValues["borderLeftColor"] | CssVars | CssProperties["borderLeftColor"] | AnyString>
  borderLeftStyle?: ConditionalValue<UtilityValues["borderLeftStyle"] | CssVars | CssProperties["borderLeftStyle"] | AnyString>
  borderLeftWidth?: ConditionalValue<UtilityValues["borderLeftWidth"] | CssVars | CssProperties["borderLeftWidth"] | AnyString>
  borderRadius?: ConditionalValue<UtilityValues["borderRadius"] | CssVars | CssProperties["borderRadius"] | AnyString>
  borderRight?: ConditionalValue<UtilityValues["borderRight"] | CssVars | CssProperties["borderRight"] | AnyString>
  borderRightColor?: ConditionalValue<UtilityValues["borderRightColor"] | CssVars | CssProperties["borderRightColor"] | AnyString>
  borderRightStyle?: ConditionalValue<UtilityValues["borderRightStyle"] | CssVars | CssProperties["borderRightStyle"] | AnyString>
  borderRightWidth?: ConditionalValue<UtilityValues["borderRightWidth"] | CssVars | CssProperties["borderRightWidth"] | AnyString>
  borderSpacing?: ConditionalValue<CssProperties["borderSpacing"] | AnyString>
  borderStartEndRadius?: ConditionalValue<UtilityValues["borderStartEndRadius"] | CssVars | CssProperties["borderStartEndRadius"] | AnyString>
  borderStartStartRadius?: ConditionalValue<UtilityValues["borderStartStartRadius"] | CssVars | CssProperties["borderStartStartRadius"] | AnyString>
  borderStyle?: ConditionalValue<UtilityValues["borderStyle"] | CssVars | CssProperties["borderStyle"] | AnyString>
  borderTop?: ConditionalValue<UtilityValues["borderTop"] | CssVars | CssProperties["borderTop"] | AnyString>
  borderTopColor?: ConditionalValue<UtilityValues["borderTopColor"] | CssVars | CssProperties["borderTopColor"] | AnyString>
  borderTopLeftRadius?: ConditionalValue<UtilityValues["borderTopLeftRadius"] | CssVars | CssProperties["borderTopLeftRadius"] | AnyString>
  borderTopRightRadius?: ConditionalValue<UtilityValues["borderTopRightRadius"] | CssVars | CssProperties["borderTopRightRadius"] | AnyString>
  borderTopStyle?: ConditionalValue<UtilityValues["borderTopStyle"] | CssVars | CssProperties["borderTopStyle"] | AnyString>
  borderTopWidth?: ConditionalValue<UtilityValues["borderTopWidth"] | CssVars | CssProperties["borderTopWidth"] | AnyString>
  borderWidth?: ConditionalValue<UtilityValues["borderWidth"] | CssVars | CssProperties["borderWidth"] | AnyString>
  bottom?: ConditionalValue<UtilityValues["bottom"] | CssVars | CssProperties["bottom"] | AnyString>
  boxAlign?: ConditionalValue<CssProperties["boxAlign"] | AnyString>
  boxDecorationBreak?: ConditionalValue<CssProperties["boxDecorationBreak"] | AnyString>
  boxDirection?: ConditionalValue<CssProperties["boxDirection"] | AnyString>
  boxFlex?: ConditionalValue<CssProperties["boxFlex"] | AnyString>
  boxFlexGroup?: ConditionalValue<CssProperties["boxFlexGroup"] | AnyString>
  boxLines?: ConditionalValue<CssProperties["boxLines"] | AnyString>
  boxOrdinalGroup?: ConditionalValue<CssProperties["boxOrdinalGroup"] | AnyString>
  boxOrient?: ConditionalValue<CssProperties["boxOrient"] | AnyString>
  boxPack?: ConditionalValue<CssProperties["boxPack"] | AnyString>
  boxShadow?: ConditionalValue<UtilityValues["boxShadow"] | CssVars | CssProperties["boxShadow"] | AnyString>
  boxSizing?: ConditionalValue<CssProperties["boxSizing"] | AnyString>
  breakAfter?: ConditionalValue<CssProperties["breakAfter"] | AnyString>
  breakBefore?: ConditionalValue<CssProperties["breakBefore"] | AnyString>
  breakInside?: ConditionalValue<CssProperties["breakInside"] | AnyString>
  captionSide?: ConditionalValue<CssProperties["captionSide"] | AnyString>
  caret?: ConditionalValue<CssProperties["caret"] | AnyString>
  caretColor?: ConditionalValue<UtilityValues["caretColor"] | CssVars | CssProperties["caretColor"] | AnyString>
  caretShape?: ConditionalValue<CssProperties["caretShape"] | AnyString>
  clear?: ConditionalValue<CssProperties["clear"] | AnyString>
  clip?: ConditionalValue<CssProperties["clip"] | AnyString>
  clipPath?: ConditionalValue<CssProperties["clipPath"] | AnyString>
  color?: ConditionalValue<UtilityValues["color"] | CssVars | CssProperties["color"] | AnyString>
  colorScheme?: ConditionalValue<CssProperties["colorScheme"] | AnyString>
  columnCount?: ConditionalValue<CssProperties["columnCount"] | AnyString>
  columnFill?: ConditionalValue<CssProperties["columnFill"] | AnyString>
  columnGap?: ConditionalValue<UtilityValues["columnGap"] | CssVars | CssProperties["columnGap"] | AnyString>
  columnRule?: ConditionalValue<CssProperties["columnRule"] | AnyString>
  columnRuleColor?: ConditionalValue<CssProperties["columnRuleColor"] | AnyString>
  columnRuleStyle?: ConditionalValue<CssProperties["columnRuleStyle"] | AnyString>
  columnRuleWidth?: ConditionalValue<CssProperties["columnRuleWidth"] | AnyString>
  columnSpan?: ConditionalValue<CssProperties["columnSpan"] | AnyString>
  columnWidth?: ConditionalValue<CssProperties["columnWidth"] | AnyString>
  columns?: ConditionalValue<CssProperties["columns"] | AnyString>
  contain?: ConditionalValue<CssProperties["contain"] | AnyString>
  containIntrinsicSize?: ConditionalValue<CssProperties["containIntrinsicSize"] | AnyString>
  containIntrinsicBlockSize?: ConditionalValue<CssProperties["containIntrinsicBlockSize"] | AnyString>
  containIntrinsicHeight?: ConditionalValue<CssProperties["containIntrinsicHeight"] | AnyString>
  containIntrinsicInlineSize?: ConditionalValue<CssProperties["containIntrinsicInlineSize"] | AnyString>
  containIntrinsicWidth?: ConditionalValue<CssProperties["containIntrinsicWidth"] | AnyString>
  container?: ConditionalValue<CssProperties["container"] | AnyString>
  containerName?: ConditionalValue<CssProperties["containerName"] | AnyString>
  containerType?: ConditionalValue<CssProperties["containerType"] | AnyString>
  content?: ConditionalValue<CssProperties["content"] | AnyString>
  contentVisibility?: ConditionalValue<CssProperties["contentVisibility"] | AnyString>
  counterIncrement?: ConditionalValue<CssProperties["counterIncrement"] | AnyString>
  counterReset?: ConditionalValue<CssProperties["counterReset"] | AnyString>
  counterSet?: ConditionalValue<CssProperties["counterSet"] | AnyString>
  cursor?: ConditionalValue<UtilityValues["cursor"] | CssVars | CssProperties["cursor"] | AnyString>
  direction?: ConditionalValue<CssProperties["direction"] | AnyString>
  display?: ConditionalValue<CssProperties["display"] | AnyString>
  emptyCells?: ConditionalValue<CssProperties["emptyCells"] | AnyString>
  filter?: ConditionalValue<CssProperties["filter"] | AnyString>
  flex?: ConditionalValue<CssProperties["flex"] | AnyString>
  flexBasis?: ConditionalValue<UtilityValues["flexBasis"] | CssVars | CssProperties["flexBasis"] | AnyString>
  flexDirection?: ConditionalValue<CssProperties["flexDirection"] | AnyString>
  flexFlow?: ConditionalValue<CssProperties["flexFlow"] | AnyString>
  flexGrow?: ConditionalValue<CssProperties["flexGrow"] | AnyString>
  flexShrink?: ConditionalValue<CssProperties["flexShrink"] | AnyString>
  flexWrap?: ConditionalValue<CssProperties["flexWrap"] | AnyString>
  float?: ConditionalValue<CssProperties["float"] | AnyString>
  font?: ConditionalValue<CssProperties["font"] | AnyString>
  fontFamily?: ConditionalValue<UtilityValues["fontFamily"] | CssVars | CssProperties["fontFamily"] | AnyString>
  fontFeatureSettings?: ConditionalValue<CssProperties["fontFeatureSettings"] | AnyString>
  fontKerning?: ConditionalValue<CssProperties["fontKerning"] | AnyString>
  fontLanguageOverride?: ConditionalValue<CssProperties["fontLanguageOverride"] | AnyString>
  fontOpticalSizing?: ConditionalValue<CssProperties["fontOpticalSizing"] | AnyString>
  fontPalette?: ConditionalValue<CssProperties["fontPalette"] | AnyString>
  fontVariationSettings?: ConditionalValue<CssProperties["fontVariationSettings"] | AnyString>
  fontSize?: ConditionalValue<UtilityValues["fontSize"] | CssVars | CssProperties["fontSize"] | AnyString>
  fontSizeAdjust?: ConditionalValue<CssProperties["fontSizeAdjust"] | AnyString>
  fontSmooth?: ConditionalValue<CssProperties["fontSmooth"] | AnyString>
  fontStretch?: ConditionalValue<CssProperties["fontStretch"] | AnyString>
  fontStyle?: ConditionalValue<CssProperties["fontStyle"] | AnyString>
  fontSynthesis?: ConditionalValue<CssProperties["fontSynthesis"] | AnyString>
  fontSynthesisPosition?: ConditionalValue<CssProperties["fontSynthesisPosition"] | AnyString>
  fontSynthesisSmallCaps?: ConditionalValue<CssProperties["fontSynthesisSmallCaps"] | AnyString>
  fontSynthesisStyle?: ConditionalValue<CssProperties["fontSynthesisStyle"] | AnyString>
  fontSynthesisWeight?: ConditionalValue<CssProperties["fontSynthesisWeight"] | AnyString>
  fontVariant?: ConditionalValue<CssProperties["fontVariant"] | AnyString>
  fontVariantAlternates?: ConditionalValue<CssProperties["fontVariantAlternates"] | AnyString>
  fontVariantCaps?: ConditionalValue<CssProperties["fontVariantCaps"] | AnyString>
  fontVariantEastAsian?: ConditionalValue<CssProperties["fontVariantEastAsian"] | AnyString>
  fontVariantEmoji?: ConditionalValue<CssProperties["fontVariantEmoji"] | AnyString>
  fontVariantLigatures?: ConditionalValue<CssProperties["fontVariantLigatures"] | AnyString>
  fontVariantNumeric?: ConditionalValue<CssProperties["fontVariantNumeric"] | AnyString>
  fontVariantPosition?: ConditionalValue<CssProperties["fontVariantPosition"] | AnyString>
  fontWeight?: ConditionalValue<UtilityValues["fontWeight"] | CssVars | CssProperties["fontWeight"] | AnyString>
  forcedColorAdjust?: ConditionalValue<CssProperties["forcedColorAdjust"] | AnyString>
  gap?: ConditionalValue<UtilityValues["gap"] | CssVars | CssProperties["gap"] | AnyString>
  grid?: ConditionalValue<CssProperties["grid"] | AnyString>
  gridArea?: ConditionalValue<CssProperties["gridArea"] | AnyString>
  gridAutoColumns?: ConditionalValue<CssProperties["gridAutoColumns"] | AnyString>
  gridAutoFlow?: ConditionalValue<CssProperties["gridAutoFlow"] | AnyString>
  gridAutoRows?: ConditionalValue<CssProperties["gridAutoRows"] | AnyString>
  gridColumn?: ConditionalValue<CssProperties["gridColumn"] | AnyString>
  gridColumnEnd?: ConditionalValue<CssProperties["gridColumnEnd"] | AnyString>
  gridColumnGap?: ConditionalValue<UtilityValues["gridColumnGap"] | CssVars | CssProperties["gridColumnGap"] | AnyString>
  gridColumnStart?: ConditionalValue<CssProperties["gridColumnStart"] | AnyString>
  gridGap?: ConditionalValue<UtilityValues["gridGap"] | CssVars | CssProperties["gridGap"] | AnyString>
  gridRow?: ConditionalValue<CssProperties["gridRow"] | AnyString>
  gridRowEnd?: ConditionalValue<CssProperties["gridRowEnd"] | AnyString>
  gridRowGap?: ConditionalValue<UtilityValues["gridRowGap"] | CssVars | CssProperties["gridRowGap"] | AnyString>
  gridRowStart?: ConditionalValue<CssProperties["gridRowStart"] | AnyString>
  gridTemplate?: ConditionalValue<CssProperties["gridTemplate"] | AnyString>
  gridTemplateAreas?: ConditionalValue<CssProperties["gridTemplateAreas"] | AnyString>
  gridTemplateColumns?: ConditionalValue<CssProperties["gridTemplateColumns"] | AnyString>
  gridTemplateRows?: ConditionalValue<CssProperties["gridTemplateRows"] | AnyString>
  hangingPunctuation?: ConditionalValue<CssProperties["hangingPunctuation"] | AnyString>
  height?: ConditionalValue<UtilityValues["height"] | CssVars | CssProperties["height"] | AnyString>
  hyphenateCharacter?: ConditionalValue<CssProperties["hyphenateCharacter"] | AnyString>
  hyphenateLimitChars?: ConditionalValue<CssProperties["hyphenateLimitChars"] | AnyString>
  hyphens?: ConditionalValue<CssProperties["hyphens"] | AnyString>
  imageOrientation?: ConditionalValue<CssProperties["imageOrientation"] | AnyString>
  imageRendering?: ConditionalValue<CssProperties["imageRendering"] | AnyString>
  imageResolution?: ConditionalValue<CssProperties["imageResolution"] | AnyString>
  imeMode?: ConditionalValue<CssProperties["imeMode"] | AnyString>
  initialLetter?: ConditionalValue<CssProperties["initialLetter"] | AnyString>
  initialLetterAlign?: ConditionalValue<CssProperties["initialLetterAlign"] | AnyString>
  inlineSize?: ConditionalValue<UtilityValues["inlineSize"] | CssVars | CssProperties["inlineSize"] | AnyString>
  inputSecurity?: ConditionalValue<CssProperties["inputSecurity"] | AnyString>
  inset?: ConditionalValue<UtilityValues["inset"] | CssVars | CssProperties["inset"] | AnyString>
  insetBlock?: ConditionalValue<UtilityValues["insetBlock"] | CssVars | CssProperties["insetBlock"] | AnyString>
  insetBlockEnd?: ConditionalValue<UtilityValues["insetBlockEnd"] | CssVars | CssProperties["insetBlockEnd"] | AnyString>
  insetBlockStart?: ConditionalValue<UtilityValues["insetBlockStart"] | CssVars | CssProperties["insetBlockStart"] | AnyString>
  insetInline?: ConditionalValue<UtilityValues["insetInline"] | CssVars | CssProperties["insetInline"] | AnyString>
  insetInlineEnd?: ConditionalValue<UtilityValues["insetInlineEnd"] | CssVars | CssProperties["insetInlineEnd"] | AnyString>
  insetInlineStart?: ConditionalValue<UtilityValues["insetInlineStart"] | CssVars | CssProperties["insetInlineStart"] | AnyString>
  isolation?: ConditionalValue<CssProperties["isolation"] | AnyString>
  justifyContent?: ConditionalValue<CssProperties["justifyContent"] | AnyString>
  justifyItems?: ConditionalValue<CssProperties["justifyItems"] | AnyString>
  justifySelf?: ConditionalValue<CssProperties["justifySelf"] | AnyString>
  justifyTracks?: ConditionalValue<CssProperties["justifyTracks"] | AnyString>
  left?: ConditionalValue<UtilityValues["left"] | CssVars | CssProperties["left"] | AnyString>
  letterSpacing?: ConditionalValue<UtilityValues["letterSpacing"] | CssVars | CssProperties["letterSpacing"] | AnyString>
  lineBreak?: ConditionalValue<CssProperties["lineBreak"] | AnyString>
  lineClamp?: ConditionalValue<CssProperties["lineClamp"] | AnyString>
  lineHeight?: ConditionalValue<UtilityValues["lineHeight"] | CssVars | CssProperties["lineHeight"] | AnyString>
  lineHeightStep?: ConditionalValue<CssProperties["lineHeightStep"] | AnyString>
  listStyle?: ConditionalValue<CssProperties["listStyle"] | AnyString>
  listStyleImage?: ConditionalValue<UtilityValues["listStyleImage"] | CssVars | CssProperties["listStyleImage"] | AnyString>
  listStylePosition?: ConditionalValue<CssProperties["listStylePosition"] | AnyString>
  listStyleType?: ConditionalValue<CssProperties["listStyleType"] | AnyString>
  margin?: ConditionalValue<UtilityValues["margin"] | CssVars | CssProperties["margin"] | AnyString>
  marginBlock?: ConditionalValue<UtilityValues["marginBlock"] | CssVars | CssProperties["marginBlock"] | AnyString>
  marginBlockEnd?: ConditionalValue<UtilityValues["marginBlockEnd"] | CssVars | CssProperties["marginBlockEnd"] | AnyString>
  marginBlockStart?: ConditionalValue<UtilityValues["marginBlockStart"] | CssVars | CssProperties["marginBlockStart"] | AnyString>
  marginBottom?: ConditionalValue<UtilityValues["marginBottom"] | CssVars | CssProperties["marginBottom"] | AnyString>
  marginInline?: ConditionalValue<UtilityValues["marginInline"] | CssVars | CssProperties["marginInline"] | AnyString>
  marginInlineEnd?: ConditionalValue<UtilityValues["marginInlineEnd"] | CssVars | CssProperties["marginInlineEnd"] | AnyString>
  marginInlineStart?: ConditionalValue<UtilityValues["marginInlineStart"] | CssVars | CssProperties["marginInlineStart"] | AnyString>
  marginLeft?: ConditionalValue<UtilityValues["marginLeft"] | CssVars | CssProperties["marginLeft"] | AnyString>
  marginRight?: ConditionalValue<UtilityValues["marginRight"] | CssVars | CssProperties["marginRight"] | AnyString>
  marginTop?: ConditionalValue<UtilityValues["marginTop"] | CssVars | CssProperties["marginTop"] | AnyString>
  marginTrim?: ConditionalValue<CssProperties["marginTrim"] | AnyString>
  mask?: ConditionalValue<CssProperties["mask"] | AnyString>
  maskBorder?: ConditionalValue<CssProperties["maskBorder"] | AnyString>
  maskBorderMode?: ConditionalValue<CssProperties["maskBorderMode"] | AnyString>
  maskBorderOutset?: ConditionalValue<CssProperties["maskBorderOutset"] | AnyString>
  maskBorderRepeat?: ConditionalValue<CssProperties["maskBorderRepeat"] | AnyString>
  maskBorderSlice?: ConditionalValue<CssProperties["maskBorderSlice"] | AnyString>
  maskBorderSource?: ConditionalValue<CssProperties["maskBorderSource"] | AnyString>
  maskBorderWidth?: ConditionalValue<CssProperties["maskBorderWidth"] | AnyString>
  maskClip?: ConditionalValue<CssProperties["maskClip"] | AnyString>
  maskComposite?: ConditionalValue<CssProperties["maskComposite"] | AnyString>
  maskImage?: ConditionalValue<CssProperties["maskImage"] | AnyString>
  maskMode?: ConditionalValue<CssProperties["maskMode"] | AnyString>
  maskOrigin?: ConditionalValue<CssProperties["maskOrigin"] | AnyString>
  maskPosition?: ConditionalValue<CssProperties["maskPosition"] | AnyString>
  maskRepeat?: ConditionalValue<CssProperties["maskRepeat"] | AnyString>
  maskSize?: ConditionalValue<CssProperties["maskSize"] | AnyString>
  maskType?: ConditionalValue<CssProperties["maskType"] | AnyString>
  masonryAutoFlow?: ConditionalValue<CssProperties["masonryAutoFlow"] | AnyString>
  mathDepth?: ConditionalValue<CssProperties["mathDepth"] | AnyString>
  mathShift?: ConditionalValue<CssProperties["mathShift"] | AnyString>
  mathStyle?: ConditionalValue<CssProperties["mathStyle"] | AnyString>
  maxBlockSize?: ConditionalValue<UtilityValues["maxBlockSize"] | CssVars | CssProperties["maxBlockSize"] | AnyString>
  maxHeight?: ConditionalValue<UtilityValues["maxHeight"] | CssVars | CssProperties["maxHeight"] | AnyString>
  maxInlineSize?: ConditionalValue<UtilityValues["maxInlineSize"] | CssVars | CssProperties["maxInlineSize"] | AnyString>
  maxLines?: ConditionalValue<CssProperties["maxLines"] | AnyString>
  maxWidth?: ConditionalValue<UtilityValues["maxWidth"] | CssVars | CssProperties["maxWidth"] | AnyString>
  minBlockSize?: ConditionalValue<UtilityValues["minBlockSize"] | CssVars | CssProperties["minBlockSize"] | AnyString>
  minHeight?: ConditionalValue<UtilityValues["minHeight"] | CssVars | CssProperties["minHeight"] | AnyString>
  minInlineSize?: ConditionalValue<UtilityValues["minInlineSize"] | CssVars | CssProperties["minInlineSize"] | AnyString>
  minWidth?: ConditionalValue<UtilityValues["minWidth"] | CssVars | CssProperties["minWidth"] | AnyString>
  mixBlendMode?: ConditionalValue<CssProperties["mixBlendMode"] | AnyString>
  objectFit?: ConditionalValue<CssProperties["objectFit"] | AnyString>
  objectPosition?: ConditionalValue<CssProperties["objectPosition"] | AnyString>
  offset?: ConditionalValue<CssProperties["offset"] | AnyString>
  offsetAnchor?: ConditionalValue<CssProperties["offsetAnchor"] | AnyString>
  offsetDistance?: ConditionalValue<CssProperties["offsetDistance"] | AnyString>
  offsetPath?: ConditionalValue<CssProperties["offsetPath"] | AnyString>
  offsetPosition?: ConditionalValue<CssProperties["offsetPosition"] | AnyString>
  offsetRotate?: ConditionalValue<CssProperties["offsetRotate"] | AnyString>
  opacity?: ConditionalValue<UtilityValues["opacity"] | CssVars | CssProperties["opacity"] | AnyString>
  order?: ConditionalValue<CssProperties["order"] | AnyString>
  orphans?: ConditionalValue<CssProperties["orphans"] | AnyString>
  outline?: ConditionalValue<CssProperties["outline"] | AnyString>
  outlineColor?: ConditionalValue<UtilityValues["outlineColor"] | CssVars | CssProperties["outlineColor"] | AnyString>
  outlineOffset?: ConditionalValue<CssProperties["outlineOffset"] | AnyString>
  outlineStyle?: ConditionalValue<CssProperties["outlineStyle"] | AnyString>
  outlineWidth?: ConditionalValue<CssProperties["outlineWidth"] | AnyString>
  overflow?: ConditionalValue<CssProperties["overflow"] | AnyString>
  overflowAnchor?: ConditionalValue<CssProperties["overflowAnchor"] | AnyString>
  overflowBlock?: ConditionalValue<CssProperties["overflowBlock"] | AnyString>
  overflowClipBox?: ConditionalValue<CssProperties["overflowClipBox"] | AnyString>
  overflowClipMargin?: ConditionalValue<CssProperties["overflowClipMargin"] | AnyString>
  overflowInline?: ConditionalValue<CssProperties["overflowInline"] | AnyString>
  overflowWrap?: ConditionalValue<CssProperties["overflowWrap"] | AnyString>
  overflowX?: ConditionalValue<CssProperties["overflowX"] | AnyString>
  overflowY?: ConditionalValue<CssProperties["overflowY"] | AnyString>
  overlay?: ConditionalValue<CssProperties["overlay"] | AnyString>
  overscrollBehavior?: ConditionalValue<CssProperties["overscrollBehavior"] | AnyString>
  overscrollBehaviorBlock?: ConditionalValue<CssProperties["overscrollBehaviorBlock"] | AnyString>
  overscrollBehaviorInline?: ConditionalValue<CssProperties["overscrollBehaviorInline"] | AnyString>
  overscrollBehaviorX?: ConditionalValue<CssProperties["overscrollBehaviorX"] | AnyString>
  overscrollBehaviorY?: ConditionalValue<CssProperties["overscrollBehaviorY"] | AnyString>
  padding?: ConditionalValue<UtilityValues["padding"] | CssVars | CssProperties["padding"] | AnyString>
  paddingBlock?: ConditionalValue<UtilityValues["paddingBlock"] | CssVars | CssProperties["paddingBlock"] | AnyString>
  paddingBlockEnd?: ConditionalValue<UtilityValues["paddingBlockEnd"] | CssVars | CssProperties["paddingBlockEnd"] | AnyString>
  paddingBlockStart?: ConditionalValue<UtilityValues["paddingBlockStart"] | CssVars | CssProperties["paddingBlockStart"] | AnyString>
  paddingBottom?: ConditionalValue<UtilityValues["paddingBottom"] | CssVars | CssProperties["paddingBottom"] | AnyString>
  paddingInline?: ConditionalValue<UtilityValues["paddingInline"] | CssVars | CssProperties["paddingInline"] | AnyString>
  paddingInlineEnd?: ConditionalValue<UtilityValues["paddingInlineEnd"] | CssVars | CssProperties["paddingInlineEnd"] | AnyString>
  paddingInlineStart?: ConditionalValue<UtilityValues["paddingInlineStart"] | CssVars | CssProperties["paddingInlineStart"] | AnyString>
  paddingLeft?: ConditionalValue<UtilityValues["paddingLeft"] | CssVars | CssProperties["paddingLeft"] | AnyString>
  paddingRight?: ConditionalValue<UtilityValues["paddingRight"] | CssVars | CssProperties["paddingRight"] | AnyString>
  paddingTop?: ConditionalValue<UtilityValues["paddingTop"] | CssVars | CssProperties["paddingTop"] | AnyString>
  page?: ConditionalValue<CssProperties["page"] | AnyString>
  pageBreakAfter?: ConditionalValue<CssProperties["pageBreakAfter"] | AnyString>
  pageBreakBefore?: ConditionalValue<CssProperties["pageBreakBefore"] | AnyString>
  pageBreakInside?: ConditionalValue<CssProperties["pageBreakInside"] | AnyString>
  paintOrder?: ConditionalValue<CssProperties["paintOrder"] | AnyString>
  perspective?: ConditionalValue<CssProperties["perspective"] | AnyString>
  perspectiveOrigin?: ConditionalValue<CssProperties["perspectiveOrigin"] | AnyString>
  placeContent?: ConditionalValue<CssProperties["placeContent"] | AnyString>
  placeItems?: ConditionalValue<CssProperties["placeItems"] | AnyString>
  placeSelf?: ConditionalValue<CssProperties["placeSelf"] | AnyString>
  pointerEvents?: ConditionalValue<CssProperties["pointerEvents"] | AnyString>
  position?: ConditionalValue<CssProperties["position"] | AnyString>
  printColorAdjust?: ConditionalValue<CssProperties["printColorAdjust"] | AnyString>
  quotes?: ConditionalValue<CssProperties["quotes"] | AnyString>
  resize?: ConditionalValue<CssProperties["resize"] | AnyString>
  right?: ConditionalValue<UtilityValues["right"] | CssVars | CssProperties["right"] | AnyString>
  rotate?: ConditionalValue<CssProperties["rotate"] | AnyString>
  rowGap?: ConditionalValue<UtilityValues["rowGap"] | CssVars | CssProperties["rowGap"] | AnyString>
  rubyAlign?: ConditionalValue<CssProperties["rubyAlign"] | AnyString>
  rubyMerge?: ConditionalValue<CssProperties["rubyMerge"] | AnyString>
  rubyPosition?: ConditionalValue<CssProperties["rubyPosition"] | AnyString>
  scale?: ConditionalValue<CssProperties["scale"] | AnyString>
  scrollbarColor?: ConditionalValue<UtilityValues["scrollbarColor"] | CssVars | CssProperties["scrollbarColor"] | AnyString>
  scrollbarGutter?: ConditionalValue<UtilityValues["scrollbarGutter"] | CssVars | CssProperties["scrollbarGutter"] | AnyString>
  scrollbarWidth?: ConditionalValue<UtilityValues["scrollbarWidth"] | CssVars | CssProperties["scrollbarWidth"] | AnyString>
  scrollBehavior?: ConditionalValue<CssProperties["scrollBehavior"] | AnyString>
  scrollMargin?: ConditionalValue<UtilityValues["scrollMargin"] | CssVars | CssProperties["scrollMargin"] | AnyString>
  scrollMarginBlock?: ConditionalValue<CssProperties["scrollMarginBlock"] | AnyString>
  scrollMarginBlockStart?: ConditionalValue<CssProperties["scrollMarginBlockStart"] | AnyString>
  scrollMarginBlockEnd?: ConditionalValue<CssProperties["scrollMarginBlockEnd"] | AnyString>
  scrollMarginBottom?: ConditionalValue<UtilityValues["scrollMarginBottom"] | CssVars | CssProperties["scrollMarginBottom"] | AnyString>
  scrollMarginInline?: ConditionalValue<CssProperties["scrollMarginInline"] | AnyString>
  scrollMarginInlineStart?: ConditionalValue<CssProperties["scrollMarginInlineStart"] | AnyString>
  scrollMarginInlineEnd?: ConditionalValue<CssProperties["scrollMarginInlineEnd"] | AnyString>
  scrollMarginLeft?: ConditionalValue<UtilityValues["scrollMarginLeft"] | CssVars | CssProperties["scrollMarginLeft"] | AnyString>
  scrollMarginRight?: ConditionalValue<UtilityValues["scrollMarginRight"] | CssVars | CssProperties["scrollMarginRight"] | AnyString>
  scrollMarginTop?: ConditionalValue<UtilityValues["scrollMarginTop"] | CssVars | CssProperties["scrollMarginTop"] | AnyString>
  scrollPadding?: ConditionalValue<UtilityValues["scrollPadding"] | CssVars | CssProperties["scrollPadding"] | AnyString>
  scrollPaddingBlock?: ConditionalValue<UtilityValues["scrollPaddingBlock"] | CssVars | CssProperties["scrollPaddingBlock"] | AnyString>
  scrollPaddingBlockStart?: ConditionalValue<CssProperties["scrollPaddingBlockStart"] | AnyString>
  scrollPaddingBlockEnd?: ConditionalValue<CssProperties["scrollPaddingBlockEnd"] | AnyString>
  scrollPaddingBottom?: ConditionalValue<UtilityValues["scrollPaddingBottom"] | CssVars | CssProperties["scrollPaddingBottom"] | AnyString>
  scrollPaddingInline?: ConditionalValue<UtilityValues["scrollPaddingInline"] | CssVars | CssProperties["scrollPaddingInline"] | AnyString>
  scrollPaddingInlineStart?: ConditionalValue<CssProperties["scrollPaddingInlineStart"] | AnyString>
  scrollPaddingInlineEnd?: ConditionalValue<CssProperties["scrollPaddingInlineEnd"] | AnyString>
  scrollPaddingLeft?: ConditionalValue<UtilityValues["scrollPaddingLeft"] | CssVars | CssProperties["scrollPaddingLeft"] | AnyString>
  scrollPaddingRight?: ConditionalValue<UtilityValues["scrollPaddingRight"] | CssVars | CssProperties["scrollPaddingRight"] | AnyString>
  scrollPaddingTop?: ConditionalValue<UtilityValues["scrollPaddingTop"] | CssVars | CssProperties["scrollPaddingTop"] | AnyString>
  scrollSnapAlign?: ConditionalValue<CssProperties["scrollSnapAlign"] | AnyString>
  scrollSnapCoordinate?: ConditionalValue<CssProperties["scrollSnapCoordinate"] | AnyString>
  scrollSnapDestination?: ConditionalValue<CssProperties["scrollSnapDestination"] | AnyString>
  scrollSnapPointsX?: ConditionalValue<CssProperties["scrollSnapPointsX"] | AnyString>
  scrollSnapPointsY?: ConditionalValue<CssProperties["scrollSnapPointsY"] | AnyString>
  scrollSnapStop?: ConditionalValue<CssProperties["scrollSnapStop"] | AnyString>
  scrollSnapType?: ConditionalValue<UtilityValues["scrollSnapType"] | CssVars | CssProperties["scrollSnapType"] | AnyString>
  scrollSnapTypeX?: ConditionalValue<CssProperties["scrollSnapTypeX"] | AnyString>
  scrollSnapTypeY?: ConditionalValue<CssProperties["scrollSnapTypeY"] | AnyString>
  scrollTimeline?: ConditionalValue<CssProperties["scrollTimeline"] | AnyString>
  scrollTimelineAxis?: ConditionalValue<CssProperties["scrollTimelineAxis"] | AnyString>
  scrollTimelineName?: ConditionalValue<CssProperties["scrollTimelineName"] | AnyString>
  shapeImageThreshold?: ConditionalValue<CssProperties["shapeImageThreshold"] | AnyString>
  shapeMargin?: ConditionalValue<CssProperties["shapeMargin"] | AnyString>
  shapeOutside?: ConditionalValue<CssProperties["shapeOutside"] | AnyString>
  tabSize?: ConditionalValue<CssProperties["tabSize"] | AnyString>
  tableLayout?: ConditionalValue<CssProperties["tableLayout"] | AnyString>
  textAlign?: ConditionalValue<CssProperties["textAlign"] | AnyString>
  textAlignLast?: ConditionalValue<CssProperties["textAlignLast"] | AnyString>
  textCombineUpright?: ConditionalValue<CssProperties["textCombineUpright"] | AnyString>
  textDecoration?: ConditionalValue<CssProperties["textDecoration"] | AnyString>
  textDecorationColor?: ConditionalValue<UtilityValues["textDecorationColor"] | CssVars | CssProperties["textDecorationColor"] | AnyString>
  textDecorationLine?: ConditionalValue<CssProperties["textDecorationLine"] | AnyString>
  textDecorationSkip?: ConditionalValue<CssProperties["textDecorationSkip"] | AnyString>
  textDecorationSkipInk?: ConditionalValue<CssProperties["textDecorationSkipInk"] | AnyString>
  textDecorationStyle?: ConditionalValue<CssProperties["textDecorationStyle"] | AnyString>
  textDecorationThickness?: ConditionalValue<CssProperties["textDecorationThickness"] | AnyString>
  textEmphasis?: ConditionalValue<CssProperties["textEmphasis"] | AnyString>
  textEmphasisColor?: ConditionalValue<CssProperties["textEmphasisColor"] | AnyString>
  textEmphasisPosition?: ConditionalValue<CssProperties["textEmphasisPosition"] | AnyString>
  textEmphasisStyle?: ConditionalValue<CssProperties["textEmphasisStyle"] | AnyString>
  textIndent?: ConditionalValue<UtilityValues["textIndent"] | CssVars | CssProperties["textIndent"] | AnyString>
  textJustify?: ConditionalValue<CssProperties["textJustify"] | AnyString>
  textOrientation?: ConditionalValue<CssProperties["textOrientation"] | AnyString>
  textOverflow?: ConditionalValue<CssProperties["textOverflow"] | AnyString>
  textRendering?: ConditionalValue<CssProperties["textRendering"] | AnyString>
  textShadow?: ConditionalValue<UtilityValues["textShadow"] | CssVars | CssProperties["textShadow"] | AnyString>
  textSizeAdjust?: ConditionalValue<CssProperties["textSizeAdjust"] | AnyString>
  textTransform?: ConditionalValue<CssProperties["textTransform"] | AnyString>
  textUnderlineOffset?: ConditionalValue<CssProperties["textUnderlineOffset"] | AnyString>
  textUnderlinePosition?: ConditionalValue<CssProperties["textUnderlinePosition"] | AnyString>
  textWrap?: ConditionalValue<CssProperties["textWrap"] | AnyString>
  timelineScope?: ConditionalValue<CssProperties["timelineScope"] | AnyString>
  top?: ConditionalValue<UtilityValues["top"] | CssVars | CssProperties["top"] | AnyString>
  touchAction?: ConditionalValue<CssProperties["touchAction"] | AnyString>
  transform?: ConditionalValue<CssProperties["transform"] | AnyString>
  transformBox?: ConditionalValue<CssProperties["transformBox"] | AnyString>
  transformOrigin?: ConditionalValue<CssProperties["transformOrigin"] | AnyString>
  transformStyle?: ConditionalValue<CssProperties["transformStyle"] | AnyString>
  transition?: ConditionalValue<UtilityValues["transition"] | CssVars | CssProperties["transition"] | AnyString>
  transitionBehavior?: ConditionalValue<CssProperties["transitionBehavior"] | AnyString>
  transitionDelay?: ConditionalValue<CssProperties["transitionDelay"] | AnyString>
  transitionDuration?: ConditionalValue<UtilityValues["transitionDuration"] | CssVars | CssProperties["transitionDuration"] | AnyString>
  transitionProperty?: ConditionalValue<UtilityValues["transitionProperty"] | CssVars | CssProperties["transitionProperty"] | AnyString>
  transitionTimingFunction?: ConditionalValue<UtilityValues["transitionTimingFunction"] | CssVars | CssProperties["transitionTimingFunction"] | AnyString>
  translate?: ConditionalValue<CssProperties["translate"] | AnyString>
  unicodeBidi?: ConditionalValue<CssProperties["unicodeBidi"] | AnyString>
  userSelect?: ConditionalValue<CssProperties["userSelect"] | AnyString>
  verticalAlign?: ConditionalValue<CssProperties["verticalAlign"] | AnyString>
  viewTimeline?: ConditionalValue<CssProperties["viewTimeline"] | AnyString>
  viewTimelineAxis?: ConditionalValue<CssProperties["viewTimelineAxis"] | AnyString>
  viewTimelineInset?: ConditionalValue<CssProperties["viewTimelineInset"] | AnyString>
  viewTimelineName?: ConditionalValue<CssProperties["viewTimelineName"] | AnyString>
  viewTransitionName?: ConditionalValue<CssProperties["viewTransitionName"] | AnyString>
  visibility?: ConditionalValue<CssProperties["visibility"] | AnyString>
  whiteSpace?: ConditionalValue<CssProperties["whiteSpace"] | AnyString>
  whiteSpaceCollapse?: ConditionalValue<CssProperties["whiteSpaceCollapse"] | AnyString>
  widows?: ConditionalValue<CssProperties["widows"] | AnyString>
  width?: ConditionalValue<UtilityValues["width"] | CssVars | CssProperties["width"] | AnyString>
  willChange?: ConditionalValue<CssProperties["willChange"] | AnyString>
  wordBreak?: ConditionalValue<CssProperties["wordBreak"] | AnyString>
  wordSpacing?: ConditionalValue<CssProperties["wordSpacing"] | AnyString>
  wordWrap?: ConditionalValue<CssProperties["wordWrap"] | AnyString>
  writingMode?: ConditionalValue<CssProperties["writingMode"] | AnyString>
  zIndex?: ConditionalValue<UtilityValues["zIndex"] | CssVars | CssProperties["zIndex"] | AnyString>
  zoom?: ConditionalValue<CssProperties["zoom"] | AnyString>
  alignmentBaseline?: ConditionalValue<CssProperties["alignmentBaseline"] | AnyString>
  baselineShift?: ConditionalValue<CssProperties["baselineShift"] | AnyString>
  clipRule?: ConditionalValue<CssProperties["clipRule"] | AnyString>
  colorInterpolation?: ConditionalValue<CssProperties["colorInterpolation"] | AnyString>
  colorRendering?: ConditionalValue<CssProperties["colorRendering"] | AnyString>
  dominantBaseline?: ConditionalValue<CssProperties["dominantBaseline"] | AnyString>
  fill?: ConditionalValue<UtilityValues["fill"] | CssVars | CssProperties["fill"] | AnyString>
  fillOpacity?: ConditionalValue<CssProperties["fillOpacity"] | AnyString>
  fillRule?: ConditionalValue<CssProperties["fillRule"] | AnyString>
  floodColor?: ConditionalValue<CssProperties["floodColor"] | AnyString>
  floodOpacity?: ConditionalValue<CssProperties["floodOpacity"] | AnyString>
  glyphOrientationVertical?: ConditionalValue<CssProperties["glyphOrientationVertical"] | AnyString>
  lightingColor?: ConditionalValue<CssProperties["lightingColor"] | AnyString>
  marker?: ConditionalValue<CssProperties["marker"] | AnyString>
  markerEnd?: ConditionalValue<CssProperties["markerEnd"] | AnyString>
  markerMid?: ConditionalValue<CssProperties["markerMid"] | AnyString>
  markerStart?: ConditionalValue<CssProperties["markerStart"] | AnyString>
  shapeRendering?: ConditionalValue<CssProperties["shapeRendering"] | AnyString>
  stopColor?: ConditionalValue<CssProperties["stopColor"] | AnyString>
  stopOpacity?: ConditionalValue<CssProperties["stopOpacity"] | AnyString>
  stroke?: ConditionalValue<UtilityValues["stroke"] | CssVars | CssProperties["stroke"] | AnyString>
  strokeDasharray?: ConditionalValue<CssProperties["strokeDasharray"] | AnyString>
  strokeDashoffset?: ConditionalValue<CssProperties["strokeDashoffset"] | AnyString>
  strokeLinecap?: ConditionalValue<CssProperties["strokeLinecap"] | AnyString>
  strokeLinejoin?: ConditionalValue<CssProperties["strokeLinejoin"] | AnyString>
  strokeMiterlimit?: ConditionalValue<CssProperties["strokeMiterlimit"] | AnyString>
  strokeOpacity?: ConditionalValue<CssProperties["strokeOpacity"] | AnyString>
  strokeWidth?: ConditionalValue<CssProperties["strokeWidth"] | AnyString>
  textAnchor?: ConditionalValue<CssProperties["textAnchor"] | AnyString>
  vectorEffect?: ConditionalValue<CssProperties["vectorEffect"] | AnyString>
  bg?: ConditionalValue<UtilityValues["background"] | CssVars | CssProperties["background"] | AnyString>
  bgColor?: ConditionalValue<UtilityValues["backgroundColor"] | CssVars | CssProperties["backgroundColor"] | AnyString>
  bgSize?: ConditionalValue<CssProperties["backgroundSize"] | AnyString>
  bgPos?: ConditionalValue<CssProperties["backgroundPosition"] | AnyString>
  bgRepeat?: ConditionalValue<CssProperties["backgroundRepeat"] | AnyString>
  bgAttachment?: ConditionalValue<CssProperties["backgroundAttachment"] | AnyString>
  bgClip?: ConditionalValue<UtilityValues["backgroundClip"] | CssVars | CssProperties["backgroundClip"] | AnyString>
  bgGradient?: ConditionalValue<UtilityValues["backgroundGradient"] | CssVars | AnyString>
  bgImg?: ConditionalValue<UtilityValues["backgroundImage"] | CssVars | CssProperties["backgroundImage"] | AnyString>
  bgImage?: ConditionalValue<UtilityValues["backgroundImage"] | CssVars | CssProperties["backgroundImage"] | AnyString>
  borderStart?: ConditionalValue<UtilityValues["borderInlineStart"] | CssVars | CssProperties["borderInlineStart"] | AnyString>
  borderX?: ConditionalValue<UtilityValues["borderInline"] | CssVars | CssProperties["borderInline"] | AnyString>
  borderY?: ConditionalValue<UtilityValues["borderBlock"] | CssVars | CssProperties["borderBlock"] | AnyString>
  borderStartColor?: ConditionalValue<UtilityValues["borderInlineStartColor"] | CssVars | CssProperties["borderInlineStartColor"] | AnyString>
  borderEndColor?: ConditionalValue<UtilityValues["borderInlineEndColor"] | CssVars | CssProperties["borderInlineEndColor"] | AnyString>
  borderStartStyle?: ConditionalValue<UtilityValues["borderInlineStartStyle"] | CssVars | CssProperties["borderInlineStartStyle"] | AnyString>
  borderEndStyle?: ConditionalValue<UtilityValues["borderInlineEndStyle"] | CssVars | CssProperties["borderInlineEndStyle"] | AnyString>
  rounded?: ConditionalValue<UtilityValues["borderRadius"] | CssVars | CssProperties["borderRadius"] | AnyString>
  roundedTopLeft?: ConditionalValue<UtilityValues["borderTopLeftRadius"] | CssVars | CssProperties["borderTopLeftRadius"] | AnyString>
  roundedStartStart?: ConditionalValue<UtilityValues["borderStartStartRadius"] | CssVars | CssProperties["borderStartStartRadius"] | AnyString>
  borderTopStartRadius?: ConditionalValue<UtilityValues["borderStartStartRadius"] | CssVars | CssProperties["borderStartStartRadius"] | AnyString>
  roundedEndStart?: ConditionalValue<UtilityValues["borderEndStartRadius"] | CssVars | CssProperties["borderEndStartRadius"] | AnyString>
  borderBottomStartRadius?: ConditionalValue<UtilityValues["borderEndStartRadius"] | CssVars | CssProperties["borderEndStartRadius"] | AnyString>
  roundedTopRight?: ConditionalValue<UtilityValues["borderTopRightRadius"] | CssVars | CssProperties["borderTopRightRadius"] | AnyString>
  roundedStartEnd?: ConditionalValue<UtilityValues["borderStartEndRadius"] | CssVars | CssProperties["borderStartEndRadius"] | AnyString>
  borderTopEndRadius?: ConditionalValue<UtilityValues["borderStartEndRadius"] | CssVars | CssProperties["borderStartEndRadius"] | AnyString>
  roundedEndEnd?: ConditionalValue<UtilityValues["borderEndEndRadius"] | CssVars | CssProperties["borderEndEndRadius"] | AnyString>
  borderBottomEndRadius?: ConditionalValue<UtilityValues["borderEndEndRadius"] | CssVars | CssProperties["borderEndEndRadius"] | AnyString>
  roundedBottomLeft?: ConditionalValue<UtilityValues["borderBottomLeftRadius"] | CssVars | CssProperties["borderBottomLeftRadius"] | AnyString>
  roundedBottomRight?: ConditionalValue<UtilityValues["borderBottomRightRadius"] | CssVars | CssProperties["borderBottomRightRadius"] | AnyString>
  roundedStart?: ConditionalValue<UtilityValues["borderInlineStartRadius"] | CssVars | AnyString>
  borderStartRadius?: ConditionalValue<UtilityValues["borderInlineStartRadius"] | CssVars | AnyString>
  roundedEnd?: ConditionalValue<UtilityValues["borderInlineEndRadius"] | CssVars | AnyString>
  borderEndRadius?: ConditionalValue<UtilityValues["borderInlineEndRadius"] | CssVars | AnyString>
  roundedTop?: ConditionalValue<UtilityValues["borderTopRadius"] | CssVars | AnyString>
  roundedBottom?: ConditionalValue<UtilityValues["borderBottomRadius"] | CssVars | AnyString>
  roundedLeft?: ConditionalValue<UtilityValues["borderLeftRadius"] | CssVars | AnyString>
  roundedRight?: ConditionalValue<UtilityValues["borderRightRadius"] | CssVars | AnyString>
  borderXWidth?: ConditionalValue<UtilityValues["borderInlineWidth"] | CssVars | CssProperties["borderInlineWidth"] | AnyString>
  borderStartWidth?: ConditionalValue<UtilityValues["borderInlineStartWidth"] | CssVars | CssProperties["borderInlineStartWidth"] | AnyString>
  borderEndWidth?: ConditionalValue<UtilityValues["borderInlineEndWidth"] | CssVars | CssProperties["borderInlineEndWidth"] | AnyString>
  borderYWidth?: ConditionalValue<UtilityValues["borderBlockWidth"] | CssVars | CssProperties["borderBlockWidth"] | AnyString>
  shadow?: ConditionalValue<UtilityValues["boxShadow"] | CssVars | CssProperties["boxShadow"] | AnyString>
  shadowColor?: ConditionalValue<UtilityValues["boxShadowColor"] | CssVars | AnyString>
  blendMode?: ConditionalValue<CssProperties["mixBlendMode"] | AnyString>
  bgBlendMode?: ConditionalValue<CssProperties["backgroundBlendMode"] | AnyString>
  gapY?: ConditionalValue<UtilityValues["rowGap"] | CssVars | CssProperties["rowGap"] | AnyString>
  gapX?: ConditionalValue<UtilityValues["columnGap"] | CssVars | CssProperties["columnGap"] | AnyString>
  flexDir?: ConditionalValue<CssProperties["flexDirection"] | AnyString>
  w?: ConditionalValue<UtilityValues["width"] | CssVars | CssProperties["width"] | AnyString>
  h?: ConditionalValue<UtilityValues["height"] | CssVars | CssProperties["height"] | AnyString>
  minW?: ConditionalValue<UtilityValues["minWidth"] | CssVars | CssProperties["minWidth"] | AnyString>
  minH?: ConditionalValue<UtilityValues["minHeight"] | CssVars | CssProperties["minHeight"] | AnyString>
  maxW?: ConditionalValue<UtilityValues["maxWidth"] | CssVars | CssProperties["maxWidth"] | AnyString>
  maxH?: ConditionalValue<UtilityValues["maxHeight"] | CssVars | CssProperties["maxHeight"] | AnyString>
  overscroll?: ConditionalValue<CssProperties["overscrollBehavior"] | AnyString>
  overscrollX?: ConditionalValue<CssProperties["overscrollBehaviorX"] | AnyString>
  overscrollY?: ConditionalValue<CssProperties["overscrollBehaviorY"] | AnyString>
  scrollPaddingX?: ConditionalValue<UtilityValues["scrollPaddingInline"] | CssVars | CssProperties["scrollPaddingInline"] | AnyString>
  scrollPaddingY?: ConditionalValue<UtilityValues["scrollPaddingBlock"] | CssVars | CssProperties["scrollPaddingBlock"] | AnyString>
  listStylePos?: ConditionalValue<CssProperties["listStylePosition"] | AnyString>
  listStyleImg?: ConditionalValue<UtilityValues["listStyleImage"] | CssVars | CssProperties["listStyleImage"] | AnyString>
  pos?: ConditionalValue<CssProperties["position"] | AnyString>
  insetX?: ConditionalValue<UtilityValues["insetInline"] | CssVars | CssProperties["insetInline"] | AnyString>
  insetY?: ConditionalValue<UtilityValues["insetBlock"] | CssVars | CssProperties["insetBlock"] | AnyString>
  insetStart?: ConditionalValue<UtilityValues["insetInlineStart"] | CssVars | CssProperties["insetInlineStart"] | AnyString>
  insetEnd?: ConditionalValue<UtilityValues["insetInlineEnd"] | CssVars | CssProperties["insetInlineEnd"] | AnyString>
  m?: ConditionalValue<UtilityValues["margin"] | CssVars | CssProperties["margin"] | AnyString>
  mt?: ConditionalValue<UtilityValues["marginTop"] | CssVars | CssProperties["marginTop"] | AnyString>
  mr?: ConditionalValue<UtilityValues["marginRight"] | CssVars | CssProperties["marginRight"] | AnyString>
  mb?: ConditionalValue<UtilityValues["marginBottom"] | CssVars | CssProperties["marginBottom"] | AnyString>
  ml?: ConditionalValue<UtilityValues["marginLeft"] | CssVars | CssProperties["marginLeft"] | AnyString>
  ms?: ConditionalValue<UtilityValues["marginInlineStart"] | CssVars | CssProperties["marginInlineStart"] | AnyString>
  marginStart?: ConditionalValue<UtilityValues["marginInlineStart"] | CssVars | CssProperties["marginInlineStart"] | AnyString>
  me?: ConditionalValue<UtilityValues["marginInlineEnd"] | CssVars | CssProperties["marginInlineEnd"] | AnyString>
  marginEnd?: ConditionalValue<UtilityValues["marginInlineEnd"] | CssVars | CssProperties["marginInlineEnd"] | AnyString>
  mx?: ConditionalValue<UtilityValues["marginInline"] | CssVars | CssProperties["marginInline"] | AnyString>
  marginX?: ConditionalValue<UtilityValues["marginInline"] | CssVars | CssProperties["marginInline"] | AnyString>
  my?: ConditionalValue<UtilityValues["marginBlock"] | CssVars | CssProperties["marginBlock"] | AnyString>
  marginY?: ConditionalValue<UtilityValues["marginBlock"] | CssVars | CssProperties["marginBlock"] | AnyString>
  p?: ConditionalValue<UtilityValues["padding"] | CssVars | CssProperties["padding"] | AnyString>
  pt?: ConditionalValue<UtilityValues["paddingTop"] | CssVars | CssProperties["paddingTop"] | AnyString>
  pr?: ConditionalValue<UtilityValues["paddingRight"] | CssVars | CssProperties["paddingRight"] | AnyString>
  pb?: ConditionalValue<UtilityValues["paddingBottom"] | CssVars | CssProperties["paddingBottom"] | AnyString>
  pl?: ConditionalValue<UtilityValues["paddingLeft"] | CssVars | CssProperties["paddingLeft"] | AnyString>
  ps?: ConditionalValue<UtilityValues["paddingInlineStart"] | CssVars | CssProperties["paddingInlineStart"] | AnyString>
  paddingStart?: ConditionalValue<UtilityValues["paddingInlineStart"] | CssVars | CssProperties["paddingInlineStart"] | AnyString>
  pe?: ConditionalValue<UtilityValues["paddingInlineEnd"] | CssVars | CssProperties["paddingInlineEnd"] | AnyString>
  paddingEnd?: ConditionalValue<UtilityValues["paddingInlineEnd"] | CssVars | CssProperties["paddingInlineEnd"] | AnyString>
  px?: ConditionalValue<UtilityValues["paddingInline"] | CssVars | CssProperties["paddingInline"] | AnyString>
  paddingX?: ConditionalValue<UtilityValues["paddingInline"] | CssVars | CssProperties["paddingInline"] | AnyString>
  py?: ConditionalValue<UtilityValues["paddingBlock"] | CssVars | CssProperties["paddingBlock"] | AnyString>
  paddingY?: ConditionalValue<UtilityValues["paddingBlock"] | CssVars | CssProperties["paddingBlock"] | AnyString>
  textDecor?: ConditionalValue<CssProperties["textDecoration"] | AnyString>
  backgroundGradient?: ConditionalValue<UtilityValues["backgroundGradient"] | CssVars | AnyString>
  gradientFrom?: ConditionalValue<UtilityValues["gradientFrom"] | CssVars | AnyString>
  gradientTo?: ConditionalValue<UtilityValues["gradientTo"] | CssVars | AnyString>
  gradientVia?: ConditionalValue<UtilityValues["gradientVia"] | CssVars | AnyString>
  borderInlineStartRadius?: ConditionalValue<UtilityValues["borderInlineStartRadius"] | CssVars | AnyString>
  borderInlineEndRadius?: ConditionalValue<UtilityValues["borderInlineEndRadius"] | CssVars | AnyString>
  borderTopRadius?: ConditionalValue<UtilityValues["borderTopRadius"] | CssVars | AnyString>
  borderBottomRadius?: ConditionalValue<UtilityValues["borderBottomRadius"] | CssVars | AnyString>
  borderLeftRadius?: ConditionalValue<UtilityValues["borderLeftRadius"] | CssVars | AnyString>
  borderRightRadius?: ConditionalValue<UtilityValues["borderRightRadius"] | CssVars | AnyString>
  divideX?: ConditionalValue<UtilityValues["divideX"] | CssVars | AnyString>
  divideY?: ConditionalValue<UtilityValues["divideY"] | CssVars | AnyString>
  divideColor?: ConditionalValue<UtilityValues["divideColor"] | CssVars | AnyString>
  divideStyle?: ConditionalValue<UtilityValues["divideStyle"] | CssVars | AnyString>
  boxShadowColor?: ConditionalValue<UtilityValues["boxShadowColor"] | CssVars | AnyString>
  blur?: ConditionalValue<UtilityValues["blur"] | CssVars | AnyString>
  brightness?: ConditionalValue<string | number | AnyString>
  contrast?: ConditionalValue<string | number | AnyString>
  grayscale?: ConditionalValue<string | number | AnyString>
  hueRotate?: ConditionalValue<string | number | AnyString>
  invert?: ConditionalValue<string | number | AnyString>
  saturate?: ConditionalValue<string | number | AnyString>
  sepia?: ConditionalValue<string | number | AnyString>
  dropShadow?: ConditionalValue<string | number | AnyString>
  backdropBlur?: ConditionalValue<UtilityValues["backdropBlur"] | CssVars | AnyString>
  backdropBrightness?: ConditionalValue<string | number | AnyString>
  backdropContrast?: ConditionalValue<string | number | AnyString>
  backdropGrayscale?: ConditionalValue<string | number | AnyString>
  backdropHueRotate?: ConditionalValue<string | number | AnyString>
  backdropInvert?: ConditionalValue<string | number | AnyString>
  backdropOpacity?: ConditionalValue<string | number | AnyString>
  backdropSaturate?: ConditionalValue<string | number | AnyString>
  backdropSepia?: ConditionalValue<string | number | AnyString>
  focusRing?: ConditionalValue<UtilityValues["focusRing"] | CssVars | AnyString>
  focusVisibleRing?: ConditionalValue<UtilityValues["focusVisibleRing"] | CssVars | AnyString>
  focusRingColor?: ConditionalValue<UtilityValues["focusRingColor"] | CssVars | AnyString>
  focusRingOffset?: ConditionalValue<UtilityValues["focusRingOffset"] | CssVars | AnyString>
  focusRingWidth?: ConditionalValue<UtilityValues["focusRingWidth"] | CssVars | AnyString>
  focusRingStyle?: ConditionalValue<UtilityValues["focusRingStyle"] | CssVars | AnyString>
  boxSize?: ConditionalValue<UtilityValues["boxSize"] | CssVars | AnyString>
  hideFrom?: ConditionalValue<UtilityValues["hideFrom"] | CssVars | AnyString>
  hideBelow?: ConditionalValue<UtilityValues["hideBelow"] | CssVars | AnyString>
  scrollbar?: ConditionalValue<UtilityValues["scrollbar"] | CssVars | AnyString>
  scrollMarginX?: ConditionalValue<UtilityValues["scrollMarginX"] | CssVars | AnyString>
  scrollMarginY?: ConditionalValue<UtilityValues["scrollMarginY"] | CssVars | AnyString>
  scrollSnapStrictness?: ConditionalValue<UtilityValues["scrollSnapStrictness"] | CssVars | AnyString>
  scrollSnapMargin?: ConditionalValue<UtilityValues["scrollSnapMargin"] | CssVars | AnyString>
  scrollSnapMarginTop?: ConditionalValue<UtilityValues["scrollSnapMarginTop"] | CssVars | AnyString>
  scrollSnapMarginBottom?: ConditionalValue<UtilityValues["scrollSnapMarginBottom"] | CssVars | AnyString>
  scrollSnapMarginLeft?: ConditionalValue<UtilityValues["scrollSnapMarginLeft"] | CssVars | AnyString>
  scrollSnapMarginRight?: ConditionalValue<UtilityValues["scrollSnapMarginRight"] | CssVars | AnyString>
  ring?: ConditionalValue<string | number | AnyString>
  ringColor?: ConditionalValue<UtilityValues["ringColor"] | CssVars | AnyString>
  ringOffset?: ConditionalValue<string | number | AnyString>
  ringOffsetColor?: ConditionalValue<UtilityValues["ringOffsetColor"] | CssVars | AnyString>
  ringInset?: ConditionalValue<string | number | AnyString>
  skewX?: ConditionalValue<string | number | AnyString>
  skewY?: ConditionalValue<string | number | AnyString>
  scaleX?: ConditionalValue<string | number | AnyString>
  scaleY?: ConditionalValue<string | number | AnyString>
  spaceXReverse?: ConditionalValue<UtilityValues["spaceXReverse"] | CssVars | AnyString>
  spaceX?: ConditionalValue<UtilityValues["spaceX"] | CssVars | AnyString>
  spaceYReverse?: ConditionalValue<UtilityValues["spaceYReverse"] | CssVars | AnyString>
  spaceY?: ConditionalValue<UtilityValues["spaceY"] | CssVars | AnyString>
  rotateX?: ConditionalValue<string | number | AnyString>
  rotateY?: ConditionalValue<string | number | AnyString>
  translateX?: ConditionalValue<UtilityValues["translateX"] | CssVars | AnyString>
  translateY?: ConditionalValue<UtilityValues["translateY"] | CssVars | AnyString>
  truncate?: ConditionalValue<UtilityValues["truncate"] | CssVars | AnyString>
  srOnly?: ConditionalValue<UtilityValues["srOnly"] | CssVars | AnyString>
  debug?: ConditionalValue<UtilityValues["debug"] | CssVars | AnyString>
  colorPalette?: ConditionalValue<UtilityValues["colorPalette"] | CssVars | AnyString>
  textStyle?: ConditionalValue<UtilityValues["textStyle"] | CssVars | AnyString>
  layerStyle?: ConditionalValue<UtilityValues["layerStyle"] | CssVars | AnyString>
  animationStyle?: ConditionalValue<UtilityValues["animationStyle"] | CssVars | AnyString>
}
