import type { Conditions as InternalConditions } from "./generated/conditions.gen"
import type { UtilityValues as InternalUtilityValues } from "./generated/prop-types.gen"
import type {
  ConfigRecipeSlots as InternalConfigRecipeSlots,
  ConfigRecipes as InternalConfigRecipes,
  ConfigSlotRecipes as InternalConfigSlotRecipes,
} from "./generated/recipes.gen"
import type { SystemProperties as InternalSystemProperties } from "./generated/system.gen"
import type {
  ColorPalette as InternalColorPalette,
  Token as InternalToken,
  Tokens as InternalTokens,
} from "./generated/token.gen"
import type { RecipeDefinition, SlotRecipeDefinition } from "./recipe.types"

export interface Register {}

export type Conditions = Register extends { conditions: infer T }
  ? T
  : InternalConditions

export type UtilityValues = Register extends { utilityValues: infer T }
  ? T
  : InternalUtilityValues

export type ConfigRecipes = Register extends { configRecipes: infer T }
  ? T
  : InternalConfigRecipes

export type ConfigSlotRecipes = Register extends { configSlotRecipes: infer T }
  ? T
  : InternalConfigSlotRecipes

export type ConfigRecipeSlots = Register extends { configRecipeSlots: infer T }
  ? T
  : InternalConfigRecipeSlots

export type SystemProperties = Register extends { systemProperties: infer T }
  ? T
  : InternalSystemProperties

export type Tokens = Register extends { tokens: infer T } ? T : InternalTokens

export type Token = Register extends { token: infer T } ? T : InternalToken

export type ColorPalette = Register extends { colorPalette: infer T }
  ? T
  : InternalColorPalette

export type RecipeProps<T> = T extends keyof ConfigRecipes
  ? ConfigRecipes[T]["__type"] & { recipe?: RecipeDefinition | undefined }
  : { recipe?: RecipeDefinition | undefined }

export type SlotRecipeProps<T> = T extends keyof ConfigSlotRecipes
  ? ConfigSlotRecipes[T]["__type"] & {
      recipe?: SlotRecipeDefinition | undefined
    }
  : { recipe?: SlotRecipeDefinition | undefined }

export type SlotRecipeRecord<T, K> = T extends keyof ConfigRecipeSlots
  ? Record<ConfigRecipeSlots[T], K>
  : Record<string, K>
