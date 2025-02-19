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

export type SlotRecipeKey = keyof ConfigSlotRecipes | (string & {})

export type SlotRecipeFn<K extends SlotRecipeKey> =
  K extends keyof ConfigSlotRecipes
    ? ConfigSlotRecipes[K]
    : SystemSlotRecipeFn<string, {}, {}>

export interface UseSlotRecipeOptions<K extends SlotRecipeKey> {
  key?: K
  recipe?: SlotRecipeConfig
}

export function useSlotRecipe<
  Options extends { key: SlotRecipeKey; recipe?: SlotRecipeConfig },
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
    const recipe = recipeProp || (key != null ? sys.getSlotRecipe(key) : {})
    return sys.sva(structuredClone(recipe))
  }, [key, recipeProp, sys])
}
