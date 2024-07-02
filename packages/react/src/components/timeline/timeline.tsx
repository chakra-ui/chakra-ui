"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useTimelineStyles,
} = createStyleContext("timeline")

export { useTimelineStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TimelineRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"timeline">,
    UnstyledProp {}

export const TimelineRoot = withProvider<HTMLDivElement, TimelineRootProps>(
  "div",
  "root",
  { defaultProps: { role: "list" } },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TimelineItemProps extends HTMLChakraProps<"div"> {}

export const TimelineItem = withContext<HTMLDivElement, TimelineItemProps>(
  "div",
  "item",
  { defaultProps: { role: "listitem" } },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TimelineSeparatorProps extends HTMLChakraProps<"div"> {}

export const TimelineSeparator = withContext<
  HTMLDivElement,
  TimelineSeparatorProps
>("div", "separator")

////////////////////////////////////////////////////////////////////////////////////

export interface TimelineIndicatorProps extends HTMLChakraProps<"div"> {}

export const TimelineIndicator = withContext<
  HTMLDivElement,
  TimelineIndicatorProps
>("div", "indicator")

////////////////////////////////////////////////////////////////////////////////////

export interface TimelineContentProps extends HTMLChakraProps<"div"> {}

export const TimelineContent = withContext<
  HTMLDivElement,
  TimelineContentProps
>("div", "content")
