"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface MarkProps
  extends RecipeProps<"mark">,
    HTMLChakraProps<"mark"> {}

export const Mark = forwardRef<HTMLElement, MarkProps>(
  function Mark(props, ref) {
    const recipe = useRecipe("mark", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    return (
      <chakra.mark
        ref={ref}
        {...localProps}
        className={cx("chakra-mark", props.className)}
        css={[recipe(variantProps), localProps.css]}
      />
    )
  },
)
