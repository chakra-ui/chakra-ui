"use client"

import type { Assign } from "@ark-ui/react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "text",
})

export interface TextProps
  extends Assign<HTMLChakraProps<"p">, RecipeProps<"text">>,
    UnstyledProp {}

export const Text = withContext<HTMLParagraphElement, TextProps>("p")

export const TextPropsProvider = PropsProvider as React.Provider<TextProps>
