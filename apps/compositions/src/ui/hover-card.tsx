import { HoverCard, Portal } from "@chakra-ui/react"
import * as React from "react"

interface HoverCardContentProps extends HoverCard.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(function HoverCardContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <HoverCard.Positioner>
        <HoverCard.Content ref={ref} {...rest} />
      </HoverCard.Positioner>
    </Portal>
  )
})

export const HoverCardArrow = React.forwardRef<
  HTMLDivElement,
  HoverCard.ArrowProps
>(function HoverCardArrow(props, ref) {
  return (
    <HoverCard.Arrow ref={ref} {...props}>
      <HoverCard.ArrowTip />
    </HoverCard.Arrow>
  )
})

export const HoverCardRoot = HoverCard.Root
export const HoverCardTrigger = HoverCard.Trigger
