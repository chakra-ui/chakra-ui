"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"
import { cx } from "../../utils"

export interface IconProps
  extends HTMLChakraProps<"svg">,
    RecipeProps<"icon"> {}

/**
 * The Icon component renders as an svg element to help define your own custom components.
 *
 * @see Docs https://chakra-ui.com/docs/components/icon#using-the-icon-component
 */
export const Icon = forwardRef<SVGElement, IconProps>(
  function Icon(props, ref) {
    const recipe = useRecipe({ key: "icon", recipe: props.recipe })
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
