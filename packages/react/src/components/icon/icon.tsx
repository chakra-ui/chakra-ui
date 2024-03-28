"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface IconProps
  extends HTMLChakraProps<"svg">,
    RecipeProps<"Icon"> {}

/**
 * The Icon component renders as an svg element to help define your own custom components.
 *
 * @see Docs https://chakra-ui.com/docs/components/icon#using-the-icon-component
 */
export const Icon = forwardRef<SVGElement, IconProps>(
  function Icon(props, ref) {
    const recipe = useRecipe("Icon", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    return (
      <chakra.svg
        verticalAlign="middle"
        focusable="false"
        ref={ref}
        {...localProps}
        css={[styles, props.css]}
        className={cx("chakra-icon", props.className)}
      />
    )
  },
)

Icon.displayName = "Icon"
