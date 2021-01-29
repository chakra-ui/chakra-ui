import { Dict, Omit } from "@chakra-ui/utils"
import {
  PropertiesFallback,
  Pseudos as CSSPseudos,
  StandardProperties,
  SvgProperties,
} from "csstype"
import { ChakraStyleProps } from "./parser.types"
import { PseudoProps, Pseudos } from "./pseudo"
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
    CSSOtherObject {}

type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K]
}

type CSSPseudosForCSSObject = { [K in CSSPseudos | keyof Pseudos]?: CSSObject }

type CSSInterpolation = undefined | number | string | CSSObject

interface CSSOtherObject {
  [property: string]: CSSInterpolation
}

export interface CSSSelectorStyles {
  [cssSelector: string]: SystemStyleObject | undefined | number | string
}

interface AliasesCSSProperties extends Omit<ChakraStyleProps, keyof CSS> {}

interface AllProperties extends CSSProperties, AliasesCSSProperties {}

export type SystemCSSProperties = {
  [K in keyof AllProperties]: K extends keyof ChakraStyleProps
    ? ChakraStyleProps[K] | AllProperties[K]
    :
        | string
        | ResponsiveValue<AllProperties[K]>
        | ((theme: any) => ResponsiveValue<AllProperties[K]>)
        | SystemStyleObject
}

export interface ApplyPropStyles {
  /**
   * Apply theme-aware style objects in `theme`
   */
  apply?: ResponsiveValue<string>
}

export type SystemStyleObject =
  | MixedStyleProperties
  | (SystemCSSProperties & CSSSelectorStyles)

interface MixedStyleProperties
  extends SystemCSSProperties,
    CSSPseudoStyles,
    ApplyPropStyles {}

interface FunctionCSSInterpolation {
  (theme: Dict): SystemStyleObject
}

export type StyleObjectOrFn = SystemStyleObject | FunctionCSSInterpolation

export interface SystemProps
  extends ChakraStyleProps,
    PseudoProps<SystemStyleObject> {}
