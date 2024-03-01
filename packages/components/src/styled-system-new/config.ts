import { mergeWith } from "@chakra-ui/utils"
import {
  GlobalStyleIdentityFn,
  KeyframeIdentityFn,
  SystemStyleIdentityFn,
} from "./css.types"
import { RecipeIdentityFn, SlotRecipeIdentityFn } from "./recipe.types"
import { SystemConfig } from "./types"

export const defineRecipe: RecipeIdentityFn = (v) => v

export const defineSlotRecipe: SlotRecipeIdentityFn = (v) => v

export const defineKeyframes: KeyframeIdentityFn = (v) => v

export const defineGlobalStyles: GlobalStyleIdentityFn = (v) => v

export const defineStyle: SystemStyleIdentityFn = (v) => v

export const defineSystem = (v: SystemConfig) => v

export const mergeSystem = (
  config: SystemConfig,
  ...configs: SystemConfig[]
): SystemConfig => {
  return mergeWith(config, ...configs, (srcValue: any, newValue: any) => {
    if (newValue === undefined) return srcValue ?? []
    if (srcValue === undefined) return [newValue]
    if (Array.isArray(srcValue)) return [newValue, ...srcValue]
    return [newValue, srcValue]
  })
}
