/* eslint-disable */
import type { ComponentType, ElementType } from "react"
import type {
  AsProps,
  ComponentProps,
  DataAttrs,
  JsxFactoryOptions,
} from "../types/jsx"
import type { RecipeVariantProps, SlotRecipeRuntimeFn } from "../types/recipe"
import type { Assign, JsxHTMLProps, JsxStyleProps } from "../types/system-types"

interface UnstyledProps {
  unstyled?: boolean | undefined
}

type SvaFn<S extends string = any> = SlotRecipeRuntimeFn<S, any>
interface SlotRecipeFn {
  __type: any
  __slot: string;
  (props?: any): any
}
type SlotRecipe = SvaFn | SlotRecipeFn

type InferSlot<R extends SlotRecipe> = R extends SlotRecipeFn
  ? R["__slot"]
  : R extends SvaFn<infer S>
    ? S
    : never

interface WithProviderOptions<P = {}> {
  defaultProps?: (Partial<P> & DataAttrs) | undefined
}

type StyleContextProvider<
  T extends ElementType,
  R extends SlotRecipe,
> = ComponentType<
  JsxHTMLProps<
    ComponentProps<T> & UnstyledProps & AsProps,
    Assign<RecipeVariantProps<R>, JsxStyleProps>
  >
>

type StyleContextRootProvider<
  T extends ElementType,
  R extends SlotRecipe,
> = ComponentType<ComponentProps<T> & UnstyledProps & RecipeVariantProps<R>>

type StyleContextConsumer<T extends ElementType> = ComponentType<
  JsxHTMLProps<ComponentProps<T> & UnstyledProps & AsProps, JsxStyleProps>
>

interface SlotRecipeContextOptions {
  key?: string
  recipe?: SlotRecipe
}

export interface SlotRecipeContext<R extends SlotRecipe> {
  withRootProvider: <T extends ElementType>(
    Component: T,
    options?: WithProviderOptions<ComponentProps<T>> | undefined,
  ) => StyleContextRootProvider<T, R>
  withProvider: <T extends ElementType>(
    Component: T,
    slot: InferSlot<R>,
    options?: JsxFactoryOptions<ComponentProps<T>> | undefined,
  ) => StyleContextProvider<T, R>
  withContext: <T extends ElementType>(
    Component: T,
    slot: InferSlot<R>,
    options?: JsxFactoryOptions<ComponentProps<T>> | undefined,
  ) => StyleContextConsumer<T>
}

export declare function createSlotRecipeContext<R extends SlotRecipe>(
  recipe: R,
): SlotRecipeContext<R>
export declare function createSlotRecipeContext(
  options: SlotRecipeContextOptions,
): SlotRecipeContext<SlotRecipe>
