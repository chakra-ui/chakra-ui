"use client"

import { Field } from "@ark-ui/react/field"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "textarea",
})

export interface TextareaBaseProps
  extends RecipeProps<"textarea">,
    Field.TextareaBaseProps,
    UnstyledProp {}

export interface TextareaProps
  extends HTMLChakraProps<"textarea", TextareaBaseProps> {}

export const Textarea = withContext<HTMLTextAreaElement, TextareaProps>(
  Field.Textarea,
)

export const TextareaPropsProvider =
  PropsProvider as React.Provider<TextareaProps>
