"use client"

import { Field, type FieldRootBaseProps } from "@ark-ui/react/field"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

export interface TextareaProps
  extends HTMLChakraProps<"textarea", FieldRootBaseProps>,
    UnstyledProp,
    RecipeProps<"textarea"> {}

export const Textarea = createRecipeContext<HTMLTextAreaElement, TextareaProps>(
  Field.Textarea,
  "textarea",
)
