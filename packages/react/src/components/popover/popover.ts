"use client"

import type { Assign } from "@ark-ui/react"
import { Popover as ArkPopover } from "@ark-ui/react/popover"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withRootProvider,
  withContext,
  useStyles: usePopoverStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "popover" })

export { usePopoverStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverRootProviderBaseProps
  extends Assign<ArkPopover.RootProviderBaseProps, SlotRecipeProps<"popover">>,
    UnstyledProp {}

export interface PopoverRootProviderProps extends PopoverRootProviderBaseProps {
  children: React.ReactNode
}

export const PopoverRootProvider = withRootProvider<PopoverRootProviderProps>(
  ArkPopover.RootProvider,
)

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverRootBaseProps
  extends Assign<ArkPopover.RootBaseProps, SlotRecipeProps<"popover">>,
    UnstyledProp {}

export interface PopoverRootProps extends PopoverRootBaseProps {
  children: React.ReactNode
}

export const PopoverRoot = withRootProvider<PopoverRootProps>(ArkPopover.Root)

////////////////////////////////////////////////////////////////////////////////////

export const PopoverPropsProvider =
  PropsProvider as React.Provider<PopoverRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverTriggerProps
  extends HTMLChakraProps<"button", ArkPopover.TriggerBaseProps> {}

export const PopoverTrigger = withContext<
  HTMLButtonElement,
  PopoverTriggerProps
>(ArkPopover.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverPositionerProps
  extends HTMLChakraProps<"div", ArkPopover.PositionerBaseProps> {}

export const PopoverPositioner = withContext<
  HTMLDivElement,
  PopoverPositionerProps
>(ArkPopover.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverContentProps
  extends HTMLChakraProps<"div", ArkPopover.ContentBaseProps> {}

export const PopoverContent = withContext<HTMLDivElement, PopoverContentProps>(
  ArkPopover.Content,
  "content",
  { forwardAsChild: true },
)

// arrow

export interface PopoverArrowProps
  extends HTMLChakraProps<"div", ArkPopover.ArrowBaseProps> {}

export const PopoverArrow = withContext<HTMLDivElement, PopoverArrowProps>(
  ArkPopover.Arrow,
  "arrow",
  { forwardAsChild: true },
)

// arrow tip

export interface PopoverArrowTipProps
  extends HTMLChakraProps<"div", ArkPopover.ArrowTipBaseProps> {}

export const PopoverArrowTip = withContext<
  HTMLDivElement,
  PopoverArrowTipProps
>(ArkPopover.ArrowTip, "arrowTip", { forwardAsChild: true })

// close trigger

export interface PopoverCloseTriggerProps
  extends HTMLChakraProps<"button", ArkPopover.CloseTriggerBaseProps> {}

export const PopoverCloseTrigger = withContext<
  HTMLButtonElement,
  PopoverCloseTriggerProps
>(ArkPopover.CloseTrigger, "closeTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverIndicatorProps
  extends HTMLChakraProps<"div", ArkPopover.IndicatorBaseProps> {}

export const PopoverIndicator = withContext<
  HTMLDivElement,
  PopoverIndicatorProps
>(ArkPopover.Indicator, "indicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverTitleProps
  extends HTMLChakraProps<"div", ArkPopover.TitleBaseProps> {}

export const PopoverTitle = withContext<HTMLDivElement, PopoverTitleProps>(
  ArkPopover.Title,
  "title",
  { forwardAsChild: true },
)

// description

export interface PopoverDescriptionProps
  extends HTMLChakraProps<"div", ArkPopover.DescriptionBaseProps> {}

export const PopoverDescription = withContext<
  HTMLDivElement,
  PopoverDescriptionProps
>(ArkPopover.Description, "description", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverFooterProps extends HTMLChakraProps<"footer"> {}

export const PopoverFooter = withContext<HTMLDivElement, PopoverFooterProps>(
  "footer",
  "footer",
)

////////////////////////////////////////////////////////////////////////////////////

export interface PopoverHeaderProps
  extends HTMLChakraProps<"div", ArkPopover.TitleBaseProps> {}

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
  extends HTMLChakraProps<"div", ArkPopover.AnchorBaseProps> {}

export const PopoverAnchor = withContext<HTMLDivElement, PopoverAnchorProps>(
  ArkPopover.Anchor,
  undefined,
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const PopoverContext = ArkPopover.Context

export interface PopoverOpenChangeDetails
  extends ArkPopover.OpenChangeDetails {}
