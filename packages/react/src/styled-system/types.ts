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
  description?: string | undefined
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
  default?: boolean | undefined
  condition?: string | undefined
  virtual?: boolean | undefined
  negative?: boolean | undefined
  conditions?: Dict | undefined
  cssVar?: TokenCssVar | undefined
  colorPalette?: ColorPaletteExtension | undefined
  references?: Dict<Token> | undefined
  pixelValue?: string | undefined
}

export interface Token<T = any> {
  value: T
  description?: string | undefined
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
  color?: string | undefined
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
  transform?: PropertyTransform | undefined
  /**
   * The possible values this property can have.
   */
  values?: PropertyValues | undefined
  /**
   * The css property this utility maps to.
   */
  property?: CssProperty | undefined
  /**
   * The shorthand of the property.
   */
  shorthand?: string | string[] | undefined
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
  min?: string | null | undefined
  max?: string | null | undefined
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

export type CssFn = (...styles: (SystemStyleObject | undefined)[]) => Dict

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
  breakpoints?: Record<string, string> | undefined
  keyframes?: CssKeyframes | undefined
  tokens?: TokenDefinition | undefined
  semanticTokens?: SemanticTokenDefinition | undefined
  textStyles?: Record<string, Dict> | undefined
  layerStyles?: Record<string, Dict> | undefined
  animationStyles?: Record<string, Dict> | undefined
  recipes?: Record<string, RecipeDefinition> | undefined
  slotRecipes?: Record<string, SlotRecipeConfig> | undefined
}

export interface PreflightConfig {
  preflight?:
    | boolean
    | { scope?: string | undefined; level?: "parent" | "element" | undefined }
    | undefined
}

export type CascadeLayer = "reset" | "base" | "tokens" | "recipes"

export interface SystemConfig extends PreflightConfig {
  cssVarsRoot?: string | undefined
  cssVarsPrefix?: string | undefined
  globalCss?: Record<string, SystemStyleObject> | undefined
  disableLayers?: boolean | undefined
  layers?: Record<CascadeLayer, string> | undefined
  theme?: ThemingConfig | undefined
  utilities?: UtilityConfig | undefined
  conditions?: Dict | undefined
  strictTokens?: boolean | undefined
}
