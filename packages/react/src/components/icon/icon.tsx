"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  createRecipeContext,
} from "../../styled-system"

const { withContext } = createRecipeContext({ key: "icon" })

export interface IconProps
  extends HTMLChakraProps<"svg">,
    RecipeProps<"icon"> {}

/**
 * The Icon component renders as an svg element to help define your own custom components.
 *
 * @see Docs https://chakra-ui.com/docs/components/icon#using-the-icon-component
 */
export const Icon = withContext<SVGSVGElement, IconProps>("svg", {
  defaultProps: {
    focusable: false,
    asChild: true,
    "aria-hidden": true,
  },
})
