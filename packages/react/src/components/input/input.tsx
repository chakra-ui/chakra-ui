"use client"

import { Field as ArkField } from "@ark-ui/react/field"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "input",
})

export interface InputProps
  extends HTMLChakraProps<"input">,
    RecipeProps<"input">,
    UnstyledProp {}

export const Input = withContext<HTMLInputElement, InputProps>(ArkField.Input)

export const InputPropsProvider = PropsProvider as React.Provider<InputProps>
