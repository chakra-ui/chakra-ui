/* eslint-disable */
import type { TokenCategory } from "../tokens/index"
import type { CssProperty, SystemStyleObject } from "./system-types"

type Primitive = string | number | boolean | null | undefined
type LiteralUnion<T, K extends Primitive = string> =
  | T
  | (K & Record<never, never>)

export type PatternProperty =
  | { type: "property"; value: CssProperty; description?: string }
  | { type: "enum"; value: string[]; description?: string }
  | {
      type: "token"
      value: TokenCategory
      property?: CssProperty
      description?: string
    }
  | { type: "string" | "boolean" | "number"; description?: string }

export interface PatternHelpers {
  map: (value: any, fn: (value: string) => string | undefined) => any
  isCssUnit: (value: any) => boolean
  isCssVar: (value: any) => boolean
  isCssFunction: (value: any) => boolean
}

export interface PatternProperties {
  [key: string]: PatternProperty
}

type InferProps<T> = Record<LiteralUnion<keyof T>, any>

export type PatternDefaultValue<T> = Partial<InferProps<T>>

export type PatternDefaultValueFn<T> = (
  props: InferProps<T>,
) => PatternDefaultValue<T>

export interface PatternConfig<
  T extends PatternProperties = PatternProperties,
> {
  /**
   * The description of the pattern. This will be used in the JSDoc comment.
   */
  description?: string
  /**
   * The JSX element rendered by the pattern
   * @default 'div'
   */
  jsxElement?: string
  /**
   * The properties of the pattern.
   */
  properties?: T
  /**
   * The default values of the pattern.
   */
  defaultValues?: PatternDefaultValue<T> | PatternDefaultValueFn<T>
  /**
   * The css object this pattern will generate.
   */
  transform?: (
    props: InferProps<T>,
    helpers: PatternHelpers,
  ) => SystemStyleObject
  /**
   * Whether the pattern is deprecated.
   */
  deprecated?: boolean | string
  /**
   * The jsx element name this pattern will generate.
   */
  jsxName?: string
  /**
   * The jsx elements to track for this pattern. Can be string or Regexp.
   *
   * @default capitalize(pattern.name)
   * @example ['Button', 'Link', /Button$/]
   */
  jsx?: Array<string | RegExp>
  /**
   * Whether to only generate types for the specified properties.
   * This will disallow css properties
   */
  strict?: boolean
  /**
   * @experimental
   * Disallow certain css properties for this pattern
   */
  blocklist?: LiteralUnion<CssProperty>[]
}
