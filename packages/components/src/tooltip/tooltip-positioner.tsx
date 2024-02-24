import { defineStyle } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useTooltipContext, useTooltipStyles } from "./tooltip-context"

export interface TooltipPositionerProps extends HTMLChakraProps<"div"> {}

export const TooltipPositioner = forwardRef<TooltipPositionerProps, "div">(
  function TooltipPositioner(props, ref) {
    const styles = useTooltipStyles()
    const api = useTooltipContext()

    const positionerStyles = defineStyle({
      zIndex: styles.zIndex,
      pointerEvents: "none",
    })

    return (
      <chakra.div
        {...api.getPositionerProps(props, ref)}
        className="chakra-tooltip__positioner"
        __css={positionerStyles}
      />
    )
  },
)

TooltipPositioner.displayName = "TooltipPositioner"
