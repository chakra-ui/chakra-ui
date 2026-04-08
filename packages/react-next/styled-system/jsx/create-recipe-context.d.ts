/* eslint-disable */
import type { ElementType } from "react"
import type {
  AsProps,
  ComponentProps,
  JsxFactoryOptions,
  UnstyledProps,
} from "../types/jsx"
import type {
  RecipeRuntimeFn,
  RecipeVariantProps,
  RecipeVariantRecord,
} from "../types/recipe"
import type { Assign, JsxHTMLProps, JsxStyleProps } from "../types/system-types"

interface RecipeFn {
  __type: any;
  (props?: any): string
}

type AnyRecipe = RecipeRuntimeFn<RecipeVariantRecord> | RecipeFn

type InferVariantProps<R extends AnyRecipe> = R extends RecipeFn
  ? R["__type"]
  : R extends RecipeRuntimeFn<infer T>
    ? RecipeVariantProps<R>
    : never

interface RecipeContextOptions {
  key?: string
  recipe?: AnyRecipe
}

type RecipeContextConsumer<
  T extends ElementType,
  R extends AnyRecipe,
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    JsxHTMLProps<
      ComponentProps<T> & UnstyledProps & AsProps,
      Assign<InferVariantProps<R>, JsxStyleProps>
    >
  > &
    React.RefAttributes<any>
>

export interface RecipeContext<R extends AnyRecipe> {
  withContext: <T extends ElementType>(
    Component: T,
    options?: JsxFactoryOptions<ComponentProps<T>> | undefined,
  ) => RecipeContextConsumer<T, R>
  PropsProvider: React.Provider<Partial<InferVariantProps<R>>>
  usePropsContext: () => InferVariantProps<R> | undefined
}

export declare function createRecipeContext<R extends AnyRecipe>(
  recipe: R,
): RecipeContext<R>
export declare function createRecipeContext(
  options: RecipeContextOptions,
): RecipeContext<AnyRecipe>
