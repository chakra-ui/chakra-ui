import { markAsProcessed } from "./css"
import { RecipeConfig, SlotRecipeConfig } from "./recipe.types"
import { SystemConfig, SystemContext } from "./types"

const recipeCache = new Map<string, RecipeConfig>()

type Options = Pick<SystemConfig, "theme"> & Pick<SystemContext, "css">

export const createRecipes = (options: Options) => {
  const { theme = {}, css } = options
  const { recipes, slotRecipes } = theme
  const allRecipes = { ...recipes, ...slotRecipes }
  const keys = Object.keys(allRecipes)

  function _css(styles: any) {
    if (!styles) return {}
    return markAsProcessed(css(styles))
  }

  function processRecipe(key: string, config: RecipeConfig) {
    // get the base styles
    if (!recipeCache.get(key)) {
      recipeCache.set(key, {})
    }

    const recipe = recipeCache.get(key)!
    recipeCache.get(key)!.base = _css(config.base)

    Object.entries(config.variants ?? {}).forEach(([variant, styles]) => {
      recipe.variants ||= {}
      recipe.variants[variant] ||= {}
      Object.entries(styles).forEach(([prop, value]) => {
        recipe.variants![variant][prop] ||= {}
        recipe.variants![variant][prop] = _css(value)
      })
    })
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const config = allRecipes[key]
    if (isSlotRecipe(config)) {
      //   processSlotRecipe(key, config)
    } else {
      processRecipe(key, config)
    }
  }

  return function get(key: string, fallback?: any) {
    return recipeCache.get(key) || fallback
  }
}

const isSlotRecipe = (
  v: RecipeConfig | SlotRecipeConfig,
): v is SlotRecipeConfig => {
  return "slots" in v && Array.isArray(v.slots) && v.slots.length > 0
}
