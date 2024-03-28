"use client"

import { cx, omit } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_STYLES,
  HTMLChakraProps,
  RecipeProps,
  UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"
import { FieldOptions, splitFieldProps, useField } from "../field"

const omitted = ["h", "minH", "height", "minHeight"] as const

export interface TextareaProps
  extends HTMLChakraProps<"textarea">,
    FieldOptions,
    UnstyledProp,
    RecipeProps<"Textarea"> {}

/**
 * Textarea is used to enter an amount of text that's longer than a single line
 * @see Docs https://chakra-ui.com/textarea
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ unstyled, ...props }, ref) {
    const recipe = useRecipe("Textarea", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    const [useFieldProps, elementProps] = splitFieldProps(localProps)
    const fieldProps = useField<HTMLTextAreaElement>(useFieldProps)

    const textareaStyles = localProps.rows ? omit(styles, omitted) : styles

    return (
      <chakra.textarea
        ref={ref}
        {...elementProps}
        {...fieldProps}
        className={cx("chakra-textarea", localProps.className)}
        css={[textareaStyles, localProps.css]}
      />
    )
  },
)

Textarea.displayName = "Textarea"
