"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface SpinnerProps
  extends HTMLChakraProps<"span">,
    UnstyledProp,
    RecipeProps<"spinner"> {}

export const Spinner = createRecipeContext<HTMLSpanElement, SpinnerProps>(
  "span",
  "spinner",
)
