"use client"

import {
  type HTMLChakraProps,
  createRecipeContext,
} from "@chakra-ui/styled-system/jsx"
import { type BadgeVariantProps, badge } from "@chakra-ui/styled-system/recipes"

export const { PropsProvider, withContext } = createRecipeContext(badge)

export interface BadgeBaseProps extends BadgeVariantProps {}

export interface BadgeProps extends HTMLChakraProps<"span">, BadgeBaseProps {}

export const Badge = withContext("span")

Badge.displayName = "Badge"

export const BadgePropsProvider =
  PropsProvider as React.Provider<BadgeBaseProps>
