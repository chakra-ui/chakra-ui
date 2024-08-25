"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "heading",
})

export interface HeadingProps
  extends HTMLChakraProps<"h2">,
    RecipeProps<"heading"> {}

export const Heading = withContext<HTMLHeadingElement, HeadingProps>("h2")

export const HeadingPropsProvider =
  PropsProvider as React.Provider<HeadingProps>
