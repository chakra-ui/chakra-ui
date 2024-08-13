"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface ContainerProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"container">,
    UnstyledProp {}

export const Container = createRecipeContext<HTMLDivElement, ContainerProps>(
  "div",
  "container",
)
