"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface BadgeProps
  extends HTMLChakraProps<"span">,
    RecipeProps<"badge">,
    UnstyledProp {}

export const Badge = createRecipeContext<HTMLSpanElement, BadgeProps>(
  "span",
  "badge",
)
