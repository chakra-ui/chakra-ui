import type { PropertiesFallback } from "csstype"
import type { Conditions } from "./generated/conditions.gen"
import type { CssVarProperties, SystemProperties } from "./generated/system.gen"
import type { AnySelector, Selectors } from "./selectors"

type String = string & {}
type Number = number & {}

/* -----------------------------------------------------------------------------
 * Native css properties
 * -----------------------------------------------------------------------------*/

export type CssProperty = keyof PropertiesFallback

export interface ModernCssProperties {
  anchorName?: String | undefined
  anchorScope?: String | undefined
  fieldSizing?: String | undefined
  interpolateSize?: String | undefined
  positionAnchor?: String | undefined
  positionArea?: String | undefined
  positionTry?: String | undefined
  positionTryFallbacks?: String | undefined
  positionTryOrder?: String | undefined
  positionVisibility?: String | undefined
  textWrapMode?: String | undefined
  textSpacingTrim?: String | undefined
  textWrapStyle?: String | undefined
  colorInterpolationFilters?: String | undefined
  x?: String | undefined
  y?: String | undefined
  z?: String | undefined
  textBox?: String | undefined
  textBoxEdge?: String | undefined
  textBoxTrim?: String | undefined
  r?: String | undefined
  ry?: String | undefined
  rx?: String | undefined
  cx?: String | undefined
  cy?: String | undefined
  d?: String | undefined
}

export interface CssProperties
  extends PropertiesFallback<String | Number>,
    ModernCssProperties,
    CssVarProperties {
  initialLetterAlign?: String | undefined
}

export interface CssKeyframes {
  [name: string]: {
    [time: string]: CssProperties
  }
}

export type KeyframeIdentityFn = (keyframes: CssKeyframes) => CssKeyframes

/* -----------------------------------------------------------------------------
 * Conditional css properties
 * -----------------------------------------------------------------------------*/

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

/* -----------------------------------------------------------------------------
 * Native css props
 * -----------------------------------------------------------------------------*/

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

/* -----------------------------------------------------------------------------
 * Jsx style props
 * -----------------------------------------------------------------------------*/

interface WithCss {
  css?: SystemStyleObject | undefined
}

type StyleProps = SystemProperties & MinimalNested<SystemStyleObject>

export type JsxStyleProps = StyleProps & WithCss
