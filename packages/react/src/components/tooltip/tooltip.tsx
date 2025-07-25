"use client"

import type { Assign } from "@ark-ui/react"
import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip"
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
  useStyles: useTooltipStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "tooltip" })

export { useTooltipStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TooltipRootProviderBaseProps
  extends Assign<ArkTooltip.RootProviderBaseProps, SlotRecipeProps<"tooltip">>,
    UnstyledProp {}

export interface TooltipRootProviderProps extends TooltipRootProviderBaseProps {
  children?: React.ReactNode | undefined
}

export const TooltipRootProvider = withRootProvider<TooltipRootProviderProps>(
  ArkTooltip.RootProvider,
)

////////////////////////////////////////////////////////////////////////////////////

export interface TooltipRootBaseProps
  extends Assign<ArkTooltip.RootBaseProps, SlotRecipeProps<"tooltip">>,
    UnstyledProp {}

export interface TooltipRootProps extends TooltipRootBaseProps {
  children?: React.ReactNode | undefined
}

export const TooltipRoot = withRootProvider<TooltipRootProps>(ArkTooltip.Root, {
  defaultProps: { lazyMount: true, unmountOnExit: true },
})

////////////////////////////////////////////////////////////////////////////////////

export const TooltipPropsProvider =
  PropsProvider as React.Provider<TooltipRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface TooltipTriggerProps
  extends HTMLChakraProps<"button", ArkTooltip.TriggerProps>,
    UnstyledProp {}

export const TooltipTrigger = withContext<
  HTMLButtonElement,
  TooltipTriggerProps
>(ArkTooltip.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TooltipPositionerProps
  extends HTMLChakraProps<"div", ArkTooltip.PositionerProps>,
    UnstyledProp {}

export const TooltipPositioner = withContext<
  HTMLDivElement,
  TooltipPositionerProps
>(ArkTooltip.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TooltipContentProps
  extends HTMLChakraProps<"section", ArkTooltip.ContentProps>,
    UnstyledProp {}

export const TooltipContent = withContext<HTMLDivElement, TooltipContentProps>(
  ArkTooltip.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TooltipArrowTipProps
  extends HTMLChakraProps<"div", ArkTooltip.ArrowTipProps>,
    UnstyledProp {}

export const TooltipArrowTip = withContext<
  HTMLDivElement,
  TooltipArrowTipProps
>(ArkTooltip.ArrowTip, "arrowTip", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TooltipArrowProps
  extends HTMLChakraProps<"div", ArkTooltip.ArrowProps>,
    UnstyledProp {}

export const TooltipArrow = withContext<HTMLDivElement, TooltipArrowProps>(
  ArkTooltip.Arrow,
  "arrow",
  { forwardAsChild: true, defaultProps: { children: <TooltipArrowTip /> } },
)

////////////////////////////////////////////////////////////////////////////////////

export const TooltipContext = ArkTooltip.Context

export interface TooltipOpenChangeDetails
  extends ArkTooltip.OpenChangeDetails {}
