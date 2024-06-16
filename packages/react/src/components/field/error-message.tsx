"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_STYLES,
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"
import { useFieldContext } from "./field-context"

export interface ErrorMessageProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"label">,
    UnstyledProp {}
{
}

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  function ErrorMessage({ unstyled, ...props }, ref) {
    const recipe = useRecipe("errorMessage", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    const field = useFieldContext()
    if (!field?.invalid) return null

    return (
      <chakra.div
        {...field?.getErrorMessageProps(localProps, ref)}
        className={cx("chakra-error-message", props.className)}
        css={[styles, props.css]}
      />
    )
  },
)
