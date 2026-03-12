"use client"

import type { Assign } from "@ark-ui/react"
import { HoverCard as ArkHoverCard } from "@ark-ui/react/hover-card"
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
  useStyles: useHoverCardStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "hoverCard" })

export { useHoverCardStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardRootProviderBaseProps
  extends
    Assign<ArkHoverCard.RootProviderBaseProps, SlotRecipeProps<"hoverCard">>,
    UnstyledProp {}

export interface HoverCardRootProviderProps extends HoverCardRootProviderBaseProps {
  children: React.ReactNode
}

export const HoverCardRootProvider =
  withRootProvider<HoverCardRootProviderProps>(ArkHoverCard.RootProvider)
HoverCardRootProvider.displayName = "HoverCardRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardRootBaseProps
  extends
    Assign<ArkHoverCard.RootBaseProps, SlotRecipeProps<"hoverCard">>,
    UnstyledProp {}

export interface HoverCardRootProps extends HoverCardRootBaseProps {
  children: React.ReactNode
}

export const HoverCardRoot = withRootProvider<HoverCardRootProps>(
  ArkHoverCard.Root,
)
HoverCardRoot.displayName = "HoverCardRoot"

////////////////////////////////////////////////////////////////////////////////////

export const HoverCardPropsProvider =
  PropsProvider as React.Provider<HoverCardRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardTriggerProps
  extends
    HTMLChakraProps<"button", ArkHoverCard.TriggerBaseProps>,
    UnstyledProp {}

export const HoverCardTrigger = withContext<
  HTMLButtonElement,
  HoverCardTriggerProps
>(ArkHoverCard.Trigger, "trigger", { forwardAsChild: true })
HoverCardTrigger.displayName = "HoverCardTrigger"

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardPositionerProps
  extends
    HTMLChakraProps<"div", ArkHoverCard.PositionerBaseProps>,
    UnstyledProp {}

export const HoverCardPositioner = withContext<
  HTMLDivElement,
  HoverCardPositionerProps
>(ArkHoverCard.Positioner, "positioner", { forwardAsChild: true })
HoverCardPositioner.displayName = "HoverCardPositioner"

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardContentProps
  extends
    HTMLChakraProps<"section", ArkHoverCard.ContentBaseProps>,
    UnstyledProp {}

export const HoverCardContent = withContext<
  HTMLDivElement,
  HoverCardContentProps
>(ArkHoverCard.Content, "content", { forwardAsChild: true })
HoverCardContent.displayName = "HoverCardContent"

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardArrowTipProps
  extends
    HTMLChakraProps<"div", ArkHoverCard.ArrowTipBaseProps>,
    UnstyledProp {}

export const HoverCardArrowTip = withContext<
  HTMLDivElement,
  HoverCardArrowTipProps
>(ArkHoverCard.ArrowTip, "arrowTip", { forwardAsChild: true })
HoverCardArrowTip.displayName = "HoverCardArrowTip"

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardArrowProps
  extends HTMLChakraProps<"div", ArkHoverCard.ArrowBaseProps>, UnstyledProp {}

export const HoverCardArrow = withContext<HTMLDivElement, HoverCardArrowProps>(
  ArkHoverCard.Arrow,
  "arrow",
  {
    forwardAsChild: true,
    defaultProps: { children: <HoverCardArrowTip /> },
  },
)
HoverCardArrow.displayName = "HoverCardArrow"

////////////////////////////////////////////////////////////////////////////////////

export const HoverCardContext = ArkHoverCard.Context

export interface HoverCardOpenChangeDetails
  extends ArkHoverCard.OpenChangeDetails {}
