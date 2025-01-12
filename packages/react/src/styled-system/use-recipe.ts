"use client"

import { useMemo } from "react"
import type { ConfigRecipes } from "./generated/recipes.gen"
import { useChakraContext } from "./provider"
import type {
  RecipeDefinition,
  RecipeVariantMap,
  RecipeVariantProps,
  SystemRecipeFn,
} from "./recipe.types"

export type RecipeKey = keyof ConfigRecipes | (string & {})

export interface UseRecipeOptions<K extends RecipeKey> {
  key?: K
  recipe?: RecipeDefinition
}

export function useRecipe<
  Options extends { key: RecipeKey; recipe?: RecipeDefinition },
>(
  options: Options,
): Options["key"] extends keyof ConfigRecipes
  ? ConfigRecipes[Options["key"]]
  : SystemRecipeFn<{}, {}>

export function useRecipe<Options extends { recipe: RecipeDefinition }>(
  options: Options,
): Options["recipe"] extends RecipeDefinition<infer T>
  ? SystemRecipeFn<RecipeVariantProps<Options["recipe"]>, RecipeVariantMap<T>>
  : never

export function useRecipe(options: any): any {
  const { key, recipe: recipeProp } = options
  const sys = useChakraContext()
  return useMemo((): any => {
    const recipe = recipeProp || (key != null ? sys.getRecipe(key) : {})
    return sys.cva(structuredClone(recipe))
  }, [key, recipeProp, sys])
}
