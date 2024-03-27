import { defineStyle } from "@chakra-ui/styled-system"
import { AnimatePresence } from "framer-motion"
import { Portal, PortalProps } from ".."
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useTooltipContext, useTooltipStyles } from "./tooltip-context"

export interface TooltipPositionerProps extends HTMLChakraProps<"div"> {
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, "appendToParentPortal" | "containerRef">
}

export const TooltipPositioner = forwardRef<TooltipPositionerProps, "div">(
  function TooltipPositioner(props, ref) {
    const { portalProps, ...restProps } = props

    const styles = useTooltipStyles()
    const api = useTooltipContext()

    const positionerStyles = defineStyle({
      zIndex: styles.zIndex,
      pointerEvents: "none",
    })

    return (
      <AnimatePresence>
        {api.isOpen && (
          <Portal {...portalProps}>
            <chakra.div
              {...api.getPositionerProps(restProps, ref)}
              className="chakra-tooltip__positioner"
              __css={positionerStyles}
            />
          </Portal>
        )}
      </AnimatePresence>
    )
  },
)

TooltipPositioner.displayName = "TooltipPositioner"
