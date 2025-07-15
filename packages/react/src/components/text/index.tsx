"use client"

import type { Assign } from "@ark-ui/react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "text",
})

export interface TextProps
  extends Assign<HTMLChakraProps<"p">, RecipeProps<"text">> {}

export const Text = withContext<HTMLParagraphElement, TextProps>("p")

export const TextPropsProvider = PropsProvider as React.Provider<TextProps>
