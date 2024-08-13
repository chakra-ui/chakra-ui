"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface KbdProps
  extends HTMLChakraProps<"kbd">,
    RecipeProps<"kbd">,
    UnstyledProp {}

export const Kbd = createRecipeContext<HTMLElement, KbdProps>("kbd", "kbd")
