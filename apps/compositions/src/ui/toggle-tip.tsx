import { Popover as ChakraPopover, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface ToggleTipProps extends ChakraPopover.RootProps {
  showArrow?: boolean
  portalled?: boolean
  containerRef?: React.RefObject<HTMLElement>
  content?: React.ReactNode
}

export const ToggleTip = forwardRef<HTMLDivElement, ToggleTipProps>(
  function ToggleTip(props, ref) {
    const { showArrow, children, portalled, content, containerRef, ...rest } =
      props

    return (
      <ChakraPopover.Root
        {...rest}
        positioning={{ ...rest.positioning, gutter: 4 }}
      >
        <ChakraPopover.Trigger asChild>{children}</ChakraPopover.Trigger>
        <Portal disabled={!portalled} container={containerRef}>
          <ChakraPopover.Positioner>
            <ChakraPopover.Content
              width="auto"
              px="2"
              py="0.5"
              fontSize="xs"
              rounded="sm"
              ref={ref}
            >
              {showArrow && (
                <ChakraPopover.Arrow>
                  <ChakraPopover.ArrowTip />
                </ChakraPopover.Arrow>
              )}
              {content}
            </ChakraPopover.Content>
          </ChakraPopover.Positioner>
        </Portal>
      </ChakraPopover.Root>
    )
  },
)
