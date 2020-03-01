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
  bg?: StandardCSSProperties["background"]
  bgColor?: StandardCSSProperties["backgroundColor"]
  bgImage?: StandardCSSProperties["backgroundImage"]
  bgSize?: StandardCSSProperties["backgroundSize"]
  bgPosition?: StandardCSSProperties["backgroundPosition"]
  bgRepeat?: StandardCSSProperties["backgroundRepeat"]
  bgAttachment?: StandardCSSProperties["backgroundAttachment"]
  borderX?: StandardCSSProperties["border"]
  borderY?: StandardCSSProperties["border"]
  borderTopRadius?: StandardCSSProperties["borderRadius"]
  borderBottomRadius?: StandardCSSProperties["borderRadius"]
  borderLeftRadius?: StandardCSSProperties["borderRadius"]
  borderRightRadius?: StandardCSSProperties["borderRadius"]
  textColor?: StandardCSSProperties["color"]
  flexDir?: StandardCSSProperties["flexDirection"]
  w?: StandardCSSProperties["width"]
  h?: StandardCSSProperties["height"]
  minW?: StandardCSSProperties["minWidth"]
  maxW?: StandardCSSProperties["maxWidth"]
  minH?: StandardCSSProperties["minHeight"]
  maxH?: StandardCSSProperties["maxHeight"]
  m?: StandardCSSProperties["margin"]
  mt?: StandardCSSProperties["marginTop"]
  mr?: StandardCSSProperties["marginRight"]
  mb?: StandardCSSProperties["marginBottom"]
  ml?: StandardCSSProperties["marginLeft"]
  mx?: StandardCSSProperties["marginLeft"]
  pos?: StandardCSSProperties["position"]
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
  textDecor?: StandardCSSProperties["textDecoration"]
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
  [K in keyof Pseudos]: SystemStyleObject<Theme> & { content?: string }
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
  | { [variantParts: string]: Theme }

interface ThemeBreakPoints {
  breakpoints: Record<string, string | number>
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
