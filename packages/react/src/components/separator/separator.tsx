"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "separator",
})

export interface SeparatorBaseProps
  extends RecipeProps<"separator">,
    UnstyledProp {}

export interface SeparatorProps
  extends HTMLChakraProps<"span", SeparatorBaseProps> {}

export const Separator = withContext<HTMLSpanElement, SeparatorProps>("span", {
  defaultProps: { role: "separator" },
})

export const SeparatorPropsProvider =
  PropsProvider as React.Provider<SeparatorBaseProps>
