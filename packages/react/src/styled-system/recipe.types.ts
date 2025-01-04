import type { DistributiveOmit, Pretty } from "../utils"
import type { ConditionalValue, SystemStyleObject } from "./css.types"
import type { ColorPalette } from "./generated/token.gen"

type StringToBoolean<T> = T extends "true" | "false" ? boolean : T

export type RecipeVariantRecord = Record<any, Record<any, SystemStyleObject>>

export type RecipeSelection<
  T extends RecipeVariantRecord | SlotRecipeVariantRecord<string>,
> = keyof any extends keyof T
  ? {}
  : {
      [K in keyof T]?: ConditionalValue<StringToBoolean<keyof T[K]> | undefined>
    }

export type RecipeVariantFn<T extends RecipeVariantRecord> = (
  props?: RecipeSelection<T>,
) => string

export type RecipeVariantProps<
  T extends RecipeDefinition | SlotRecipeDefinition,
> =
  T extends RecipeDefinition<infer U>
    ? RecipeSelection<U>
    : T extends SlotRecipeDefinition<string, infer U>
      ? RecipeSelection<U>
      : never

export type RecipeVariantMap<T extends RecipeVariantRecord> = {
  [K in keyof T]: Array<keyof T[K]>
}

/* -----------------------------------------------------------------------------
 * Recipe / Standard
 * -----------------------------------------------------------------------------*/

export interface RecipeRuntimeFn<T extends RecipeVariantRecord>
  extends RecipeVariantFn<T> {
  __type: RecipeSelection<T>
  variantKeys: (keyof T)[]
  variantMap: RecipeVariantMap<T>
  config: RecipeDefinition<T>
  splitVariantProps<Props extends RecipeSelection<T>>(
    props: Props,
  ): [RecipeSelection<T>, Pretty<DistributiveOmit<Props, keyof T>>]
  merge: any
}

type OneOrMore<T> = T | Array<T>

export type RecipeCompoundSelection<T> = {
  [K in keyof T]?: OneOrMore<StringToBoolean<keyof T[K]>> | undefined
} & {
  colorPalette?: OneOrMore<ColorPalette> | undefined
}

export type RecipeCompoundVariant<T> = T & {
  css: SystemStyleObject
}

export interface RecipeDefinition<
  T extends RecipeVariantRecord = RecipeVariantRecord,
> {
  /**
   * The class name of the recipe.
   */
  className?: string
  /**
   * The base styles of the recipe.
   */
  base?: SystemStyleObject
  /**
   * The multi-variant styles of the recipe.
   */
  variants?: T
  /**
   * The default variants of the recipe.
   */
  defaultVariants?: RecipeSelection<T> & { colorPalette?: ColorPalette }
  /**
   * The styles to apply when a combination of variants is selected.
   */
  compoundVariants?: Pretty<RecipeCompoundVariant<RecipeCompoundSelection<T>>>[]
}

export type RecipeCreatorFn = <T extends RecipeVariantRecord>(
  config: RecipeDefinition<T>,
) => RecipeRuntimeFn<T>

export type RecipeIdentityFn = <T extends RecipeVariantRecord>(
  config: RecipeDefinition<T>,
) => RecipeDefinition<T>

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
  classNameMap: Record<S, string>
  variantKeys: (keyof T)[]
  variantMap: RecipeVariantMap<T>
  splitVariantProps<Props extends RecipeSelection<T>>(
    props: Props,
  ): [RecipeSelection<T>, Pretty<Omit<Props, keyof T>>]
}

export type SlotRecipeCompoundVariant<S extends string, T> = T & {
  css: SlotRecord<S, SystemStyleObject>
}

export interface SlotRecipeDefinition<
  S extends string = string,
  T extends SlotRecipeVariantRecord<S> = SlotRecipeVariantRecord<S>,
> {
  /**
   * The class name of the recipe. Useful for targeting slots.
   *
   * Say the recipe has slots like `root`, `control` and the class name is 'checkbox'
   * Each slot will have a class name like `checkbox__root`, `checkbox__control`
   */
  className?: string
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
  defaultVariants?: RecipeSelection<T> & { colorPalette?: ColorPalette }
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

export type SlotRecipeIdentityFn = <
  S extends string,
  T extends SlotRecipeVariantRecord<S>,
>(
  config: SlotRecipeDefinition<S, T>,
) => SlotRecipeDefinition<S, T>

export type SlotRecipeConfig<
  S extends string = string,
  T extends SlotRecipeVariantRecord<S> = SlotRecipeVariantRecord<S>,
> = SlotRecipeDefinition<S, T>

/* -----------------------------------------------------------------------------
 * Config / Codegen
 * -----------------------------------------------------------------------------*/

export interface SystemRecipeFn<VP, VM> {
  __type: Partial<VP>
  (props?: Partial<VP>): SystemStyleObject
  className: string
  variantMap: VM
  variantKeys: Array<keyof VP>
  splitVariantProps<P extends VP>(
    props: P,
  ): [VP, Pretty<DistributiveOmit<P, keyof VP>>]
}

export interface SystemSlotRecipeFn<S extends string, VP, VM> {
  __type: Partial<VP>
  (props?: Partial<VP>): Record<S, SystemStyleObject>
  classNameMap: Record<S, string>
  variantMap: VM
  variantKeys: Array<keyof VP>
  splitVariantProps<P extends VP & { recipe?: any }>(
    props: P,
  ): [VP, Pretty<DistributiveOmit<P, keyof VP | "recipe">>]
}
