"use client"

import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "link",
})

export interface LinkProps
  extends HTMLChakraProps<"a">,
    RecipeProps<"link">,
    UnstyledProp {}

export const Link = withContext<HTMLAnchorElement, LinkProps>("a")

export const LinkPropsProvider = PropsProvider as React.Provider<LinkProps>
