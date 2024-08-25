"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "spinner",
})

export interface SpinnerProps
  extends HTMLChakraProps<"span">,
    UnstyledProp,
    RecipeProps<"spinner"> {}

export const Spinner = withContext<HTMLSpanElement, SpinnerProps>("span")

export const SpinnerPropsProvider =
  PropsProvider as React.Provider<SpinnerProps>
