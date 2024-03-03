import { SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types"

type ButtonRecipeVariants = {
  size: "sm" | "md" | "lg"
  variant: "solid" | "outline" | "ghost" | "link"
  shape: "rounded" | "pill" | "square"
}

export type SystemRecipes = {
  Button: SystemRecipeFn<ButtonRecipeVariants>
}

export interface AlertVariants {
  status: "info" | "warning" | "success" | "error"
  variant: "subtle" | "solid" | "left-accent" | "top-accent"
}

export type SystemSlotRecipes = {
  Alert: SystemSlotRecipeFn<"root" | "title", AlertVariants>
}

export type SystemRecipeProps<T> = T extends keyof SystemRecipes
  ? SystemRecipes[T]["__type"]
  : T extends keyof SystemSlotRecipes
  ? SystemSlotRecipes[T]["__type"]
  : {}
