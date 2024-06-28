import { HoverCard as ChakraHoverCard, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

interface HoverCardContentProps extends ChakraHoverCard.ContentProps {
  portalled?: boolean
  containerRef?: React.RefObject<HTMLElement>
  showArrow?: boolean
}

export const HoverCardContent = forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(function HoverCardContent(props, ref) {
  const { children, portalled = true, containerRef, showArrow, ...rest } = props

  return (
    <Portal disabled={!portalled} container={containerRef}>
      <ChakraHoverCard.Positioner>
        <ChakraHoverCard.Content ref={ref} {...rest} asChild={false}>
          {showArrow && (
            <ChakraHoverCard.Arrow>
              <ChakraHoverCard.ArrowTip />
            </ChakraHoverCard.Arrow>
          )}
          {children}
        </ChakraHoverCard.Content>
      </ChakraHoverCard.Positioner>
    </Portal>
  )
})

export const HoverCardTrigger = (props: ChakraHoverCard.TriggerProps) => {
  return <ChakraHoverCard.Trigger {...props} asChild />
}

export const HoverCardRoot = ChakraHoverCard.Root
