"use client"

import { Popover as ArkPopover } from "@ark-ui/react/popover"
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
  useStyles: useActionBarStyles,
} = createStyleContext("actionBar")

export { useActionBarStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ActionBarRootProps
  extends Omit<ArkPopover.RootBaseProps, "positioning">,
    SlotRecipeProps<"actionBar">,
    UnstyledProp {
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
