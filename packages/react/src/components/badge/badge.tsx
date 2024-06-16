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

export interface BadgeProps
  extends HTMLChakraProps<"span">,
    RecipeProps<"badge">,
    UnstyledProp {}

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://chakra-ui.com/badge
 */
export const Badge = forwardRef<HTMLElement, BadgeProps>(function Badge(
  { unstyled, ...props },
  ref,
) {
  const recipe = useRecipe("badge", props.recipe)
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

  return (
    <chakra.span
      ref={ref}
      {...localProps}
      className={cx("chakra-badge", localProps.className)}
      css={[styles, localProps.css]}
    />
  )
})

Badge.displayName = "Badge"
