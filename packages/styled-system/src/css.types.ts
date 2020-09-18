import { ResponsiveValue } from "./utils"
import { Omit, Dict } from "@chakra-ui/utils"
import { Pseudos } from "./pseudo"
import {
  Property,
  PropertiesFallback,
  Pseudos as CSSPseudos,
  StandardProperties,
  SvgProperties,
} from "csstype"

type CSS = PropertiesFallback<number | string>

type CSSProperties = StandardProperties<number | string> &
  SvgProperties<number | string>

export type CSSPseudoStyles = {
  [K in CSSPseudos]?: SystemStyleObject
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudosForCSSObject,
    CSSOthersObjectForCSSObject {}

type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K]
}

type CSSPseudosForCSSObject = { [K in CSSPseudos]?: CSSObject }

type CSSInterpolation = undefined | number | string | CSSObject

interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation
}

export interface CSSSelectorStyles {
  [cssSelector: string]: SystemStyleObject
}

interface AliasesCSSProperties {
  bg?: CSS["background"]
  bgColor?: CSS["backgroundColor"]
  bgImage?: CSS["backgroundImage"]
  bgSize?: CSS["backgroundSize"]
  bgPosition?: CSS["backgroundPosition"]
  bgRepeat?: CSS["backgroundRepeat"]
  bgAttachment?: CSS["backgroundAttachment"]
  borderX?: CSS["border"]
  borderY?: CSS["border"]
  borderTopRadius?: CSS["borderRadius"]
  borderBottomRadius?: CSS["borderRadius"]
  borderLeftRadius?: CSS["borderRadius"]
  borderRightRadius?: CSS["borderRadius"]
  textColor?: CSS["color"]
  flexDir?: CSS["flexDirection"]
  w?: CSS["width"]
  h?: CSS["height"]
  boxSize?: CSS["width"]
  minW?: CSS["minWidth"]
  maxW?: CSS["maxWidth"]
  minH?: CSS["minHeight"]
  maxH?: CSS["maxHeight"]
  m?: CSS["margin"]
  mt?: CSS["marginTop"]
  mr?: CSS["marginRight"]
  mb?: CSS["marginBottom"]
  ml?: CSS["marginLeft"]
  mx?: CSS["marginLeft"]
  pos?: CSS["position"]
  inset?: CSS["left"]
  insetX?: CSS["left"]
  insetY?: CSS["top"]
  marginX?: CSS["marginLeft"]
  my?: CSS["marginTop"]
  marginY?: CSS["marginTop"]
  p?: CSS["padding"]
  pt?: CSS["paddingTop"]
  pr?: CSS["paddingRight"]
  pb?: CSS["paddingBottom"]
  pl?: CSS["paddingLeft"]
  px?: CSS["paddingLeft"]
  paddingX?: CSS["paddingLeft"]
  py?: CSS["paddingTop"]
  paddingY?: CSS["paddingTop"]
  textDecor?: CSS["textDecoration"]
}

interface OverwriteCSSProperties {
  boxShadow?: Property.BoxShadow | number
  fontWeight?: Property.FontWeight | string
  zIndex?: Property.ZIndex | string
}

interface AllSystemCSSProperties
  extends Omit<CSSProperties, "boxShadow" | "fontWeight" | "zIndex" | "inset">,
    AliasesCSSProperties,
    OverwriteCSSProperties {}

export type SystemCSSProperties = {
  [K in keyof AllSystemCSSProperties]:
    | string
    | ResponsiveValue<AllSystemCSSProperties[K]>
    | ((theme: any) => ResponsiveValue<AllSystemCSSProperties[K]>)
    | SystemStyleObject
}

export interface ApplyPropStyles {
  /**
   * Apply theme-aware style objects in `theme`
   */
  apply?: ResponsiveValue<string>
}

type PseudoStyles = {
  [K in keyof Pseudos]?: K extends "_before" | "_after"
    ? SystemCSSProperties & { content?: string }
    : SystemCSSProperties
}

export type SystemStyleObject =
  | SystemCSSProperties
  | CSSPseudoStyles
  | CSSSelectorStyles
  | ApplyPropStyles
  | PseudoStyles

export type StyleObjectOrFn =
  | SystemStyleObject
  | ((theme: Dict) => SystemStyleObject)
