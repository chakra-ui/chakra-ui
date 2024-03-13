import { createContext } from "@chakra-ui/utils"
import { Global } from "@emotion/react"
import { useMemo } from "react"
import {
  ConfigRecipes,
  ConfigSlotRecipes,
  RecipeProps,
} from "./generated/recipes.gen"
import {
  RecipeDefinition,
  SlotRecipeConfig,
  SystemRecipeFn,
  SystemSlotRecipeFn,
} from "./recipe.types"
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

type RecipeKey = keyof ConfigRecipes | (string & {})

export function useRecipe<K extends RecipeKey>(
  key: K,
  fallback?: RecipeDefinition,
): K extends keyof ConfigRecipes ? ConfigRecipes[K] : SystemRecipeFn<{}> {
  const sys = useSystemContext()
  return useMemo((): any => {
    const recipe = fallback || sys.getRecipe(key)
    return sys.cva(structuredClone(recipe))
  }, [key, fallback, sys])
}

type SlotRecipeKey = keyof ConfigSlotRecipes | (string & {})

export function useSlotRecipe<K extends SlotRecipeKey>(
  key: K,
  fallback?: SlotRecipeConfig,
): K extends keyof ConfigSlotRecipes
  ? ConfigSlotRecipes[K]
  : SystemSlotRecipeFn<string, {}> {
  const sys = useSystemContext()
  return useMemo((): any => {
    const recipe = fallback || sys.getSlotRecipe(key)
    return sys.sva(structuredClone(recipe))
  }, [key, fallback, sys])
}

export function useToken(category: string, token: string | string[]): string[] {
  const sys = useSystemContext()
  const arr = Array.isArray(token) ? token : [token]
  return arr.map((t) => sys.token(`${category}.${t}`, t))
}

const [RecipePropsContextProvider, useParentRecipeProps] = createContext<
  RecipeProps<string>
>({
  name: "ParentRecipeProps",
  strict: false,
  providerName: "RecipePropsContextProvider",
})

export function RecipePropsProvider<
  T extends RecipeKey | SlotRecipeKey,
>(props: { children: React.ReactNode; value: RecipeProps<T> }) {
  return (
    <RecipePropsContextProvider value={props.value}>
      {props.children}
    </RecipePropsContextProvider>
  )
}

export { SystemProvider, useSystemContext, useParentRecipeProps }
