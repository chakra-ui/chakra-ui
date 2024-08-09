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

export interface SpinnerProps
  extends HTMLChakraProps<"span">,
    UnstyledProp,
    RecipeProps<"spinner"> {}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner({ unstyled, ...props }, ref) {
    const recipe = useRecipe("spinner", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    return (
      <chakra.span
        ref={ref}
        {...localProps}
        css={[styles, props.css]}
        className={cx("chakra-spinner", props.className)}
      />
    )
  },
)
