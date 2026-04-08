/* eslint-disable */
import type { RecipeRule } from "./static-css"
import type {
  DistributiveOmit,
  Pretty,
  SystemStyleObject,
} from "./system-types"

type StringToBoolean<T> = T extends "true" | "false" ? boolean : T

export type RecipeVariantRecord = Record<any, Record<any, SystemStyleObject>>

export type RecipeSelection<T extends RecipeVariantRecord> =
  keyof any extends keyof T
    ? {}
    : {
        [K in keyof T]?: StringToBoolean<keyof T[K]> | undefined
      }

export type RecipeVariantFn<T extends RecipeVariantRecord> = (
  props?: RecipeSelection<T>,
) => string

/**
 * Extract the variant as optional props from a `cva` function.
 * Intended to be used with a JSX component, prefer `RecipeVariant` for a more strict type.
 */
export type RecipeVariantProps<
  T extends
    | RecipeVariantFn<RecipeVariantRecord>
    | SlotRecipeVariantFn<string, SlotRecipeVariantRecord<string>>,
> = Pretty<Parameters<T>[0]>

/**
 * Extract the variants from a `cva` function.
 */
export type RecipeVariant<
  T extends
    | RecipeVariantFn<RecipeVariantRecord>
    | SlotRecipeVariantFn<string, SlotRecipeVariantRecord<string>>,
> = Exclude<Pretty<Required<RecipeVariantProps<T>>>, undefined>

type RecipeVariantMap<T extends RecipeVariantRecord> = {
  [K in keyof T]: Array<keyof T[K]>
}

/* -----------------------------------------------------------------------------
 * Recipe / Standard
 * -----------------------------------------------------------------------------*/

export interface RecipeRuntimeFn<
  T extends RecipeVariantRecord,
> extends RecipeVariantFn<T> {
  __type: RecipeSelection<T>
  variantKeys: (keyof T)[]
  variantMap: RecipeVariantMap<T>
  raw: (props?: RecipeSelection<T>) => SystemStyleObject
  config: RecipeConfig<T>
  splitVariantProps<Props extends RecipeSelection<T>>(
    props: Props,
  ): [RecipeSelection<T>, Pretty<DistributiveOmit<Props, keyof T>>]
  getVariantProps: (props?: RecipeSelection<T>) => RecipeSelection<T>
}

type OneOrMore<T> = T | Array<T>

export type RecipeCompoundSelection<T> = {
  [K in keyof T]?: OneOrMore<StringToBoolean<keyof T[K]>> | undefined
}

export type RecipeCompoundVariant<T> = T & {
  css: SystemStyleObject
}

export interface RecipeDefinition<
  T extends RecipeVariantRecord = RecipeVariantRecord,
> {
  /**
   * The base styles of the recipe.
   */
  base?: SystemStyleObject
  /**
   * Whether the recipe is deprecated.
   */
  deprecated?: boolean | string
  /**
   * The multi-variant styles of the recipe.
   */
  variants?: T
  /**
   * The default variants of the recipe.
   */
  defaultVariants?: RecipeSelection<T>
  /**
   * The styles to apply when a combination of variants is selected.
   */
  compoundVariants?: Pretty<RecipeCompoundVariant<RecipeCompoundSelection<T>>>[]
}

export type RecipeCreatorFn = <T extends RecipeVariantRecord>(
  config: RecipeDefinition<T>,
) => RecipeRuntimeFn<T>

interface RecipeConfigMeta {
  /**
   * The class name of the recipe.
   */
  className: string
  /**
   * The description of the recipe. This will be used in the JSDoc comment.
   */
  description?: string
  /**
   * The jsx elements to track for this recipe. Can be string or Regexp.
   *
   * @default capitalize(recipe.name)
   * @example ['Button', 'Link', /Button$/]
   */
  jsx?: Array<string | RegExp>
  /**
   * Variants to pre-generate, will be include in the final `config.staticCss`
   */
  staticCss?: RecipeRule[]
}

export interface RecipeConfig<
  T extends RecipeVariantRecord = RecipeVariantRecord,
>
  extends RecipeDefinition<T>, RecipeConfigMeta {}

/* -----------------------------------------------------------------------------
 * Recipe / Slot
 * -----------------------------------------------------------------------------*/

type SlotRecord<S extends string, T> = Partial<Record<S, T>>

export type SlotRecipeVariantRecord<S extends string> = Record<
  any,
  Record<any, SlotRecord<S, SystemStyleObject>>
>

export type SlotRecipeVariantFn<
  S extends string,
  T extends RecipeVariantRecord,
> = (props?: RecipeSelection<T>) => SlotRecord<S, string>

export interface SlotRecipeRuntimeFn<
  S extends string,
  T extends SlotRecipeVariantRecord<S>,
> extends SlotRecipeVariantFn<S, T> {
  raw: (props?: RecipeSelection<T>) => Record<S, SystemStyleObject>
  variantKeys: (keyof T)[]
  variantMap: RecipeVariantMap<T>
  splitVariantProps<Props extends RecipeSelection<T>>(
    props: Props,
  ): [RecipeSelection<T>, Pretty<DistributiveOmit<Props, keyof T>>]
  getVariantProps: (props?: RecipeSelection<T>) => RecipeSelection<T>
}

export type SlotRecipeCompoundVariant<S extends string, T> = T & {
  css: SlotRecord<S, SystemStyleObject>
}

export interface SlotRecipeDefinition<
  S extends string = string,
  T extends SlotRecipeVariantRecord<S> = SlotRecipeVariantRecord<S>,
> {
  /**
   * An optional class name that can be used to target slots in the DOM.
   */
  className?: string
  /**
   * Whether the recipe is deprecated.
   */
  deprecated?: boolean | string
  /**
   * The parts/slots of the recipe.
   */
  slots: S[] | Readonly<S[]>
  /**
   * The base styles of the recipe.
   */
  base?: SlotRecord<S, SystemStyleObject>
  /**
   * The multi-variant styles of the recipe.
   */
  variants?: T
  /**
   * The default variants of the recipe.
   */
  defaultVariants?: RecipeSelection<T>
  /**
   * The styles to apply when a combination of variants is selected.
   */
  compoundVariants?: Pretty<
    SlotRecipeCompoundVariant<S, RecipeCompoundSelection<T>>
  >[]
}

export type SlotRecipeCreatorFn = <
  S extends string,
  T extends SlotRecipeVariantRecord<S>,
>(
  config: SlotRecipeDefinition<S, T>,
) => SlotRecipeRuntimeFn<S, T>

export type SlotRecipeConfig<
  S extends string = string,
  T extends SlotRecipeVariantRecord<S> = SlotRecipeVariantRecord<S>,
> = SlotRecipeDefinition<S, T> & RecipeConfigMeta
