"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface SkeletonProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"skeleton">,
    UnstyledProp {}

export const Skeleton = createRecipeContext<HTMLDivElement, SkeletonProps>(
  "div",
  "skeleton",
)
