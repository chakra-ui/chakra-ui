"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "skeleton",
})

export interface SkeletonProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"skeleton">,
    UnstyledProp {}

export const Skeleton = withContext<HTMLDivElement, SkeletonProps>("div")

export const SkeletonPropsProvider =
  PropsProvider as React.Provider<SkeletonProps>
