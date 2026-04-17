/* eslint-disable */
import type { Token } from "../tokens/index"
import type { ConditionalValue } from "./conditions"
import type { OnlyKnown, UtilityValues, WithEscapeHatch } from "./prop-type"
import type { CssProperties } from "./system-types"

type AnyString = string & {}
type CssVars = `var(--${string})`
type CssVarValue = ConditionalValue<Token | AnyString | (number & {})>

type CssVarKeys = `--${string}` & {}

export type CssVarProperties = {
  [key in CssVarKeys]?: CssVarValue
}

export interface SystemProperties {
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button`
   *
   * **Initial value**: `none` (but this value is overridden in the user agent CSS)
   */
  WebkitAppearance?: ConditionalValue<
    CssProperties["WebkitAppearance"] | AnyString
  >
  /**
   * The **`-webkit-border-before`** CSS property is a shorthand property for setting the individual logical block start border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-width'> || <'border-style'> || <color>`
   */
  WebkitBorderBefore?: ConditionalValue<
    CssProperties["WebkitBorderBefore"] | AnyString
  >
  /**
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitBorderBeforeColor?: ConditionalValue<
    CssProperties["WebkitBorderBeforeColor"] | AnyString
  >
  /**
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   */
  WebkitBorderBeforeStyle?: ConditionalValue<
    CssProperties["WebkitBorderBeforeStyle"] | AnyString
  >
  /**
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   */
  WebkitBorderBeforeWidth?: ConditionalValue<
    CssProperties["WebkitBorderBeforeWidth"] | AnyString
  >
  /**
   * The **`-webkit-box-reflect`** CSS property lets you reflect the content of an element in one specific direction.
   *
   * **Syntax**: `[ above | below | right | left ]? <length>? <image>?`
   *
   * **Initial value**: `none`
   */
  WebkitBoxReflect?: ConditionalValue<
    CssProperties["WebkitBoxReflect"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   */
  WebkitLineClamp?: ConditionalValue<
    CssProperties["WebkitLineClamp"] | AnyString
  >
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <visual-box> | border | padding | content | text ] || [ <visual-box> | border | padding | content ] ]#`
   */
  WebkitMask?: ConditionalValue<CssProperties["WebkitMask"] | AnyString>
  /**
   * **Syntax**: `<attachment>#`
   *
   * **Initial value**: `scroll`
   */
  WebkitMaskAttachment?: ConditionalValue<
    CssProperties["WebkitMaskAttachment"] | AnyString
  >
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <coord-box> | no-clip | border | padding | content | text ]#`
   *
   * **Initial value**: `border`
   */
  WebkitMaskClip?: ConditionalValue<CssProperties["WebkitMaskClip"] | AnyString>
  /**
   * The **`-webkit-mask-composite`** property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the `-webkit-mask-image` property.
   *
   * **Syntax**: `<composite-style>#`
   *
   * **Initial value**: `source-over`
   */
  WebkitMaskComposite?: ConditionalValue<
    CssProperties["WebkitMaskComposite"] | AnyString
  >
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<mask-reference>#`
   *
   * **Initial value**: `none`
   */
  WebkitMaskImage?: ConditionalValue<
    CssProperties["WebkitMaskImage"] | AnyString
  >
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <coord-box> | border | padding | content ]#`
   *
   * **Initial value**: `padding`
   */
  WebkitMaskOrigin?: ConditionalValue<
    CssProperties["WebkitMaskOrigin"] | AnyString
  >
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<position>#`
   *
   * **Initial value**: `0% 0%`
   */
  WebkitMaskPosition?: ConditionalValue<
    CssProperties["WebkitMaskPosition"] | AnyString
  >
  /**
   * The `-webkit-mask-position-x` CSS property sets the initial horizontal position of a mask image.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right ]#`
   *
   * **Initial value**: `0%`
   */
  WebkitMaskPositionX?: ConditionalValue<
    CssProperties["WebkitMaskPositionX"] | AnyString
  >
  /**
   * The `-webkit-mask-position-y` CSS property sets the initial vertical position of a mask image.
   *
   * **Syntax**: `[ <length-percentage> | top | center | bottom ]#`
   *
   * **Initial value**: `0%`
   */
  WebkitMaskPositionY?: ConditionalValue<
    CssProperties["WebkitMaskPositionY"] | AnyString
  >
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   */
  WebkitMaskRepeat?: ConditionalValue<
    CssProperties["WebkitMaskRepeat"] | AnyString
  >
  /**
   * The `-webkit-mask-repeat-x` property specifies whether and how a mask image is repeated (tiled) horizontally.
   *
   * **Syntax**: `repeat | no-repeat | space | round`
   *
   * **Initial value**: `repeat`
   */
  WebkitMaskRepeatX?: ConditionalValue<
    CssProperties["WebkitMaskRepeatX"] | AnyString
  >
  /**
   * The `-webkit-mask-repeat-y` property sets whether and how a mask image is repeated (tiled) vertically.
   *
   * **Syntax**: `repeat | no-repeat | space | round`
   *
   * **Initial value**: `repeat`
   */
  WebkitMaskRepeatY?: ConditionalValue<
    CssProperties["WebkitMaskRepeatY"] | AnyString
  >
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   */
  WebkitMaskSize?: ConditionalValue<CssProperties["WebkitMaskSize"] | AnyString>
  /**
   * **Syntax**: `auto | touch`
   *
   * **Initial value**: `auto`
   */
  WebkitOverflowScrolling?: ConditionalValue<
    CssProperties["WebkitOverflowScrolling"] | AnyString
  >
  /**
   * **`-webkit-tap-highlight-color`** is a non-standard CSS property that sets the color of the highlight that appears over a link while it's being tapped. The highlighting indicates to the user that their tap is being successfully recognized, and indicates which element they're tapping on.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `black`
   */
  WebkitTapHighlightColor?: ConditionalValue<
    CssProperties["WebkitTapHighlightColor"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextFillColor?: ConditionalValue<
    | UtilityValues["WebkitTextFillColor"]
    | CssVars
    | CssProperties["WebkitTextFillColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length> || <color>`
   */
  WebkitTextStroke?: ConditionalValue<
    CssProperties["WebkitTextStroke"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   */
  WebkitTextStrokeColor?: ConditionalValue<
    CssProperties["WebkitTextStrokeColor"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  WebkitTextStrokeWidth?: ConditionalValue<
    CssProperties["WebkitTextStrokeWidth"] | AnyString
  >
  /**
   * The `-webkit-touch-callout` CSS property controls the display of the default callout shown when you touch and hold a touch target.
   *
   * **Syntax**: `default | none`
   *
   * **Initial value**: `default`
   */
  WebkitTouchCallout?: ConditionalValue<
    CssProperties["WebkitTouchCallout"] | AnyString
  >
  /**
   * **Syntax**: `read-only | read-write | read-write-plaintext-only`
   *
   * **Initial value**: `read-only`
   */
  WebkitUserModify?: ConditionalValue<
    CssProperties["WebkitUserModify"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   */
  WebkitUserSelect?: ConditionalValue<
    CssProperties["WebkitUserSelect"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **93** | **92**  | **15.4** | **93** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/accent-color
   */
  accentColor?: ConditionalValue<
    | UtilityValues["accentColor"]
    | CssVars
    | CssProperties["accentColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **28**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-content
   */
  alignContent?: ConditionalValue<
    CssVars | CssProperties["alignContent"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ] | anchor-center`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-items
   */
  alignItems?: ConditionalValue<
    CssVars | CssProperties["alignItems"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position> | anchor-center`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **10** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/align-self
   */
  alignSelf?: ConditionalValue<CssVars | CssProperties["alignSelf"] | AnyString>
  /**
   * **Syntax**: `[ normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ]#`
   *
   * **Initial value**: `normal`
   */
  alignTracks?: ConditionalValue<CssProperties["alignTracks"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `initial | inherit | unset | revert | revert-layer`
   *
   * **Initial value**: There is no practical initial value for it.
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **37** | **27**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/all
   */
  all?: ConditionalValue<CssVars | CssProperties["all"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <dashed-ident>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/anchor-name
   */
  anchorName?: ConditionalValue<CssProperties["anchorName"] | AnyString>
  /**
   * **Syntax**: `none | all | <dashed-ident>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **131** | **preview** | **26** | **131** | No  |
   */
  anchorScope?: ConditionalValue<CssProperties["anchorScope"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation>#`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation
   */
  animation?: ConditionalValue<
    | UtilityValues["animation"]
    | CssVars
    | CssProperties["animation"]
    | AnyString
  >
  /**
   * Since July 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<single-animation-composition>#`
   *
   * **Initial value**: `replace`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **112** | **115** | **16** | **112** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-composition
   */
  animationComposition?: ConditionalValue<
    CssVars | CssProperties["animationComposition"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-delay
   */
  animationDelay?: ConditionalValue<
    | UtilityValues["animationDelay"]
    | CssVars
    | CssProperties["animationDelay"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-direction>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-direction
   */
  animationDirection?: ConditionalValue<
    CssVars | CssProperties["animationDirection"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ auto | <time [0s,∞]> ]#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-duration
   */
  animationDuration?: ConditionalValue<
    | UtilityValues["animationDuration"]
    | CssVars
    | CssProperties["animationDuration"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-fill-mode>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 5 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-fill-mode
   */
  animationFillMode?: ConditionalValue<
    CssVars | CssProperties["animationFillMode"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-iteration-count>#`
   *
   * **Initial value**: `1`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-iteration-count
   */
  animationIterationCount?: ConditionalValue<
    CssProperties["animationIterationCount"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ none | <keyframes-name> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-name
   */
  animationName?: ConditionalValue<
    | UtilityValues["animationName"]
    | CssVars
    | CssProperties["animationName"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-animation-play-state>#`
   *
   * **Initial value**: `running`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-play-state
   */
  animationPlayState?: ConditionalValue<
    CssProperties["animationPlayState"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <'animation-range-start'> <'animation-range-end'>? ]#`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range
   */
  animationRange?: ConditionalValue<CssProperties["animationRange"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-end
   */
  animationRangeEnd?: ConditionalValue<
    CssProperties["animationRangeEnd"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-range-start
   */
  animationRangeStart?: ConditionalValue<
    CssProperties["animationRangeStart"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<single-animation-timeline>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline
   */
  animationTimeline?: ConditionalValue<
    CssProperties["animationTimeline"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **43**  | **16**  |  **9**  | **12** | **10** |
   * | 3 _-x-_ | 5 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timing-function
   */
  animationTimingFunction?: ConditionalValue<
    | UtilityValues["animationTimingFunction"]
    | CssVars
    | CssProperties["animationTimingFunction"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | auto | <compat-auto> | <compat-special>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |   Edge   | IE  |
   * | :-----: | :-----: | :------: | :------: | :-: |
   * | **84**  | **80**  | **15.4** |  **84**  | No  |
   * | 1 _-x-_ | 1 _-x-_ | 3 _-x-_  | 12 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/appearance
   */
  appearance?: ConditionalValue<
    CssVars | CssProperties["appearance"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto || <ratio>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **88** | **89**  | **15** | **88** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/aspect-ratio
   */
  aspectRatio?: ConditionalValue<
    | UtilityValues["aspectRatio"]
    | CssVars
    | CssProperties["aspectRatio"]
    | AnyString
  >
  /**
   * Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **76** | **103** | **18**  | **79** | No  |
   * |        |         | 9 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backdrop-filter
   */
  backdropFilter?: ConditionalValue<
    | UtilityValues["backdropFilter"]
    | CssVars
    | CssProperties["backdropFilter"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `visible | hidden`
   *
   * **Initial value**: `visible`
   *
   * |  Chrome  | Firefox  |  Safari   |  Edge  |   IE   |
   * | :------: | :------: | :-------: | :----: | :----: |
   * |  **36**  |  **16**  | **15.4**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 5.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/backface-visibility
   */
  backfaceVisibility?: ConditionalValue<
    CssVars | CssProperties["backfaceVisibility"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-layer>#? , <final-bg-layer>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  background?: ConditionalValue<
    | UtilityValues["background"]
    | CssVars
    | CssProperties["background"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<attachment>#`
   *
   * **Initial value**: `scroll`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  backgroundAttachment?: ConditionalValue<
    CssVars | CssProperties["backgroundAttachment"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<blend-mode>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **35** | **30**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  backgroundBlendMode?: ConditionalValue<
    CssProperties["backgroundBlendMode"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-clip>#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **4**  |  **5**  | **12** | **9** |
   * |        |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  backgroundClip?: ConditionalValue<
    CssVars | CssProperties["backgroundClip"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `transparent`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  backgroundColor?: ConditionalValue<
    | UtilityValues["backgroundColor"]
    | CssVars
    | CssProperties["backgroundColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-image>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   */
  backgroundImage?: ConditionalValue<
    CssProperties["backgroundImage"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<visual-box>#`
   *
   * **Initial value**: `padding-box`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **4**  | **3**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  backgroundOrigin?: ConditionalValue<
    CssProperties["backgroundOrigin"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-position>#`
   *
   * **Initial value**: `0% 0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  backgroundPosition?: ConditionalValue<
    CssProperties["backgroundPosition"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  backgroundPositionX?: ConditionalValue<
    CssProperties["backgroundPositionX"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  backgroundPositionY?: ConditionalValue<
    CssProperties["backgroundPositionY"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  backgroundRepeat?: ConditionalValue<
    CssProperties["backgroundRepeat"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **3**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  backgroundSize?: ConditionalValue<CssProperties["backgroundSize"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * |            Chrome            | Firefox |             Safari             |  Edge  | IE  |
   * | :--------------------------: | :-----: | :----------------------------: | :----: | :-: |
   * |            **57**            | **41**  |            **12.1**            | **79** | No  |
   * | 8 _(-webkit-logical-height)_ |         | 5.1 _(-webkit-logical-height)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/block-size
   */
  blockSize?: ConditionalValue<
    | UtilityValues["blockSize"]
    | CssVars
    | CssProperties["blockSize"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border
   */
  border?: ConditionalValue<
    UtilityValues["border"] | CssVars | CssProperties["border"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-block-start'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  borderBlock?: ConditionalValue<
    | UtilityValues["borderBlock"]
    | CssVars
    | CssProperties["borderBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  borderBlockColor?: ConditionalValue<
    | UtilityValues["borderBlockColor"]
    | CssVars
    | CssProperties["borderBlockColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end
   */
  borderBlockEnd?: ConditionalValue<
    | UtilityValues["borderBlockEnd"]
    | CssVars
    | CssProperties["borderBlockEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color
   */
  borderBlockEndColor?: ConditionalValue<
    | UtilityValues["borderBlockEndColor"]
    | CssVars
    | CssProperties["borderBlockEndColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-style
   */
  borderBlockEndStyle?: ConditionalValue<
    CssVars | CssProperties["borderBlockEndStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-width
   */
  borderBlockEndWidth?: ConditionalValue<
    CssProperties["borderBlockEndWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start
   */
  borderBlockStart?: ConditionalValue<
    | UtilityValues["borderBlockStart"]
    | CssVars
    | CssProperties["borderBlockStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-color
   */
  borderBlockStartColor?: ConditionalValue<
    | UtilityValues["borderBlockStartColor"]
    | CssVars
    | CssProperties["borderBlockStartColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-style
   */
  borderBlockStartStyle?: ConditionalValue<
    CssVars | CssProperties["borderBlockStartStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-start-width
   */
  borderBlockStartWidth?: ConditionalValue<
    CssProperties["borderBlockStartWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-style'>{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-style
   */
  borderBlockStyle?: ConditionalValue<
    CssVars | CssProperties["borderBlockStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-width'>{1,2}`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  borderBlockWidth?: ConditionalValue<
    CssProperties["borderBlockWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom
   */
  borderBottom?: ConditionalValue<
    | UtilityValues["borderBottom"]
    | CssVars
    | CssProperties["borderBottom"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-color
   */
  borderBottomColor?: ConditionalValue<
    | UtilityValues["borderBottomColor"]
    | CssVars
    | CssProperties["borderBottomColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-left-radius
   */
  borderBottomLeftRadius?: ConditionalValue<
    | UtilityValues["borderBottomLeftRadius"]
    | CssVars
    | CssProperties["borderBottomLeftRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-right-radius
   */
  borderBottomRightRadius?: ConditionalValue<
    | UtilityValues["borderBottomRightRadius"]
    | CssVars
    | CssProperties["borderBottomRightRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-style
   */
  borderBottomStyle?: ConditionalValue<
    CssVars | CssProperties["borderBottomStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-width
   */
  borderBottomWidth?: ConditionalValue<
    CssProperties["borderBottomWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `separate | collapse`
   *
   * **Initial value**: `separate`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.1** | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-collapse
   */
  borderCollapse?: ConditionalValue<
    CssVars | CssProperties["borderCollapse"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-color
   */
  borderColor?: ConditionalValue<
    | UtilityValues["borderColor"]
    | CssVars
    | CssProperties["borderColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-end-radius
   */
  borderEndEndRadius?: ConditionalValue<
    | UtilityValues["borderEndEndRadius"]
    | CssVars
    | CssProperties["borderEndEndRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-start-radius
   */
  borderEndStartRadius?: ConditionalValue<
    | UtilityValues["borderEndStartRadius"]
    | CssVars
    | CssProperties["borderEndStartRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>`
   *
   * | Chrome  |  Firefox  | Safari  |  Edge  |   IE   |
   * | :-----: | :-------: | :-----: | :----: | :----: |
   * | **16**  |  **15**   |  **6**  | **12** | **11** |
   * | 7 _-x-_ | 3.5 _-x-_ | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image
   */
  borderImage?: ConditionalValue<CssProperties["borderImage"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <length [0,∞]> | <number [0,∞]> ]{1,4}  `
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-outset
   */
  borderImageOutset?: ConditionalValue<
    CssProperties["borderImageOutset"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2016.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-repeat
   */
  borderImageRepeat?: ConditionalValue<
    CssProperties["borderImageRepeat"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <number [0,∞]> | <percentage [0,∞]> ]{1,4}  && fill?`
   *
   * **Initial value**: `100%`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-slice
   */
  borderImageSlice?: ConditionalValue<
    CssProperties["borderImageSlice"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **15** | **15**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-source
   */
  borderImageSource?: ConditionalValue<
    CssProperties["borderImageSource"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <length-percentage [0,∞]> | <number [0,∞]> | auto ]{1,4}`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **16** | **13**  | **6**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-width
   */
  borderImageWidth?: ConditionalValue<
    CssProperties["borderImageWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-block-start'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  borderInline?: ConditionalValue<
    | UtilityValues["borderInline"]
    | CssVars
    | CssProperties["borderInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  borderInlineColor?: ConditionalValue<
    | UtilityValues["borderInlineColor"]
    | CssVars
    | CssProperties["borderInlineColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  borderInlineEnd?: ConditionalValue<
    | UtilityValues["borderInlineEnd"]
    | CssVars
    | CssProperties["borderInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  borderInlineEndColor?: ConditionalValue<
    | UtilityValues["borderInlineEndColor"]
    | CssVars
    | CssProperties["borderInlineEndColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-style)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-style
   */
  borderInlineEndStyle?: ConditionalValue<
    CssVars | CssProperties["borderInlineEndStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-width)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  borderInlineEndWidth?: ConditionalValue<
    CssProperties["borderInlineEndWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  borderInlineStart?: ConditionalValue<
    | UtilityValues["borderInlineStart"]
    | CssVars
    | CssProperties["borderInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |            Firefox            |  Safari  |  Edge  | IE  |
   * | :----: | :---------------------------: | :------: | :----: | :-: |
   * | **69** |            **41**             | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-start-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  borderInlineStartColor?: ConditionalValue<
    | UtilityValues["borderInlineStartColor"]
    | CssVars
    | CssProperties["borderInlineStartColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome |            Firefox            |  Safari  |  Edge  | IE  |
   * | :----: | :---------------------------: | :------: | :----: | :-: |
   * | **69** |            **41**             | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-start-style)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-style
   */
  borderInlineStartStyle?: ConditionalValue<
    CssVars | CssProperties["borderInlineStartStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  borderInlineStartWidth?: ConditionalValue<
    CssProperties["borderInlineStartWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-style'>{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-style
   */
  borderInlineStyle?: ConditionalValue<
    CssVars | CssProperties["borderInlineStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-width'>{1,2}`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  borderInlineWidth?: ConditionalValue<
    CssProperties["borderInlineWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left
   */
  borderLeft?: ConditionalValue<
    | UtilityValues["borderLeft"]
    | CssVars
    | CssProperties["borderLeft"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-color
   */
  borderLeftColor?: ConditionalValue<
    | UtilityValues["borderLeftColor"]
    | CssVars
    | CssProperties["borderLeftColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-style
   */
  borderLeftStyle?: ConditionalValue<
    CssVars | CssProperties["borderLeftStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-left-width
   */
  borderLeftWidth?: ConditionalValue<
    CssProperties["borderLeftWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-radius
   */
  borderRadius?: ConditionalValue<
    | UtilityValues["borderRadius"]
    | CssVars
    | CssProperties["borderRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right
   */
  borderRight?: ConditionalValue<
    | UtilityValues["borderRight"]
    | CssVars
    | CssProperties["borderRight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-color
   */
  borderRightColor?: ConditionalValue<
    | UtilityValues["borderRightColor"]
    | CssVars
    | CssProperties["borderRightColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-style
   */
  borderRightStyle?: ConditionalValue<
    CssVars | CssProperties["borderRightStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-right-width
   */
  borderRightWidth?: ConditionalValue<
    CssProperties["borderRightWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-spacing
   */
  borderSpacing?: ConditionalValue<
    | UtilityValues["borderSpacing"]
    | CssVars
    | CssProperties["borderSpacing"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-end-radius
   */
  borderStartEndRadius?: ConditionalValue<
    | UtilityValues["borderStartEndRadius"]
    | CssVars
    | CssProperties["borderStartEndRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-start-radius
   */
  borderStartStartRadius?: ConditionalValue<
    | UtilityValues["borderStartStartRadius"]
    | CssVars
    | CssProperties["borderStartStartRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-style
   */
  borderStyle?: ConditionalValue<CssProperties["borderStyle"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top
   */
  borderTop?: ConditionalValue<
    | UtilityValues["borderTop"]
    | CssVars
    | CssProperties["borderTop"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-color
   */
  borderTopColor?: ConditionalValue<
    | UtilityValues["borderTopColor"]
    | CssVars
    | CssProperties["borderTopColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-left-radius
   */
  borderTopLeftRadius?: ConditionalValue<
    | UtilityValues["borderTopLeftRadius"]
    | CssVars
    | CssProperties["borderTopLeftRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-right-radius
   */
  borderTopRightRadius?: ConditionalValue<
    | UtilityValues["borderTopRightRadius"]
    | CssVars
    | CssProperties["borderTopRightRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-style
   */
  borderTopStyle?: ConditionalValue<
    CssVars | CssProperties["borderTopStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-width
   */
  borderTopWidth?: ConditionalValue<CssProperties["borderTopWidth"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-width
   */
  borderWidth?: ConditionalValue<CssProperties["borderWidth"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/bottom
   */
  bottom?: ConditionalValue<
    UtilityValues["bottom"] | CssVars | CssProperties["bottom"] | AnyString
  >
  boxAlign?: ConditionalValue<CssProperties["boxAlign"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `slice | clone`
   *
   * **Initial value**: `slice`
   *
   * |  Chrome  | Firefox |   Safari    |   Edge   | IE  |
   * | :------: | :-----: | :---------: | :------: | :-: |
   * | **130**  | **32**  | **7** _-x-_ | **130**  | No  |
   * | 22 _-x-_ |         |             | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break
   */
  boxDecorationBreak?: ConditionalValue<
    CssVars | CssProperties["boxDecorationBreak"] | AnyString
  >
  boxDirection?: ConditionalValue<CssProperties["boxDirection"] | AnyString>
  boxFlex?: ConditionalValue<CssProperties["boxFlex"] | AnyString>
  boxFlexGroup?: ConditionalValue<CssProperties["boxFlexGroup"] | AnyString>
  boxLines?: ConditionalValue<CssProperties["boxLines"] | AnyString>
  boxOrdinalGroup?: ConditionalValue<
    CssProperties["boxOrdinalGroup"] | AnyString
  >
  boxOrient?: ConditionalValue<CssProperties["boxOrient"] | AnyString>
  boxPack?: ConditionalValue<CssProperties["boxPack"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  |  **4**  | **5.1** | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-shadow
   */
  boxShadow?: ConditionalValue<
    | UtilityValues["boxShadow"]
    | CssVars
    | CssProperties["boxShadow"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `content-box | border-box`
   *
   * **Initial value**: `content-box`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  | **29**  | **5.1** | **12** | **8** |
   * | 1 _-x-_ | 1 _-x-_ | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-sizing
   */
  boxSizing?: ConditionalValue<CssVars | CssProperties["boxSizing"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019.
   *
   * **Syntax**: `auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-after
   */
  breakAfter?: ConditionalValue<
    CssVars | CssProperties["breakAfter"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019.
   *
   * **Syntax**: `auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-before
   */
  breakBefore?: ConditionalValue<
    CssVars | CssProperties["breakBefore"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2019.
   *
   * **Syntax**: `auto | avoid | avoid-page | avoid-column | avoid-region`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **50** | **65**  | **10** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/break-inside
   */
  breakInside?: ConditionalValue<
    CssVars | CssProperties["breakInside"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `top | bottom`
   *
   * **Initial value**: `top`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
   */
  captionSide?: ConditionalValue<
    CssVars | CssProperties["captionSide"] | AnyString
  >
  /** **Syntax**: `<'caret-color'> || <'caret-shape'>` */
  caret?: ConditionalValue<CssProperties["caret"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **53**  | **11.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
   */
  caretColor?: ConditionalValue<
    | UtilityValues["caretColor"]
    | CssVars
    | CssProperties["caretColor"]
    | AnyString
  >
  /**
   * **Syntax**: `auto | bar | block | underscore`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
   */
  caretShape?: ConditionalValue<CssProperties["caretShape"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | left | right | both | inline-start | inline-end`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
   */
  clear?: ConditionalValue<CssVars | CssProperties["clear"] | AnyString>
  clip?: ConditionalValue<CssProperties["clip"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<clip-source> | [ <basic-shape> || <geometry-box> ] | none`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **55**  | **3.5** | **9.1** | **79** | **10** |
   * | 23 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
   */
  clipPath?: ConditionalValue<CssProperties["clipPath"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `nonzero | evenodd`
   *
   * **Initial value**: `nonzero`
   *
   * | Chrome  | Firefox | Safari |  Edge  | IE  |
   * | :-----: | :-----: | :----: | :----: | :-: |
   * | **≤15** | **3.5** | **≤5** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
   */
  clipRule?: ConditionalValue<CssProperties["clipRule"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `canvastext`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color
   */
  color?: ConditionalValue<
    UtilityValues["color"] | CssVars | CssProperties["color"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | sRGB | linearRGB`
   *
   * **Initial value**: `linearRGB`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **3**  | **3**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
   */
  colorInterpolationFilters?: ConditionalValue<
    CssProperties["colorInterpolationFilters"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022.
   *
   * **Syntax**: `normal | [ light | dark | <custom-ident> ]+ && only?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **81** | **96**  | **13** | **81** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
   */
  colorScheme?: ConditionalValue<CssProperties["colorScheme"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<integer> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
   */
  columnCount?: ConditionalValue<CssProperties["columnCount"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `auto | balance`
   *
   * **Initial value**: `balance`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **50** | **52**  |  **9**  | **12** | **10** |
   * |        |         | 8 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
   */
  columnFill?: ConditionalValue<
    CssVars | CssProperties["columnFill"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **1**  | **1.5** | **3**  | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
   */
  columnGap?: ConditionalValue<
    | UtilityValues["columnGap"]
    | CssVars
    | CssProperties["columnGap"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
   */
  columnRule?: ConditionalValue<CssProperties["columnRule"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
   */
  columnRuleColor?: ConditionalValue<
    CssProperties["columnRuleColor"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-style'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
   */
  columnRuleStyle?: ConditionalValue<
    CssVars | CssProperties["columnRuleStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'border-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
   */
  columnRuleWidth?: ConditionalValue<
    CssProperties["columnRuleWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `none | all`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **50**  | **71**  |   **9**   | **12** | **10** |
   * | 6 _-x-_ |         | 5.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
   */
  columnSpan?: ConditionalValue<CssProperties["columnSpan"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2016.
   *
   * **Syntax**: `<length> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **50**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
   */
  columnWidth?: ConditionalValue<CssProperties["columnWidth"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `<'column-width'> || <'column-count'>`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **50** | **52**  |  **9**  | **12** | **10** |
   * |        |         | 3 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
   */
  columns?: ConditionalValue<CssProperties["columns"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | strict | content | [ [ size || inline-size ] || layout || style || paint ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **52** | **69**  | **15.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
   */
  contain?: ConditionalValue<CssProperties["contain"] | AnyString>
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
   */
  containIntrinsicBlockSize?: ConditionalValue<
    CssProperties["containIntrinsicBlockSize"] | AnyString
  >
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
   */
  containIntrinsicHeight?: ConditionalValue<
    CssProperties["containIntrinsicHeight"] | AnyString
  >
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
   */
  containIntrinsicInlineSize?: ConditionalValue<
    CssProperties["containIntrinsicInlineSize"] | AnyString
  >
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ auto? [ none | <length> ] ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **83** | **107** | **17** | **83** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
   */
  containIntrinsicSize?: ConditionalValue<
    CssProperties["containIntrinsicSize"] | AnyString
  >
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto? [ none | <length> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **95** | **107** | **17** | **95** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
   */
  containIntrinsicWidth?: ConditionalValue<
    CssProperties["containIntrinsicWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `<'container-name'> [ / <'container-type'> ]?`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **105** | **110** | **16** | **105** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
   */
  container?: ConditionalValue<CssProperties["container"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `none | <custom-ident>+`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **105** | **110** | **16** | **105** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
   */
  containerName?: ConditionalValue<
    | UtilityValues["containerName"]
    | CssVars
    | CssProperties["containerName"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `normal | [ [ size | inline-size ] || scroll-state ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **105** | **110** | **16** | **105** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
   */
  containerType?: ConditionalValue<CssProperties["containerType"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | none | [ <content-replacement> | <content-list> ] [ / [ <string> | <counter> | <attr()> ]+ ]?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
   */
  content?: ConditionalValue<CssProperties["content"] | AnyString>
  /**
   * Since September 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `visible | auto | hidden`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **85** | **125** | **18** | **85** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content-visibility
   */
  contentVisibility?: ConditionalValue<
    CssVars | CssProperties["contentVisibility"] | AnyString
  >
  cornerShape?: ConditionalValue<CssProperties["cornerShape"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <counter-name> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **3**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
   */
  counterIncrement?: ConditionalValue<
    CssProperties["counterIncrement"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <counter-name> <integer>? | <reversed-counter-name> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **3**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
   */
  counterReset?: ConditionalValue<CssProperties["counterReset"] | AnyString>
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <counter-name> <integer>? ]+ | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **85** | **68**  | **17.2** | **85** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
   */
  counterSet?: ConditionalValue<CssProperties["counterSet"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since December 2021.
   *
   * **Syntax**: `[ [ <url> [ <x> <y> ]? , ]* <cursor-predefined> ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
   */
  cursor?: ConditionalValue<
    UtilityValues["cursor"] | CssVars | CssProperties["cursor"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **43** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cx
   */
  cx?: ConditionalValue<CssProperties["cx"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **43** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cy
   */
  cy?: ConditionalValue<CssProperties["cy"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | path(<string>)`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **52** | **97**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
   */
  d?: ConditionalValue<CssProperties["d"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `ltr | rtl`
   *
   * **Initial value**: `ltr`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **2**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
   */
  direction?: ConditionalValue<CssVars | CssProperties["direction"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>`
   *
   * **Initial value**: `inline`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/display
   */
  display?: ConditionalValue<CssVars | CssProperties["display"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | text-bottom | alphabetic | ideographic | middle | central | mathematical | hanging | text-top`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **1**  | **4**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
   */
  dominantBaseline?: ConditionalValue<
    CssProperties["dominantBaseline"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `show | hide`
   *
   * **Initial value**: `show`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
   */
  emptyCells?: ConditionalValue<
    CssVars | CssProperties["emptyCells"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `content | fixed`
   *
   * **Initial value**: `fixed`
   *
   * | Chrome  | Firefox |   Safari    |  Edge   | IE  |
   * | :-----: | :-----: | :---------: | :-----: | :-: |
   * | **123** |   No    | **preview** | **123** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
   */
  fieldSizing?: ConditionalValue<CssProperties["fieldSizing"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<paint>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
   */
  fill?: ConditionalValue<
    UtilityValues["fill"] | CssVars | CssProperties["fill"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **1**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
   */
  fillOpacity?: ConditionalValue<CssProperties["fillOpacity"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `nonzero | evenodd`
   *
   * **Initial value**: `nonzero`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
   */
  fillRule?: ConditionalValue<CssProperties["fillRule"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `none | <filter-value-list>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  | IE  |
   * | :------: | :-----: | :-----: | :----: | :-: |
   * |  **53**  | **35**  | **9.1** | **12** | No  |
   * | 18 _-x-_ |         | 6 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
   */
  filter?: ConditionalValue<
    UtilityValues["filter"] | CssVars | CssProperties["filter"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **22**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
   */
  flex?: ConditionalValue<
    UtilityValues["flex"] | CssVars | CssProperties["flex"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `content | <'width'>`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **22**  |  **9**  | **12** | **11** |
   * | 22 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
   */
  flexBasis?: ConditionalValue<
    | UtilityValues["flexBasis"]
    | CssVars
    | CssProperties["flexBasis"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **22**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  flexDirection?: ConditionalValue<
    CssVars | CssProperties["flexDirection"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<'flex-direction'> || <'flex-wrap'>`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **28**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
   */
  flexFlow?: ConditionalValue<CssProperties["flexFlow"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `0`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |            IE            |
   * | :------: | :-----: | :-----: | :----: | :----------------------: |
   * |  **29**  | **20**  |  **9**  | **12** |          **11**          |
   * | 22 _-x-_ |         | 7 _-x-_ |        | 10 _(-ms-flex-positive)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-grow
   */
  flexGrow?: ConditionalValue<CssProperties["flexGrow"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `1`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **10** |
   * | 22 _-x-_ |         | 8 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-shrink
   */
  flexShrink?: ConditionalValue<CssProperties["flexShrink"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `nowrap | wrap | wrap-reverse`
   *
   * **Initial value**: `nowrap`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **28**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-wrap
   */
  flexWrap?: ConditionalValue<CssVars | CssProperties["flexWrap"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `left | right | none | inline-start | inline-end`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
   */
  float?: ConditionalValue<UtilityValues["float"] | CssVars | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **5**  |  **3**  | **6**  | **12** | **≤11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
   */
  floodColor?: ConditionalValue<CssProperties["floodColor"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **5**  |  **3**  | **6**  | **12** | **≤11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-opacity
   */
  floodOpacity?: ConditionalValue<CssProperties["floodOpacity"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ [ <'font-style'> || <font-variant-css2> || <'font-weight'> || <font-width-css3> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'># ] | <system-family-name>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
   */
  font?: ConditionalValue<CssProperties["font"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ <family-name> | <generic-family> ]#`
   *
   * **Initial value**: depends on user agent
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
   */
  fontFamily?: ConditionalValue<
    | UtilityValues["fontFamily"]
    | CssVars
    | CssProperties["fontFamily"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `normal | <feature-tag-value>#`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **48**  |  **34**  | **9.1** | **15** | **10** |
   * | 16 _-x-_ | 15 _-x-_ |         |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
   */
  fontFeatureSettings?: ConditionalValue<
    CssProperties["fontFeatureSettings"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | normal | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **33** | **32**  |  **9**  | **79** | No  |
   * |        |         | 6 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
   */
  fontKerning?: ConditionalValue<
    CssVars | CssProperties["fontKerning"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <string>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **143** | **34**  |   No   | **143** | No  |
   * |         | 4 _-x-_ |        |         |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
   */
  fontLanguageOverride?: ConditionalValue<
    CssProperties["fontLanguageOverride"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2020.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **79** | **62**  | **13.1** | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
   */
  fontOpticalSizing?: ConditionalValue<
    CssProperties["fontOpticalSizing"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2022.
   *
   * **Syntax**: `normal | light | dark | <palette-identifier> | <palette-mix()>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **101** | **107** | **15.4** | **101** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
   */
  fontPalette?: ConditionalValue<CssProperties["fontPalette"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<absolute-size> | <relative-size> | <length-percentage [0,∞]> | math`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
   */
  fontSize?: ConditionalValue<
    UtilityValues["fontSize"] | CssVars | CssProperties["fontSize"] | AnyString
  >
  /**
   * Since July 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | [ ex-height | cap-height | ch-width | ic-width | ic-height ]? [ from-font | <number> ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **127** |  **3**  | **16.4** | **127** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
   */
  fontSizeAdjust?: ConditionalValue<CssProperties["fontSizeAdjust"] | AnyString>
  /**
   * The **`font-smooth`** CSS property controls the application of anti-aliasing when fonts are rendered.
   *
   * **Syntax**: `auto | never | always | <absolute-size> | <length>`
   *
   * **Initial value**: `auto`
   *
   * |              Chrome              |              Firefox               |              Safari              |               Edge                | IE  |
   * | :------------------------------: | :--------------------------------: | :------------------------------: | :-------------------------------: | :-: |
   * | **5** _(-webkit-font-smoothing)_ | **25** _(-moz-osx-font-smoothing)_ | **4** _(-webkit-font-smoothing)_ | **79** _(-webkit-font-smoothing)_ | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
   */
  fontSmooth?: ConditionalValue<CssProperties["fontSmooth"] | AnyString>
  fontStretch?: ConditionalValue<CssProperties["fontStretch"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | italic | oblique <angle>?`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
   */
  fontStyle?: ConditionalValue<CssProperties["fontStyle"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2022.
   *
   * **Syntax**: `none | [ weight || style || small-caps || position]`
   *
   * **Initial value**: `weight style small-caps position `
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **97** | **34**  | **9**  | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
   */
  fontSynthesis?: ConditionalValue<CssProperties["fontSynthesis"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **118** |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
   */
  fontSynthesisPosition?: ConditionalValue<
    CssProperties["fontSynthesisPosition"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **97** | **111** | **16.4** | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
   */
  fontSynthesisSmallCaps?: ConditionalValue<
    CssProperties["fontSynthesisSmallCaps"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **97** | **111** | **16.4** | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
   */
  fontSynthesisStyle?: ConditionalValue<
    CssProperties["fontSynthesisStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **97** | **111** | **16.4** | **97** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
   */
  fontSynthesisWeight?: ConditionalValue<
    CssProperties["fontSynthesisWeight"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
   */
  fontVariant?: ConditionalValue<CssProperties["fontVariant"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :-----: | :-----: | :-: |
   * | **111** | **34**  | **9.1** | **111** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
   */
  fontVariantAlternates?: ConditionalValue<
    CssProperties["fontVariantAlternates"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **52** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
   */
  fontVariantCaps?: ConditionalValue<
    CssProperties["fontVariantCaps"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **63** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
   */
  fontVariantEastAsian?: ConditionalValue<
    CssProperties["fontVariantEastAsian"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | text | emoji | unicode`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **131** | **141** |   No   | **131** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
   */
  fontVariantEmoji?: ConditionalValue<
    CssProperties["fontVariantEmoji"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  | IE  |
   * | :------: | :-----: | :-----: | :----: | :-: |
   * |  **34**  | **34**  | **9.1** | **79** | No  |
   * | 31 _-x-_ |         | 7 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
   */
  fontVariantLigatures?: ConditionalValue<
    CssProperties["fontVariantLigatures"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **52** | **34**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
   */
  fontVariantNumeric?: ConditionalValue<
    CssProperties["fontVariantNumeric"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | sub | super`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  | Edge | IE  |
   * | :----: | :-----: | :-----: | :--: | :-: |
   * |   No   | **34**  | **9.1** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
   */
  fontVariantPosition?: ConditionalValue<
    CssProperties["fontVariantPosition"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2018.
   *
   * **Syntax**: `normal | [ <string> <number> ]#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **62** | **62**  | **11** | **17** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
   */
  fontVariationSettings?: ConditionalValue<
    CssProperties["fontVariationSettings"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<font-weight-absolute> | bolder | lighter`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
   */
  fontWeight?: ConditionalValue<
    | UtilityValues["fontWeight"]
    | CssVars
    | CssProperties["fontWeight"]
    | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | none | preserve-parent-color`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |              Edge               |                 IE                  |
   * | :----: | :-----: | :----: | :-----------------------------: | :---------------------------------: |
   * | **89** | **113** |   No   |             **79**              | **10** _(-ms-high-contrast-adjust)_ |
   * |        |         |        | 12 _(-ms-high-contrast-adjust)_ |                                     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
   */
  forcedColorAdjust?: ConditionalValue<
    CssVars | CssProperties["forcedColorAdjust"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<'row-gap'> <'column-gap'>?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/gap
   */
  gap?: ConditionalValue<
    UtilityValues["gap"] | CssVars | CssProperties["gap"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid
   */
  grid?: ConditionalValue<CssProperties["grid"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]{0,3}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-area
   */
  gridArea?: ConditionalValue<CssProperties["gridArea"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |             IE              |
   * | :----: | :-----: | :------: | :----: | :-------------------------: |
   * | **57** | **70**  | **10.1** | **16** | **10** _(-ms-grid-columns)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-columns
   */
  gridAutoColumns?: ConditionalValue<
    | UtilityValues["gridAutoColumns"]
    | CssVars
    | CssProperties["gridAutoColumns"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `[ row | column ] || dense`
   *
   * **Initial value**: `row`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-flow
   */
  gridAutoFlow?: ConditionalValue<CssProperties["gridAutoFlow"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<track-size>+`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |            IE            |
   * | :----: | :-----: | :------: | :----: | :----------------------: |
   * | **57** | **70**  | **10.1** | **16** | **10** _(-ms-grid-rows)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-auto-rows
   */
  gridAutoRows?: ConditionalValue<
    | UtilityValues["gridAutoRows"]
    | CssVars
    | CssProperties["gridAutoRows"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column
   */
  gridColumn?: ConditionalValue<CssProperties["gridColumn"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-end
   */
  gridColumnEnd?: ConditionalValue<CssProperties["gridColumnEnd"] | AnyString>
  gridColumnGap?: ConditionalValue<
    | UtilityValues["gridColumnGap"]
    | CssVars
    | CssProperties["gridColumnGap"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-column-start
   */
  gridColumnStart?: ConditionalValue<
    CssProperties["gridColumnStart"] | AnyString
  >
  gridGap?: ConditionalValue<
    UtilityValues["gridGap"] | CssVars | CssProperties["gridGap"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line> [ / <grid-line> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row
   */
  gridRow?: ConditionalValue<CssProperties["gridRow"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-end
   */
  gridRowEnd?: ConditionalValue<CssProperties["gridRowEnd"] | AnyString>
  gridRowGap?: ConditionalValue<
    | UtilityValues["gridRowGap"]
    | CssVars
    | CssProperties["gridRowGap"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `<grid-line>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-row-start
   */
  gridRowStart?: ConditionalValue<CssProperties["gridRowStart"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template
   */
  gridTemplate?: ConditionalValue<CssProperties["gridTemplate"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | <string>+`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-areas
   */
  gridTemplateAreas?: ConditionalValue<
    CssProperties["gridTemplateAreas"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |             IE              |
   * | :----: | :-----: | :------: | :----: | :-------------------------: |
   * | **57** | **52**  | **10.1** | **16** | **10** _(-ms-grid-columns)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-columns
   */
  gridTemplateColumns?: ConditionalValue<
    CssProperties["gridTemplateColumns"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `none | <track-list> | <auto-track-list> | subgrid <line-name-list>?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |            IE            |
   * | :----: | :-----: | :------: | :----: | :----------------------: |
   * | **57** | **52**  | **10.1** | **16** | **10** _(-ms-grid-rows)_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/grid-template-rows
   */
  gridTemplateRows?: ConditionalValue<
    CssProperties["gridTemplateRows"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ first || [ force-end | allow-end ] || last ]`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   |   No    | **10** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hanging-punctuation
   */
  hangingPunctuation?: ConditionalValue<
    CssProperties["hangingPunctuation"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  height?: ConditionalValue<
    UtilityValues["height"] | CssVars | CssProperties["height"] | AnyString
  >
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | <string>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari   |   Edge   | IE  |
   * | :-----: | :-----: | :-------: | :------: | :-: |
   * | **106** | **98**  |  **17**   | **106**  | No  |
   * | 6 _-x-_ |         | 5.1 _-x-_ | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-character
   */
  hyphenateCharacter?: ConditionalValue<
    CssProperties["hyphenateCharacter"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ auto | <integer> ]{1,3}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **109** | **137** |   No   | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphenate-limit-chars
   */
  hyphenateLimitChars?: ConditionalValue<
    CssProperties["hyphenateLimitChars"] | AnyString
  >
  /**
   * Since September 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | manual | auto`
   *
   * **Initial value**: `manual`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  |      IE      |
   * | :------: | :-----: | :-------: | :----: | :----------: |
   * |  **55**  | **43**  |  **17**   | **79** | **10** _-x-_ |
   * | 13 _-x-_ | 6 _-x-_ | 5.1 _-x-_ |        |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/hyphens
   */
  hyphens?: ConditionalValue<CssProperties["hyphens"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2020.
   *
   * **Syntax**: `from-image | <angle> | [ <angle>? flip ]`
   *
   * **Initial value**: `from-image`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **81** | **26**  | **13.1** | **81** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-orientation
   */
  imageOrientation?: ConditionalValue<
    CssProperties["imageOrientation"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | crisp-edges | pixelated | smooth`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **13** | **3.6** | **6**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/image-rendering
   */
  imageRendering?: ConditionalValue<CssProperties["imageRendering"] | AnyString>
  /**
   * The **`image-resolution`** CSS property specifies the intrinsic resolution of all raster images used in or on the element. It affects content images such as replaced elements and generated content, and decorative images such as `background-image` images.
   *
   * **Syntax**: `[ from-image || <resolution> ] && snap?`
   *
   * **Initial value**: `1dppx`
   */
  imageResolution?: ConditionalValue<
    CssProperties["imageResolution"] | AnyString
  >
  imeMode?: ConditionalValue<CssProperties["imeMode"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | [ <number> <integer>? ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |   Safari    |  Edge   | IE  |
   * | :-----: | :-----: | :---------: | :-----: | :-: |
   * | **110** |   No    | **9** _-x-_ | **110** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/initial-letter
   */
  initialLetter?: ConditionalValue<CssProperties["initialLetter"] | AnyString>
  /**
   * **Syntax**: `[ auto | alphabetic | hanging | ideographic ]`
   *
   * **Initial value**: `auto`
   */
  initialLetterAlign?: ConditionalValue<
    CssProperties["initialLetterAlign"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * |           Chrome            | Firefox |            Safari             |  Edge  | IE  |
   * | :-------------------------: | :-----: | :---------------------------: | :----: | :-: |
   * |           **57**            | **41**  |           **12.1**            | **79** | No  |
   * | 8 _(-webkit-logical-width)_ |         | 5.1 _(-webkit-logical-width)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inline-size
   */
  inlineSize?: ConditionalValue<
    | UtilityValues["inlineSize"]
    | CssVars
    | CssProperties["inlineSize"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,4}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset
   */
  inset?: ConditionalValue<
    UtilityValues["inset"] | CssVars | CssProperties["inset"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   */
  insetBlock?: ConditionalValue<
    | UtilityValues["insetBlock"]
    | CssVars
    | CssProperties["insetBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-end
   */
  insetBlockEnd?: ConditionalValue<
    | UtilityValues["insetBlockEnd"]
    | CssVars
    | CssProperties["insetBlockEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block-start
   */
  insetBlockStart?: ConditionalValue<
    | UtilityValues["insetBlockStart"]
    | CssVars
    | CssProperties["insetBlockStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   */
  insetInline?: ConditionalValue<
    | UtilityValues["insetInline"]
    | CssVars
    | CssProperties["insetInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  insetInlineEnd?: ConditionalValue<
    | UtilityValues["insetInlineEnd"]
    | CssVars
    | CssProperties["insetInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  insetInlineStart?: ConditionalValue<
    | UtilityValues["insetInlineStart"]
    | CssVars
    | CssProperties["insetInlineStart"]
    | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `numeric-only | allow-keywords`
   *
   * **Initial value**: `numeric-only`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **129** |   No    |   No   | **129** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size
   */
  interpolateSize?: ConditionalValue<
    CssProperties["interpolateSize"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | isolate`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **41** | **36**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/isolation
   */
  isolation?: ConditionalValue<CssVars | CssProperties["isolation"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]`
   *
   * **Initial value**: `normal`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **20**  |  **9**  | **12** | **11** |
   * | 21 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-content
   */
  justifyContent?: ConditionalValue<CssProperties["justifyContent"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2016.
   *
   * **Syntax**: `normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ] | anchor-center`
   *
   * **Initial value**: `legacy`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **52** | **20**  | **9**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-items
   */
  justifyItems?: ConditionalValue<CssProperties["justifyItems"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | anchor-center`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :------: | :----: | :----: |
   * | **57** | **45**  | **10.1** | **16** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/justify-self
   */
  justifySelf?: ConditionalValue<CssProperties["justifySelf"] | AnyString>
  /**
   * **Syntax**: `[ normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ] ]#`
   *
   * **Initial value**: `normal`
   */
  justifyTracks?: ConditionalValue<CssProperties["justifyTracks"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/left
   */
  left?: ConditionalValue<
    UtilityValues["left"] | CssVars | CssProperties["left"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <length>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/letter-spacing
   */
  letterSpacing?: ConditionalValue<
    | UtilityValues["letterSpacing"]
    | CssVars
    | CssProperties["letterSpacing"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `white`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **5**  |  **3**  | **6**  | **12** | **≤11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/lighting-color
   */
  lightingColor?: ConditionalValue<CssProperties["lightingColor"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | loose | normal | strict | anywhere`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE    |
   * | :-----: | :-----: | :-----: | :----: | :-----: |
   * | **58**  | **69**  | **11**  | **14** | **5.5** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |         |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-break
   */
  lineBreak?: ConditionalValue<CssVars | CssProperties["lineBreak"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   *
   * |   Chrome    |   Firefox    |  Safari   |     Edge     | IE  |
   * | :---------: | :----------: | :-------: | :----------: | :-: |
   * | **6** _-x-_ | **68** _-x-_ | 18.2-18.4 | **17** _-x-_ | No  |
   * |             |              |  5 _-x-_  |              |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-clamp
   */
  lineClamp?: ConditionalValue<CssProperties["lineClamp"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <number> | <length> | <percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/line-height
   */
  lineHeight?: ConditionalValue<
    | UtilityValues["lineHeight"]
    | CssVars
    | CssProperties["lineHeight"]
    | AnyString
  >
  /**
   * The **`line-height-step`** CSS property sets the step unit for line box heights. When the property is set, line box heights are rounded up to the closest multiple of the unit.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   */
  lineHeightStep?: ConditionalValue<CssProperties["lineHeightStep"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'list-style-type'> || <'list-style-position'> || <'list-style-image'>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style
   */
  listStyle?: ConditionalValue<CssProperties["listStyle"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<image> | none`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-image
   */
  listStyleImage?: ConditionalValue<CssProperties["listStyleImage"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `inside | outside`
   *
   * **Initial value**: `outside`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-position
   */
  listStylePosition?: ConditionalValue<
    CssProperties["listStylePosition"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<counter-style> | <string> | none`
   *
   * **Initial value**: `disc`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/list-style-type
   */
  listStyleType?: ConditionalValue<CssProperties["listStyleType"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'margin-top'>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin
   */
  margin?: ConditionalValue<
    UtilityValues["margin"] | CssVars | CssProperties["margin"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  marginBlock?: ConditionalValue<
    | UtilityValues["marginBlock"]
    | CssVars
    | CssProperties["marginBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-end
   */
  marginBlockEnd?: ConditionalValue<
    | UtilityValues["marginBlockEnd"]
    | CssVars
    | CssProperties["marginBlockEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block-start
   */
  marginBlockStart?: ConditionalValue<
    | UtilityValues["marginBlockStart"]
    | CssVars
    | CssProperties["marginBlockStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   */
  marginBottom?: ConditionalValue<
    | UtilityValues["marginBottom"]
    | CssVars
    | CssProperties["marginBottom"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  marginInline?: ConditionalValue<
    | UtilityValues["marginInline"]
    | CssVars
    | CssProperties["marginInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome          |        Firefox        |          Safari          |  Edge  | IE  |
   * | :----------------------: | :-------------------: | :----------------------: | :----: | :-: |
   * |          **69**          |        **41**         |         **12.1**         | **79** | No  |
   * | 2 _(-webkit-margin-end)_ | 3 _(-moz-margin-end)_ | 3 _(-webkit-margin-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  marginInlineEnd?: ConditionalValue<
    | UtilityValues["marginInlineEnd"]
    | CssVars
    | CssProperties["marginInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome           |         Firefox         |           Safari           |  Edge  | IE  |
   * | :------------------------: | :---------------------: | :------------------------: | :----: | :-: |
   * |           **69**           |         **41**          |          **12.1**          | **79** | No  |
   * | 2 _(-webkit-margin-start)_ | 3 _(-moz-margin-start)_ | 3 _(-webkit-margin-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  marginInlineStart?: ConditionalValue<
    | UtilityValues["marginInlineStart"]
    | CssVars
    | CssProperties["marginInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   */
  marginLeft?: ConditionalValue<
    | UtilityValues["marginLeft"]
    | CssVars
    | CssProperties["marginLeft"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   */
  marginRight?: ConditionalValue<
    | UtilityValues["marginRight"]
    | CssVars
    | CssProperties["marginRight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   */
  marginTop?: ConditionalValue<
    | UtilityValues["marginTop"]
    | CssVars
    | CssProperties["marginTop"]
    | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | in-flow | all`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * |   No   |   No    | **16.4** |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-trim
   */
  marginTrim?: ConditionalValue<CssProperties["marginTrim"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker
   */
  marker?: ConditionalValue<CssProperties["marker"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-end
   */
  markerEnd?: ConditionalValue<CssProperties["markerEnd"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-mid
   */
  markerMid?: ConditionalValue<CssProperties["markerMid"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <url>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/marker-start
   */
  markerStart?: ConditionalValue<CssProperties["markerStart"] | AnyString>
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<mask-layer>#`
   *
   * | Chrome  | Firefox |  Safari   | Edge  | IE  |
   * | :-----: | :-----: | :-------: | :---: | :-: |
   * | **120** | **53**  | **15.4**  | 12-79 | No  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask
   */
  mask?: ConditionalValue<CssProperties["mask"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>`
   *
   * |              Chrome              | Firefox |             Safari             |               Edge                | IE  |
   * | :------------------------------: | :-----: | :----------------------------: | :-------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image)_ |   No    |            **17.2**            | **79** _(-webkit-mask-box-image)_ | No  |
   * |                                  |         | 3.1 _(-webkit-mask-box-image)_ |                                   |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border
   */
  maskBorder?: ConditionalValue<CssProperties["maskBorder"] | AnyString>
  /**
   * The **`mask-border-mode`** CSS property specifies the blending mode used in a mask border.
   *
   * **Syntax**: `luminance | alpha`
   *
   * **Initial value**: `alpha`
   */
  maskBorderMode?: ConditionalValue<CssProperties["maskBorderMode"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length> | <number> ]{1,4}`
   *
   * **Initial value**: `0`
   *
   * |                 Chrome                  | Firefox |                Safari                 |                   Edge                   | IE  |
   * | :-------------------------------------: | :-----: | :-----------------------------------: | :--------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-outset)_ |   No    |               **17.2**                | **79** _(-webkit-mask-box-image-outset)_ | No  |
   * |                                         |         | 3.1 _(-webkit-mask-box-image-outset)_ |                                          |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-outset
   */
  maskBorderOutset?: ConditionalValue<
    CssProperties["maskBorderOutset"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ stretch | repeat | round | space ]{1,2}`
   *
   * **Initial value**: `stretch`
   *
   * |                 Chrome                  | Firefox |                Safari                 |                   Edge                   | IE  |
   * | :-------------------------------------: | :-----: | :-----------------------------------: | :--------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-repeat)_ |   No    |               **17.2**                | **79** _(-webkit-mask-box-image-repeat)_ | No  |
   * |                                         |         | 3.1 _(-webkit-mask-box-image-repeat)_ |                                          |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-repeat
   */
  maskBorderRepeat?: ConditionalValue<
    CssProperties["maskBorderRepeat"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<number-percentage>{1,4} fill?`
   *
   * **Initial value**: `0`
   *
   * |                 Chrome                 | Firefox |                Safari                |                  Edge                   | IE  |
   * | :------------------------------------: | :-----: | :----------------------------------: | :-------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-slice)_ |   No    |               **17.2**               | **79** _(-webkit-mask-box-image-slice)_ | No  |
   * |                                        |         | 3.1 _(-webkit-mask-box-image-slice)_ |                                         |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-slice
   */
  maskBorderSlice?: ConditionalValue<
    CssProperties["maskBorderSlice"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <image>`
   *
   * **Initial value**: `none`
   *
   * |                 Chrome                  | Firefox |                Safari                 |                   Edge                   | IE  |
   * | :-------------------------------------: | :-----: | :-----------------------------------: | :--------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-source)_ |   No    |               **17.2**                | **79** _(-webkit-mask-box-image-source)_ | No  |
   * |                                         |         | 3.1 _(-webkit-mask-box-image-source)_ |                                          |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-source
   */
  maskBorderSource?: ConditionalValue<
    CssProperties["maskBorderSource"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <length-percentage> | <number> | auto ]{1,4}`
   *
   * **Initial value**: `auto`
   *
   * |                 Chrome                 | Firefox |                Safari                |                  Edge                   | IE  |
   * | :------------------------------------: | :-----: | :----------------------------------: | :-------------------------------------: | :-: |
   * | **1** _(-webkit-mask-box-image-width)_ |   No    |               **17.2**               | **79** _(-webkit-mask-box-image-width)_ | No  |
   * |                                        |         | 3.1 _(-webkit-mask-box-image-width)_ |                                         |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-border-width
   */
  maskBorderWidth?: ConditionalValue<
    CssProperties["maskBorderWidth"] | AnyString
  >
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ <coord-box> | no-clip ]#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome  | Firefox |  Safari  |   Edge   | IE  |
   * | :-----: | :-----: | :------: | :------: | :-: |
   * | **120** | **53**  | **15.4** | **120**  | No  |
   * | 1 _-x-_ |         | 4 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-clip
   */
  maskClip?: ConditionalValue<CssProperties["maskClip"] | AnyString>
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<compositing-operator>#`
   *
   * **Initial value**: `add`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **120** | **53**  | **15.4** | 18-79 | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-composite
   */
  maskComposite?: ConditionalValue<CssProperties["maskComposite"] | AnyString>
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<mask-reference>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **120** | **53**  | **15.4** | 16-79 | No  |
   * | 1 _-x-_ |         | 4 _-x-_  |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-image
   */
  maskImage?: ConditionalValue<CssProperties["maskImage"] | AnyString>
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<masking-mode>#`
   *
   * **Initial value**: `match-source`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **120** | **53**  | **15.4** | **120** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-mode
   */
  maskMode?: ConditionalValue<CssProperties["maskMode"] | AnyString>
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<coord-box>#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome  | Firefox |  Safari  |   Edge   | IE  |
   * | :-----: | :-----: | :------: | :------: | :-: |
   * | **120** | **53**  | **15.4** | **120**  | No  |
   * | 1 _-x-_ |         | 4 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-origin
   */
  maskOrigin?: ConditionalValue<CssProperties["maskOrigin"] | AnyString>
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<position>#`
   *
   * **Initial value**: `0% 0%`
   *
   * | Chrome  | Firefox |  Safari   | Edge  | IE  |
   * | :-----: | :-----: | :-------: | :---: | :-: |
   * | **120** | **53**  | **15.4**  | 18-79 | No  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-position
   */
  maskPosition?: ConditionalValue<CssProperties["maskPosition"] | AnyString>
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   *
   * | Chrome  | Firefox |  Safari   | Edge  | IE  |
   * | :-----: | :-----: | :-------: | :---: | :-: |
   * | **120** | **53**  | **15.4**  | 18-79 | No  |
   * | 1 _-x-_ |         | 3.1 _-x-_ |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-repeat
   */
  maskRepeat?: ConditionalValue<CssProperties["maskRepeat"] | AnyString>
  /**
   * Since December 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **120** | **53**  | **15.4** | 18-79 | No  |
   * | 4 _-x-_ |         | 4 _-x-_  |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-size
   */
  maskSize?: ConditionalValue<CssProperties["maskSize"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `luminance | alpha`
   *
   * **Initial value**: `luminance`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **24** | **35**  | **7**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask-type
   */
  maskType?: ConditionalValue<CssProperties["maskType"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `[ pack | next ] || [ definite-first | ordered ]`
   *
   * **Initial value**: `pack`
   */
  masonryAutoFlow?: ConditionalValue<
    CssProperties["masonryAutoFlow"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto-add | add(<integer>) | <integer>`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **109** | **117** |   No   | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-depth
   */
  mathDepth?: ConditionalValue<CssProperties["mathDepth"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | compact`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **109** |   No    |   No   | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-shift
   */
  mathShift?: ConditionalValue<CssProperties["mathShift"] | AnyString>
  /**
   * Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | compact`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **109** | **117** | **14.1** | **109** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/math-style
   */
  mathStyle?: ConditionalValue<CssProperties["mathStyle"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-block-size
   */
  maxBlockSize?: ConditionalValue<
    | UtilityValues["maxBlockSize"]
    | CssVars
    | CssProperties["maxBlockSize"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  maxHeight?: ConditionalValue<
    | UtilityValues["maxHeight"]
    | CssVars
    | CssProperties["maxHeight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |   Safari   |  Edge  | IE  |
   * | :----: | :-----: | :--------: | :----: | :-: |
   * | **57** | **41**  |  **12.1**  | **79** | No  |
   * |        |         | 10.1 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-inline-size
   */
  maxInlineSize?: ConditionalValue<
    | UtilityValues["maxInlineSize"]
    | CssVars
    | CssProperties["maxInlineSize"]
    | AnyString
  >
  /**
   * **Syntax**: `none | <integer>`
   *
   * **Initial value**: `none`
   */
  maxLines?: ConditionalValue<CssProperties["maxLines"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  maxWidth?: ConditionalValue<
    UtilityValues["maxWidth"] | CssVars | CssProperties["maxWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-block-size
   */
  minBlockSize?: ConditionalValue<
    | UtilityValues["minBlockSize"]
    | CssVars
    | CssProperties["minBlockSize"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **3**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  minHeight?: ConditionalValue<
    | UtilityValues["minHeight"]
    | CssVars
    | CssProperties["minHeight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-inline-size
   */
  minInlineSize?: ConditionalValue<
    | UtilityValues["minInlineSize"]
    | CssVars
    | CssProperties["minInlineSize"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  minWidth?: ConditionalValue<
    UtilityValues["minWidth"] | CssVars | CssProperties["minWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<blend-mode> | plus-darker | plus-lighter`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **41** | **32**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode
   */
  mixBlendMode?: ConditionalValue<
    CssVars | CssProperties["mixBlendMode"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `fill | contain | cover | none | scale-down`
   *
   * **Initial value**: `fill`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **32** | **36**  | **10** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-fit
   */
  objectFit?: ConditionalValue<CssVars | CssProperties["objectFit"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **32** | **36**  | **10** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/object-position
   */
  objectPosition?: ConditionalValue<CssProperties["objectPosition"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?`
   *
   * |    Chrome     | Firefox | Safari |  Edge  | IE  |
   * | :-----------: | :-----: | :----: | :----: | :-: |
   * |    **55**     | **72**  | **16** | **79** | No  |
   * | 46 _(motion)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset
   */
  offset?: ConditionalValue<CssProperties["offset"] | AnyString>
  /**
   * Since August 2023, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | <position>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **116** | **72**  | **16** | **116** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-anchor
   */
  offsetAnchor?: ConditionalValue<CssProperties["offsetAnchor"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **55**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-distance)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-distance
   */
  offsetDistance?: ConditionalValue<CssProperties["offsetDistance"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | <offset-path> || <coord-box>`
   *
   * **Initial value**: `none`
   *
   * |       Chrome       | Firefox |  Safari  |  Edge  | IE  |
   * | :----------------: | :-----: | :------: | :----: | :-: |
   * |       **55**       | **72**  | **15.4** | **79** | No  |
   * | 46 _(motion-path)_ |         |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-path
   */
  offsetPath?: ConditionalValue<CssProperties["offsetPath"] | AnyString>
  /**
   * Since January 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | auto | <position>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **116** | **122** | **16** | **116** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-position
   */
  offsetPosition?: ConditionalValue<CssProperties["offsetPosition"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ auto | reverse ] || <angle>`
   *
   * **Initial value**: `auto`
   *
   * |         Chrome         | Firefox | Safari |  Edge  | IE  |
   * | :--------------------: | :-----: | :----: | :----: | :-: |
   * |         **56**         | **72**  | **16** | **79** | No  |
   * | 46 _(motion-rotation)_ |         |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/offset-rotate
   */
  offsetRotate?: ConditionalValue<CssProperties["offsetRotate"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **2**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/opacity
   */
  opacity?: ConditionalValue<CssProperties["opacity"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `0`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **20**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/order
   */
  order?: ConditionalValue<CssProperties["order"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `2`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **25** |   No    | **1.3** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/orphans
   */
  orphans?: ConditionalValue<CssProperties["orphans"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `<'outline-width'> || <'outline-style'> || <'outline-color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :------: | :----: | :---: |
   * | **94** | **88**  | **16.4** | **94** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  outline?: ConditionalValue<
    UtilityValues["outline"] | CssVars | CssProperties["outline"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  outlineColor?: ConditionalValue<
    | UtilityValues["outlineColor"]
    | CssVars
    | CssProperties["outlineColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **1**  | **1.5** | **1.2** | **15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-offset
   */
  outlineOffset?: ConditionalValue<
    | UtilityValues["outlineOffset"]
    | CssVars
    | CssProperties["outlineOffset"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <outline-line-style>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-style
   */
  outlineStyle?: ConditionalValue<
    CssVars | CssProperties["outlineStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  outlineWidth?: ConditionalValue<CssProperties["outlineWidth"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ visible | hidden | clip | scroll | auto ]{1,2}`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow
   */
  overflow?: ConditionalValue<CssVars | CssProperties["overflow"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |   Safari    |  Edge  | IE  |
   * | :----: | :-----: | :---------: | :----: | :-: |
   * | **56** | **66**  | **preview** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor
   */
  overflowAnchor?: ConditionalValue<CssProperties["overflowAnchor"] | AnyString>
  /**
   * Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **135** | **69**  | **26** | **135** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-block
   */
  overflowBlock?: ConditionalValue<
    CssVars | CssProperties["overflowBlock"] | AnyString
  >
  /**
   * **Syntax**: `padding-box | content-box`
   *
   * **Initial value**: `padding-box`
   */
  overflowClipBox?: ConditionalValue<
    CssProperties["overflowClipBox"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<visual-box> || <length [0,∞]>`
   *
   * **Initial value**: `0px`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **90** | **102** |   No   | **90** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-clip-margin
   */
  overflowClipMargin?: ConditionalValue<
    CssProperties["overflowClipMargin"] | AnyString
  >
  /**
   * Since September 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **135** | **69**  | **26** | **135** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-inline
   */
  overflowInline?: ConditionalValue<
    CssVars | CssProperties["overflowInline"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018.
   *
   * **Syntax**: `normal | break-word | anywhere`
   *
   * **Initial value**: `normal`
   *
   * |     Chrome      |      Firefox      |     Safari      |       Edge       |          IE           |
   * | :-------------: | :---------------: | :-------------: | :--------------: | :-------------------: |
   * |     **23**      |      **49**       |      **7**      |      **18**      | **5.5** _(word-wrap)_ |
   * | 1 _(word-wrap)_ | 3.5 _(word-wrap)_ | 1 _(word-wrap)_ | 12 _(word-wrap)_ |                       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-wrap
   */
  overflowWrap?: ConditionalValue<
    CssVars | CssProperties["overflowWrap"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **3.5** | **3**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-x
   */
  overflowX?: ConditionalValue<CssVars | CssProperties["overflowX"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | clip | scroll | auto`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **3.5** | **3**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-y
   */
  overflowY?: ConditionalValue<CssVars | CssProperties["overflowY"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **117** |   No    |   No   | **117** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overlay
   */
  overlay?: ConditionalValue<CssProperties["overlay"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `[ contain | none | auto ]{1,2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  | **16** | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior
   */
  overscrollBehavior?: ConditionalValue<
    CssProperties["overscrollBehavior"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **77** | **73**  | **16** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-block
   */
  overscrollBehaviorBlock?: ConditionalValue<
    CssProperties["overscrollBehaviorBlock"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **77** | **73**  | **16** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline
   */
  overscrollBehaviorInline?: ConditionalValue<
    CssProperties["overscrollBehaviorInline"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  | **16** | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-x
   */
  overscrollBehaviorX?: ConditionalValue<
    CssProperties["overscrollBehaviorX"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `contain | none | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **63** | **59**  | **16** | **18** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overscroll-behavior-y
   */
  overscrollBehaviorY?: ConditionalValue<
    CssProperties["overscrollBehaviorY"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'padding-top'>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding
   */
  padding?: ConditionalValue<
    UtilityValues["padding"] | CssVars | CssProperties["padding"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   */
  paddingBlock?: ConditionalValue<
    | UtilityValues["paddingBlock"]
    | CssVars
    | CssProperties["paddingBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-end
   */
  paddingBlockEnd?: ConditionalValue<
    | UtilityValues["paddingBlockEnd"]
    | CssVars
    | CssProperties["paddingBlockEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-start
   */
  paddingBlockStart?: ConditionalValue<
    | UtilityValues["paddingBlockStart"]
    | CssVars
    | CssProperties["paddingBlockStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
   */
  paddingBottom?: ConditionalValue<
    | UtilityValues["paddingBottom"]
    | CssVars
    | CssProperties["paddingBottom"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   */
  paddingInline?: ConditionalValue<
    | UtilityValues["paddingInline"]
    | CssVars
    | CssProperties["paddingInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome           |        Firefox         |          Safari           |  Edge  | IE  |
   * | :-----------------------: | :--------------------: | :-----------------------: | :----: | :-: |
   * |          **69**           |         **41**         |         **12.1**          | **79** | No  |
   * | 2 _(-webkit-padding-end)_ | 3 _(-moz-padding-end)_ | 3 _(-webkit-padding-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   */
  paddingInlineEnd?: ConditionalValue<
    | UtilityValues["paddingInlineEnd"]
    | CssVars
    | CssProperties["paddingInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome            |         Firefox          |           Safari            |  Edge  | IE  |
   * | :-------------------------: | :----------------------: | :-------------------------: | :----: | :-: |
   * |           **69**            |          **41**          |          **12.1**           | **79** | No  |
   * | 2 _(-webkit-padding-start)_ | 3 _(-moz-padding-start)_ | 3 _(-webkit-padding-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   */
  paddingInlineStart?: ConditionalValue<
    | UtilityValues["paddingInlineStart"]
    | CssVars
    | CssProperties["paddingInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
   */
  paddingLeft?: ConditionalValue<
    | UtilityValues["paddingLeft"]
    | CssVars
    | CssProperties["paddingLeft"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
   */
  paddingRight?: ConditionalValue<
    | UtilityValues["paddingRight"]
    | CssVars
    | CssProperties["paddingRight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
   */
  paddingTop?: ConditionalValue<
    | UtilityValues["paddingTop"]
    | CssVars
    | CssProperties["paddingTop"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since February 2023.
   *
   * **Syntax**: `auto | <custom-ident>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **85** | **110** | **1**  | **85** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
   */
  page?: ConditionalValue<CssProperties["page"] | AnyString>
  pageBreakAfter?: ConditionalValue<CssProperties["pageBreakAfter"] | AnyString>
  pageBreakBefore?: ConditionalValue<
    CssProperties["pageBreakBefore"] | AnyString
  >
  pageBreakInside?: ConditionalValue<
    CssProperties["pageBreakInside"] | AnyString
  >
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | [ fill || stroke || markers ]`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **123** | **60**  | **11** | **123** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
   */
  paintOrder?: ConditionalValue<CssProperties["paintOrder"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <length>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **36**  |  **16**  |  **9**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
   */
  perspective?: ConditionalValue<CssProperties["perspective"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<position>`
   *
   * **Initial value**: `50% 50%`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  |   IE   |
   * | :------: | :------: | :-----: | :----: | :----: |
   * |  **36**  |  **16**  |  **9**  | **12** | **10** |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
   */
  perspectiveOrigin?: ConditionalValue<
    CssProperties["perspectiveOrigin"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'align-content'> <'justify-content'>?`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
   */
  placeContent?: ConditionalValue<CssProperties["placeContent"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'align-items'> <'justify-items'>?`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
   */
  placeItems?: ConditionalValue<CssProperties["placeItems"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'align-self'> <'justify-self'>?`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **59** | **45**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
   */
  placeSelf?: ConditionalValue<CssProperties["placeSelf"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE   |
   * | :----: | :-----: | :----: | :----: | :----: |
   * | **1**  | **1.5** | **4**  | **12** | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
   */
  pointerEvents?: ConditionalValue<
    CssVars | CssProperties["pointerEvents"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `static | relative | absolute | sticky | fixed`
   *
   * **Initial value**: `static`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  position?: ConditionalValue<CssVars | CssProperties["position"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | <anchor-name>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
   */
  positionAnchor?: ConditionalValue<CssProperties["positionAnchor"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <position-area>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **129** | **preview** | **26** | **129** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
   */
  positionArea?: ConditionalValue<CssProperties["positionArea"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<'position-try-order'>? <'position-try-fallbacks'>`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
   */
  positionTry?: ConditionalValue<CssProperties["positionTry"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ [<dashed-ident> || <try-tactic>] | <'position-area'> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **128** | **preview** | **26** | **128** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
   */
  positionTryFallbacks?: ConditionalValue<
    CssProperties["positionTryFallbacks"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `normal | <try-size>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **125** |   No    | **26** | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
   */
  positionTryOrder?: ConditionalValue<
    CssProperties["positionTryOrder"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `always | [ anchors-valid || anchors-visible || no-overflow ]`
   *
   * **Initial value**: `anchors-visible`
   *
   * | Chrome  |   Firefox   | Safari |  Edge   | IE  |
   * | :-----: | :---------: | :----: | :-----: | :-: |
   * | **125** | **preview** |   No   | **125** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
   */
  positionVisibility?: ConditionalValue<
    CssProperties["positionVisibility"] | AnyString
  >
  /**
   * Since May 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `economy | exact`
   *
   * **Initial value**: `economy`
   *
   * |  Chrome  |       Firefox       |  Safari  |   Edge   | IE  |
   * | :------: | :-----------------: | :------: | :------: | :-: |
   * | **136**  |       **97**        | **15.4** | **136**  | No  |
   * | 17 _-x-_ | 48 _(color-adjust)_ | 6 _-x-_  | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
   */
  printColorAdjust?: ConditionalValue<
    CssProperties["printColorAdjust"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | auto | [ <string> <string> ]+`
   *
   * **Initial value**: depends on user agent
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **11** | **1.5** | **9**  | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
   */
  quotes?: ConditionalValue<CssProperties["quotes"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **43** | **69**  | **9**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/r
   */
  r?: ConditionalValue<CssProperties["r"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | both | horizontal | vertical | block | inline`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **4**  | **3**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
   */
  resize?: ConditionalValue<CssVars | CssProperties["resize"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
   */
  right?: ConditionalValue<
    UtilityValues["right"] | CssVars | CssProperties["right"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022.
   *
   * **Syntax**: `none | <angle> | [ x | y | z | <number>{3} ] && <angle>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **104** | **72**  | **14.1** | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
   */
  rotate?: ConditionalValue<
    UtilityValues["rotate"] | CssVars | CssProperties["rotate"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **47** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
   */
  rowGap?: ConditionalValue<
    UtilityValues["rowGap"] | CssVars | CssProperties["rowGap"] | AnyString
  >
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `start | center | space-between | space-around`
   *
   * **Initial value**: `space-around`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **128** | **38**  | **18.2** | **128** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
   */
  rubyAlign?: ConditionalValue<CssProperties["rubyAlign"] | AnyString>
  /**
   * **Syntax**: `separate | collapse | auto`
   *
   * **Initial value**: `separate`
   */
  rubyMerge?: ConditionalValue<CssProperties["rubyMerge"] | AnyString>
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `[ alternate || [ over | under ] ] | inter-character`
   *
   * **Initial value**: `alternate`
   *
   * | Chrome  | Firefox |  Safari  | Edge  | IE  |
   * | :-----: | :-----: | :------: | :---: | :-: |
   * | **84**  | **38**  | **18.2** | 12-79 | No  |
   * | 1 _-x-_ |         | 7 _-x-_  |       |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
   */
  rubyPosition?: ConditionalValue<CssProperties["rubyPosition"] | AnyString>
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **43** | **69**  | **17.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rx
   */
  rx?: ConditionalValue<CssProperties["rx"] | AnyString>
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **43** | **69**  | **17.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ry
   */
  ry?: ConditionalValue<CssProperties["ry"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022.
   *
   * **Syntax**: `none | [ <number> | <percentage> ]{1,3}`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **104** | **72**  | **14.1** | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
   */
  scale?: ConditionalValue<
    UtilityValues["scale"] | CssVars | CssProperties["scale"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | smooth`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **61** | **36**  | **15.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-behavior
   */
  scrollBehavior?: ConditionalValue<
    CssVars | CssProperties["scrollBehavior"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021.
   *
   * **Syntax**: `<length>{1,4}`
   *
   * | Chrome | Firefox |          Safari           |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------: | :----: | :-: |
   * | **69** | **90**  |         **14.1**          | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  scrollMargin?: ConditionalValue<
    | UtilityValues["scrollMargin"]
    | CssVars
    | CssProperties["scrollMargin"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
   */
  scrollMarginBlock?: ConditionalValue<
    | UtilityValues["scrollMarginBlock"]
    | CssVars
    | CssProperties["scrollMarginBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-end
   */
  scrollMarginBlockEnd?: ConditionalValue<
    | UtilityValues["scrollMarginBlockEnd"]
    | CssVars
    | CssProperties["scrollMarginBlockEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-start
   */
  scrollMarginBlockStart?: ConditionalValue<
    | UtilityValues["scrollMarginBlockStart"]
    | CssVars
    | CssProperties["scrollMarginBlockStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |              Safari              |  Edge  | IE  |
   * | :----: | :-----: | :------------------------------: | :----: | :-: |
   * | **69** | **68**  |             **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-bottom)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  scrollMarginBottom?: ConditionalValue<
    | UtilityValues["scrollMarginBottom"]
    | CssVars
    | CssProperties["scrollMarginBottom"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
   */
  scrollMarginInline?: ConditionalValue<
    | UtilityValues["scrollMarginInline"]
    | CssVars
    | CssProperties["scrollMarginInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-end
   */
  scrollMarginInlineEnd?: ConditionalValue<
    | UtilityValues["scrollMarginInlineEnd"]
    | CssVars
    | CssProperties["scrollMarginInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-start
   */
  scrollMarginInlineStart?: ConditionalValue<
    | UtilityValues["scrollMarginInlineStart"]
    | CssVars
    | CssProperties["scrollMarginInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari             |  Edge  | IE  |
   * | :----: | :-----: | :----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-left)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  scrollMarginLeft?: ConditionalValue<
    | UtilityValues["scrollMarginLeft"]
    | CssVars
    | CssProperties["scrollMarginLeft"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari              |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-right)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  scrollMarginRight?: ConditionalValue<
    | UtilityValues["scrollMarginRight"]
    | CssVars
    | CssProperties["scrollMarginRight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |            Safari             |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------: | :----: | :-: |
   * | **69** | **68**  |           **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-top)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  scrollMarginTop?: ConditionalValue<
    | UtilityValues["scrollMarginTop"]
    | CssVars
    | CssProperties["scrollMarginTop"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,4}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
   */
  scrollPadding?: ConditionalValue<
    | UtilityValues["scrollPadding"]
    | CssVars
    | CssProperties["scrollPadding"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   */
  scrollPaddingBlock?: ConditionalValue<
    | UtilityValues["scrollPaddingBlock"]
    | CssVars
    | CssProperties["scrollPaddingBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
   */
  scrollPaddingBlockEnd?: ConditionalValue<
    | UtilityValues["scrollPaddingBlockEnd"]
    | CssVars
    | CssProperties["scrollPaddingBlockEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
   */
  scrollPaddingBlockStart?: ConditionalValue<
    | UtilityValues["scrollPaddingBlockStart"]
    | CssVars
    | CssProperties["scrollPaddingBlockStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
   */
  scrollPaddingBottom?: ConditionalValue<
    | UtilityValues["scrollPaddingBottom"]
    | CssVars
    | CssProperties["scrollPaddingBottom"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   */
  scrollPaddingInline?: ConditionalValue<
    | UtilityValues["scrollPaddingInline"]
    | CssVars
    | CssProperties["scrollPaddingInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
   */
  scrollPaddingInlineEnd?: ConditionalValue<
    | UtilityValues["scrollPaddingInlineEnd"]
    | CssVars
    | CssProperties["scrollPaddingInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
   */
  scrollPaddingInlineStart?: ConditionalValue<
    | UtilityValues["scrollPaddingInlineStart"]
    | CssVars
    | CssProperties["scrollPaddingInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
   */
  scrollPaddingLeft?: ConditionalValue<
    | UtilityValues["scrollPaddingLeft"]
    | CssVars
    | CssProperties["scrollPaddingLeft"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
   */
  scrollPaddingRight?: ConditionalValue<
    | UtilityValues["scrollPaddingRight"]
    | CssVars
    | CssProperties["scrollPaddingRight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `auto | <length-percentage>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **68**  | **14.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
   */
  scrollPaddingTop?: ConditionalValue<
    | UtilityValues["scrollPaddingTop"]
    | CssVars
    | CssProperties["scrollPaddingTop"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `[ none | start | end | center ]{1,2}`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
   */
  scrollSnapAlign?: ConditionalValue<
    CssProperties["scrollSnapAlign"] | AnyString
  >
  scrollSnapCoordinate?: ConditionalValue<
    CssProperties["scrollSnapCoordinate"] | AnyString
  >
  scrollSnapDestination?: ConditionalValue<
    CssProperties["scrollSnapDestination"] | AnyString
  >
  scrollSnapPointsX?: ConditionalValue<
    CssProperties["scrollSnapPointsX"] | AnyString
  >
  scrollSnapPointsY?: ConditionalValue<
    CssProperties["scrollSnapPointsY"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2022.
   *
   * **Syntax**: `normal | always`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **75** | **103** | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
   */
  scrollSnapStop?: ConditionalValue<CssProperties["scrollSnapStop"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2022.
   *
   * **Syntax**: `none | [ x | y | block | inline | both ] [ mandatory | proximity ]?`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |      IE      |
   * | :----: | :-----: | :-----: | :----: | :----------: |
   * | **69** |  39-68  | **11**  | **79** | **10** _-x-_ |
   * |        |         | 9 _-x-_ |        |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
   */
  scrollSnapType?: ConditionalValue<
    | UtilityValues["scrollSnapType"]
    | CssVars
    | CssProperties["scrollSnapType"]
    | AnyString
  >
  scrollSnapTypeX?: ConditionalValue<
    CssProperties["scrollSnapTypeX"] | AnyString
  >
  scrollSnapTypeY?: ConditionalValue<
    CssProperties["scrollSnapTypeY"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <'scroll-timeline-name'> <'scroll-timeline-axis'>? ]#`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
   */
  scrollTimeline?: ConditionalValue<CssProperties["scrollTimeline"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ block | inline | x | y ]#`
   *
   * **Initial value**: `block`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
   */
  scrollTimelineAxis?: ConditionalValue<
    CssProperties["scrollTimelineAxis"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ none | <dashed-ident> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
   */
  scrollTimelineName?: ConditionalValue<
    CssProperties["scrollTimelineName"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | <color>{2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **121** | **64**  |   No   | **121** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
   */
  scrollbarColor?: ConditionalValue<
    | UtilityValues["scrollbarColor"]
    | CssVars
    | CssProperties["scrollbarColor"]
    | AnyString
  >
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | stable && both-edges?`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **94** | **97**  | **18.2** | **94** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
   */
  scrollbarGutter?: ConditionalValue<
    CssProperties["scrollbarGutter"] | AnyString
  >
  /**
   * Since December 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | thin | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **121** | **64**  | **18.2** | **121** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
   */
  scrollbarWidth?: ConditionalValue<
    | UtilityValues["scrollbarWidth"]
    | CssVars
    | CssProperties["scrollbarWidth"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<opacity-value>`
   *
   * **Initial value**: `0.0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-image-threshold
   */
  shapeImageThreshold?: ConditionalValue<
    CssProperties["shapeImageThreshold"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-margin
   */
  shapeMargin?: ConditionalValue<CssProperties["shapeMargin"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ <shape-box> || <basic-shape> ] | <image>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **37** | **62**  | **10.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
   */
  shapeOutside?: ConditionalValue<CssProperties["shapeOutside"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | optimizeSpeed | crispEdges | geometricPrecision`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |  **3**  | **4**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
   */
  shapeRendering?: ConditionalValue<CssProperties["shapeRendering"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'color'>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
   */
  stopColor?: ConditionalValue<CssProperties["stopColor"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `black`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-opacity
   */
  stopOpacity?: ConditionalValue<CssProperties["stopOpacity"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<paint>`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
   */
  stroke?: ConditionalValue<
    UtilityValues["stroke"] | CssVars | CssProperties["stroke"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `none | <dasharray>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
   */
  strokeDasharray?: ConditionalValue<
    CssProperties["strokeDasharray"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length-percentage> | <number>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
   */
  strokeDashoffset?: ConditionalValue<
    CssProperties["strokeDashoffset"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `butt | round | square`
   *
   * **Initial value**: `butt`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
   */
  strokeLinecap?: ConditionalValue<CssProperties["strokeLinecap"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `miter | miter-clip | round | bevel | arcs`
   *
   * **Initial value**: `miter`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
   */
  strokeLinejoin?: ConditionalValue<CssProperties["strokeLinejoin"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<number>`
   *
   * **Initial value**: `4`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
   */
  strokeMiterlimit?: ConditionalValue<
    CssProperties["strokeMiterlimit"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<'opacity'>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
   */
  strokeOpacity?: ConditionalValue<CssProperties["strokeOpacity"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length-percentage> | <number>`
   *
   * **Initial value**: `1px`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  | **1.5** | **4**  | **≤15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-width
   */
  strokeWidth?: ConditionalValue<CssProperties["strokeWidth"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2021.
   *
   * **Syntax**: `<integer> | <length>`
   *
   * **Initial value**: `8`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **21** | **91**  | **7**  | **79** | No  |
   * |        | 4 _-x-_ |        |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/tab-size
   */
  tabSize?: ConditionalValue<CssProperties["tabSize"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | fixed`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **14** |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
   */
  tableLayout?: ConditionalValue<CssProperties["tableLayout"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `start | end | left | right | center | justify | match-parent`
   *
   * **Initial value**: `start`, or a nameless value that acts as `left` if _direction_ is `ltr`, `right` if _direction_ is `rtl` if `start` is not supported by the browser.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
   */
  textAlign?: ConditionalValue<CssProperties["textAlign"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2022.
   *
   * **Syntax**: `auto | start | end | left | right | center | justify`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **47** | **49**  | **16** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
   */
  textAlignLast?: ConditionalValue<CssProperties["textAlignLast"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2016.
   *
   * **Syntax**: `start | middle | end`
   *
   * **Initial value**: `start`
   *
   * | Chrome | Firefox | Safari |  Edge   | IE  |
   * | :----: | :-----: | :----: | :-----: | :-: |
   * | **1**  |  **3**  | **4**  | **≤14** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
   */
  textAnchor?: ConditionalValue<CssProperties["textAnchor"] | AnyString>
  /**
   * **Syntax**: `normal | <'text-box-trim'> || <'text-box-edge'>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **133** |   No    | **18.2** | **133** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
   */
  textBox?: ConditionalValue<CssProperties["textBox"] | AnyString>
  /**
   * **Syntax**: `auto | <text-edge>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **133** |   No    | **18.2** | **133** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
   */
  textBoxEdge?: ConditionalValue<CssProperties["textBoxEdge"] | AnyString>
  /**
   * **Syntax**: `none | trim-start | trim-end | trim-both`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **133** |   No    | **18.2** | **133** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
   */
  textBoxTrim?: ConditionalValue<CssProperties["textBoxTrim"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | all | [ digits <integer>? ]`
   *
   * **Initial value**: `none`
   *
   * |           Chrome           | Firefox |            Safari            |  Edge  |                   IE                   |
   * | :------------------------: | :-----: | :--------------------------: | :----: | :------------------------------------: |
   * |           **48**           | **48**  |           **15.4**           | **79** | **11** _(-ms-text-combine-horizontal)_ |
   * | 9 _(-webkit-text-combine)_ |         | 5.1 _(-webkit-text-combine)_ |        |                                        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
   */
  textCombineUpright?: ConditionalValue<
    CssProperties["textCombineUpright"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
   */
  textDecoration?: ConditionalValue<CssProperties["textDecoration"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
   */
  textDecorationColor?: ConditionalValue<
    | UtilityValues["textDecorationColor"]
    | CssVars
    | CssProperties["textDecorationColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
   */
  textDecorationLine?: ConditionalValue<
    CssProperties["textDecorationLine"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]`
   *
   * **Initial value**: `objects`
   *
   * | Chrome | Firefox |  Safari  | Edge | IE  |
   * | :----: | :-----: | :------: | :--: | :-: |
   * | 57-64  |   No    | **12.1** |  No  | No  |
   * |        |         | 7 _-x-_  |      |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
   */
  textDecorationSkip?: ConditionalValue<
    CssProperties["textDecorationSkip"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | all | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **64** | **70**  | **15.4** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
   */
  textDecorationSkipInk?: ConditionalValue<
    CssProperties["textDecorationSkipInk"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `solid | double | dotted | dashed | wavy`
   *
   * **Initial value**: `solid`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **36**  | **12.1** | **79** | No  |
   * |        |         | 8 _-x-_  |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
   */
  textDecorationStyle?: ConditionalValue<
    CssProperties["textDecorationStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2021.
   *
   * **Syntax**: `auto | from-font | <length> | <percentage> `
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **89** | **70**  | **12.1** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
   */
  textDecorationThickness?: ConditionalValue<
    CssProperties["textDecorationThickness"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<'text-emphasis-style'> || <'text-emphasis-color'>`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
   */
  textEmphasis?: ConditionalValue<CssProperties["textEmphasis"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
   */
  textEmphasisColor?: ConditionalValue<
    | UtilityValues["textEmphasisColor"]
    | CssVars
    | CssProperties["textEmphasisColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `auto | [ over | under ] && [ right | left ]?`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
   */
  textEmphasisPosition?: ConditionalValue<
    CssProperties["textEmphasisPosition"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
   *
   * **Syntax**: `none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>`
   *
   * **Initial value**: `none`
   *
   * |  Chrome  | Firefox | Safari |   Edge   | IE  |
   * | :------: | :-----: | :----: | :------: | :-: |
   * |  **99**  | **46**  | **7**  |  **99**  | No  |
   * | 25 _-x-_ |         |        | 79 _-x-_ |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
   */
  textEmphasisStyle?: ConditionalValue<
    CssProperties["textEmphasisStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> && hanging? && each-line?`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-indent
   */
  textIndent?: ConditionalValue<
    | UtilityValues["textIndent"]
    | CssVars
    | CssProperties["textIndent"]
    | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | inter-character | inter-word | none`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge  |   IE   |
   * | :----: | :-----: | :----: | :---: | :----: |
   * |   No   | **55**  |   No   | 12-79 | **11** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
   */
  textJustify?: ConditionalValue<CssProperties["textJustify"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2020.
   *
   * **Syntax**: `mixed | upright | sideways`
   *
   * **Initial value**: `mixed`
   *
   * |  Chrome  | Firefox |  Safari   |  Edge  | IE  |
   * | :------: | :-----: | :-------: | :----: | :-: |
   * |  **48**  | **41**  |  **14**   | **79** | No  |
   * | 12 _-x-_ |         | 5.1 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
   */
  textOrientation?: ConditionalValue<
    CssProperties["textOrientation"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `[ clip | ellipsis | <string> ]{1,2}`
   *
   * **Initial value**: `clip`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **7**  | **1.3** | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-overflow
   */
  textOverflow?: ConditionalValue<CssProperties["textOverflow"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | optimizeSpeed | optimizeLegibility | geometricPrecision`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **4**  |  **1**  | **5**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
   */
  textRendering?: ConditionalValue<CssProperties["textRendering"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow-t>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE   |
   * | :----: | :-----: | :-----: | :----: | :----: |
   * | **2**  | **3.5** | **1.1** | **12** | **10** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
   */
  textShadow?: ConditionalValue<
    | UtilityValues["textShadow"]
    | CssVars
    | CssProperties["textShadow"]
    | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | auto | <percentage>`
   *
   * **Initial value**: `auto` for smartphone browsers supporting inflation, `none` in other cases (and then not modifiable).
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **54** |   No    |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
   */
  textSizeAdjust?: ConditionalValue<CssProperties["textSizeAdjust"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `space-all | normal | space-first | trim-start`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **123** |   No    |   No   | **123** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
   */
  textSpacingTrim?: ConditionalValue<
    CssProperties["textSpacingTrim"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | [ capitalize | uppercase | lowercase ] || full-width || full-size-kana | math-auto`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
   */
  textTransform?: ConditionalValue<CssProperties["textTransform"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since November 2020.
   *
   * **Syntax**: `auto | <length> | <percentage> `
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **70**  | **12.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
   */
  textUnderlineOffset?: ConditionalValue<
    CssProperties["textUnderlineOffset"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2020.
   *
   * **Syntax**: `auto | from-font | [ under || [ left | right ] ]`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :------: | :----: | :---: |
   * | **33** | **74**  | **12.1** | **12** | **6** |
   * |        |         | 9 _-x-_  |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
   */
  textUnderlinePosition?: ConditionalValue<
    CssProperties["textUnderlinePosition"] | AnyString
  >
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<'text-wrap-mode'> || <'text-wrap-style'>`
   *
   * **Initial value**: `wrap`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **114** | **121** | **17.4** | **114** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
   */
  textWrap?: ConditionalValue<
    UtilityValues["textWrap"] | CssVars | CssProperties["textWrap"] | AnyString
  >
  /**
   * Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `wrap | nowrap`
   *
   * **Initial value**: `wrap`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **130** | **124** | **17.4** | **130** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
   */
  textWrapMode?: ConditionalValue<CssProperties["textWrapMode"] | AnyString>
  /**
   * Since October 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `auto | balance | stable | pretty`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **130** | **124** | **17.5** | **130** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
   */
  textWrapStyle?: ConditionalValue<CssProperties["textWrapStyle"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `none | <dashed-ident>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **116** |   No    | **26** | **116** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
   */
  timelineScope?: ConditionalValue<CssProperties["timelineScope"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage> | <anchor()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
   */
  top?: ConditionalValue<
    UtilityValues["top"] | CssVars | CssProperties["top"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2019.
   *
   * **Syntax**: `auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |    IE    |
   * | :----: | :-----: | :----: | :----: | :------: |
   * | **36** | **52**  | **13** | **12** |  **11**  |
   * |        |         |        |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
   */
  touchAction?: ConditionalValue<
    CssVars | CssProperties["touchAction"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <transform-list>`
   *
   * **Initial value**: `none`
   *
   * | Chrome  |  Firefox  |  Safari   |  Edge  |   IE    |
   * | :-----: | :-------: | :-------: | :----: | :-----: |
   * | **36**  |  **16**   |   **9**   | **12** | **10**  |
   * | 1 _-x-_ | 3.5 _-x-_ | 3.1 _-x-_ |        | 9 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform
   */
  transform?: ConditionalValue<CssProperties["transform"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `content-box | border-box | fill-box | stroke-box | view-box`
   *
   * **Initial value**: `view-box`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **64** | **55**  | **11** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
   */
  transformBox?: ConditionalValue<
    CssVars | CssProperties["transformBox"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?`
   *
   * **Initial value**: `50% 50% 0`
   *
   * | Chrome  |  Firefox  | Safari  |  Edge  |   IE    |
   * | :-----: | :-------: | :-----: | :----: | :-----: |
   * | **36**  |  **16**   |  **9**  | **12** | **10**  |
   * | 1 _-x-_ | 3.5 _-x-_ | 2 _-x-_ |        | 9 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
   */
  transformOrigin?: ConditionalValue<
    CssProperties["transformOrigin"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `flat | preserve-3d`
   *
   * **Initial value**: `flat`
   *
   * |  Chrome  | Firefox  | Safari  |  Edge  | IE  |
   * | :------: | :------: | :-----: | :----: | :-: |
   * |  **36**  |  **16**  |  **9**  | **12** | No  |
   * | 12 _-x-_ | 10 _-x-_ | 4 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
   */
  transformStyle?: ConditionalValue<
    CssVars | CssProperties["transformStyle"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<single-transition>#`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
   */
  transition?: ConditionalValue<
    | UtilityValues["transition"]
    | CssVars
    | CssProperties["transition"]
    | AnyString
  >
  /**
   * Since August 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `<transition-behavior-value>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **117** | **129** | **17.4** | **117** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
   */
  transitionBehavior?: ConditionalValue<
    CssProperties["transitionBehavior"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **26**  | **16**  |  **9**  | **12** | **10** |
   * | 1 _-x-_ |         | 4 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-delay
   */
  transitionDelay?: ConditionalValue<
    | UtilityValues["transitionDelay"]
    | CssVars
    | CssProperties["transitionDelay"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-duration
   */
  transitionDuration?: ConditionalValue<
    | UtilityValues["transitionDuration"]
    | CssVars
    | CssProperties["transitionDuration"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `none | <single-transition-property>#`
   *
   * **Initial value**: all
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
   */
  transitionProperty?: ConditionalValue<
    | UtilityValues["transitionProperty"]
    | CssVars
    | CssProperties["transitionProperty"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `<easing-function>#`
   *
   * **Initial value**: `ease`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |   IE   |
   * | :-----: | :-----: | :-------: | :----: | :----: |
   * | **26**  | **16**  |   **9**   | **12** | **10** |
   * | 1 _-x-_ |         | 3.1 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
   */
  transitionTimingFunction?: ConditionalValue<
    | UtilityValues["transitionTimingFunction"]
    | CssVars
    | CssProperties["transitionTimingFunction"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since August 2022.
   *
   * **Syntax**: `none | <length-percentage> [ <length-percentage> <length>? ]?`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **104** | **72**  | **14.1** | **104** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
   */
  translate?: ConditionalValue<
    | UtilityValues["translate"]
    | CssVars
    | CssProperties["translate"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | embed | isolate | bidi-override | isolate-override | plaintext`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE    |
   * | :----: | :-----: | :-----: | :----: | :-----: |
   * | **2**  |  **1**  | **1.3** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
   */
  unicodeBidi?: ConditionalValue<CssProperties["unicodeBidi"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `auto | text | none | all`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox |   Safari    |   Edge   |      IE      |
   * | :-----: | :-----: | :---------: | :------: | :----------: |
   * | **54**  | **69**  | **3** _-x-_ |  **79**  | **10** _-x-_ |
   * | 1 _-x-_ | 1 _-x-_ |             | 12 _-x-_ |              |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
   */
  userSelect?: ConditionalValue<
    CssVars | CssProperties["userSelect"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `none | non-scaling-stroke | non-scaling-size | non-rotation | fixed-position`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **6**  | **15**  | **5.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
   */
  vectorEffect?: ConditionalValue<CssProperties["vectorEffect"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>`
   *
   * **Initial value**: `baseline`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
   */
  verticalAlign?: ConditionalValue<CssProperties["verticalAlign"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ <'view-timeline-name'> [ <'view-timeline-axis'> || <'view-timeline-inset'> ]? ]#`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
   */
  viewTimeline?: ConditionalValue<CssProperties["viewTimeline"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ block | inline | x | y ]#`
   *
   * **Initial value**: `block`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
   */
  viewTimelineAxis?: ConditionalValue<
    CssProperties["viewTimelineAxis"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ [ auto | <length-percentage> ]{1,2} ]#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
   */
  viewTimelineInset?: ConditionalValue<
    CssProperties["viewTimelineInset"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `[ none | <dashed-ident> ]#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **115** |   No    | **26** | **115** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
   */
  viewTimelineName?: ConditionalValue<
    CssProperties["viewTimelineName"] | AnyString
  >
  /**
   * Since October 2025, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `none | <custom-ident> | match-element`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari |  Edge   | IE  |
   * | :-----: | :-----: | :----: | :-----: | :-: |
   * | **111** | **144** | **18** | **111** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
   */
  viewTransitionName?: ConditionalValue<
    CssProperties["viewTransitionName"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `visible | hidden | collapse`
   *
   * **Initial value**: `visible`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/visibility
   */
  visibility?: ConditionalValue<
    CssVars | CssProperties["visibility"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | pre | pre-wrap | pre-line | <'white-space-collapse'> || <'text-wrap-mode'>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
   */
  whiteSpace?: ConditionalValue<CssProperties["whiteSpace"] | AnyString>
  /**
   * Since March 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `collapse | preserve | preserve-breaks | preserve-spaces | break-spaces`
   *
   * **Initial value**: `collapse`
   *
   * | Chrome  | Firefox |  Safari  |  Edge   | IE  |
   * | :-----: | :-----: | :------: | :-----: | :-: |
   * | **114** | **124** | **17.4** | **114** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
   */
  whiteSpaceCollapse?: ConditionalValue<
    CssProperties["whiteSpaceCollapse"] | AnyString
  >
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `<integer>`
   *
   * **Initial value**: `2`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **25** |   No    | **1.3** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/widows
   */
  widows?: ConditionalValue<CssProperties["widows"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  width?: ConditionalValue<
    UtilityValues["width"] | CssVars | CssProperties["width"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `auto | <animateable-feature>#`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **36** | **36**  | **9.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
   */
  willChange?: ConditionalValue<CssProperties["willChange"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | break-all | keep-all | break-word | auto-phrase`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  | **15**  | **3**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
   */
  wordBreak?: ConditionalValue<CssVars | CssProperties["wordBreak"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `normal | <length>`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
   */
  wordSpacing?: ConditionalValue<CssProperties["wordSpacing"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2018.
   *
   * **Syntax**: `normal | break-word`
   *
   * **Initial value**: `normal`
   */
  wordWrap?: ConditionalValue<CssProperties["wordWrap"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2017.
   *
   * **Syntax**: `horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr`
   *
   * **Initial value**: `horizontal-tb`
   *
   * | Chrome  | Firefox |  Safari   |  Edge  |  IE   |
   * | :-----: | :-----: | :-------: | :----: | :---: |
   * | **48**  | **41**  | **10.1**  | **12** | **9** |
   * | 8 _-x-_ |         | 5.1 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
   */
  writingMode?: ConditionalValue<
    CssVars | CssProperties["writingMode"] | AnyString
  >
  x?: ConditionalValue<UtilityValues["translateX"] | CssVars | AnyString>
  y?: ConditionalValue<UtilityValues["translateY"] | CssVars | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <integer>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/z-index
   */
  zIndex?: ConditionalValue<
    UtilityValues["zIndex"] | CssVars | CssProperties["zIndex"] | AnyString
  >
  /**
   * Since May 2024, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
   *
   * **Syntax**: `normal | reset | <number [0,∞]> || <percentage [0,∞]>`
   *
   * **Initial value**: `1`
   *
   * | Chrome | Firefox | Safari  |  Edge  |   IE    |
   * | :----: | :-----: | :-----: | :----: | :-----: |
   * | **1**  | **126** | **3.1** | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
   */
  zoom?: ConditionalValue<CssProperties["zoom"] | AnyString>
  /**
   * This feature is not Baseline because it does not work in some of the most widely-used browsers.
   *
   * **Syntax**: `baseline | alphabetic | ideographic | middle | central | mathematical | text-before-edge | text-after-edge`
   *
   * **Initial value**: `baseline`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **1**  |   No    | **5.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/alignment-baseline
   */
  alignmentBaseline?: ConditionalValue<
    CssProperties["alignmentBaseline"] | AnyString
  >
  /**
   * **Syntax**: `<length-percentage> | sub | super | baseline`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **1**  |   No    | **4**  | **79** | No  |
   */
  baselineShift?: ConditionalValue<CssProperties["baselineShift"] | AnyString>
  colorInterpolation?: ConditionalValue<
    CssProperties["colorInterpolation"] | AnyString
  >
  colorRendering?: ConditionalValue<CssProperties["colorRendering"] | AnyString>
  glyphOrientationVertical?: ConditionalValue<
    CssProperties["glyphOrientationVertical"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `static | relative | absolute | sticky | fixed`
   *
   * **Initial value**: `static`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
   */
  pos?: ConditionalValue<CssProperties["position"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline
   */
  insetX?: ConditionalValue<
    | UtilityValues["insetInline"]
    | CssVars
    | CssProperties["insetInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-block
   */
  insetY?: ConditionalValue<
    | UtilityValues["insetBlock"]
    | CssVars
    | CssProperties["insetBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  insetEnd?: ConditionalValue<
    | UtilityValues["insetInlineEnd"]
    | CssVars
    | CssProperties["insetInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-end
   */
  end?: ConditionalValue<
    | UtilityValues["insetInlineEnd"]
    | CssVars
    | CssProperties["insetInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  insetStart?: ConditionalValue<
    | UtilityValues["insetInlineStart"]
    | CssVars
    | CssProperties["insetInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **63**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset-inline-start
   */
  start?: ConditionalValue<
    | UtilityValues["insetInlineStart"]
    | CssVars
    | CssProperties["insetInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2015.
   *
   * **Syntax**: `row | row-reverse | column | column-reverse`
   *
   * **Initial value**: `row`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |    IE    |
   * | :------: | :-----: | :-----: | :----: | :------: |
   * |  **29**  | **22**  |  **9**  | **12** |  **11**  |
   * | 21 _-x-_ |         | 7 _-x-_ |        | 10 _-x-_ |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
   */
  flexDir?: ConditionalValue<CssProperties["flexDirection"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'padding-top'>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding
   */
  p?: ConditionalValue<
    UtilityValues["padding"] | CssVars | CssProperties["padding"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
   */
  pl?: ConditionalValue<
    | UtilityValues["paddingLeft"]
    | CssVars
    | CssProperties["paddingLeft"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
   */
  pr?: ConditionalValue<
    | UtilityValues["paddingRight"]
    | CssVars
    | CssProperties["paddingRight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
   */
  pt?: ConditionalValue<
    | UtilityValues["paddingTop"]
    | CssVars
    | CssProperties["paddingTop"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
   */
  pb?: ConditionalValue<
    | UtilityValues["paddingBottom"]
    | CssVars
    | CssProperties["paddingBottom"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   */
  py?: ConditionalValue<
    | UtilityValues["paddingBlock"]
    | CssVars
    | CssProperties["paddingBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
   */
  paddingY?: ConditionalValue<
    | UtilityValues["paddingBlock"]
    | CssVars
    | CssProperties["paddingBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   */
  paddingX?: ConditionalValue<
    | UtilityValues["paddingInline"]
    | CssVars
    | CssProperties["paddingInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'padding-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
   */
  px?: ConditionalValue<
    | UtilityValues["paddingInline"]
    | CssVars
    | CssProperties["paddingInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome           |        Firefox         |          Safari           |  Edge  | IE  |
   * | :-----------------------: | :--------------------: | :-----------------------: | :----: | :-: |
   * |          **69**           |         **41**         |         **12.1**          | **79** | No  |
   * | 2 _(-webkit-padding-end)_ | 3 _(-moz-padding-end)_ | 3 _(-webkit-padding-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   */
  pe?: ConditionalValue<
    | UtilityValues["paddingInlineEnd"]
    | CssVars
    | CssProperties["paddingInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome           |        Firefox         |          Safari           |  Edge  | IE  |
   * | :-----------------------: | :--------------------: | :-----------------------: | :----: | :-: |
   * |          **69**           |         **41**         |         **12.1**          | **79** | No  |
   * | 2 _(-webkit-padding-end)_ | 3 _(-moz-padding-end)_ | 3 _(-webkit-padding-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
   */
  paddingEnd?: ConditionalValue<
    | UtilityValues["paddingInlineEnd"]
    | CssVars
    | CssProperties["paddingInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome            |         Firefox          |           Safari            |  Edge  | IE  |
   * | :-------------------------: | :----------------------: | :-------------------------: | :----: | :-: |
   * |           **69**            |          **41**          |          **12.1**           | **79** | No  |
   * | 2 _(-webkit-padding-start)_ | 3 _(-moz-padding-start)_ | 3 _(-webkit-padding-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   */
  ps?: ConditionalValue<
    | UtilityValues["paddingInlineStart"]
    | CssVars
    | CssProperties["paddingInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'padding-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome            |         Firefox          |           Safari            |  Edge  | IE  |
   * | :-------------------------: | :----------------------: | :-------------------------: | :----: | :-: |
   * |           **69**            |          **41**          |          **12.1**           | **79** | No  |
   * | 2 _(-webkit-padding-start)_ | 3 _(-moz-padding-start)_ | 3 _(-webkit-padding-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
   */
  paddingStart?: ConditionalValue<
    | UtilityValues["paddingInlineStart"]
    | CssVars
    | CssProperties["paddingInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-left
   */
  ml?: ConditionalValue<
    | UtilityValues["marginLeft"]
    | CssVars
    | CssProperties["marginLeft"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-right
   */
  mr?: ConditionalValue<
    | UtilityValues["marginRight"]
    | CssVars
    | CssProperties["marginRight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-top
   */
  mt?: ConditionalValue<
    | UtilityValues["marginTop"]
    | CssVars
    | CssProperties["marginTop"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage> | auto | <anchor-size()>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-bottom
   */
  mb?: ConditionalValue<
    | UtilityValues["marginBottom"]
    | CssVars
    | CssProperties["marginBottom"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<'margin-top'>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin
   */
  m?: ConditionalValue<
    UtilityValues["margin"] | CssVars | CssProperties["margin"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  my?: ConditionalValue<
    | UtilityValues["marginBlock"]
    | CssVars
    | CssProperties["marginBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-block
   */
  marginY?: ConditionalValue<
    | UtilityValues["marginBlock"]
    | CssVars
    | CssProperties["marginBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  mx?: ConditionalValue<
    | UtilityValues["marginInline"]
    | CssVars
    | CssProperties["marginInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'margin-top'>{1,2}`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline
   */
  marginX?: ConditionalValue<
    | UtilityValues["marginInline"]
    | CssVars
    | CssProperties["marginInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome          |        Firefox        |          Safari          |  Edge  | IE  |
   * | :----------------------: | :-------------------: | :----------------------: | :----: | :-: |
   * |          **69**          |        **41**         |         **12.1**         | **79** | No  |
   * | 2 _(-webkit-margin-end)_ | 3 _(-moz-margin-end)_ | 3 _(-webkit-margin-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  me?: ConditionalValue<
    | UtilityValues["marginInlineEnd"]
    | CssVars
    | CssProperties["marginInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome          |        Firefox        |          Safari          |  Edge  | IE  |
   * | :----------------------: | :-------------------: | :----------------------: | :----: | :-: |
   * |          **69**          |        **41**         |         **12.1**         | **79** | No  |
   * | 2 _(-webkit-margin-end)_ | 3 _(-moz-margin-end)_ | 3 _(-webkit-margin-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-end
   */
  marginEnd?: ConditionalValue<
    | UtilityValues["marginInlineEnd"]
    | CssVars
    | CssProperties["marginInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome           |         Firefox         |           Safari           |  Edge  | IE  |
   * | :------------------------: | :---------------------: | :------------------------: | :----: | :-: |
   * |           **69**           |         **41**          |          **12.1**          | **79** | No  |
   * | 2 _(-webkit-margin-start)_ | 3 _(-moz-margin-start)_ | 3 _(-webkit-margin-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  ms?: ConditionalValue<
    | UtilityValues["marginInlineStart"]
    | CssVars
    | CssProperties["marginInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'margin-top'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome           |         Firefox         |           Safari           |  Edge  | IE  |
   * | :------------------------: | :---------------------: | :------------------------: | :----: | :-: |
   * |           **69**           |         **41**          |          **12.1**          | **79** | No  |
   * | 2 _(-webkit-margin-start)_ | 3 _(-moz-margin-start)_ | 3 _(-webkit-margin-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/margin-inline-start
   */
  marginStart?: ConditionalValue<
    | UtilityValues["marginInlineStart"]
    | CssVars
    | CssProperties["marginInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<line-width>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-width
   */
  ringWidth?: ConditionalValue<CssProperties["outlineWidth"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-color
   */
  ringColor?: ConditionalValue<
    | UtilityValues["outlineColor"]
    | CssVars
    | CssProperties["outlineColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2023.
   *
   * **Syntax**: `<'outline-width'> || <'outline-style'> || <'outline-color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :------: | :----: | :---: |
   * | **94** | **88**  | **16.4** | **94** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline
   */
  ring?: ConditionalValue<
    UtilityValues["outline"] | CssVars | CssProperties["outline"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2017.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari  |  Edge  | IE  |
   * | :----: | :-----: | :-----: | :----: | :-: |
   * | **1**  | **1.5** | **1.2** | **15** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/outline-offset
   */
  ringOffset?: ConditionalValue<
    | UtilityValues["outlineOffset"]
    | CssVars
    | CssProperties["outlineOffset"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
   */
  w?: ConditionalValue<
    UtilityValues["width"] | CssVars | CssProperties["width"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-width
   */
  minW?: ConditionalValue<
    UtilityValues["minWidth"] | CssVars | CssProperties["minWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-width
   */
  maxW?: ConditionalValue<
    UtilityValues["maxWidth"] | CssVars | CssProperties["maxWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/height
   */
  h?: ConditionalValue<
    UtilityValues["height"] | CssVars | CssProperties["height"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `auto | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **3**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/min-height
   */
  minH?: ConditionalValue<
    | UtilityValues["minHeight"]
    | CssVars
    | CssProperties["minHeight"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <length-percentage [0,∞]> | min-content | max-content | fit-content | fit-content(<length-percentage [0,∞]>) | <calc-size()> | <anchor-size()>`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **1**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/max-height
   */
  maxH?: ConditionalValue<
    | UtilityValues["maxHeight"]
    | CssVars
    | CssProperties["maxHeight"]
    | AnyString
  >
  textShadowColor?: ConditionalValue<
    UtilityValues["textShadowColor"] | CssVars | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-position>#`
   *
   * **Initial value**: `0% 0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position
   */
  bgPosition?: ConditionalValue<CssProperties["backgroundPosition"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-x
   */
  bgPositionX?: ConditionalValue<
    CssProperties["backgroundPositionX"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2016.
   *
   * **Syntax**: `[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#`
   *
   * **Initial value**: `0%`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  | **49**  | **1**  | **12** | **6** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-position-y
   */
  bgPositionY?: ConditionalValue<
    CssProperties["backgroundPositionY"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<attachment>#`
   *
   * **Initial value**: `scroll`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-attachment
   */
  bgAttachment?: ConditionalValue<
    CssProperties["backgroundAttachment"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-clip>#`
   *
   * **Initial value**: `border-box`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **4**  |  **5**  | **12** | **9** |
   * |        |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-clip
   */
  bgClip?: ConditionalValue<CssProperties["backgroundClip"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-layer>#? , <final-bg-layer>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background
   */
  bg?: ConditionalValue<
    | UtilityValues["background"]
    | CssVars
    | CssProperties["background"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `transparent`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-color
   */
  bgColor?: ConditionalValue<
    | UtilityValues["backgroundColor"]
    | CssVars
    | CssProperties["backgroundColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<visual-box>#`
   *
   * **Initial value**: `padding-box`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **4**  | **3**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-origin
   */
  bgOrigin?: ConditionalValue<CssProperties["backgroundOrigin"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-image>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-image
   */
  bgImage?: ConditionalValue<CssProperties["backgroundImage"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<repeat-style>#`
   *
   * **Initial value**: `repeat`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-repeat
   */
  bgRepeat?: ConditionalValue<CssProperties["backgroundRepeat"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<blend-mode>#`
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **35** | **30**  | **8**  | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-blend-mode
   */
  bgBlendMode?: ConditionalValue<
    CssProperties["backgroundBlendMode"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<bg-size>#`
   *
   * **Initial value**: `auto auto`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **3**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/background-size
   */
  bgSize?: ConditionalValue<CssProperties["backgroundSize"] | AnyString>
  bgGradient?: ConditionalValue<
    UtilityValues["backgroundGradient"] | CssVars | AnyString
  >
  bgLinear?: ConditionalValue<
    UtilityValues["backgroundLinear"] | CssVars | AnyString
  >
  bgRadial?: ConditionalValue<string | number | AnyString>
  bgConic?: ConditionalValue<string | number | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,4} [ / <length-percentage [0,∞]>{1,4} ]?`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-radius
   */
  rounded?: ConditionalValue<
    | UtilityValues["borderRadius"]
    | CssVars
    | CssProperties["borderRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-left-radius
   */
  roundedTopLeft?: ConditionalValue<
    | UtilityValues["borderTopLeftRadius"]
    | CssVars
    | CssProperties["borderTopLeftRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-top-right-radius
   */
  roundedTopRight?: ConditionalValue<
    | UtilityValues["borderTopRightRadius"]
    | CssVars
    | CssProperties["borderTopRightRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-right-radius
   */
  roundedBottomRight?: ConditionalValue<
    | UtilityValues["borderBottomRightRadius"]
    | CssVars
    | CssProperties["borderBottomRightRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `<length-percentage [0,∞]>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-bottom-left-radius
   */
  roundedBottomLeft?: ConditionalValue<
    | UtilityValues["borderBottomLeftRadius"]
    | CssVars
    | CssProperties["borderBottomLeftRadius"]
    | AnyString
  >
  roundedTop?: ConditionalValue<
    UtilityValues["borderTopRadius"] | CssVars | AnyString
  >
  roundedRight?: ConditionalValue<
    UtilityValues["borderRightRadius"] | CssVars | AnyString
  >
  roundedBottom?: ConditionalValue<
    UtilityValues["borderBottomRadius"] | CssVars | AnyString
  >
  roundedLeft?: ConditionalValue<
    UtilityValues["borderLeftRadius"] | CssVars | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-start-radius
   */
  roundedStartStart?: ConditionalValue<
    | UtilityValues["borderStartStartRadius"]
    | CssVars
    | CssProperties["borderStartStartRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-start-end-radius
   */
  roundedStartEnd?: ConditionalValue<
    | UtilityValues["borderStartEndRadius"]
    | CssVars
    | CssProperties["borderStartEndRadius"]
    | AnyString
  >
  roundedStart?: ConditionalValue<
    UtilityValues["borderStartRadius"] | CssVars | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-start-radius
   */
  roundedEndStart?: ConditionalValue<
    | UtilityValues["borderEndStartRadius"]
    | CssVars
    | CssProperties["borderEndStartRadius"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<'border-top-left-radius'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **89** | **66**  | **15** | **89** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-end-end-radius
   */
  roundedEndEnd?: ConditionalValue<
    | UtilityValues["borderEndEndRadius"]
    | CssVars
    | CssProperties["borderEndEndRadius"]
    | AnyString
  >
  roundedEnd?: ConditionalValue<
    UtilityValues["borderEndRadius"] | CssVars | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-block-start'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline
   */
  borderX?: ConditionalValue<
    | UtilityValues["borderInline"]
    | CssVars
    | CssProperties["borderInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-width'>{1,2}`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-width
   */
  borderXWidth?: ConditionalValue<
    CssProperties["borderInlineWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-color
   */
  borderXColor?: ConditionalValue<
    | UtilityValues["borderInlineColor"]
    | CssVars
    | CssProperties["borderInlineColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-block-start'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block
   */
  borderY?: ConditionalValue<
    | UtilityValues["borderBlock"]
    | CssVars
    | CssProperties["borderBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-width'>{1,2}`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-width
   */
  borderYWidth?: ConditionalValue<CssProperties["borderBlockWidth"] | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<'border-top-color'>{1,2}`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **87** | **66**  | **14.1** | **87** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-color
   */
  borderYColor?: ConditionalValue<
    | UtilityValues["borderBlockColor"]
    | CssVars
    | CssProperties["borderBlockColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start
   */
  borderStart?: ConditionalValue<
    | UtilityValues["borderInlineStart"]
    | CssVars
    | CssProperties["borderInlineStart"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-width
   */
  borderStartWidth?: ConditionalValue<
    CssProperties["borderInlineStartWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |            Firefox            |  Safari  |  Edge  | IE  |
   * | :----: | :---------------------------: | :------: | :----: | :-: |
   * | **69** |            **41**             | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-start-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-start-color
   */
  borderStartColor?: ConditionalValue<
    | UtilityValues["borderInlineStartColor"]
    | CssVars
    | CssProperties["borderInlineStartColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <color>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end
   */
  borderEnd?: ConditionalValue<
    | UtilityValues["borderInlineEnd"]
    | CssVars
    | CssProperties["borderInlineEnd"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-width'>`
   *
   * **Initial value**: `medium`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-width)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-width
   */
  borderEndWidth?: ConditionalValue<
    CssProperties["borderInlineEndWidth"] | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome |           Firefox           |  Safari  |  Edge  | IE  |
   * | :----: | :-------------------------: | :------: | :----: | :-: |
   * | **69** |           **41**            | **12.1** | **79** | No  |
   * |        | 3 _(-moz-border-end-color)_ |          |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-inline-end-color
   */
  borderEndColor?: ConditionalValue<
    | UtilityValues["borderInlineEndColor"]
    | CssVars
    | CssProperties["borderInlineEndColor"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.
   *
   * **Syntax**: `none | <shadow>#`
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  |  **4**  | **5.1** | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-shadow
   */
  shadow?: ConditionalValue<
    | UtilityValues["boxShadow"]
    | CssVars
    | CssProperties["boxShadow"]
    | AnyString
  >
  shadowColor?: ConditionalValue<
    UtilityValues["boxShadowColor"] | CssVars | AnyString
  >
  z?: ConditionalValue<UtilityValues["translateZ"] | CssVars | AnyString>
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
   */
  scrollMarginY?: ConditionalValue<
    | UtilityValues["scrollMarginBlock"]
    | CssVars
    | CssProperties["scrollMarginBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `<length>{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
   */
  scrollMarginX?: ConditionalValue<
    | UtilityValues["scrollMarginInline"]
    | CssVars
    | CssProperties["scrollMarginInline"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
   */
  scrollPaddingY?: ConditionalValue<
    | UtilityValues["scrollPaddingBlock"]
    | CssVars
    | CssProperties["scrollPaddingBlock"]
    | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
   *
   * **Syntax**: `[ auto | <length-percentage> ]{1,2}`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **68**  | **15** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
   */
  scrollPaddingX?: ConditionalValue<
    | UtilityValues["scrollPaddingInline"]
    | CssVars
    | CssProperties["scrollPaddingInline"]
    | AnyString
  >
  hideFrom?: ConditionalValue<UtilityValues["hideFrom"] | CssVars | AnyString>
  hideBelow?: ConditionalValue<UtilityValues["hideBelow"] | CssVars | AnyString>
  spaceX?: ConditionalValue<UtilityValues["spaceX"] | CssVars | AnyString>
  spaceY?: ConditionalValue<UtilityValues["spaceY"] | CssVars | AnyString>
  focusRing?: ConditionalValue<UtilityValues["focusRing"] | CssVars | AnyString>
  focusVisibleRing?: ConditionalValue<
    UtilityValues["focusVisibleRing"] | CssVars | AnyString
  >
  focusRingColor?: ConditionalValue<
    UtilityValues["focusRingColor"] | CssVars | AnyString
  >
  focusRingOffset?: ConditionalValue<
    UtilityValues["focusRingOffset"] | CssVars | AnyString
  >
  focusRingWidth?: ConditionalValue<
    UtilityValues["focusRingWidth"] | CssVars | AnyString
  >
  focusRingStyle?: ConditionalValue<
    UtilityValues["focusRingStyle"] | CssVars | AnyString
  >
  divideX?: ConditionalValue<string | number | AnyString>
  divideY?: ConditionalValue<string | number | AnyString>
  divideColor?: ConditionalValue<
    UtilityValues["divideColor"] | CssVars | AnyString
  >
  divideStyle?: ConditionalValue<
    UtilityValues["divideStyle"] | CssVars | AnyString
  >
  boxSize?: ConditionalValue<UtilityValues["boxSize"] | CssVars | AnyString>
  fontSmoothing?: ConditionalValue<
    UtilityValues["fontSmoothing"] | CssVars | AnyString
  >
  truncate?: ConditionalValue<UtilityValues["truncate"] | CssVars | AnyString>
  backgroundGradient?: ConditionalValue<
    UtilityValues["backgroundGradient"] | CssVars | AnyString
  >
  backgroundLinear?: ConditionalValue<
    UtilityValues["backgroundLinear"] | CssVars | AnyString
  >
  backgroundRadial?: ConditionalValue<string | number | AnyString>
  backgroundConic?: ConditionalValue<string | number | AnyString>
  textGradient?: ConditionalValue<
    UtilityValues["textGradient"] | CssVars | AnyString
  >
  gradientFromPosition?: ConditionalValue<string | number | AnyString>
  gradientToPosition?: ConditionalValue<string | number | AnyString>
  gradientFrom?: ConditionalValue<
    UtilityValues["gradientFrom"] | CssVars | AnyString
  >
  gradientTo?: ConditionalValue<
    UtilityValues["gradientTo"] | CssVars | AnyString
  >
  gradientVia?: ConditionalValue<
    UtilityValues["gradientVia"] | CssVars | AnyString
  >
  gradientViaPosition?: ConditionalValue<string | number | AnyString>
  borderTopRadius?: ConditionalValue<
    UtilityValues["borderTopRadius"] | CssVars | AnyString
  >
  borderRightRadius?: ConditionalValue<
    UtilityValues["borderRightRadius"] | CssVars | AnyString
  >
  borderBottomRadius?: ConditionalValue<
    UtilityValues["borderBottomRadius"] | CssVars | AnyString
  >
  borderLeftRadius?: ConditionalValue<
    UtilityValues["borderLeftRadius"] | CssVars | AnyString
  >
  borderStartRadius?: ConditionalValue<
    UtilityValues["borderStartRadius"] | CssVars | AnyString
  >
  borderEndRadius?: ConditionalValue<
    UtilityValues["borderEndRadius"] | CssVars | AnyString
  >
  boxShadowColor?: ConditionalValue<
    UtilityValues["boxShadowColor"] | CssVars | AnyString
  >
  brightness?: ConditionalValue<string | number | AnyString>
  contrast?: ConditionalValue<string | number | AnyString>
  grayscale?: ConditionalValue<string | number | AnyString>
  hueRotate?: ConditionalValue<string | number | AnyString>
  invert?: ConditionalValue<string | number | AnyString>
  saturate?: ConditionalValue<string | number | AnyString>
  sepia?: ConditionalValue<string | number | AnyString>
  dropShadow?: ConditionalValue<string | number | AnyString>
  blur?: ConditionalValue<UtilityValues["blur"] | CssVars | AnyString>
  backdropBlur?: ConditionalValue<
    UtilityValues["backdropBlur"] | CssVars | AnyString
  >
  backdropBrightness?: ConditionalValue<string | number | AnyString>
  backdropContrast?: ConditionalValue<string | number | AnyString>
  backdropGrayscale?: ConditionalValue<string | number | AnyString>
  backdropHueRotate?: ConditionalValue<string | number | AnyString>
  backdropInvert?: ConditionalValue<string | number | AnyString>
  backdropOpacity?: ConditionalValue<string | number | AnyString>
  backdropSaturate?: ConditionalValue<string | number | AnyString>
  backdropSepia?: ConditionalValue<string | number | AnyString>
  borderSpacingX?: ConditionalValue<
    UtilityValues["borderSpacingX"] | CssVars | AnyString
  >
  borderSpacingY?: ConditionalValue<
    UtilityValues["borderSpacingY"] | CssVars | AnyString
  >
  animationState?: ConditionalValue<string | number | AnyString>
  rotateX?: ConditionalValue<UtilityValues["rotateX"] | CssVars | AnyString>
  rotateY?: ConditionalValue<UtilityValues["rotateY"] | CssVars | AnyString>
  rotateZ?: ConditionalValue<UtilityValues["rotateZ"] | CssVars | AnyString>
  scaleX?: ConditionalValue<string | number | AnyString>
  scaleY?: ConditionalValue<string | number | AnyString>
  translateX?: ConditionalValue<
    UtilityValues["translateX"] | CssVars | AnyString
  >
  translateY?: ConditionalValue<
    UtilityValues["translateY"] | CssVars | AnyString
  >
  translateZ?: ConditionalValue<
    UtilityValues["translateZ"] | CssVars | AnyString
  >
  scrollbar?: ConditionalValue<UtilityValues["scrollbar"] | CssVars | AnyString>
  scrollSnapStrictness?: ConditionalValue<
    UtilityValues["scrollSnapStrictness"] | CssVars | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2021.
   *
   * **Syntax**: `<length>{1,4}`
   *
   * | Chrome | Firefox |          Safari           |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------: | :----: | :-: |
   * | **69** |  68-90  |         **14.1**          | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
   */
  scrollSnapMargin?: ConditionalValue<
    UtilityValues["scrollSnapMargin"] | CssVars | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |            Safari             |  Edge  | IE  |
   * | :----: | :-----: | :---------------------------: | :----: | :-: |
   * | **69** | **68**  |           **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-top)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
   */
  scrollSnapMarginTop?: ConditionalValue<
    UtilityValues["scrollSnapMarginTop"] | CssVars | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |              Safari              |  Edge  | IE  |
   * | :----: | :-----: | :------------------------------: | :----: | :-: |
   * | **69** | **68**  |             **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-bottom)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
   */
  scrollSnapMarginBottom?: ConditionalValue<
    UtilityValues["scrollSnapMarginBottom"] | CssVars | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari             |  Edge  | IE  |
   * | :----: | :-----: | :----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**            | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-left)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
   */
  scrollSnapMarginLeft?: ConditionalValue<
    UtilityValues["scrollSnapMarginLeft"] | CssVars | AnyString
  >
  /**
   * This feature is well established and works across many devices and browser versions. It’s been available across browsers since April 2021.
   *
   * **Syntax**: `<length>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |             Safari              |  Edge  | IE  |
   * | :----: | :-----: | :-----------------------------: | :----: | :-: |
   * | **69** | **68**  |            **14.1**             | **79** | No  |
   * |        |         | 11 _(scroll-snap-margin-right)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
   */
  scrollSnapMarginRight?: ConditionalValue<
    UtilityValues["scrollSnapMarginRight"] | CssVars | AnyString
  >
  srOnly?: ConditionalValue<UtilityValues["srOnly"] | CssVars | AnyString>
  debug?: ConditionalValue<UtilityValues["debug"] | CssVars | AnyString>
  colorPalette?: ConditionalValue<
    UtilityValues["colorPalette"] | CssVars | AnyString
  >
  textStyle?: ConditionalValue<UtilityValues["textStyle"] | CssVars | AnyString>
  layerStyle?: ConditionalValue<
    UtilityValues["layerStyle"] | CssVars | AnyString
  >
  animationStyle?: ConditionalValue<
    UtilityValues["animationStyle"] | CssVars | AnyString
  >
}
