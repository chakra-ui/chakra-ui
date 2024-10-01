import { HoverCard, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

interface HoverCardContentProps extends HoverCard.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const HoverCardContent = forwardRef<
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

export const HoverCardArrow = forwardRef<HTMLDivElement, HoverCard.ArrowProps>(
  function HoverCardArrow(props, ref) {
    return (
      <HoverCard.Arrow ref={ref} {...props}>
        <HoverCard.ArrowTip />
      </HoverCard.Arrow>
    )
  },
)

export const HoverCardRoot = HoverCard.Root
export const HoverCardTrigger = HoverCard.Trigger
