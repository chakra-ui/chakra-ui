import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useTooltipContext } from "./tooltip-context"

export interface TooltipTriggerProps extends HTMLChakraProps<"button"> {}

export const TooltipTrigger = forwardRef<TooltipTriggerProps, "button">(
  function TooltipTrigger(props, ref) {
    const { getTriggerProps } = useTooltipContext()
    return <chakra.button ref={ref} {...getTriggerProps(props, ref)} />
  },
)

TooltipTrigger.displayName = "TooltipTrigger"
