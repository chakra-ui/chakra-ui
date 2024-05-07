"use client"

import {
  Popover as ArkPopover,
  type PopoverAnchorProps as ArkPopoverAnchorProps,
  type PopoverArrowProps as ArkPopoverArrowProps,
  type PopoverArrowTipProps as ArkPopoverArrowTipProps,
  type PopoverCloseTriggerProps as ArkPopoverCloseTriggerProps,
  type PopoverContentProps as ArkPopoverContentProps,
  type PopoverDescriptionProps as ArkPopoverDescriptionProps,
  type PopoverIndicatorProps as ArkPopoverIndicatorProps,
  type PopoverPositionerProps as ArkPopoverPositionerProps,
  type PopoverRootProps as ArkPopoverRootProps,
  type PopoverTitleProps as ArkPopoverTitleProps,
  type PopoverTriggerProps as ArkPopoverTriggerProps,
} from "@ark-ui/react/popover"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withRootProvider,
  withContext,
  useStyles: usePopoverStyles,
} = createStyleContext("Popover")

export { usePopoverStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverRootProps
  extends ArkPopoverRootProps,
    SlotRecipeProps<"Popover">,
    UnstyledProp {}

export const PopoverRoot = withRootProvider<PopoverRootProps>(ArkPopover.Root)

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverTriggerProps
  extends HTMLChakraProps<"button", ArkPopoverTriggerProps> {}

export const PopoverTrigger = withContext<
  HTMLButtonElement,
  PopoverTriggerProps
>(ArkPopover.Trigger, "trigger")

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverPositionerProps
  extends HTMLChakraProps<"div", ArkPopoverPositionerProps> {}

export const PopoverPositioner = withContext<
  HTMLDivElement,
  PopoverPositionerProps
>(ArkPopover.Positioner, "positioner")

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverContentProps
  extends HTMLChakraProps<"section", ArkPopoverContentProps> {}

export const PopoverContent = withContext<HTMLDivElement, PopoverContentProps>(
  ArkPopover.Content,
  "content",
)

// arrow

export interface PopoverArrowProps
  extends HTMLChakraProps<"div", ArkPopoverArrowProps> {}

export const PopoverArrow = withContext<HTMLDivElement, PopoverArrowProps>(
  ArkPopover.Arrow,
  "arrow",
)

// arrow tip

export interface PopoverArrowTipProps
  extends HTMLChakraProps<"div", ArkPopoverArrowTipProps> {}

export const PopoverArrowTip = withContext<
  HTMLDivElement,
  PopoverArrowTipProps
>(ArkPopover.ArrowTip, "arrowTip")

// close trigger

export interface PopoverCloseTriggerProps
  extends HTMLChakraProps<"button", ArkPopoverCloseTriggerProps> {}

export const PopoverCloseTrigger = withContext<
  HTMLButtonElement,
  PopoverCloseTriggerProps
>(ArkPopover.CloseTrigger, "closeTrigger")

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverIndicatorProps
  extends HTMLChakraProps<"div", ArkPopoverIndicatorProps> {}

export const PopoverIndicator = withContext<
  HTMLDivElement,
  PopoverIndicatorProps
>(ArkPopover.Indicator, "indicator")

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverTitleProps
  extends HTMLChakraProps<"div", ArkPopoverTitleProps> {}

export const PopoverTitle = withContext<HTMLDivElement, PopoverTitleProps>(
  ArkPopover.Title,
  "title",
)

// description

export interface PopoverDescriptionProps
  extends HTMLChakraProps<"div", ArkPopoverDescriptionProps> {}

export const PopoverDescription = withContext<
  HTMLDivElement,
  PopoverDescriptionProps
>(ArkPopover.Description, "description")

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverFooterProps extends HTMLChakraProps<"footer"> {}

export const PopoverFooter = withContext<HTMLDivElement, PopoverFooterProps>(
  "footer",
  "footer",
)

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverHeaderProps
  extends HTMLChakraProps<"div", ArkPopoverTitleProps> {}

export const PopoverHeader = withContext<HTMLDivElement, PopoverHeaderProps>(
  "header",
  "header",
)

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverBodyProps extends HTMLChakraProps<"div"> {}

export const PopoverBody = withContext<HTMLDivElement, PopoverBodyProps>(
  "div",
  "body",
)

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverAnchorProps
  extends HTMLChakraProps<"div", ArkPopoverAnchorProps> {}

export const PopoverAnchor = withContext<HTMLDivElement, PopoverAnchorProps>(
  ArkPopover.Anchor,
)
