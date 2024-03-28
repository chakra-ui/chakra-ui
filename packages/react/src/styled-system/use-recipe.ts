"use client"

import { useMemo } from "react"
import { ConfigRecipes } from "./generated/recipes.gen"
import { useChakraContext } from "./provider"
import { RecipeDefinition, SystemRecipeFn } from "./recipe.types"

export type RecipeKey = keyof ConfigRecipes | (string & {})

export function useRecipe<K extends RecipeKey>(
  key: K,
  fallback?: RecipeDefinition,
): K extends keyof ConfigRecipes ? ConfigRecipes[K] : SystemRecipeFn<{}> {
  const sys = useChakraContext()
  return useMemo((): any => {
    const recipe = fallback || sys.getRecipe(key)
    return sys.cva(structuredClone(recipe))
  }, [key, fallback, sys])
}
