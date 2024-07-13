"use client"

import type { HTMLChakraProps, SlotRecipeProps } from "@chakra-ui/react"
import { Button, chakra, useRecipe } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface LinkButtonProps
  extends HTMLChakraProps<"a">,
    SlotRecipeProps<"Button"> {}

// Replace "a" with your framework's link component
const StyledLink = chakra("a")

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(props, ref) {
    const { children, ...rest } = props
    const recipe = useRecipe("Button", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(rest)
    return (
      <Button asChild {...variantProps}>
        <StyledLink ref={ref} {...localProps}>
          {children}
        </StyledLink>
      </Button>
    )
  },
)
