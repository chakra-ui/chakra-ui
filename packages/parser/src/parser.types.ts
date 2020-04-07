// Credits: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/styled-system/index.d.ts

import * as CSS from "csstype"
import { Pseudos } from "./configs/pseudo.selector"

export type TLength = string | 0 | number

export type ObjectOrArray<T, K extends keyof any = keyof any> =
  | T[]
  | Record<K, T>

export type RequiredTheme = Required<Theme>

export type Responsive<T, ThemeType extends Theme = RequiredTheme> =
  | T
  | Array<T | null>
  | { [key in keyof ThemeType["breakpoints"]]?: T }

export interface Component {
  /**
   * The initial styles to be applied to the component
   */
  baseStyle?: any
  /**
   * The component's visual style variants
   */
  variants?: any
  /**
   * The component's size variations
   */
  sizes?: any
  /**
   * The default props to apply to the component
   */
  defaultProps?: {
    /**
     * The default variant to use (in variants)
     */
    variant?: string
    /**
     * The default size to use (in sizes)
     */
    size?: string
    /**
     * The default color scheme to use (if variants are defined as functions)
     */
    colorScheme?: string
  }
}

export interface Theme<P = TLength> {
  breakpoints?: Record<string, string | number>
  space?: ObjectOrArray<CSS.MarginProperty<number | string>>
  fontSizes?: ObjectOrArray<CSS.FontSizeProperty<number>>
  colors?: ObjectOrArray<CSS.ColorProperty>
  fonts?: ObjectOrArray<CSS.FontFamilyProperty>
  fontWeights?: ObjectOrArray<CSS.FontWeightProperty>
  lineHeights?: ObjectOrArray<CSS.LineHeightProperty<P>>
  letterSpacings?: ObjectOrArray<CSS.LetterSpacingProperty<P>>
  sizes?: ObjectOrArray<CSS.HeightProperty<{}> | CSS.WidthProperty<{}>>
  borders?: ObjectOrArray<CSS.BorderProperty<{}>>
  borderStyles?: ObjectOrArray<CSS.BorderProperty<{}>>
  borderWidths?: ObjectOrArray<CSS.BorderWidthProperty<P>>
  radii?: ObjectOrArray<CSS.BorderRadiusProperty<P>>
  shadows?: ObjectOrArray<CSS.BoxShadowProperty>
  zIndices?: ObjectOrArray<CSS.ZIndexProperty>
  components?: Record<string, Component>
}

/**
 * Extract the possible theme value type
 * based on the scale.
 *
 * @example
 *
 * type Result = ThemeScale<"space", { space: [4, 5] }>
 * // => Result: number
 *
 * type Result = ThemeScale<"space", { space: { sm: 4, md: 5 } }>
 * // => Result: "sm" | "md"
 */
export type ThemeScale<
  Scale extends keyof Theme,
  Theme
> = Theme[Scale] extends any[]
  ? number
  : Theme[Scale] extends Record<infer Keys, any>
  ? Keys
  : Theme[Scale] extends ObjectOrArray<infer F>
  ? F
  : never

/**
 * Types for space related CSS properties
 * @see `/configs/space.ts` for the style configurations
 */
export interface SpaceProps<
  ThemeType extends Theme = RequiredTheme,
  Value = ThemeScale<"space", ThemeType>
> {
  /** Margin on top, left, bottom and right */
  m?: Responsive<Value, ThemeType>
  /** Margin on top, left, bottom and right */
  margin?: Responsive<Value, ThemeType>
  /** Margin on top */
  mt?: Responsive<Value, ThemeType>
  /** Margin on top */
  marginTop?: Responsive<Value, ThemeType>
  /** Margin on right */
  mr?: Responsive<Value, ThemeType>
  /** Margin on right */
  marginRight?: Responsive<Value, ThemeType>
  /** Margin on bottom */
  mb?: Responsive<Value, ThemeType>
  /** Margin on bottom */
  marginBottom?: Responsive<Value, ThemeType>
  /** Margin on left */
  ml?: Responsive<Value, ThemeType>
  /** Margin on left */
  marginLeft?: Responsive<Value, ThemeType>
  /** Margin on left and right */
  mx?: Responsive<Value, ThemeType>
  /** Margin on left and right */
  marginX?: Responsive<Value, ThemeType>
  /** Margin on top and bottom */
  my?: Responsive<Value, ThemeType>
  /** Margin on top and bottom */
  marginY?: Responsive<Value, ThemeType>
  /** Padding on top, left, bottom and right */
  p?: Responsive<Value, ThemeType>
  /** Padding on top, left, bottom and right */
  padding?: Responsive<Value, ThemeType>
  /** Padding on top */
  pt?: Responsive<Value, ThemeType>
  /** Padding on top */
  paddingTop?: Responsive<Value, ThemeType>
  /** Padding on right */
  pr?: Responsive<Value, ThemeType>
  /** Padding on right */
  paddingRight?: Responsive<Value, ThemeType>
  /** Padding on bottom */
  pb?: Responsive<Value, ThemeType>
  /** Padding on bottom */
  paddingBottom?: Responsive<Value, ThemeType>
  /** Padding on left */
  pl?: Responsive<Value, ThemeType>
  /** Padding on left */
  paddingLeft?: Responsive<Value, ThemeType>
  /** Padding on left and right */
  px?: Responsive<Value, ThemeType>
  /** Padding on left and right */
  paddingX?: Responsive<Value, ThemeType>
  /** Padding on top and bottom */
  py?: Responsive<Value, ThemeType>
  /** Padding on top and bottom */
  paddingY?: Responsive<Value, ThemeType>
}

/**
 * Types for color related CSS properties
 * @see `/configs/color.ts` for the style configurations
 */
export interface ColorProps<
  ThemeType extends Theme = RequiredTheme,
  Value = ThemeScale<"colors", ThemeType>
> {
  /** The CSS `color` property */
  textColor?: Responsive<Value, ThemeType>
  /** The CSS `color` property */
  color?: Responsive<Value, ThemeType>
  /** The CSS `background` property */
  bg?: Responsive<Value, ThemeType>
  /** The CSS `background-color` property */
  bgColor?: Responsive<Value, ThemeType>
  /** The CSS `background-color` property */
  backgroundColor?: Responsive<Value, ThemeType>
  /** The CSS `fill` property for icon svgs and paths */
  fill?: Responsive<Value, ThemeType>
  /** The CSS `stroke` property for icon svgs and paths */
  stroke?: Responsive<Value, ThemeType>
  /** The CSS `opacity` property  */
  opacity?: Responsive<CSS.GlobalsNumber, ThemeType>
}

/**
 * Types for typography related CSS properties
 * @see `/configs/typography.ts` for the style configurations
 */
export interface TypographyProps<ThemeType extends Theme = RequiredTheme> {
  /** The CSS `font-weight` property  */
  fontWeight?: Responsive<ThemeScale<"fontWeights", ThemeType>, ThemeType>
  /** The CSS `line-height` property  */
  lineHeight?: Responsive<ThemeScale<"lineHeights", ThemeType>, ThemeType>
  /** The CSS `line-height` property  */
  letterSpacing?: Responsive<ThemeScale<"letterSpacings", ThemeType>, ThemeType>
  /** The CSS `font-size` property  */
  fontSize?: Responsive<ThemeScale<"fontSizes", ThemeType>, ThemeType>
  /** The CSS `font-family` property  */
  fontFamily?: Responsive<CSS.FontFamilyProperty, ThemeType>
  /** The CSS `text-align` property  */
  textAlign?: Responsive<CSS.TextAlignProperty, ThemeType>
  /** The CSS `font-style` property  */
  fontStyle?: Responsive<CSS.FontStyleProperty, ThemeType>
  /** The CSS `word-break` property  */
  wordBreak?: Responsive<CSS.WordBreakProperty, ThemeType>
  /** The CSS `overflow-wrap` property  */
  overflowWrap?: Responsive<CSS.OverflowWrapProperty, ThemeType>
  /** The CSS `text-overflow` property  */
  textOverflow?: Responsive<CSS.TextOverflowProperty, ThemeType>
  /** The CSS `text-transform` property  */
  textTransform?: Responsive<CSS.TextTransformProperty, ThemeType>
  /** The CSS `white-space` property  */
  whiteSpace?: Responsive<CSS.WhiteSpaceProperty, ThemeType>
  /** The CSS `text-decoration` property  */
  textDecoration?: Responsive<CSS.TextDecorationProperty<TLength>, ThemeType>
  /** The CSS `text-decoration` property  */
  textDecor?: Responsive<CSS.TextDecorationProperty<TLength>, ThemeType>
}

/**
 * Types for layout related CSS properties
 * @see `/configs/layout.ts` for the style configurations
 */
export interface LayoutProps<ThemeType extends Theme = RequiredTheme> {
  /** The CSS `display` property  */
  display?: Responsive<CSS.DisplayProperty, ThemeType>
  /** The CSS `width` property  */
  width?: Responsive<CSS.WidthProperty<TLength>, ThemeType>
  /** The CSS `width` property  */
  w?: Responsive<CSS.WidthProperty<TLength>, ThemeType>
  /** The CSS `width` and `height` property  */
  boxSize?: Responsive<CSS.WidthProperty<TLength>, ThemeType>
  /** The CSS `max-width` property  */
  maxWidth?: Responsive<CSS.MaxWidthProperty<TLength>, ThemeType>
  /** The CSS `max-width` property  */
  maxW?: Responsive<CSS.MaxWidthProperty<TLength>, ThemeType>
  /** The CSS `min-width` property  */
  minWidth?: Responsive<CSS.MinWidthProperty<TLength>, ThemeType>
  /** The CSS `min-width` property  */
  minW?: Responsive<CSS.MinWidthProperty<TLength>, ThemeType>
  /** The CSS `height` property  */
  height?: Responsive<CSS.HeightProperty<TLength>, ThemeType>
  /** The CSS `height` property  */
  h?: Responsive<CSS.HeightProperty<TLength>, ThemeType>
  /** The CSS `max-height` property  */
  maxHeight?: Responsive<CSS.MaxHeightProperty<TLength>, ThemeType>
  /** The CSS `max-height` property  */
  maxH?: Responsive<CSS.MaxHeightProperty<TLength>, ThemeType>
  /** The CSS `min-height` property  */
  minHeight?: Responsive<CSS.MinHeightProperty<TLength>, ThemeType>
  /** The CSS `min-height` property  */
  minH?: Responsive<CSS.MinHeightProperty<TLength>, ThemeType>
  /** The CSS `vertical-align` property  */
  verticalAlign?: Responsive<CSS.VerticalAlignProperty<TLength>, ThemeType>
  /** The CSS `overflow` property  */
  overflow?: Responsive<CSS.OverflowProperty, ThemeType>
  /** The CSS `overflow-x` property  */
  overflowX?: Responsive<CSS.OverflowXProperty, ThemeType>
  /** The CSS `overflow-y` property  */
  overflowY?: Responsive<CSS.OverflowYProperty, ThemeType>
  /** The CSS `box-sizing` property  */
  boxSizing?: CSS.BoxSizingProperty
}

/**
 * Types for flexbox related CSS properties
 * @see `/configs/flexbox.ts` for the style configurations
 */
export interface FlexboxProps<ThemeType extends Theme = RequiredTheme> {
  /** The CSS `align-items` property  */
  alignItems?: Responsive<CSS.AlignItemsProperty, ThemeType>
  /** The CSS `align-content` property  */
  alignContent?: Responsive<CSS.AlignContentProperty, ThemeType>
  /** The CSS `justify-items` property  */
  justifyItems?: Responsive<CSS.JustifyItemsProperty, ThemeType>
  /** The CSS `justify-content` property  */
  justifyContent?: Responsive<CSS.JustifyContentProperty, ThemeType>
  /** The CSS `flex-wrap` property  */
  flexWrap?: Responsive<CSS.FlexWrapProperty, ThemeType>
  /** The CSS `flex-basis` property  */
  flexBasis?: Responsive<CSS.FlexBasisProperty<TLength>, ThemeType>
  /** The CSS `flex-direction` property  */
  flexDirection?: Responsive<CSS.FlexDirectionProperty, ThemeType>
  /** The CSS `flex-direction` property  */
  flexDir?: Responsive<CSS.FlexDirectionProperty, ThemeType>
  /** The CSS `flex` property  */
  flex?: Responsive<CSS.FlexProperty<TLength>, ThemeType>
  /** The CSS `justify-self` property  */
  justifySelf?: Responsive<CSS.JustifySelfProperty, ThemeType>
  /** The CSS `align-self` property  */
  alignSelf?: Responsive<CSS.AlignSelfProperty, ThemeType>
  /** The CSS `order` property  */
  order?: Responsive<CSS.GlobalsNumber, ThemeType>
  /** The CSS `flex-grow` property  */
  flexGrow?: Responsive<CSS.GlobalsNumber, ThemeType>
  /** The CSS `flex-shrink` property  */
  flexShrink?: Responsive<CSS.GlobalsNumber, ThemeType>
}

/**
 * Types for grid related CSS properties
 * @see `/configs/grid.ts` for the style configurations
 */
export interface GridProps<ThemeType extends Theme = RequiredTheme> {
  /** The CSS `grid-gap` property  */
  gridGap?: Responsive<CSS.GridGapProperty<TLength>, ThemeType>
  /** The CSS `grid-column-gap` property  */
  gridColumnGap?: Responsive<CSS.GridColumnGapProperty<TLength>, ThemeType>
  /** The CSS `grid-row-gap` property  */
  gridRowGap?: Responsive<CSS.GridRowGapProperty<TLength>, ThemeType>
  /** The CSS `grid-column` property  */
  gridColumn?: Responsive<CSS.GridColumnProperty, ThemeType>
  /** The CSS `grid-row` property  */
  gridRow?: Responsive<CSS.GridRowProperty, ThemeType>
  /** The CSS `grid-auto-flow` property  */
  gridAutoFlow?: Responsive<CSS.GridAutoFlowProperty, ThemeType>
  /** The CSS `grid-auto-columns` property  */
  gridAutoColumns?: Responsive<CSS.GridAutoColumnsProperty<TLength>, ThemeType>
  /** The CSS `grid-auto-rows` property  */
  gridAutoRows?: Responsive<CSS.GridAutoRowsProperty<TLength>, ThemeType>
  /** The CSS `grid-template-columns` property  */
  gridTemplateColumns?: Responsive<
    CSS.GridTemplateColumnsProperty<TLength>,
    ThemeType
  >
  /** The CSS `grid-template-rows` property  */
  gridTemplateRows?: Responsive<
    CSS.GridTemplateRowsProperty<TLength>,
    ThemeType
  >
  /** The CSS `grid-template-areas` property  */
  gridTemplateAreas?: Responsive<CSS.GridTemplateAreasProperty, ThemeType>
  /** The CSS `grid-areas` property  */
  gridArea?: Responsive<CSS.GridAreaProperty, ThemeType>
  /** The CSS `place-items` property  */
  placeItems?: Responsive<CSS.PlaceItemsProperty, ThemeType>
}

/**
 * Types for border properties
 * @see `/configs/border.ts`
 */
export interface BordersProps<ThemeType extends Theme = RequiredTheme> {
  /** The CSS `border-width` property  */
  borderWidth?: Responsive<ThemeScale<"borderWidths", ThemeType>, ThemeType>
  /** The CSS `border-top-width` property  */
  borderTopWidth?: Responsive<ThemeScale<"borderWidths", ThemeType>, ThemeType>
  /** The CSS `border-bottom-width` property  */
  borderBottomWidth?: Responsive<
    ThemeScale<"borderWidths", ThemeType>,
    ThemeType
  >
  /** The CSS `border-left-width` property  */
  borderLeftWidth?: Responsive<ThemeScale<"borderWidths", ThemeType>, ThemeType>
  /** The CSS `border-right-width` property  */
  borderRightWidth?: Responsive<
    ThemeScale<"borderWidths", ThemeType>,
    ThemeType
  >
  /** The CSS `border-style` property  */
  borderStyle?: Responsive<CSS.BorderStyleProperty, ThemeType>
  /** The CSS `border-top-style` property  */
  borderTopStyle?: Responsive<CSS.BorderTopStyleProperty, ThemeType>
  /** The CSS `border-bottom-style` property  */
  borderBottomStyle?: Responsive<CSS.BorderBottomStyleProperty, ThemeType>
  /** The CSS `border-left-style` property  */
  borderLeftStyle?: Responsive<CSS.BorderLeftStyleProperty, ThemeType>
  /** The CSS `border-right-styles` property  */
  borderRightStyle?: Responsive<CSS.BorderRightStyleProperty, ThemeType>
  /** The CSS `border-color` property  */
  borderColor?: Responsive<ThemeScale<"colors", ThemeType>, ThemeType>
  /** The CSS `border-top-color` property  */
  borderTopColor?: Responsive<ThemeScale<"colors", ThemeType>, ThemeType>
  /** The CSS `border-bottom-color` property  */
  borderBottomColor?: Responsive<ThemeScale<"colors", ThemeType>, ThemeType>
  /** The CSS `border-left-color` property  */
  borderLeftColor?: Responsive<ThemeScale<"colors", ThemeType>, ThemeType>
  /** The CSS `border-right-color` property  */
  borderRightColor?: Responsive<ThemeScale<"colors", ThemeType>, ThemeType>
  /** The CSS `border-top` property  */
  borderTop?: Responsive<CSS.BorderTopProperty<TLength>, ThemeType>
  /** The CSS `border-right` property  */
  borderRight?: Responsive<CSS.BorderRightProperty<TLength>, ThemeType>
  /** The CSS `border-bottom` property  */
  borderBottom?: Responsive<CSS.BorderBottomProperty<TLength>, ThemeType>
  /** The CSS `border-left` property  */
  borderLeft?: Responsive<CSS.BorderLeftProperty<TLength>, ThemeType>
  /** The CSS `border-radius` property  */
  borderRadius?: Responsive<ThemeScale<"radii", ThemeType>, ThemeType>
  /** The CSS `border-top-radius` property  */
  borderTopRadius?: Responsive<ThemeScale<"radii", ThemeType>, ThemeType>
  /** The CSS `border-right-radius` property  */
  borderRightRadius?: Responsive<ThemeScale<"radii", ThemeType>, ThemeType>
  /** The CSS `border-bottom-radius` property  */
  borderBottomRadius?: Responsive<ThemeScale<"radii", ThemeType>, ThemeType>
  /** The CSS `border-left-radius` property  */
  borderLeftRadius?: Responsive<ThemeScale<"radii", ThemeType>, ThemeType>
  /** The CSS `border-top-left-radius` property  */
  borderTopLeftRadius?: Responsive<ThemeScale<"radii", ThemeType>, ThemeType>
  /** The CSS `border-top-right-radius` property  */
  borderTopRightRadius?: Responsive<ThemeScale<"radii", ThemeType>, ThemeType>
  /** The CSS `border-bottom-left-radius` property  */
  borderBottomLeftRadius?: Responsive<ThemeScale<"radii", ThemeType>, ThemeType>
  /** The CSS `border-bottom-right-radius` property  */
  borderBottomRightRadius?: Responsive<
    ThemeScale<"radii", ThemeType>,
    ThemeType
  >
  /** The CSS `border` property  */
  border?: Responsive<CSS.BorderProperty<TLength>, ThemeType>
  /** The CSS `border-right` and `border-left` property  */
  borderX?: Responsive<CSS.BorderProperty<TLength>, ThemeType>
  /** The CSS `border-top` and `border-bottom` property  */
  borderY?: Responsive<CSS.BorderProperty<TLength>, ThemeType>
  /** The CSS `outline` property  */
  outline?: Responsive<CSS.OutlineProperty<TLength>, ThemeType>
  /** The CSS `outline-color` property  */
  outlineColor?: Responsive<ThemeScale<"colors", ThemeType>, ThemeType>
  /** The CSS `outline-offset` property  */
  outlineOffset?: Responsive<CSS.OutlineOffsetProperty<TLength>, ThemeType>
}

/**
 * Types for box and text shadow properties
 * @see /configs/shadow.ts
 */
export interface ShadowProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.BoxShadowProperty | number | ThemeScale<"shadows", ThemeType>
> {
  boxShadow?: Responsive<Scale, ThemeType>
  textShadow?: Responsive<Scale, ThemeType>
}

/**
 * Types for background properties
 * @see /configs/background.ts
 */
export interface BackgroundProps<ThemeType extends Theme = RequiredTheme> {
  background?: Responsive<CSS.BackgroundProperty<TLength>, ThemeType>
  bgImage?: Responsive<CSS.BackgroundImageProperty, ThemeType>
  backgroundImage?: Responsive<CSS.BackgroundImageProperty, ThemeType>
  bgRepeat?: Responsive<CSS.BackgroundRepeatProperty, ThemeType>
  backgroundRepeat?: Responsive<CSS.BackgroundRepeatProperty, ThemeType>
  bgSize?: Responsive<CSS.BackgroundSizeProperty<TLength>, ThemeType>
  backgroundSize?: Responsive<CSS.BackgroundSizeProperty<TLength>, ThemeType>
  bgAttachment?: Responsive<CSS.BackgroundAttachmentProperty, ThemeType>
  backgroundAttachment?: Responsive<CSS.BackgroundAttachmentProperty, ThemeType>
  bgPosition?: Responsive<CSS.BackgroundPositionProperty<TLength>, ThemeType>
  backgroundPosition?: Responsive<
    CSS.BackgroundPositionProperty<TLength>,
    ThemeType
  >
}

/**
 * Types for position CSS properties
 * @see /configs/position.ts
 */
export interface PositionProps<ThemeType extends Theme = RequiredTheme> {
  zIndex?: Responsive<
    ThemeScale<"zIndices", ThemeType> | CSS.ZIndexProperty,
    ThemeType
  >
  top?: Responsive<CSS.TopProperty<TLength>, ThemeType>
  right?: Responsive<CSS.RightProperty<TLength>, ThemeType>
  bottom?: Responsive<CSS.BottomProperty<TLength>, ThemeType>
  left?: Responsive<CSS.LeftProperty<TLength>, ThemeType>
  /** The CSS `left`, `right`, `top`, `bottom` property  */
  inset?: Responsive<CSS.LeftProperty<TLength>, ThemeType>
  /** The CSS `left`, and `right` property  */
  insetX?: Responsive<CSS.LeftProperty<TLength>, ThemeType>
  /** The CSS `top`, and `bottom` property  */
  insetY?: Responsive<CSS.LeftProperty<TLength>, ThemeType>
  /** The CSS `position` property  */
  pos?: Responsive<CSS.PositionProperty, ThemeType>
  position?: Responsive<CSS.PositionProperty, ThemeType>
}

export interface OtherCSSProps<ThemeType extends Theme = RequiredTheme> {
  animation?: Responsive<CSS.AnimationProperty, ThemeType>
  appearance?: Responsive<CSS.AppearanceProperty, ThemeType>
  transform?: Responsive<CSS.TransformProperty, ThemeType>
  transformOrigin?: Responsive<CSS.TransformOriginProperty<TLength>, ThemeType>
  visibility?: Responsive<CSS.VisibilityProperty, ThemeType>
  userSelect?: Responsive<CSS.UserSelectProperty, ThemeType>
  pointerEvents?: Responsive<CSS.PointerEventsProperty, ThemeType>
  cursor?: Responsive<CSS.CursorProperty, ThemeType>
  resize?: Responsive<CSS.ResizeProperty, ThemeType>
  transition?: Responsive<CSS.TransitionProperty, ThemeType>
  objectFit?: Responsive<CSS.ObjectFitProperty, ThemeType>
  objectPosition?: Responsive<CSS.ObjectPositionProperty<TLength>, ThemeType>
  float?: Responsive<CSS.FloatProperty, ThemeType>
  willChange?: Responsive<CSS.WillChangeProperty, ThemeType>
  listStyleType?: Responsive<CSS.ListStyleTypeProperty, ThemeType>
  listStylePosition?: Responsive<CSS.ListStylePositionProperty, ThemeType>
  listStyleImage?: Responsive<CSS.ListStyleImageProperty, ThemeType>
}

export type StyleProps<ThemeType extends Theme = RequiredTheme> = SpaceProps &
  ColorProps<ThemeType> &
  TypographyProps<ThemeType> &
  FlexboxProps<ThemeType> &
  GridProps<ThemeType> &
  LayoutProps<ThemeType> &
  BordersProps<ThemeType> &
  ShadowProps<ThemeType> &
  BackgroundProps<ThemeType> &
  PositionProps<ThemeType> &
  OtherCSSProps<ThemeType>

export type PseudoProps<ThemeType = RequiredTheme> = {
  [K in keyof Pseudos]?:
    | (StyleProps<ThemeType> & { content?: string })
    | PseudoProps<ThemeType>
}

export interface TruncateProps {
  isTruncated?: boolean
}

export type SystemProps<ThemeType = RequiredTheme> = StyleProps<ThemeType> &
  PseudoProps<ThemeType> &
  TruncateProps
