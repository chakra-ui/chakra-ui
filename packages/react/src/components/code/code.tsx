"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface CodeProps
  extends HTMLChakraProps<"code">,
    RecipeProps<"code">,
    UnstyledProp {}

export const Code = createRecipeContext<HTMLElement, CodeProps>("code", "code")
