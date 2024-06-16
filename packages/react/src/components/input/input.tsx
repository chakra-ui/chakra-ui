"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_STYLES,
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  mergeProps,
  useRecipe,
} from "../../styled-system"
import { type FieldOptions, splitFieldProps, useFieldProps } from "../field"

export interface InputProps
  extends HTMLChakraProps<"input">,
    RecipeProps<"input">,
    UnstyledProp,
    FieldOptions {
  /**
   * If `true`, the input will be unstyled
   */
  unstyled?: boolean
}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 *
 * @see Docs https://chakra-ui.com/docs/components/input
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const { unstyled, ...restProps } = props

    const recipe = useRecipe("input", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(restProps)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    const [fieldProps, elementProps] = splitFieldProps(localProps)
    const inputProps = useFieldProps<HTMLInputElement>(fieldProps)

    return (
      <chakra.input
        {...mergeProps(elementProps, inputProps)}
        css={[styles, props.css]}
        ref={ref}
        className={cx("chakra-input", props.className)}
      />
    )
  },
)

Input.displayName = "Input"
