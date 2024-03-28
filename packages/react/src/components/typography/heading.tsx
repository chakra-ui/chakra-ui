"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface HeadingProps
  extends HTMLChakraProps<"h2">,
    RecipeProps<"Heading"> {}

/**
 * `Heading` is used to render semantic HTML heading elements.
 *
 * By default, renders as `h2` with themantic size `xl`
 *
 * @see Docs https://chakra-ui.com/docs/components/heading
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(props, ref) {
    const recipe = useRecipe("Heading", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    return (
      <chakra.h2
        ref={ref}
        {...localProps}
        className={cx("chakra-heading", props.className)}
        css={[recipe(variantProps), localProps.css]}
      />
    )
  },
)

Heading.displayName = "Heading"
