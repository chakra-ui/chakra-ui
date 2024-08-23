"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface SeparatorBaseProps
  extends RecipeProps<"separator">,
    UnstyledProp {}

export interface SeparatorProps
  extends HTMLChakraProps<"span", SeparatorBaseProps> {}

export const Separator = forwardRef<HTMLSpanElement, SeparatorProps>(
  function Separator({ unstyled, ...props }, ref) {
    const recipe = useRecipe({ key: "separator", recipe: props.recipe })
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    return (
      <chakra.span
        ref={ref}
        role="separator"
        {...localProps}
        css={[styles, props.css]}
        className={cx("chakra-separator", props.className)}
      />
    )
  },
)
