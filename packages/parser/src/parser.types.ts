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
} from "./configs"
import { PseudoProps } from "./pseudo"

type Length = string | 0 | number

type ThemeValue<T> = T[] | Record<string, T>

export type Responsive<V, T extends { breakpoints?: any }> =
  | V
  | (V | null)[]
  | { [K in keyof T["breakpoints"]]?: V }

export interface Component {
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
  breakpoints?: Record<string, Length>
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

export interface StyleProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    FlexboxProps,
    GridProps,
    LayoutProps,
    BorderProps,
    ShadowProps,
    BackgroundProps,
    PositionProps,
    OutlineProps,
    OtherProps {}

export interface SystemProps extends StyleProps, PseudoProps<StyleProps> {}
