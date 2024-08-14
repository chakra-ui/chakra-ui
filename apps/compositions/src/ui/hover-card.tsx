import { HoverCard as ChakraHoverCard, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

interface HoverCardContentProps extends ChakraHoverCard.ContentProps {
  portalled?: boolean
  containerRef?: React.RefObject<HTMLElement>
}

export const HoverCardContent = forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(function HoverCardContent(props, ref) {
  const { portalled = true, containerRef, ...rest } = props

  return (
    <Portal disabled={!portalled} container={containerRef}>
      <ChakraHoverCard.Positioner>
        <ChakraHoverCard.Content ref={ref} {...rest} />
      </ChakraHoverCard.Positioner>
    </Portal>
  )
})

export const HoverCardArrow = (props: ChakraHoverCard.ArrowProps) => {
  return (
    <ChakraHoverCard.Arrow {...props}>
      <ChakraHoverCard.ArrowTip />
    </ChakraHoverCard.Arrow>
  )
}

export const HoverCardTrigger = (props: ChakraHoverCard.TriggerProps) => {
  return <ChakraHoverCard.Trigger {...props} />
}

export const HoverCardRoot = ChakraHoverCard.Root
