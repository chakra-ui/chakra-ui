"use client"

import { useMemo } from "react"
import type { ConfigSlotRecipes } from "./generated/recipes.gen"
import { useChakraContext } from "./provider"
import type {
  RecipeVariantMap,
  RecipeVariantProps,
  SlotRecipeConfig,
  SystemSlotRecipeFn,
} from "./recipe.types"
import type { SystemContext } from "./types"

export type SlotRecipeKey = keyof ConfigSlotRecipes | (string & {})

export type SlotRecipeFn<K extends SlotRecipeKey> =
  K extends keyof ConfigSlotRecipes
    ? ConfigSlotRecipes[K]
    : SystemSlotRecipeFn<string, {}, {}>

export interface UseSlotRecipeOptions<K extends SlotRecipeKey> {
  key?: K | undefined
  recipe?: SlotRecipeConfig | undefined
}

const slotRecipeCache = new WeakMap<SystemContext, Map<string, any>>()

function getCachedSlotRecipe(sys: SystemContext, key: string) {
  let cache = slotRecipeCache.get(sys)

  if (!cache) {
    cache = new Map()
    slotRecipeCache.set(sys, cache)
  }

  let recipe = cache.get(key)

  if (!recipe) {
    const config = sys.getSlotRecipe(key, {})
    recipe = sys.sva(structuredClone(config))
    cache.set(key, recipe)
  }

  return recipe
}

export function useSlotRecipe<
  Options extends { key: SlotRecipeKey; recipe?: SlotRecipeConfig | undefined },
>(
  options: Options,
): Options["key"] extends keyof ConfigSlotRecipes
  ? ConfigSlotRecipes[Options["key"]]
  : SystemSlotRecipeFn<string, {}, {}>

export function useSlotRecipe<Options extends { recipe: SlotRecipeConfig }>(
  options: Options,
): Options["recipe"] extends SlotRecipeConfig<infer S, infer T>
  ? SystemSlotRecipeFn<
      S,
      RecipeVariantProps<Options["recipe"]>,
      RecipeVariantMap<T>
    >
  : never

export function useSlotRecipe(options: any): any {
  const { key, recipe: recipeProp } = options
  const sys = useChakraContext()
  return useMemo((): any => {
    if (recipeProp) return sys.sva(structuredClone(recipeProp))
    if (key != null) return getCachedSlotRecipe(sys, key)
    return sys.sva({ slots: [] })
  }, [key, recipeProp, sys])
}
