"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface ButtonProps
  extends HTMLChakraProps<"button">,
    RecipeProps<"button">,
    UnstyledProp {}

export const Button = createRecipeContext<HTMLButtonElement, ButtonProps>(
  "button",
  "button",
  { defaultProps: { type: "button" } },
)
