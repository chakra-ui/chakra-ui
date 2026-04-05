"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "kbd",
})

export interface KbdBaseProps extends RecipeProps<"kbd">, UnstyledProp {}

export interface KbdProps extends HTMLChakraProps<"kbd", KbdBaseProps> {}

export const Kbd = withContext<HTMLElement, KbdProps>("kbd")

export const KbdPropsProvider = PropsProvider as React.Provider<KbdProps>
