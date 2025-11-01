"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface SkipNavLinkProps
  extends HTMLChakraProps<"a">,
    RecipeProps<"skipNavLink"> {}

export const fallbackId = "chakra-skip-nav"

/**
 * Renders a link that remains hidden until focused to skip to the main content.
 *
 * @see Docs https://chakra-ui.com/docs/components/skip-nav
 */
export const SkipNavLink = forwardRef<HTMLAnchorElement, SkipNavLinkProps>(
  function SkipNavLink(props, ref) {
    const recipe = useRecipe({ key: "skipNavLink", recipe: props.recipe })
    const [variantProps, { id, ...localProps }] =
      recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const targetId = id ?? fallbackId

    return (
      <chakra.a
        {...localProps}
        ref={ref}
        href={`#${targetId}`}
        css={[styles, props.css]}
      />
    )
  },
)

SkipNavLink.displayName = "SkipNavLink"
