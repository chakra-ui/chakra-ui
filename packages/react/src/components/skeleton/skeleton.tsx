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

export interface SkeletonProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"skeleton">,
    UnstyledProp {}

/**
 * `Skeleton` is used to display the loading state of some component.
 *
 * @see Docs https://chakra-ui.com/docs/components/skeleton
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton({ unstyled, ...props }, ref) {
    const recipe = useRecipe("skeleton", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    return (
      <chakra.div
        ref={ref}
        {...localProps}
        css={[styles, props.css]}
        className={cx("chakra-skeleton", props.className)}
      />
    )
  },
)

Skeleton.displayName = "Skeleton"
