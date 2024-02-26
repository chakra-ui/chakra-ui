import { Dict, LiteralUnion } from "@chakra-ui/utils"
import { PropertiesFallback } from "csstype"
import { ConditionalValue, Nested } from "./conditions.gen"

export type CssProperty = keyof PropertiesFallback

export type CssVarProperties = {
  [key in `--${string}`]?: ConditionalValue<string | number>
}

export interface CssProperties
  extends PropertiesFallback<String | Number>,
    CssVarProperties {}

interface Recursive<T> {
  [key: string]: T | Recursive<T>
}

/* -----------------------------------------------------------------------------
 * Token Dictionary
 * -----------------------------------------------------------------------------*/

export type TokenCategory =
  | "zIndex"
  | "opacity"
  | "colors"
  | "fonts"
  | "fontSizes"
  | "fontWeights"
  | "lineHeights"
  | "letterSpacings"
  | "sizes"
  | "shadows"
  | "spacing"
  | "radii"
  | "borders"
  | "durations"
  | "easings"
  | "animations"
  | "blurs"
  | "gradients"
  | "assets"
  | "borderWidths"
  | "aspectRatios"

export interface TokenSchema<T = any> {
  value: T
  description?: string
}

type PrimitiveTokenValue = string | number

export type TokenDefinition = {
  [key in TokenCategory]?: Recursive<TokenSchema<PrimitiveTokenValue>>
}

export type SemanticTokenDefinition = {
  [key in TokenCategory]?: Recursive<
    TokenSchema<PrimitiveTokenValue | Record<string, PrimitiveTokenValue>>
  >
}

export interface TokenCssVar {
  var: string
  ref: string
}

export interface TokenFormatOptions {
  formatTokenName(path: string[]): string
  formatCssVar(path: string[], prefix: string): TokenCssVar
}

export type TokenEnforcePhase = "pre" | "post"

export interface TokenMiddleware {
  enforce: TokenEnforcePhase
  transform(dict: TokenDictionary): void
}

export interface TokenTransformer {
  name: string
  enforce: TokenEnforcePhase
  type: "value" | "name" | "extensions"
  match?(token: Token): boolean
  transform(token: Token, dictionary: TokenDictionary): any
}

export interface TokenDictionary extends TokenFormatOptions {
  prefix: string
  allTokens: Token[]
  tokenMap: Map<string, Token>
  flatMap: Map<string, string>
  cssVarMap: Map<string, Map<string, string>>
  categoryMap: Map<string, Map<string, Token>>
  colorPaletteMap: Map<string, Map<string, string>>
  registerToken(token: Token, phase?: TokenEnforcePhase): void
  getVar(value: string, fallback?: string): string | undefined
  getCategoryValues(category: string): Dict
  getByName(name: string): Token | undefined
}

interface ColorPaletteExtension {
  value: string
  roots: string[][]
  keys: string[][]
}

export interface TokenExtensions {
  originalPath: string[]
  category: string
  prop: string
  default?: boolean
  condition?: string
  virtual?: boolean
  negative?: boolean
  conditions?: Dict
  cssVar?: TokenCssVar
  colorPalette?: ColorPaletteExtension
  references?: Dict
}

export interface Token<T = any> {
  value: T
  description?: string
  originalValue: any
  name: string
  path: string[]
  extensions: TokenExtensions
}

/* -----------------------------------------------------------------------------
 * Utility
 * -----------------------------------------------------------------------------*/

type ThemeFn = (token: (path: string) => any) => Record<string, string>

interface TokenFn {
  (path: string): string | undefined
  raw: (path: string) => Token | undefined
}

export interface TransformArgs<T = any> {
  token: TokenFn
  raw: T
}

type PropertyTransform = (
  value: any,
  args: TransformArgs,
) => Nested<CssProperties> | undefined

export type PropertyValues =
  | LiteralUnion<TokenCategory>
  | string[]
  | { type: string }
  | Record<string, string>
  | ThemeFn

export interface UtilityPropertyConfig {
  /**
   * @internal
   * The cascade layer to which the property belongs
   */
  layer?: string
  /**
   * The classname this property will generate.
   */
  className?: string
  /**
   * The css style object this property will generate.
   */
  transform?: PropertyTransform
  /**
   * The possible values this property can have.
   */
  values?: PropertyValues
  /**
   * The css property this utility maps to.
   */
  property?: CssProperty
  /**
   * The shorthand of the property.
   */
  shorthand?: string | string[]
}

export type UtilityConfig = {
  [property in LiteralUnion<CssProperty>]?: UtilityPropertyConfig
}

export interface Utility {
  keys(): string[]
  hasShorthand: boolean
  resolveShorthand(key: string): string
  transform(key: string, value: any): Dict | undefined
  register(property: string, config: UtilityPropertyConfig): void
}

/* -----------------------------------------------------------------------------
 * Condition
 * -----------------------------------------------------------------------------*/

interface Condition {
  keys(): string[]
  sort(paths: string[]): string[]
  has(key: string): boolean
  resolve(key: string): string
  breakpoints: string[]
}

/* -----------------------------------------------------------------------------
 * System Context
 * -----------------------------------------------------------------------------*/

export interface SystemContext {
  utility: Utility
  conditions: Condition
  tokens: TokenDictionary
}
