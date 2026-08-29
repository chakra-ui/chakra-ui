import type {
  Conditions,
  CssVarProperties,
  SystemProperties,
} from "@chakra-ui/styled-system/types"
import type { PropertiesFallback } from "csstype"
import type { AnySelector, Selectors } from "./selectors"

type String = string & {}
type Number = number & {}

export type CssProperty = keyof PropertiesFallback

export interface CssProperties
  extends PropertiesFallback<String | Number>, CssVarProperties {}

export interface CssKeyframes {
  [name: string]: {
    [time: string]: CssProperties
  }
}

export type KeyframeIdentityFn = (keyframes: CssKeyframes) => CssKeyframes

export type Condition = keyof Conditions

export type ConditionalValue<V> =
  | V
  | Array<V | null>
  | {
      [K in keyof Conditions]?: ConditionalValue<V>
    }

export type Nested<P> = P & {
  [K in Selectors]?: Nested<P>
} & {
  [K in AnySelector]?: Nested<P>
} & {
  [K in keyof Conditions]?: Nested<P>
}

export type MinimalNested<P> = {
  [K in keyof Conditions]?: Nested<P>
}

export type NestedCssProperties = Nested<CssProperties>

export type SystemStyleObject = Nested<SystemProperties & CssVarProperties>

export type SystemStyleIdentityFn = (
  style: SystemStyleObject,
) => SystemStyleObject

export interface GlobalStyleObject {
  [selector: string]: SystemStyleObject
}

export type GlobalStyleIdentityFn = (
  global: GlobalStyleObject,
) => GlobalStyleObject

type FilterStyleObject<P extends string> = {
  [K in P]?: K extends keyof SystemStyleObject ? SystemStyleObject[K] : unknown
}

export type CompositionStyleObject<Property extends string> = Nested<
  FilterStyleObject<Property> & CssVarProperties
>

interface WithCss {
  css?: SystemStyleObject | undefined
}

type StyleProps = SystemProperties & MinimalNested<SystemStyleObject>

export type JsxStyleProps = StyleProps & WithCss
