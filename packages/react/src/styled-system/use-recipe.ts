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
import type { SystemContext } from "./types"

export type RecipeKey = keyof ConfigRecipes | (string & {})

export interface UseRecipeOptions<K extends RecipeKey> {
  key?: K | undefined
  recipe?: RecipeDefinition | undefined
}

const recipeCache = new WeakMap<
  SystemContext,
  Map<string, SystemRecipeFn<any, any>>
>()

function getCachedRecipe(sys: SystemContext, key: string) {
  let cache = recipeCache.get(sys)

  if (!cache) {
    cache = new Map()
    recipeCache.set(sys, cache)
  }

  let recipe = cache.get(key)

  if (!recipe) {
    const config = sys.getRecipe(key, {})
    recipe = sys.cva(structuredClone(config)) as SystemRecipeFn<any, any>
    cache.set(key, recipe)
  }

  return recipe
}

export function useRecipe<
  Options extends { key: RecipeKey; recipe?: RecipeDefinition | undefined },
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
    if (recipeProp) return sys.cva(structuredClone(recipeProp))
    if (key != null) return getCachedRecipe(sys, key)
    return sys.cva({})
  }, [key, recipeProp, sys])
}
