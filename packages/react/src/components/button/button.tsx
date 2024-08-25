"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "button",
})

export interface ButtonBaseProps extends RecipeProps<"button">, UnstyledProp {}

export interface ButtonProps
  extends HTMLChakraProps<"button", ButtonBaseProps> {}

export const Button = withContext<HTMLButtonElement, ButtonProps>("button", {
  defaultProps: { type: "button" },
})

export const ButtonPropsProvider =
  PropsProvider as React.Provider<ButtonBaseProps>
