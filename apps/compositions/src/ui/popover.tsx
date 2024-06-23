import { Popover as ChakraPopover, Portal } from "@chakra-ui/react"
import { CloseButton } from "compositions/ui/close-button"
import { forwardRef } from "react"

interface PopoverContentProps extends ChakraPopover.ContentProps {
  portalled?: boolean
  containerRef?: React.RefObject<HTMLElement>
  showArrow?: boolean
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(props, ref) {
    const {
      children,
      portalled = true,
      containerRef,
      showArrow,
      ...rest
    } = props

    return (
      <Portal disabled={!portalled} container={containerRef}>
        <ChakraPopover.Positioner>
          <ChakraPopover.Content ref={ref} {...rest} asChild={false}>
            {showArrow && (
              <ChakraPopover.Arrow>
                <ChakraPopover.ArrowTip />
              </ChakraPopover.Arrow>
            )}
            {children}
          </ChakraPopover.Content>
        </ChakraPopover.Positioner>
      </Portal>
    )
  },
)

export const PopoverTrigger = (props: ChakraPopover.TriggerProps) => {
  return <ChakraPopover.Trigger {...props} asChild />
}

export const PopoverCloseTrigger = (props: ChakraPopover.CloseTriggerProps) => {
  return (
    <ChakraPopover.CloseTrigger {...props} asChild>
      <CloseButton size="sm" />
    </ChakraPopover.CloseTrigger>
  )
}

export const PopoverTitle = ChakraPopover.Title
export const PopoverDescription = ChakraPopover.Description
export const PopoverFooter = ChakraPopover.Footer
export const PopoverHeader = ChakraPopover.Header
export const PopoverRoot = ChakraPopover.Root
export const PopoverBody = ChakraPopover.Body
