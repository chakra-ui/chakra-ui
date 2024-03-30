import {
  HoverCard as ArkHoverCard,
  HoverCardArrowProps as ArkHoverCardArrowProps,
  HoverCardArrowTipProps as ArkHoverCardArrowTipProps,
  HoverCardContentProps as ArkHoverCardContentProps,
  HoverCardPositionerProps as ArkHoverCardPositionerProps,
  HoverCardRootProps as ArkHoverCardRootProps,
  HoverCardTriggerProps as ArkHoverCardTriggerProps,
} from "@ark-ui/react/hover-card"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
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
  extends ArkHoverCardRootProps,
    SlotRecipeProps<"HoverCard">,
    UnstyledProp {}

export const HoverCardRoot = withRootProvider<HoverCardRootProps>(
  ArkHoverCard.Root,
)

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardTriggerProps
  extends HTMLChakraProps<"button", ArkHoverCardTriggerProps> {}

export const HoverCardTrigger = withContext<
  HTMLButtonElement,
  HoverCardTriggerProps
>(ArkHoverCard.Trigger, "trigger")

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardPositionerProps
  extends HTMLChakraProps<"div", ArkHoverCardPositionerProps> {}

export const HoverCardPositioner = withContext<
  HTMLDivElement,
  HoverCardPositionerProps
>(ArkHoverCard.Positioner, "positioner")

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardContentProps
  extends HTMLChakraProps<"section", ArkHoverCardContentProps> {}

export const HoverCardContent = withContext<
  HTMLDivElement,
  HoverCardContentProps
>(ArkHoverCard.Content, "content")

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardArrowProps
  extends HTMLChakraProps<"div", ArkHoverCardArrowProps> {}

export const HoverCardArrow = withContext<HTMLDivElement, HoverCardArrowProps>(
  ArkHoverCard.Arrow,
  "arrow",
)

////////////////////////////////////////////////////////////////////////////////////

export interface HoverCardArrowTipProps
  extends HTMLChakraProps<"div", ArkHoverCardArrowTipProps> {}

export const HoverCardArrowTip = withContext<
  HTMLDivElement,
  HoverCardArrowTipProps
>(ArkHoverCard.ArrowTip, "arrowTip")
