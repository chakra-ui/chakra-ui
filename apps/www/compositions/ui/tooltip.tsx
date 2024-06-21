import type { PortalProps } from "@chakra-ui/react"
import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface TooltipProps extends ChakraTooltip.RootProps {
  hasArrow?: boolean
  portalProps?: PortalProps
  label?: React.ReactNode
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const { hasArrow, children, portalProps, label, ...rest } = props
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
              {label}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    )
  },
)
