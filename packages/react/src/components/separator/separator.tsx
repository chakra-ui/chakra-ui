"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  RecipeProps,
  UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface SeparatorProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"Separator">,
    UnstyledProp {}

/**
 * Layout component used to visually separate content in a list or group.
 * It displays a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://chakra-ui.com/divider
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator({ unstyled, ...props }, ref) {
    const recipe = useRecipe("Separator", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    return (
      <chakra.div
        ref={ref}
        role="separator"
        aria-orientation={variantProps.orientation || "horizontal"}
        {...localProps}
        css={[styles, props.css]}
        className={cx("chakra-separator", props.className)}
      />
    )
  },
)

Separator.displayName = "Divider"
