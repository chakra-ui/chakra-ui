"use client"

import { For, Spinner, useRecipe } from "@chakra-ui/react"

export const SpinnerSizeTable = () => {
  const recipe = useRecipe("spinner")
  return (
    <div>
      <For each={recipe.variantMap.size}>
        {(size) => (
          <Spinner key={size} margin={3} color="green.500" size={size} />
        )}
      </For>
    </div>
  )
}
