"use client"

import { createContext } from "../create-context"
import type { RecipeProps } from "./generated/recipes.gen"
import type { RecipeKey } from "./use-recipe"
import type { SlotRecipeKey } from "./use-slot-recipe"

const [RecipePropsContextProvider, useParentRecipeProps] = createContext<
  RecipeProps<string>
>({
  name: "RecipePropsContext",
  strict: false,
})

interface Props<T> {
  children: React.ReactNode
  value: RecipeProps<T>
}

function RecipePropsProvider<T extends RecipeKey | SlotRecipeKey>(
  props: Props<T>,
) {
  return (
    <RecipePropsContextProvider value={props.value}>
      {props.children}
    </RecipePropsContextProvider>
  )
}

export { RecipePropsProvider, useParentRecipeProps }
