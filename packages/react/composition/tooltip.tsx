import { forwardRef } from "react"
import type { PortalProps } from "../src"
import { Tooltip as ChakraTooltip, Portal } from "../src"

export interface TooltipProps extends ChakraTooltip.RootProps {
  hasArrow?: boolean
  portalProps?: PortalProps
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const { hasArrow, children, portalProps, ...rest } = props
    return (
      <ChakraTooltip.Root {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <Portal {...portalProps}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref}>
              {hasArrow && (
                <ChakraTooltip.Arrow>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              This is a chakra tooltip
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    )
  },
)
