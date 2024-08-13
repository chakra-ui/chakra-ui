"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface LinkProps
  extends HTMLChakraProps<"a">,
    RecipeProps<"link">,
    UnstyledProp {}

export const Link = createRecipeContext<HTMLAnchorElement, LinkProps>(
  "a",
  "link",
)
