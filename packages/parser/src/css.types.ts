import * as CSS from "csstype"
import { Pseudos } from "./configs/pseudo.selector"

export type StandardCSSProperties = CSS.PropertiesFallback<number | string>

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type ResponsiveValue<T> = T | Array<T | null>

export type CSSProperties = CSS.StandardProperties<number | string> &
  CSS.SvgProperties<number | string>

export type CSSPseudoStyles<T = any> = {
  [K in CSS.Pseudos]?: SystemStyleObject<T>
}

export type CSSObject = CSSProperties &
  CSSPseudosForCSSObject &
  CSSOthersObjectForCSSObject

type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject }

type CSSInterpolation = undefined | number | string | CSSObject

interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation
}

interface CSSSelectorObject<T = any> {
  [cssSelector: string]: SystemStyleObject<T>
}

interface AliasesCSSProperties {
  bg?: StandardCSSProperties["backgroundColor"]
  m?: StandardCSSProperties["margin"]
  mt?: StandardCSSProperties["marginTop"]
  mr?: StandardCSSProperties["marginRight"]
  mb?: StandardCSSProperties["marginBottom"]
  ml?: StandardCSSProperties["marginLeft"]
  mx?: StandardCSSProperties["marginLeft"]
  marginX?: StandardCSSProperties["marginLeft"]
  my?: StandardCSSProperties["marginTop"]
  marginY?: StandardCSSProperties["marginTop"]
  p?: StandardCSSProperties["padding"]
  pt?: StandardCSSProperties["paddingTop"]
  pr?: StandardCSSProperties["paddingRight"]
  pb?: StandardCSSProperties["paddingBottom"]
  pl?: StandardCSSProperties["paddingLeft"]
  px?: StandardCSSProperties["paddingLeft"]
  paddingX?: StandardCSSProperties["paddingLeft"]
  py?: StandardCSSProperties["paddingTop"]
  paddingY?: StandardCSSProperties["paddingTop"]
}

interface OverwriteCSSProperties {
  boxShadow?: CSS.BoxShadowProperty | number
  fontWeight?: CSS.FontWeightProperty | string
  zIndex?: CSS.ZIndexProperty | string
}

interface AllSystemCSSProperties
  extends Omit<CSSProperties, "boxShadow" | "fontWeight" | "zIndex">,
    AliasesCSSProperties,
    OverwriteCSSProperties {}

export type SystemCSSProperties<T = any> = {
  [K in keyof AllSystemCSSProperties]:
    | ResponsiveValue<AllSystemCSSProperties[K]>
    | ((theme: T) => ResponsiveValue<AllSystemCSSProperties[K]>)
    | SystemStyleObject
}

interface VariantProperty {
  variant: string
}

type PseudoShorthandStyles<T = any> = {
  [K in keyof Pseudos]: SystemStyleObject<T>
}

export type SystemStyleObject<Theme = any> =
  | SystemCSSProperties<Theme>
  | CSSPseudoStyles<Theme>
  | CSSSelectorObject<Theme>
  | VariantProperty
  | PseudoShorthandStyles<Theme>

//////////////////////////////////////////////////////////////////////

const style: SystemStyleObject<{
  shadows: [1, 2, 3]
  fontSizes: { sm: 12 }
}> = {
  fontSize: 10,
  bg: "grea",
  boxShadow: theme => [`welcome`, `sdfdfd`],
  "&:hover": {
    fontKerning: "normal",
    zIndex: "fdfdf",
    fontSize: theme => theme.fontSizes.sm,
  },
}

export type ThemeValue<T> =
  | T[]
  | {
      [name: string]: T | ThemeValue<T>
    }

export type Theme =
  | { [K in keyof StandardCSSProperties]: ThemeValue<StandardCSSProperties[K]> }
  | Partial<ScaleThemeProperties>
  | ThemeBreakPoints
  | { [variantPart: string]: Theme }

interface ThemeBreakPoints {
  breakpoints: string[] | number[]
}

export interface ScaleThemeProperties {
  colors?: ThemeValue<CSS.ColorProperty>
  space?: ThemeValue<CSS.MarginProperty<number> & CSS.PaddingProperty<number>>
  fonts?: ThemeValue<CSS.FontFamilyProperty>
  fontSizes?: ThemeValue<CSS.FontSizeProperty<number>>
  fontWeights?: ThemeValue<CSS.FontWeightProperty>
  lineHeights?: ThemeValue<CSS.LineHeightProperty<string>>
  letterSpacings?: ThemeValue<CSS.LetterSpacingProperty<string | number>>
  borders?: ThemeValue<CSS.BorderProperty<{}>>
  borderWidths?: ThemeValue<CSS.BorderWidthProperty<{}>>
  borderStyles?: ThemeValue<CSS.LineStyle>
  radii?: ThemeValue<CSS.BorderRadiusProperty<{}>>
  shadows?: ThemeValue<CSS.BoxShadowProperty>
  zIndices?: ThemeValue<CSS.ZIndexProperty>
  sizes?: ThemeValue<CSS.HeightProperty<{}> | CSS.WidthProperty<{}>>
}
