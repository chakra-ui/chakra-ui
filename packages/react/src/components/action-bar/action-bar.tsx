"use client"

import { Popover as ArkPopover } from "@ark-ui/react/popover"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import type { Assign } from "../../utils"

////////////////////////////////////////////////////////////////////////////////////

const {
  withRootProvider,
  withContext,
  useStyles: useActionBarStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "actionBar" })

export { useActionBarStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ActionBarRootBaseProps
  extends Assign<ArkPopover.RootBaseProps, SlotRecipeProps<"actionBar">>,
    UnstyledProp {}

export interface ActionBarRootProps
  extends Omit<ActionBarRootBaseProps, "positioning"> {
  children: React.ReactNode
}

export const ActionBarRoot = withRootProvider<ActionBarRootProps>(
  ArkPopover.Root,
  {
    defaultProps: {
      autoFocus: false,
      lazyMount: true,
      unmountOnExit: true,
    },
  },
)

export const ActionBarRootPropsProvider =
  PropsProvider as React.Provider<ActionBarRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ActionBarPositionerProps extends HTMLChakraProps<"div"> {}

export const ActionBarPositioner = withContext<
  HTMLDivElement,
  ActionBarPositionerProps
>("div", "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ActionBarContentProps
  extends HTMLChakraProps<"div", ArkPopover.ContentBaseProps> {}

export const ActionBarContent = withContext<
  HTMLDivElement,
  ActionBarContentProps
>(ArkPopover.Content, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ActionBarSeparatorProps extends HTMLChakraProps<"div"> {}

export const ActionBarSeparator = withContext<
  HTMLDivElement,
  ActionBarSeparatorProps
>("div", "separator")

////////////////////////////////////////////////////////////////////////////////////

export interface ActionBarSelectionTriggerProps
  extends HTMLChakraProps<"button"> {}

export const ActionBarSelectionTrigger = withContext<
  HTMLButtonElement,
  ActionBarSelectionTriggerProps
>("button", "selectionTrigger")

////////////////////////////////////////////////////////////////////////////////////

export interface ActionBarCloseTriggerProps
  extends HTMLChakraProps<"button", ArkPopover.CloseTriggerProps> {}

export const ActionBarCloseTrigger = withContext<
  HTMLButtonElement,
  ActionBarCloseTriggerProps
>(ArkPopover.CloseTrigger, "closeTrigger", { forwardAsChild: true })
