/* eslint-disable */
import type { ConditionalValue, Nested } from "./conditions"
import type { AtRule, Globals, PropertiesFallback } from "./csstype"
import type { CssVarProperties, SystemProperties } from "./style-props"

type String = string & {}
type Number = number & {}

export type Pretty<T> = { [K in keyof T]: T[K] } & {}

export type DistributiveOmit<T, K extends keyof any> = T extends unknown
  ? Omit<T, K>
  : never

export type DistributiveUnion<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] | T[K] : T[K]
} & DistributiveOmit<U, keyof T>

export type Assign<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] : T[K]
} & U

/* -----------------------------------------------------------------------------
 * Native css properties
 * -----------------------------------------------------------------------------*/

type CornerShapeValue =
  | "round"
  | "square"
  | "bevel"
  | "scoop"
  | "notch"
  | "squircle"
  | `superellipse(${number})`

export interface ModernCssProperties {
  /**
   * Controls whether the entire element should be draggable instead of its contents.
   */
  WebkitUserDrag?: Globals | "auto" | "element" | "none"

  /**
   * Specifies whether an element can be used to drag the entire app window (Electron).
   */
  WebkitAppRegion?: Globals | "drag" | "no-drag"

  /**
   * Sets the horizontal spacing between table borders.
   */
  WebkitBorderHorizontalSpacing?: Globals | String | Number

  /**
   * Sets the vertical spacing between table borders.
   */
  WebkitBorderVerticalSpacing?: Globals | String | Number

  /**
   * Controls the display of text content for security purposes (e.g., password fields).
   */
  WebkitTextSecurity?: Globals | "none" | "circle" | "disc" | "square"

  /**
   * Specifies the shape of a box's corners within the area defined by the border-radius property.
   * @experimental
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape
   */
  cornerShape?:
    | Globals
    | CornerShapeValue
    | `${CornerShapeValue} ${CornerShapeValue}`
    | `${CornerShapeValue} ${CornerShapeValue} ${CornerShapeValue}`
    | `${CornerShapeValue} ${CornerShapeValue} ${CornerShapeValue} ${CornerShapeValue}`
    | String
}

export type CssProperty = keyof PropertiesFallback

export interface CssProperties
  extends
    PropertiesFallback<String | Number>,
    CssVarProperties,
    ModernCssProperties {}

export interface CssKeyframes {
  [name: string]: {
    [time: string]: CssProperties
  }
}

/* -----------------------------------------------------------------------------
 * Conditional css properties
 * -----------------------------------------------------------------------------*/

interface GenericProperties {
  [key: string]: ConditionalValue<String | Number | boolean>
}

/* -----------------------------------------------------------------------------
 * Native css props
 * -----------------------------------------------------------------------------*/

export type NestedCssProperties = Nested<CssProperties>

export type SystemStyleObject = Omit<
  Nested<SystemProperties & CssVarProperties>,
  "base"
>

export interface GlobalStyleObject {
  [selector: string]: SystemStyleObject
}
export interface ExtendableGlobalStyleObject {
  [selector: string]: SystemStyleObject | undefined
  extend?: GlobalStyleObject | undefined
}

/* -----------------------------------------------------------------------------
 * Composition (text styles, layer styles)
 * -----------------------------------------------------------------------------*/

type FilterStyleObject<P extends string> = {
  [K in P]?: K extends keyof SystemStyleObject ? SystemStyleObject[K] : unknown
}

export type CompositionStyleObject<Property extends string> = Nested<
  FilterStyleObject<Property> & CssVarProperties
>

/* -----------------------------------------------------------------------------
 * Font face
 * -----------------------------------------------------------------------------*/

export type GlobalFontfaceRule = Omit<AtRule.FontFaceFallback, "src"> &
  Required<Pick<AtRule.FontFaceFallback, "src">>

export type FontfaceRule = Omit<GlobalFontfaceRule, "fontFamily">

export interface GlobalFontface {
  [name: string]: FontfaceRule | FontfaceRule[]
}

export interface ExtendableGlobalFontface {
  [name: string]: FontfaceRule | FontfaceRule[] | GlobalFontface | undefined
  extend?: GlobalFontface | undefined
}

/* -----------------------------------------------------------------------------
 * Jsx style props
 * -----------------------------------------------------------------------------*/
interface WithCss {
  css?: SystemStyleObject | SystemStyleObject[]
}

export type JsxStyleProps = SystemStyleObject & WithCss

export interface PatchedHTMLProps {
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlTranslate?: "yes" | "no" | undefined
  htmlContent?: string
}

export type OmittedHTMLProps =
  | "color"
  | "translate"
  | "transition"
  | "width"
  | "height"
  | "content"

type WithHTMLProps<T> = DistributiveOmit<T, OmittedHTMLProps> & PatchedHTMLProps

export type JsxHTMLProps<
  T extends Record<string, any>,
  P extends Record<string, any> = {},
> = Assign<WithHTMLProps<T>, P>
