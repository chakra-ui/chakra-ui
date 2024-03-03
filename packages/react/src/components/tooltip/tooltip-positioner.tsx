import { AnimatePresence } from "framer-motion"
import {
  HTMLChakraProps,
  chakra,
  defineStyle,
  forwardRef,
} from "../../styled-system"
import { Portal, PortalProps } from "../portal"
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
              css={positionerStyles}
            />
          </Portal>
        )}
      </AnimatePresence>
    )
  },
)

TooltipPositioner.displayName = "TooltipPositioner"
