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
} from "./configs"
import { PseudoProps } from "./pseudo"

type Length = string | number

export type ThemeKey<T, K extends keyof any = keyof any> = T[] | Record<K, T>

export type Responsive<V, T extends { breakpoints?: any }> =
  | V
  | Array<V | null>
  | { [key in keyof T["breakpoints"]]?: V }

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

export interface Theme {
  breakpoints?: Record<string, Length>
  space?: ThemeKey<CSS.MarginProperty<Length>>
  fontSizes?: ThemeKey<CSS.FontSizeProperty<Length>>
  colors?: ThemeKey<CSS.ColorProperty>
  fonts?: ThemeKey<CSS.FontFamilyProperty>
  fontWeights?: ThemeKey<CSS.FontWeightProperty>
  lineHeights?: ThemeKey<CSS.LineHeightProperty<Length>>
  letterSpacings?: ThemeKey<CSS.LetterSpacingProperty<Length>>
  sizes?: ThemeKey<CSS.HeightProperty<{}> | CSS.WidthProperty<{}>>
  borders?: ThemeKey<CSS.BorderProperty<{}>>
  borderStyles?: ThemeKey<CSS.BorderProperty<{}>>
  borderWidths?: ThemeKey<CSS.BorderWidthProperty<Length>>
  radii?: ThemeKey<CSS.BorderRadiusProperty<Length>>
  shadows?: ThemeKey<CSS.BoxShadowProperty>
  zIndices?: ThemeKey<CSS.ZIndexProperty>
  components?: { [component: string]: Component }
}

/**
 * Extract the possible theme value type
 * based on the scale.
 *
 * @example
 *
 * type Result = Scale<"space", { space: [4, 5] }>
 * // => Result: number
 *
 * type Result = Scale<"space", { space: { sm: 4, md: 5 } }>
 * // => Result: "sm" | "md"
 */
export type Scale<K extends keyof T, T> = T[K] extends any[]
  ? number
  : T[K] extends Record<infer U, any>
  ? U
  : T[K] extends ThemeKey<infer V>
  ? V
  : never

export type StyleProps = SpaceProps &
  ColorProps &
  TypographyProps &
  FlexboxProps &
  GridProps &
  LayoutProps &
  BorderProps &
  ShadowProps &
  BackgroundProps &
  PositionProps &
  OtherProps

export interface TruncateProps {
  isTruncated?: boolean
}

export type SystemProps = StyleProps & PseudoProps<StyleProps> & TruncateProps
