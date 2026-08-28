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
) => SystemStyleObject

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

export interface RecipeRuntimeFn<
  T extends RecipeVariantRecord,
> extends RecipeVariantFn<T> {
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
  className?: string | undefined

  base?: SystemStyleObject | undefined

  variants?: T | undefined

  defaultVariants?:
    | (RecipeSelection<T> & { colorPalette?: ColorPalette | undefined })
    | undefined

  compoundVariants?:
    | Pretty<RecipeCompoundVariant<RecipeCompoundSelection<T>>>[]
    | undefined
}

export type RecipeCreatorFn = <T extends RecipeVariantRecord>(
  config: RecipeDefinition<T>,
) => RecipeRuntimeFn<T>

export type RecipeIdentityFn = <T extends RecipeVariantRecord>(
  config: RecipeDefinition<T>,
) => RecipeDefinition<T>

type SlotRecord<S extends string, T> = Partial<Record<S, T | undefined>>

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
  className?: string | undefined

  slots: S[] | Readonly<S[]>

  base?: SlotRecord<S, SystemStyleObject> | undefined

  variants?: T | undefined

  defaultVariants?:
    | (RecipeSelection<T> & { colorPalette?: ColorPalette | undefined })
    | undefined

  compoundVariants?:
    | Pretty<SlotRecipeCompoundVariant<S, RecipeCompoundSelection<T>>>[]
    | undefined
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

export interface SystemRecipeFn<VP, VM> {
  __type: Partial<VP>;
  (props?: Partial<VP>): SystemStyleObject
  className: string
  variantMap: VM
  variantKeys: Array<keyof VP>
  splitVariantProps<P extends VP>(
    props: P,
  ): [VP, Pretty<DistributiveOmit<P, keyof VP>>]
}

export interface SystemSlotRecipeFn<S extends string, VP, VM> {
  __type: Partial<VP>;
  (props?: Partial<VP>): Record<S, SystemStyleObject>
  classNameMap: Record<S, string>
  variantMap: VM
  variantKeys: Array<keyof VP>
  splitVariantProps<P extends VP & { recipe?: any | undefined }>(
    props: P,
  ): [VP, Pretty<DistributiveOmit<P, keyof VP | "recipe">>]
}
