"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useEmptyStateStyles,
} = createSlotRecipeContext({ key: "emptyState" })

export { useEmptyStateStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"emptyState">,
    UnstyledProp {}

export const EmptyStateRoot = withProvider<HTMLDivElement, EmptyStateRootProps>(
  "div",
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateContentProps extends HTMLChakraProps<"div"> {}

export const EmptyStateContent = withContext<
  HTMLDivElement,
  EmptyStateContentProps
>("div", "content")

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateIndicatorProps extends HTMLChakraProps<"div"> {}

export const EmptyStateIndicator = withContext<
  HTMLDivElement,
  EmptyStateIndicatorProps
>("div", "indicator")

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateTitleProps extends HTMLChakraProps<"h3"> {}

export const EmptyStateTitle = withContext<
  HTMLHeadingElement,
  EmptyStateTitleProps
>("h3", "title")

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateDescriptionProps extends HTMLChakraProps<"p"> {}

export const EmptyStateDescription = withContext<
  HTMLParagraphElement,
  EmptyStateDescriptionProps
>("p", "description")
