import * as CSS from "csstype"
import type {
  BackgroundProps,
  BorderProps,
  ColorProps,
  EffectProps,
  FilterProps,
  FlexboxProps,
  GridProps,
  InteractivityProps,
  LayoutProps,
  ListProps,
  OtherProps,
  PositionProps,
  RingProps,
  SpaceProps,
  TextDecorationProps,
  TransformProps,
  TransitionProps,
  TypographyProps,
  ScrollProps,
} from "./config"
import { PseudoKey } from "./pseudos"
import { ResponsiveValue } from "./utils/types"

export interface StyleProps
  extends SpaceProps,
    ColorProps,
    TransitionProps,
    TypographyProps,
    FlexboxProps,
    TransformProps,
    GridProps,
    FilterProps,
    LayoutProps,
    BorderProps,
    EffectProps,
    BackgroundProps,
    ListProps,
    PositionProps,
    RingProps,
    ScrollProps,
    InteractivityProps,
    TextDecorationProps,
    OtherProps {}

export interface SystemCSSProperties
  extends CSS.Properties,
    Omit<StyleProps, keyof CSS.Properties> {}

export type ThemeThunk<T> = T | ((theme: Record<string, any>) => T)

type PropertyValue<K extends keyof SystemCSSProperties> = ThemeThunk<
  ResponsiveValue<boolean | number | string | SystemCSSProperties[K]>
>

export type CSSWithMultiValues = {
  [K in keyof SystemCSSProperties]?: K extends keyof StyleProps
    ? StyleProps[K] | PropertyValue<K>
    : PropertyValue<K>
}

type PseudoKeys = keyof CSS.Pseudos | PseudoKey

type PseudoSelectorDefinition<D> = D | RecursivePseudo<D>

export type RecursivePseudo<D> = {
  [K in PseudoKeys]?: PseudoSelectorDefinition<D> & D
}

type CSSDefinition<D> = D | string | RecursiveCSSSelector<D | string>

export interface RecursiveCSSSelector<D> {
  [selector: string]: CSSDefinition<D> & D
}

export type RecursiveCSSObject<D> = D &
  (D | RecursivePseudo<D> | RecursiveCSSSelector<D>)

export type SystemStyleObject = RecursiveCSSObject<CSSWithMultiValues>

export type StyleObjectOrFn =
  | SystemStyleObject
  | ((theme: any) => SystemStyleObject)

type PseudoProps = {
  [K in PseudoKey]?: SystemStyleObject
}

export interface SystemProps extends StyleProps, PseudoProps {}
