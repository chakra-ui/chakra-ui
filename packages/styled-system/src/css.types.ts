import { Dict, Omit } from "@chakra-ui/utils"
import * as CSS from "csstype"
import { ChakraStyleProps } from "./parser.types"
import { PseudoProps, Pseudos } from "./pseudo"
import { ResponsiveValue } from "./utils"

interface CSSNestedStyles {
  [property: string]: undefined | number | string | CSSObject
}

type CSSNestedPseudoStyles = { [K in CSS.Pseudos]?: CSSObject }

export interface CSSObject
  extends CSS.Properties,
    CSSNestedPseudoStyles,
    CSSNestedStyles {}

interface ShorthandCSSProperties
  extends Omit<ChakraStyleProps, keyof CSS.Properties> {}

interface AllSystemCSSProperties
  extends CSS.Properties,
    ShorthandCSSProperties {}

type ResolvedType<K extends keyof AllSystemCSSProperties> =
  | string
  | ResponsiveValue<AllSystemCSSProperties[K]>
  | ((theme: any) => ResponsiveValue<AllSystemCSSProperties[K]>)
  | SystemStyleObject

export type SystemCSSProperties = {
  [K in keyof AllSystemCSSProperties]: K extends keyof ChakraStyleProps
    ? ChakraStyleProps[K]
    : ResolvedType<K>
}

export interface ApplyPropStyles {
  /**
   * Apply theme-aware style objects in `theme`
   */
  apply?: ResponsiveValue<string>
}

type ShorthandPseudoStyles = {
  [K in keyof Pseudos]?: K extends "_before" | "_after"
    ? SystemCSSProperties & { content?: string }
    : SystemCSSProperties
}
export interface CSSSelectorStyles {
  [cssSelector: string]: SystemStyleObject
}

export type SystemStyleObject =
  | (SystemCSSProperties &
      CSSNestedPseudoStyles &
      ApplyPropStyles &
      ShorthandPseudoStyles)
  | (SystemCSSProperties & CSSSelectorStyles)

export type StyleObjectOrFn =
  | SystemStyleObject
  | ((theme: Dict) => SystemStyleObject)

export interface SystemProps
  extends ChakraStyleProps,
    PseudoProps<SystemStyleObject> {}
