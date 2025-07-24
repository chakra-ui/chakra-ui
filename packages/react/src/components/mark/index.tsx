"use client"

import type { Assign } from "@ark-ui/react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "mark",
})

export interface MarkProps
  extends Assign<HTMLChakraProps<"mark">, RecipeProps<"mark">>,
    UnstyledProp {}

export const Mark = withContext<HTMLElement, MarkProps>("mark")

export const MarkPropsProvider = PropsProvider as React.Provider<MarkProps>
