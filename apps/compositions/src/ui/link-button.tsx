"use client"

import type { HTMLChakraProps, RecipeProps } from "@sh3yk0-ui/react"
import { createRecipeContext } from "@sh3yk0-ui/react"

export interface LinkButtonProps
  extends HTMLChakraProps<"a", RecipeProps<"button">> {}

const { withContext } = createRecipeContext({ key: "button" })

// Replace "a" with your framework's link component
export const LinkButton = withContext<HTMLAnchorElement, LinkButtonProps>("a")
