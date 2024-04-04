"use client"

import { useMemo } from "react"
import { ConfigSlotRecipes } from "./generated/recipes.gen"
import { useChakraContext } from "./provider"
import { SlotRecipeConfig, SystemSlotRecipeFn } from "./recipe.types"

export type SlotRecipeKey = keyof ConfigSlotRecipes | (string & {})

export function useSlotRecipe<K extends SlotRecipeKey>(
  key: K,
  fallback?: SlotRecipeConfig,
): K extends keyof ConfigSlotRecipes
  ? ConfigSlotRecipes[K]
  : SystemSlotRecipeFn<string, {}> {
  const sys = useChakraContext()
  return useMemo((): any => {
    const recipe = fallback || sys.getSlotRecipe(key)
    return sys.sva(structuredClone(recipe))
  }, [key, fallback, sys])
}
