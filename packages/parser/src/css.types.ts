import * as CSS from "csstype"
import { Pseudos } from "./configs/pseudo.selector"
import { Dict } from "@chakra-ui/utils"

export type StandardCSSProperties = CSS.PropertiesFallback<number | string>

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type ResponsiveValue<T> = T | Array<T | null>

export type CSSProperties = CSS.StandardProperties<number | string> &
  CSS.SvgProperties<number | string>

export type CSSPseudoSelectorProps = {
  [K in CSS.Pseudos]?: SystemStyleObject
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudosForCSSObject,
    CSSOthersObjectForCSSObject {}

type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K]
}

type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject }

type CSSInterpolation = undefined | number | string | CSSObject

interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation
}
interface CSSSelectorObject {
  [cssSelector: string]: SystemStyleObject
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

export type SystemCSSProperties = {
  [K in keyof AllSystemCSSProperties]:
    | ResponsiveValue<AllSystemCSSProperties[K]>
    | ((theme: any) => ResponsiveValue<AllSystemCSSProperties[K]>)
    | SystemStyleObject
}

interface ApplyProperty {
  apply: string
}

type PseudoShorthandStyles = {
  [K in keyof Pseudos]: SystemStyleObject & { content?: string }
}

export type SystemStyleObject =
  | string
  | SystemCSSProperties
  | CSSPseudoSelectorProps
  | CSSSelectorObject
  | ApplyProperty
  | PseudoShorthandStyles

// The core style object or function
export type StyleObject =
  | SystemStyleObject
  | ((theme: any) => SystemStyleObject)

//////////////////////////////////////////////////////////////////////

export type ThemeValue<T> = T[] | Dict<T>
type TVal = string | number

export interface Theme {
  breakpoints?: Dict<string | number>
  colors?: ThemeValue<TVal>
  space?: ThemeValue<TVal>
  fonts?: ThemeValue<TVal>
  fontSizes?: ThemeValue<TVal>
  fontWeights?: ThemeValue<TVal>
  lineHeights?: ThemeValue<TVal>
  letterSpacings?: ThemeValue<TVal>
  borders?: ThemeValue<TVal>
  borderWidths?: ThemeValue<TVal>
  borderStyles?: ThemeValue<TVal>
  radii?: ThemeValue<TVal>
  shadows?: ThemeValue<TVal>
  zIndices?: ThemeValue<TVal>
  sizes?: ThemeValue<TVal>
}
