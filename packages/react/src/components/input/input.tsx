"use client"

import { Field as ArkField } from "@ark-ui/react/field"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface InputProps
  extends HTMLChakraProps<"input">,
    RecipeProps<"input">,
    UnstyledProp {}

export const Input = createRecipeContext<HTMLInputElement, InputProps>(
  ArkField.Input,
  "input",
)
