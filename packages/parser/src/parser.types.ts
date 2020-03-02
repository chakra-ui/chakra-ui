// Credits: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/styled-system/index.d.ts

import * as CSS from "csstype"
import { Pseudos } from "./configs/pseudo.selector"

export type TLength = string | 0 | number

export type ObjectOrArray<T, K extends keyof any = keyof any> =
  | T[]
  | Record<K, T>

export type RequiredTheme = Required<Theme>

export type ResponsiveValue<T, ThemeType extends Theme = RequiredTheme> =
  | T
  | Array<T | null>
  | { [key in keyof ThemeType["breakpoints"]]?: T }

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
}

export type ThemeValue<
  K extends keyof ThemeType,
  ThemeType,
  Scale = any
> = ThemeType[K] extends Scale[]
  ? number
  : ThemeType[K] extends Record<infer E, Scale>
  ? E
  : ThemeType[K] extends ObjectOrArray<infer F>
  ? F
  : never

export interface SpaceProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"space", ThemeType>
> {
  m?: ResponsiveValue<Scale, ThemeType>
  margin?: ResponsiveValue<Scale, ThemeType>
  mt?: ResponsiveValue<Scale, ThemeType>
  marginTop?: ResponsiveValue<Scale, ThemeType>
  mr?: ResponsiveValue<Scale, ThemeType>
  marginRight?: ResponsiveValue<Scale, ThemeType>
  mb?: ResponsiveValue<Scale, ThemeType>
  marginBottom?: ResponsiveValue<Scale, ThemeType>
  ml?: ResponsiveValue<Scale, ThemeType>
  marginLeft?: ResponsiveValue<Scale, ThemeType>
  mx?: ResponsiveValue<Scale, ThemeType>
  marginX?: ResponsiveValue<Scale, ThemeType>
  my?: ResponsiveValue<Scale, ThemeType>
  marginY?: ResponsiveValue<Scale, ThemeType>
  p?: ResponsiveValue<Scale, ThemeType>
  padding?: ResponsiveValue<Scale, ThemeType>
  pt?: ResponsiveValue<Scale, ThemeType>
  paddingTop?: ResponsiveValue<Scale, ThemeType>
  pr?: ResponsiveValue<Scale, ThemeType>
  paddingRight?: ResponsiveValue<Scale, ThemeType>
  pb?: ResponsiveValue<Scale, ThemeType>
  paddingBottom?: ResponsiveValue<Scale, ThemeType>
  pl?: ResponsiveValue<Scale, ThemeType>
  paddingLeft?: ResponsiveValue<Scale, ThemeType>
  px?: ResponsiveValue<Scale, ThemeType>
  paddingX?: ResponsiveValue<Scale, ThemeType>
  py?: ResponsiveValue<Scale, ThemeType>
  paddingY?: ResponsiveValue<Scale, ThemeType>
}

/////////////////////////////////////////////////////////////////

export interface TextColorProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"colors", ThemeType>
> {
  textColor?: ResponsiveValue<Scale, ThemeType>
  color?: ResponsiveValue<Scale, ThemeType>
}

export interface BackgroundColorProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"colors", ThemeType>
> {
  bg?: ResponsiveValue<Scale, ThemeType>
  bgColor?: ResponsiveValue<Scale, ThemeType>
  backgroundColor?: ResponsiveValue<Scale, ThemeType>
  fill?: ResponsiveValue<Scale, ThemeType>
  stroke?: ResponsiveValue<Scale, ThemeType>
}

export interface OpacityProps<ThemeType extends Theme = RequiredTheme> {
  opacity?: ResponsiveValue<CSS.GlobalsNumber, ThemeType>
}

/**
 * Types for background properties
 * @see /configs/parser/color.ts
 */
export interface ColorProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"colors", ThemeType>
>
  extends TextColorProps<ThemeType, Scale>,
    BackgroundColorProps<ThemeType, Scale>,
    OpacityProps {}

/////////////////////////////////////////////////////////////////

export interface FontSizeProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"fontSizes", ThemeType>
> {
  fontSize?: ResponsiveValue<Scale, ThemeType>
}

export interface FontFamilyProps<ThemeType extends Theme = RequiredTheme> {
  fontFamily?: ResponsiveValue<CSS.FontFamilyProperty, ThemeType>
}

export interface FontWeightProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"fontWeights", ThemeType>
> {
  fontWeight?: ResponsiveValue<Scale, ThemeType>
}

export interface LineHeightProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"lineHeights", ThemeType>
> {
  lineHeight?: ResponsiveValue<Scale, ThemeType>
}

export interface TextAlignProps<ThemeType extends Theme = RequiredTheme> {
  textAlign?: ResponsiveValue<CSS.TextAlignProperty, ThemeType>
}

export interface FontStyleProps<ThemeType extends Theme = RequiredTheme> {
  fontStyle?: ResponsiveValue<CSS.FontStyleProperty, ThemeType>
}

export interface LetterSpacingProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"letterSpacings", ThemeType>
> {
  letterSpacing?: ResponsiveValue<Scale, ThemeType>
}

export interface TypographyProps<ThemeType extends Theme = RequiredTheme>
  extends FontFamilyProps<ThemeType>,
    FontSizeProps<ThemeType>,
    FontWeightProps<ThemeType>,
    LineHeightProps<ThemeType>,
    LetterSpacingProps<ThemeType>,
    FontStyleProps<ThemeType>,
    TextAlignProps<ThemeType> {
  wordBreak?: ResponsiveValue<CSS.WordBreakProperty, ThemeType>
  overflowWrap?: ResponsiveValue<CSS.OverflowWrapProperty, ThemeType>
  textOverflow?: ResponsiveValue<CSS.TextOverflowProperty, ThemeType>
  textTransform?: ResponsiveValue<CSS.TextTransformProperty, ThemeType>
  whiteSpace?: ResponsiveValue<CSS.WhiteSpaceProperty, ThemeType>
  textDecoration?: ResponsiveValue<
    CSS.TextDecorationProperty<TLength>,
    ThemeType
  >
  textDecor?: ResponsiveValue<CSS.TextDecorationProperty<TLength>, ThemeType>
}

/////////////////////////////////////////////////////////////////

export interface DisplayProps<ThemeType extends Theme = RequiredTheme> {
  display?: ResponsiveValue<CSS.DisplayProperty, ThemeType>
}

export interface WidthProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.WidthProperty<TLength>
> {
  width?: ResponsiveValue<Scale, ThemeType>
  w?: ResponsiveValue<Scale, ThemeType>
}

export interface MaxWidthProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.MaxWidthProperty<TLength>
> {
  maxWidth?: ResponsiveValue<Scale, ThemeType>
  maxW?: ResponsiveValue<Scale, ThemeType>
}

export interface MinWidthProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.MinWidthProperty<TLength>
> {
  minWidth?: ResponsiveValue<Scale, ThemeType>
  minW?: ResponsiveValue<Scale, ThemeType>
}

export interface HeightProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.HeightProperty<TLength>
> {
  height?: ResponsiveValue<Scale, ThemeType>
  h?: ResponsiveValue<Scale, ThemeType>
}

export interface MaxHeightProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.MaxHeightProperty<TLength>
> {
  maxHeight?: ResponsiveValue<Scale, ThemeType>
  maxH?: ResponsiveValue<Scale, ThemeType>
}

export interface MinHeightProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.MinHeightProperty<TLength>
> {
  minHeight?: ResponsiveValue<Scale, ThemeType>
  minH?: ResponsiveValue<Scale, ThemeType>
}

export interface VerticalAlignProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.VerticalAlignProperty<TLength>
> {
  verticalAlign?: ResponsiveValue<Scale, ThemeType>
}

export interface LayoutProps<ThemeType extends Theme = RequiredTheme>
  extends WidthProps<ThemeType>,
    HeightProps<ThemeType>,
    MinWidthProps<ThemeType>,
    MinHeightProps<ThemeType>,
    MaxWidthProps<ThemeType>,
    MaxHeightProps<ThemeType>,
    DisplayProps<ThemeType>,
    VerticalAlignProps<ThemeType>,
    OverflowProps<ThemeType> {}

/////////////////////////////////////////////////////////////////

export interface AlignItemsProps<ThemeType extends Theme = RequiredTheme> {
  alignItems?: ResponsiveValue<CSS.AlignItemsProperty, ThemeType>
}

export interface AlignContentProps<ThemeType extends Theme = RequiredTheme> {
  alignContent?: ResponsiveValue<CSS.AlignContentProperty, ThemeType>
}

export interface JustifyItemsProps<ThemeType extends Theme = RequiredTheme> {
  justifyItems?: ResponsiveValue<CSS.JustifyItemsProperty, ThemeType>
}

export interface JustifyContentProps<ThemeType extends Theme = RequiredTheme> {
  justifyContent?: ResponsiveValue<CSS.JustifyContentProperty, ThemeType>
}

export interface FlexWrapProps<ThemeType extends Theme = RequiredTheme> {
  flexWrap?: ResponsiveValue<CSS.FlexWrapProperty, ThemeType>
}

export interface FlexBasisProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.FlexBasisProperty<TLength>
> {
  flexBasis?: ResponsiveValue<Scale, ThemeType>
}

export interface FlexDirectionProps<ThemeType extends Theme = RequiredTheme> {
  flexDirection?: ResponsiveValue<CSS.FlexDirectionProperty, ThemeType>
  flexDir?: ResponsiveValue<CSS.FlexDirectionProperty, ThemeType>
}

export interface FlexProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.FlexProperty<TLength>
> {
  flex?: ResponsiveValue<Scale, ThemeType>
}

export interface JustifySelfProps<ThemeType extends Theme = RequiredTheme> {
  justifySelf?: ResponsiveValue<CSS.JustifySelfProperty, ThemeType>
}

export interface AlignSelfProps<ThemeType extends Theme = RequiredTheme> {
  alignSelf?: ResponsiveValue<CSS.AlignSelfProperty, ThemeType>
}

export interface OrderProps<ThemeType extends Theme = RequiredTheme> {
  order?: ResponsiveValue<CSS.GlobalsNumber, ThemeType>
}

export interface FlexGrowProps<ThemeType extends Theme = RequiredTheme> {
  flexGrow?: ResponsiveValue<CSS.GlobalsNumber, ThemeType>
}

export interface FlexShrinkProps<ThemeType extends Theme = RequiredTheme> {
  flexShrink?: ResponsiveValue<CSS.GlobalsNumber, ThemeType>
}

export interface FlexboxProps<ThemeType extends Theme = RequiredTheme>
  extends AlignItemsProps<ThemeType>,
    AlignContentProps<ThemeType>,
    JustifyItemsProps<ThemeType>,
    JustifyContentProps<ThemeType>,
    FlexWrapProps<ThemeType>,
    FlexDirectionProps<ThemeType>,
    FlexProps<ThemeType>,
    FlexGrowProps<ThemeType>,
    FlexShrinkProps<ThemeType>,
    FlexBasisProps<ThemeType>,
    JustifySelfProps<ThemeType>,
    AlignSelfProps<ThemeType>,
    OrderProps<ThemeType> {}

/////////////////////////////////////////////////////////////////

export interface GridGapProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.GridGapProperty<TLength>
> {
  gridGap?: ResponsiveValue<Scale, ThemeType>
}

export interface GridColumnGapProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.GridColumnGapProperty<TLength>
> {
  gridColumnGap?: ResponsiveValue<Scale, ThemeType>
}

export interface GridRowGapProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.GridRowGapProperty<TLength>
> {
  gridRowGap?: ResponsiveValue<Scale, ThemeType>
}

export interface GridColumnProps<ThemeType extends Theme = RequiredTheme> {
  gridColumn?: ResponsiveValue<CSS.GridColumnProperty, ThemeType>
}

export interface GridRowProps<ThemeType extends Theme = RequiredTheme> {
  gridRow?: ResponsiveValue<CSS.GridRowProperty, ThemeType>
}

export interface GridAutoFlowProps<ThemeType extends Theme = RequiredTheme> {
  gridAutoFlow?: ResponsiveValue<CSS.GridAutoFlowProperty, ThemeType>
}

export interface GridAutoColumnsProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.GridAutoColumnsProperty<TLength>
> {
  gridAutoColumns?: ResponsiveValue<Scale, ThemeType>
}

export interface GridAutoRowsProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.GridAutoRowsProperty<TLength>
> {
  gridAutoRows?: ResponsiveValue<Scale, ThemeType>
}

export interface GridTemplateColumnsProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.GridTemplateColumnsProperty<TLength>
> {
  gridTemplateColumns?: ResponsiveValue<Scale, ThemeType>
}

export interface GridTemplateRowsProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.GridTemplateRowsProperty<TLength>
> {
  gridTemplateRows?: ResponsiveValue<Scale, ThemeType>
}

export interface GridTemplateAreasProps<
  ThemeType extends Theme = RequiredTheme
> {
  gridTemplateAreas?: ResponsiveValue<CSS.GridTemplateAreasProperty, ThemeType>
}

export interface GridAreaProps<ThemeType extends Theme = RequiredTheme> {
  gridArea?: ResponsiveValue<CSS.GridAreaProperty, ThemeType>
}

export interface GridProps<ThemeType extends Theme = RequiredTheme>
  extends GridGapProps<ThemeType>,
    GridColumnGapProps<ThemeType>,
    GridRowGapProps<ThemeType>,
    GridColumnProps<ThemeType>,
    GridRowProps<ThemeType>,
    GridAutoFlowProps<ThemeType>,
    GridAutoColumnsProps<ThemeType>,
    GridAutoRowsProps<ThemeType>,
    GridTemplateColumnsProps<ThemeType>,
    GridTemplateRowsProps<ThemeType>,
    GridTemplateAreasProps<ThemeType>,
    GridAreaProps<ThemeType> {
  placeItems?: ResponsiveValue<CSS.PlaceItemsProperty, ThemeType>
}

/////////////////////////////////////////////////////////////////

export interface BorderWidthProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"borderWidths", ThemeType>
> {
  borderWidth?: ResponsiveValue<Scale, ThemeType>
  borderTopWidth?: ResponsiveValue<Scale, ThemeType>
  borderBottomWidth?: ResponsiveValue<Scale, ThemeType>
  borderLeftWidth?: ResponsiveValue<Scale, ThemeType>
  borderRightWidth?: ResponsiveValue<Scale, ThemeType>
}

export interface BorderStyleProps<ThemeType extends Theme = RequiredTheme> {
  borderStyle?: ResponsiveValue<CSS.BorderStyleProperty, ThemeType>
  borderTopStyle?: ResponsiveValue<CSS.BorderTopStyleProperty, ThemeType>
  borderBottomStyle?: ResponsiveValue<CSS.BorderBottomStyleProperty, ThemeType>
  borderLeftStyle?: ResponsiveValue<CSS.BorderLeftStyleProperty, ThemeType>
  borderRightStyle?: ResponsiveValue<CSS.BorderRightStyleProperty, ThemeType>
}

export interface BorderColorProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"colors", ThemeType>
> {
  borderColor?: ResponsiveValue<Scale, ThemeType>
  borderTopColor?: ResponsiveValue<Scale, ThemeType>
  borderBottomColor?: ResponsiveValue<Scale, ThemeType>
  borderLeftColor?: ResponsiveValue<Scale, ThemeType>
  borderRightColor?: ResponsiveValue<Scale, ThemeType>
}

export interface BorderTopProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.BorderTopProperty<TLength>
> {
  borderTop?: ResponsiveValue<Scale, ThemeType>
}

export interface BorderRightProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.BorderRightProperty<TLength>
> {
  borderRight?: ResponsiveValue<Scale, ThemeType>
}

export interface BorderBottomProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.BorderBottomProperty<TLength>
> {
  borderBottom?: ResponsiveValue<Scale, ThemeType>
}

export interface BorderLeftProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.BorderLeftProperty<TLength>
> {
  borderLeft?: ResponsiveValue<Scale, ThemeType>
}

export interface BorderRadiusProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"radii", ThemeType>
> {
  borderRadius?: ResponsiveValue<Scale, ThemeType>
  borderTopRadius?: ResponsiveValue<Scale, ThemeType>
  borderRightRadius?: ResponsiveValue<Scale, ThemeType>
  borderBottomRadius?: ResponsiveValue<Scale, ThemeType>
  borderLeftRadius?: ResponsiveValue<Scale, ThemeType>
  borderTopLeftRadius?: ResponsiveValue<Scale, ThemeType>
  borderTopRightRadius?: ResponsiveValue<Scale, ThemeType>
  borderBottomLeftRadius?: ResponsiveValue<Scale, ThemeType>
  borderBottomRightRadius?: ResponsiveValue<Scale, ThemeType>
}

export interface OutlineProps<ThemeType extends Theme = RequiredTheme> {
  outline?: ResponsiveValue<CSS.OutlineProperty<TLength>, ThemeType>
  outlineColor?: ResponsiveValue<ThemeValue<"colors", ThemeType>, ThemeType>
  outlineOffset?: ResponsiveValue<CSS.OutlineOffsetProperty<TLength>, ThemeType>
}

export interface BordersProps<ThemeType extends Theme = RequiredTheme>
  extends BorderProps<ThemeType>,
    BorderTopProps<ThemeType>,
    BorderRightProps<ThemeType>,
    BorderBottomProps<ThemeType>,
    BorderLeftProps<ThemeType>,
    BorderWidthProps<ThemeType>,
    BorderColorProps<ThemeType>,
    BorderStyleProps<ThemeType>,
    BorderRadiusProps<ThemeType>,
    OutlineProps<ThemeType> {}

/**
 * Types for background properties
 * @see /configs/parser/border.ts
 */
export interface BorderProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.BorderProperty<TLength>
>
  extends BorderWidthProps<ThemeType>,
    BorderStyleProps<ThemeType>,
    BorderColorProps<ThemeType>,
    BorderRadiusProps<ThemeType>,
    BorderTopProps<ThemeType>,
    BorderRightProps<ThemeType>,
    BorderBottomProps<ThemeType>,
    BorderLeftProps<ThemeType> {
  border?: ResponsiveValue<Scale, ThemeType>
  borderX?: ResponsiveValue<Scale, ThemeType>
  borderY?: ResponsiveValue<Scale, ThemeType>
}

/////////////////////////////////////////////////////////////////

export interface ShadowProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.BoxShadowProperty | number | ThemeValue<"shadows", ThemeType>
> {
  boxShadow?: ResponsiveValue<Scale, ThemeType>
  textShadow?: ResponsiveValue<Scale, ThemeType>
}

/////////////////////////////////////////////////////////////////

export interface OverflowProps<ThemeType extends Theme = RequiredTheme> {
  overflow?: ResponsiveValue<CSS.OverflowProperty, ThemeType>
  overflowX?: ResponsiveValue<CSS.OverflowXProperty, ThemeType>
  overflowY?: ResponsiveValue<CSS.OverflowYProperty, ThemeType>
  boxSizing?: CSS.BoxSizingProperty
}

/////////////////////////////////////////////////////////////////
/**
 * Types for background properties
 * @see /configs/parser/background.ts
 */
export interface BackgroundProps<ThemeType extends Theme = RequiredTheme> {
  background?: ResponsiveValue<CSS.BackgroundProperty<TLength>, ThemeType>
  bgImage?: ResponsiveValue<CSS.BackgroundImageProperty, ThemeType>
  backgroundImage?: ResponsiveValue<CSS.BackgroundImageProperty, ThemeType>
  bgRepeat?: ResponsiveValue<CSS.BackgroundRepeatProperty, ThemeType>
  backgroundRepeat?: ResponsiveValue<CSS.BackgroundRepeatProperty, ThemeType>
  bgSize?: ResponsiveValue<CSS.BackgroundSizeProperty<TLength>, ThemeType>
  backgroundSize?: ResponsiveValue<
    CSS.BackgroundSizeProperty<TLength>,
    ThemeType
  >
  bgAttachment?: ResponsiveValue<CSS.BackgroundAttachmentProperty, ThemeType>
  backgroundAttachment?: ResponsiveValue<
    CSS.BackgroundAttachmentProperty,
    ThemeType
  >
  bgPosition?: ResponsiveValue<
    CSS.BackgroundPositionProperty<TLength>,
    ThemeType
  >
  backgroundPosition?: ResponsiveValue<
    CSS.BackgroundPositionProperty<TLength>,
    ThemeType
  >
}

/////////////////////////////////////////////////////////////////

export interface ZIndexProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = ThemeValue<"zIndices", ThemeType> | CSS.ZIndexProperty
> {
  zIndex?: ResponsiveValue<Scale, ThemeType>
}

export interface TopProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.TopProperty<TLength>
> {
  top?: ResponsiveValue<Scale, ThemeType>
}

export interface RightProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.RightProperty<TLength>
> {
  right?: ResponsiveValue<Scale, ThemeType>
}

export interface BottomProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.BottomProperty<TLength>
> {
  bottom?: ResponsiveValue<Scale, ThemeType>
}

export interface LeftProps<
  ThemeType extends Theme = RequiredTheme,
  Scale = CSS.LeftProperty<TLength>
> {
  left?: ResponsiveValue<Scale, ThemeType>
}

export interface PositionProps<ThemeType extends Theme = RequiredTheme>
  extends ZIndexProps<ThemeType>,
    TopProps<ThemeType>,
    RightProps<ThemeType>,
    BottomProps<ThemeType>,
    LeftProps<ThemeType> {
  pos?: ResponsiveValue<CSS.PositionProperty, ThemeType>
  position?: ResponsiveValue<CSS.PositionProperty, ThemeType>
}

/////////////////////////////////////////////////////////////////

export interface OtherProps<ThemeType extends Theme = RequiredTheme> {
  animation?: ResponsiveValue<CSS.AnimationProperty, ThemeType>
  appearance?: ResponsiveValue<CSS.AppearanceProperty, ThemeType>
  transform?: ResponsiveValue<CSS.TransformProperty, ThemeType>
  transformOrigin?: ResponsiveValue<
    CSS.TransformOriginProperty<TLength>,
    ThemeType
  >
  visibility?: ResponsiveValue<CSS.VisibilityProperty, ThemeType>
  userSelect?: ResponsiveValue<CSS.UserSelectProperty, ThemeType>
  pointerEvents?: ResponsiveValue<CSS.PointerEventsProperty, ThemeType>
  cursor?: ResponsiveValue<CSS.CursorProperty, ThemeType>
  resize?: ResponsiveValue<CSS.ResizeProperty, ThemeType>
  transition?: ResponsiveValue<CSS.TransitionProperty, ThemeType>
  objectFit?: ResponsiveValue<CSS.ObjectFitProperty, ThemeType>
  objectPosition?: ResponsiveValue<
    CSS.ObjectPositionProperty<TLength>,
    ThemeType
  >
  float?: ResponsiveValue<CSS.FloatProperty, ThemeType>
  willChange?: ResponsiveValue<CSS.WillChangeProperty, ThemeType>
  listStyleType?: ResponsiveValue<CSS.ListStyleTypeProperty, ThemeType>
  listStylePosition?: ResponsiveValue<CSS.ListStylePositionProperty, ThemeType>
  listStyleImage?: ResponsiveValue<CSS.ListStyleImageProperty, ThemeType>
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
  OtherProps<ThemeType>

type PseudoProps<Props, ExtraProps = {}> =
  | (Props & ExtraProps)
  | {
      [K in keyof Pseudos]:
        | (Props & ExtraProps)
        | PseudoProps<Props, ExtraProps>
    }

interface TruncateProps {
  isTruncated?: boolean
}

export type SystemProps<ThemeType> = StyleProps<ThemeType> &
  PseudoProps<StyleProps<ThemeType>, { content?: string }> & {}
