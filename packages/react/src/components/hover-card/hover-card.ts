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
} = createStyleContext("hoverCard")

export { useHoverCardStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardRootProps
  extends ArkHoverCard.RootBaseProps,
    SlotRecipeProps<"hoverCard">,
    UnstyledProp {
  children: React.ReactNode
}

export const HoverCardRoot = withRootProvider<HoverCardRootProps>(
  ArkHoverCard.Root,
)

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardTriggerProps
  extends HTMLChakraProps<"button", ArkHoverCard.TriggerBaseProps> {}

export const HoverCardTrigger = withContext<
  HTMLButtonElement,
  HoverCardTriggerProps
>(ArkHoverCard.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardPositionerProps
  extends HTMLChakraProps<"div", ArkHoverCard.PositionerBaseProps> {}

export const HoverCardPositioner = withContext<
  HTMLDivElement,
  HoverCardPositionerProps
>(ArkHoverCard.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardContentProps
  extends HTMLChakraProps<"section", ArkHoverCard.ContentBaseProps> {}

export const HoverCardContent = withContext<
  HTMLDivElement,
  HoverCardContentProps
>(ArkHoverCard.Content, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardArrowProps
  extends HTMLChakraProps<"div", ArkHoverCard.ArrowBaseProps> {}

export const HoverCardArrow = withContext<HTMLDivElement, HoverCardArrowProps>(
  ArkHoverCard.Arrow,
  "arrow",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardArrowTipProps
  extends HTMLChakraProps<"div", ArkHoverCard.ArrowTipBaseProps> {}

export const HoverCardArrowTip = withContext<
  HTMLDivElement,
  HoverCardArrowTipProps
>(ArkHoverCard.ArrowTip, "arrowTip", { forwardAsChild: true })
