import { Dict, Omit } from "@chakra-ui/utils"
import {
  PropertiesFallback,
  Property,
  Pseudos as CSSPseudos,
  StandardProperties,
  SvgProperties,
} from "csstype"
import { ChakraStyleProps } from "./parser.types"
import { Pseudos } from "./pseudo"
import { ResponsiveValue } from "./utils"

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

interface AliasesCSSProperties extends Omit<ChakraStyleProps, keyof CSS> {}

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
  | (SystemCSSProperties & CSSPseudoStyles & ApplyPropStyles & PseudoStyles)
  | (SystemCSSProperties & CSSSelectorStyles)

export type StyleObjectOrFn =
  | SystemStyleObject
  | ((theme: Dict) => SystemStyleObject)
