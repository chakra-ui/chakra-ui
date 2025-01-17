import type { PropertiesFallback } from "csstype"
import type { Dict, DistributiveOmit } from "../utils"
import type {
  ConditionalValue,
  CssKeyframes,
  Nested,
  SystemStyleObject,
} from "./css.types"
import type {
  RecipeCreatorFn,
  RecipeDefinition,
  SlotRecipeConfig,
  SlotRecipeCreatorFn,
} from "./recipe.types"

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
  | "cursor"
  | "borderWidths"
  | "breakpoints"
  | "borderStyles"
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
  expandReferenceInValue(value: string): string
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
  references?: Dict<Token>
  pixelValue?: string
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

interface UtilityTokenFn {
  (path: string): string | undefined
  raw: (path: string) => Token | undefined
}

export interface ColorMixResult {
  invalid: boolean
  value: string
  color?: string
}

export interface TransformUtils {
  colorMix(value: string): ColorMixResult
}

export interface TransformArgs<T = any> {
  token: UtilityTokenFn
  raw: T
  utils: TransformUtils
}

export type PropertyTransform = (
  value: any,
  args: TransformArgs,
) => Nested<CssProperties> | undefined

export type PropertyValues =
  | TokenCategory
  | string[]
  | { type: string }
  | Record<string, string>
  | ThemeFn

export interface UtilityPropertyConfig {
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
  [property in CssProperty]?: UtilityPropertyConfig
} & {
  [property: string]: UtilityPropertyConfig
}

export interface Utility {
  keys(): string[]
  shorthands: Map<string, string>
  hasShorthand: boolean
  resolveShorthand(key: string): string
  transform(key: string, value: any): Dict | undefined
  register(property: string, config: UtilityPropertyConfig): void
  getTypes(): Map<string, string[]>
  addPropertyType(property: string, type: string[]): void
}

/* -----------------------------------------------------------------------------
 * Breakpoints
 * -----------------------------------------------------------------------------*/

export interface BreakpointEntry {
  name: string
  min?: string | null
  max?: string | null
}

export interface Breakpoint {
  up(key: string): string
  down(key: string): string
  only(key: string): string
  keys(): string[]
  values: BreakpointEntry[]
  conditions: Dict
  getCondition(key: string): string
}

/* -----------------------------------------------------------------------------
 * Condition
 * -----------------------------------------------------------------------------*/

export interface Condition {
  keys(): string[]
  sort(paths: string[]): string[]
  has(key: string): boolean
  resolve(key: string): string
  breakpoints: string[]
  expandAtRule(key: string): string
}

export interface ConditionRecord {
  [key: string]: string | string[]
}

export interface ConditionConfig {
  breakpoints: Breakpoint
  conditions: ConditionRecord
}

/* -----------------------------------------------------------------------------
 * System Context
 * -----------------------------------------------------------------------------*/

export interface TokenFn {
  (path: string, fallback?: any): any
  var(path: string, fallback?: any): any
}

export type CssFn = (
  ...styles: (SystemStyleObject | undefined)[]
) => SystemStyleObject

export interface Layers {
  wrap(layer: CascadeLayer, styles: Dict): Dict
  names: string[]
  atRule: string
}

export interface SystemContext {
  $$chakra: true
  _config: SystemConfig
  _global: Dict[]
  utility: Utility
  conditions: Condition
  tokens: TokenDictionary
  breakpoints: Breakpoint
  properties: Set<string>
  isValidProperty(prop: string): boolean
  normalizeValue(value: any): any
  splitCssProps<T extends SystemStyleObject>(
    props: T,
  ): [SystemStyleObject, DistributiveOmit<T, keyof SystemStyleObject>]
  getTokenCss(): Dict
  getGlobalCss(): Dict
  getPreflightCss(): Dict
  css: CssFn
  cva: RecipeCreatorFn
  sva: SlotRecipeCreatorFn
  getRecipe(key: string, fallback?: any): any
  getSlotRecipe(key: string, fallback?: any): any
  isRecipe(key: string): boolean
  isSlotRecipe(key: string): boolean
  hasRecipe(key: string): boolean
  token: TokenFn
  layers: Layers
}

export interface ThemingConfig {
  breakpoints?: Record<string, string>
  keyframes?: CssKeyframes
  tokens?: TokenDefinition
  semanticTokens?: SemanticTokenDefinition
  textStyles?: Record<string, Dict>
  layerStyles?: Record<string, Dict>
  animationStyles?: Record<string, Dict>
  recipes?: Record<string, RecipeDefinition>
  slotRecipes?: Record<string, SlotRecipeConfig>
}

export interface PreflightConfig {
  preflight?: boolean | { scope?: string; level?: "parent" | "element" }
}

export type CascadeLayer = "reset" | "base" | "tokens" | "recipes"

export interface SystemConfig extends PreflightConfig {
  cssVarsRoot?: string
  cssVarsPrefix?: string
  globalCss?: Record<string, SystemStyleObject>
  disableLayers?: boolean
  layers?: Record<CascadeLayer, string>
  theme?: ThemingConfig
  utilities?: UtilityConfig
  conditions?: Dict
  strictTokens?: boolean
}
