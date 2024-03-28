"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_STYLES,
  HTMLChakraProps,
  RecipeProps,
  UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface LinkProps
  extends HTMLChakraProps<"a">,
    RecipeProps<"Link">,
    UnstyledProp {
  /**
   *  If `true`, the link will open in new tab
   *
   * @default false
   */
  external?: boolean
}

/**
 * Links are accessible elements used primarily for navigation.
 * @see Docs https://chakra-ui.com/link
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { unstyled, external, ...props },
  ref,
) {
  const recipe = useRecipe("Link", props.recipe)
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

  return (
    <chakra.a
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      ref={ref}
      {...localProps}
      className={cx("chakra-link", props.className)}
      css={[styles, props.css]}
    />
  )
})

Link.displayName = "Link"
