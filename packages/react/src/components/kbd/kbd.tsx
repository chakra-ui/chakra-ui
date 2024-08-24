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

export interface KbdProps
  extends HTMLChakraProps<"kbd">,
    RecipeProps<"kbd">,
    UnstyledProp {}

export const Kbd = withContext<HTMLElement, KbdProps>("kbd")

export const KbdPropsProvider = PropsProvider as React.Provider<KbdProps>
