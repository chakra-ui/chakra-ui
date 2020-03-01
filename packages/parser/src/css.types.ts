import * as CSS from "csstype"
import { Pseudos } from "./configs/pseudo.selector"

export type StandardCSSProperties = CSS.PropertiesFallback<number | string>

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type ResponsiveValue<T> = T | Array<T | null>

export type CSSProperties = CSS.StandardProperties<number | string> &
  CSS.SvgProperties<number | string>

export type CSSPseudoStyles<Theme = any> = {
  [K in CSS.Pseudos]?: SystemStyleObject<Theme>
}

export type CSSObject = CSSProperties &
  CSSPseudosForCSSObject &
  CSSOthersObjectForCSSObject

type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject }

type CSSInterpolation = undefined | number | string | CSSObject

interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation
}

interface CSSSelectorObject<Theme = any> {
  [cssSelector: string]: SystemStyleObject<Theme>
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

export type SystemCSSProperties<Theme = any> = {
  [K in keyof AllSystemCSSProperties]:
    | ResponsiveValue<AllSystemCSSProperties[K]>
    | ((theme: Theme) => ResponsiveValue<AllSystemCSSProperties[K]>)
    | SystemStyleObject
}

interface ApplyProperty {
  apply: string
}

type PseudoShorthandStyles<Theme = any> = {
  [K in keyof Pseudos]: SystemStyleObject<Theme>
}

export type SystemStyleObject<Theme = any> =
  | SystemCSSProperties<Theme>
  | CSSPseudoStyles<Theme>
  | CSSSelectorObject<Theme>
  | ApplyProperty
  | PseudoShorthandStyles<Theme>

// The core style object or function
export type StyleObject<Theme> =
  | SystemStyleObject<Theme>
  | ((theme: Theme) => SystemStyleObject<Theme>)

//////////////////////////////////////////////////////////////////////

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
  breakpoints: Record<string, string | number>
}

interface Font {
  fontStyle?: string
  fontWeight?: string
  src: string | string[]
}

type FontFace = {
  [font: string]: Font | Font[]
}

// const fontFace = {
//   "Open Sans": {
//     fontStyle: "normal",
//     fontWeight: "normal",
//     src: ["fonts/OpenSans.woff2", "fonts/OpenSans.ttf"],
//   },
// }

export interface ScaleThemeProperties {
  fontFace?: FontFace
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
