import { Dict } from "@chakra-ui/utils"
import * as CSS from "csstype"
import * as System from "./config"
import { Pseudos } from "./pseudo"
import { ResponsiveValue } from "./utils"

export interface StyleProps
  extends System.SpaceProps,
    System.ColorProps,
    System.TransitionProps,
    System.TypographyProps,
    System.FlexboxProps,
    System.TransformProps,
    System.GridProps,
    System.LayoutProps,
    System.BorderProps,
    System.ShadowProps,
    System.BackgroundProps,
    System.ListProps,
    System.PositionProps,
    System.OutlineProps,
    System.OtherProps {}

export interface SystemCSSProperties
  extends CSS.Properties,
    Omit<StyleProps, keyof CSS.Properties> {}

export type ThemeThunk<T> = T | ((theme: Dict) => T)

type PropertyValue<K extends keyof SystemCSSProperties> = ThemeThunk<
  ResponsiveValue<boolean | number | string | SystemCSSProperties[K]>
>

export type CSSWithMultiValues = {
  [K in keyof SystemCSSProperties]?: K extends keyof StyleProps
    ? StyleProps[K] | PropertyValue<K>
    : PropertyValue<K>
}

type PseudoKeys = keyof CSS.Pseudos | keyof Pseudos

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

export type CSSObject = RecursiveCSSObject<CSSWithMultiValues>

export type SystemStyleObject = CSSObject

export interface FunctionCSSInterpolation {
  (theme: Dict): CSSObject
}

export type StyleObjectOrFn = CSSObject | FunctionCSSInterpolation

type PseudoProps = {
  [K in keyof Pseudos]?: SystemStyleObject
}

export interface SystemProps extends StyleProps, PseudoProps {}
