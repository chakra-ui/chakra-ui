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
  PropsProvider,
} = createSlotRecipeContext({ key: "emptyState" })

export { useEmptyStateStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateRootBaseProps
  extends SlotRecipeProps<"emptyState">, UnstyledProp {}

export interface EmptyStateRootProps extends HTMLChakraProps<
  "div",
  EmptyStateRootBaseProps
> {}

export const EmptyStateRoot = withProvider<HTMLDivElement, EmptyStateRootProps>(
  "div",
  "root",
)
EmptyStateRoot.displayName = "EmptyStateRoot"

////////////////////////////////////////////////////////////////////////////////////

export const EmptyStatePropsProvider =
  PropsProvider as React.Provider<EmptyStateRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateContentProps extends HTMLChakraProps<"div"> {}

export const EmptyStateContent = withContext<
  HTMLDivElement,
  EmptyStateContentProps
>("div", "content")
EmptyStateContent.displayName = "EmptyStateContent"

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateIndicatorProps extends HTMLChakraProps<"div"> {}

export const EmptyStateIndicator = withContext<
  HTMLDivElement,
  EmptyStateIndicatorProps
>("div", "indicator")
EmptyStateIndicator.displayName = "EmptyStateIndicator"

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateTitleProps extends HTMLChakraProps<"h3"> {}

export const EmptyStateTitle = withContext<
  HTMLHeadingElement,
  EmptyStateTitleProps
>("h3", "title")
EmptyStateTitle.displayName = "EmptyStateTitle"

////////////////////////////////////////////////////////////////////////////////////

export interface EmptyStateDescriptionProps extends HTMLChakraProps<"p"> {}

export const EmptyStateDescription = withContext<
  HTMLParagraphElement,
  EmptyStateDescriptionProps
>("p", "description")
EmptyStateDescription.displayName = "EmptyStateDescription"
