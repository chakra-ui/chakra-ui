import * as CSS from "csstype"
import {
  SpaceProps,
  ColorProps,
  TypographyProps,
  LayoutProps,
  FlexboxProps,
  GridProps,
  BorderProps,
  PositionProps,
  OtherProps,
  BackgroundProps,
  ShadowProps,
  OutlineProps,
  TransitionProps,
  TransformProps,
} from "./config"
import { PseudoProps } from "./pseudo"
import { Length } from "./utils"

type ThemeValue<T> = T[] | Record<string, T>

interface Component {
  register?: {
    readonly parts?: string[]
    readonly sizes?: string[]
    readonly variants?: string[]
  }
  baseStyle?: any
  variants?: any
  sizes?: any
  defaultProps?: {
    variant?: string
    size?: string
    colorScheme?: string
  }
}

export interface Theme {
  breakpoints?: Record<string, Length> | Length[]
  space?: ThemeValue<CSS.MarginProperty<Length>>
  fontSizes?: ThemeValue<CSS.FontSizeProperty<Length>>
  colors?: ThemeValue<CSS.ColorProperty>
  fonts?: ThemeValue<CSS.FontFamilyProperty>
  fontWeights?: ThemeValue<CSS.FontWeightProperty>
  lineHeights?: ThemeValue<CSS.LineHeightProperty<Length>>
  letterSpacings?: ThemeValue<CSS.LetterSpacingProperty<Length>>
  sizes?: ThemeValue<CSS.HeightProperty<Length> | CSS.WidthProperty<Length>>
  borders?: ThemeValue<CSS.BorderProperty<Length>>
  borderStyles?: ThemeValue<CSS.BorderStyleProperty>
  borderWidths?: ThemeValue<CSS.BorderWidthProperty<Length>>
  radii?: ThemeValue<CSS.BorderRadiusProperty<Length>>
  shadows?: ThemeValue<CSS.BoxShadowProperty>
  zIndices?: ThemeValue<CSS.ZIndexProperty>
  components?: {
    [component: string]: Component
  }
}

interface AllProps
  extends SpaceProps,
    ColorProps,
    TransitionProps,
    TypographyProps,
    FlexboxProps,
    TransformProps,
    GridProps,
    LayoutProps,
    BorderProps,
    ShadowProps,
    BackgroundProps,
    PositionProps,
    OutlineProps,
    OtherProps {}

export interface SystemProps extends AllProps, PseudoProps<AllProps> {}
