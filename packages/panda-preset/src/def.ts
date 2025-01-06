import type {
  Config,
  GlobalStyleObject,
  Preset,
  RecipeConfig,
  SemanticTokens,
  SlotRecipeConfig,
  Tokens,
  UtilityConfig,
} from "@pandacss/types"

export const defineConfig = (config: Config) => config

export const defineRecipe = (recipes: RecipeConfig) => recipes

export const defineSlotRecipe = (slotRecipes: SlotRecipeConfig) => slotRecipes

export const defineTextStyles = (textStyles: any) => textStyles

export const defineLayerStyles = (layerStyles: any) => layerStyles

export const defineAnimationStyles = (animationStyles: any) => animationStyles

export const defineGlobalStyles = (globalStyles: GlobalStyleObject) =>
  globalStyles

type ProxyValue<T> = {
  <Value>(definition: Value extends T ? Value : T): Value
} & {
  [K in keyof Required<T>]: <Value>(
    definition: Value extends T[K] ? Value : T[K],
  ) => Value
}

function createProxy<T>(): ProxyValue<T> {
  const identity = (v: unknown) => v
  return new Proxy(identity as any, {
    get() {
      return identity
    },
  })
}

export const defineTokens = /* @__PURE__ */ createProxy<Tokens>()
export const defineSemanticTokens =
  /* @__PURE__ */ createProxy<SemanticTokens>()

export const definePreset = (preset: Preset) => preset

export const defineUtilities = (utilities: UtilityConfig) => utilities
