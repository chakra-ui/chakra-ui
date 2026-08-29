"use client"

import type { Assign } from "@ark-ui/react"
import { createRecipeContext } from "@chakra-ui/styled-system/jsx"
import { heading } from "@chakra-ui/styled-system/recipes/heading"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext(heading)

export interface HeadingProps
  extends Assign<HTMLChakraProps<"h2">, RecipeProps<"heading">>, UnstyledProp {}

export const Heading = withContext("h2")

Heading.displayName = "Heading"

export const HeadingPropsProvider =
  PropsProvider as React.Provider<HeadingProps>
