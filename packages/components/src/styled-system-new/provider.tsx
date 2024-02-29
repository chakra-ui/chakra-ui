import { createContext } from "@chakra-ui/utils"
import { Global } from "@emotion/react"
import { useMemo } from "react"
import { ConfigRecipes, ConfigSlotRecipes } from "./generated/recipes.gen"
import { RecipeConfig, SlotRecipeConfig } from "./recipe.types"
import { SystemContext } from "./types"

const [SystemContextProvider, useSystemContext] = createContext<SystemContext>({
  name: "ChakraSystemContext",
  strict: true,
  providerName: "<ChakraProvider />",
})

export interface SystemProviderProps {
  value: SystemContext
  children: React.ReactNode
}

function SystemProvider(props: SystemProviderProps) {
  const { value: sys, children } = props

  return (
    <SystemContextProvider value={sys}>
      <Global
        styles={[sys.getPreflightCss(), sys.getGlobalCss(), sys.getTokenCss()]}
      />
      {children}
    </SystemContextProvider>
  )
}

export function useRecipe<K extends keyof ConfigRecipes>(
  key: K,
  fallback?: RecipeConfig,
) {
  const sys = useSystemContext()
  return useMemo(() => {
    const recipe = sys.getRecipe(key as string, fallback)
    return sys.cva(recipe) as unknown as ConfigRecipes[K]
  }, [key, fallback, sys])
}

export function useSlotRecipe<K extends keyof ConfigSlotRecipes>(
  key: string,
  fallback?: SlotRecipeConfig,
) {
  const sys = useSystemContext()
  return useMemo(() => {
    const recipe = sys.getSlotRecipe(key, fallback)
    return sys.sva(recipe) as unknown as ConfigSlotRecipes[K]
  }, [key, fallback, sys])
}

export { SystemProvider, useSystemContext }
