import { AnalyzeBreakpointsReturn, Dict } from "@chakra-ui/utils"
import { ThemeTypings } from "../theming.types"

export type ResponsiveArray<T> = Array<T | null>

export type ResponsiveObject<T> = Partial<
  Record<ThemeTypings["breakpoints"] | string, T>
>

export type ResponsiveValue<T> = T | ResponsiveArray<T> | ResponsiveObject<T>

export type Length = string | 0 | number

export type Union<T> = T | (string & {})

export type Token<
  CSSType,
  ThemeKey = unknown
> = ThemeKey extends keyof ThemeTypings
  ? ResponsiveValue<Union<CSSType | ThemeTypings[ThemeKey]>>
  : ResponsiveValue<CSSType>

export type CSSMap = Dict<{ value: string; var: string; varRef: string }>

export type Transform = (value: any, theme: CssTheme, styles?: Dict) => any

export type WithCSSVar<T> = T & {
  __cssVars: Dict
  __cssMap: CSSMap
  __breakpoints: AnalyzeBreakpointsReturn
}

export type CssTheme = WithCSSVar<{
  breakpoints: Dict
  direction?: "ltr" | "rtl"
  [key: string]: any
}>
