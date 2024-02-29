import { ConfigRecipeFn, ConfigSlotRecipeFn } from "../recipe.types"

type ButtonRecipeVariants = {
  size: "sm" | "md" | "lg"
  variant: "solid" | "outline" | "ghost" | "link"
  shape: "rounded" | "pill" | "square"
}

export interface ConfigRecipes {
  Button: ConfigRecipeFn<ButtonRecipeVariants>
}

export interface AlertVariants {
  status: "info" | "warning" | "success" | "error"
  variant: "subtle" | "solid" | "left-accent" | "top-accent"
}

export interface ConfigSlotRecipes {
  Alert: ConfigSlotRecipeFn<"root" | "title", AlertVariants>
}
