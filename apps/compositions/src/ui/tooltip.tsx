import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean
  portalled?: boolean
  containerRef?: React.RefObject<HTMLElement>
  content?: React.ReactNode
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const { showArrow, children, portalled, content, containerRef, ...rest } =
      props
    return (
      <ChakraTooltip.Root {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <Portal disabled={!portalled} container={containerRef}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref}>
              {showArrow && (
                <ChakraTooltip.Arrow>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    )
  },
)
