"use client"

import { HoverCard as ArkHoverCard } from "@ark-ui/react/hover-card"
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
  useStyles: useHoverCardStyles,
} = createStyleContext("HoverCard")

export { useHoverCardStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardRootProps
  extends ArkHoverCard.RootProps,
    SlotRecipeProps<"HoverCard">,
    UnstyledProp {}

export const HoverCardRoot = withRootProvider<HoverCardRootProps>(
  ArkHoverCard.Root,
)

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardTriggerProps
  extends HTMLChakraProps<"button", ArkHoverCard.TriggerProps> {}

export const HoverCardTrigger = withContext<
  HTMLButtonElement,
  HoverCardTriggerProps
>(ArkHoverCard.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardPositionerProps
  extends HTMLChakraProps<"div", ArkHoverCard.PositionerProps> {}

export const HoverCardPositioner = withContext<
  HTMLDivElement,
  HoverCardPositionerProps
>(ArkHoverCard.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardContentProps
  extends HTMLChakraProps<"section", ArkHoverCard.ContentProps> {}

export const HoverCardContent = withContext<
  HTMLDivElement,
  HoverCardContentProps
>(ArkHoverCard.Content, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardArrowProps
  extends HTMLChakraProps<"div", ArkHoverCard.ArrowProps> {}

export const HoverCardArrow = withContext<HTMLDivElement, HoverCardArrowProps>(
  ArkHoverCard.Arrow,
  "arrow",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardArrowTipProps
  extends HTMLChakraProps<"div", ArkHoverCard.ArrowTipProps> {}

export const HoverCardArrowTip = withContext<
  HTMLDivElement,
  HoverCardArrowTipProps
>(ArkHoverCard.ArrowTip, "arrowTip", { forwardAsChild: true })
