"use client"

import { useMemo } from "react"
import type { ConfigSlotRecipes } from "./generated/recipes.gen"
import { useChakraContext } from "./provider"
import type { SlotRecipeConfig, SystemSlotRecipeFn } from "./recipe.types"

export type SlotRecipeKey = keyof ConfigSlotRecipes | (string & {})

export type SlotRecipeFn<K extends SlotRecipeKey> =
  K extends keyof ConfigSlotRecipes
    ? ConfigSlotRecipes[K]
    : SystemSlotRecipeFn<string, {}, {}>

export interface UseSlotRecipeOptions<K extends SlotRecipeKey> {
  key?: K
  recipe?: SlotRecipeConfig
}

export function useSlotRecipe<K extends SlotRecipeKey>(
  options: UseSlotRecipeOptions<K>,
): SlotRecipeFn<K> {
  const { key, recipe: recipeProp } = options
  const sys = useChakraContext()
  return useMemo((): any => {
    const recipe = recipeProp || (key != null ? sys.getSlotRecipe(key) : {})
    return sys.sva(structuredClone(recipe))
  }, [key, recipeProp, sys])
}
