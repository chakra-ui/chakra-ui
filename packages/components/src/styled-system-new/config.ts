import {
  GlobalStyleIdentityFn,
  KeyframeIdentityFn,
  SystemStyleIdentityFn,
} from "./css.types"
import { RecipeIdentityFn, SlotRecipeIdentityFn } from "./recipe.types"

export const defineRecipe: RecipeIdentityFn = (v) => v

export const defineSlotRecipe: SlotRecipeIdentityFn = (v) => v

export const defineKeyframes: KeyframeIdentityFn = (v) => v

export const defineGlobalStyles: GlobalStyleIdentityFn = (v) => v

export const defineStyle: SystemStyleIdentityFn = (v) => v
