import type { SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types";

export interface SystemRecipes {
  [key: string]: SystemRecipeFn<any>;
}

export interface SystemSlotRecipes {
  [key: string]: SystemSlotRecipeFn<string, any>;
}

export type SystemRecipeProps<T> = T extends keyof SystemRecipes
  ? SystemRecipes[T]["__type"]
  : T extends keyof SystemSlotRecipes
    ? SystemSlotRecipes[T]["__type"]
    : {};
