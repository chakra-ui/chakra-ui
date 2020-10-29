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
  ListProps,
} from "./config"
import { PseudoProps } from "./pseudo"
import { Length } from "./utils"

type ThemeValue<T> = T[] | Record<string, T>

interface Component {
  readonly parts?: string[]
  baseStyle?: any
  variants?: any
  sizes?: any
  defaultProps?: {
    variant?: string
    size?: string
    colorScheme?: string
  }
}

export interface DefaultTheme {
  breakpoints?: Record<string, Length> | Length[]
  space?: ThemeValue<CSS.Property.Margin<Length>>
  fontSizes?: ThemeValue<CSS.Property.FontSize<Length>>
  colors?: ThemeValue<CSS.Property.Color>
  fonts?: ThemeValue<CSS.Property.FontFamily>
  fontWeights?: ThemeValue<CSS.Property.FontWeight>
  lineHeights?: ThemeValue<CSS.Property.LineHeight<Length>>
  letterSpacings?: ThemeValue<CSS.Property.LetterSpacing<Length>>
  sizes?: ThemeValue<CSS.Property.Height<Length> | CSS.Property.Width<Length>>
  borders?: ThemeValue<CSS.Property.Border<Length>>
  borderStyles?: ThemeValue<CSS.Property.BorderStyle>
  borderWidths?: ThemeValue<CSS.Property.BorderWidth<Length>>
  radii?: ThemeValue<CSS.Property.BorderRadius<Length>>
  shadows?: ThemeValue<CSS.Property.BoxShadow>
  zIndices?: ThemeValue<CSS.Property.ZIndex>
  components?: {
    [component: string]: Component
  }
}

export interface ChakraStyleProps
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
    ListProps,
    PositionProps,
    OutlineProps,
    OtherProps {}

export interface SystemProps
  extends ChakraStyleProps,
    PseudoProps<ChakraStyleProps> {}
