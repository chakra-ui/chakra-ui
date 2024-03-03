import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useTooltipContext } from "./tooltip-context"

export interface TooltipTriggerProps extends HTMLChakraProps<"button"> {}

export const TooltipTrigger = forwardRef<TooltipTriggerProps, "button">(
  function TooltipTrigger(props, ref) {
    const api = useTooltipContext()
    return <chakra.button ref={ref} {...api.getTriggerProps(props, ref)} />
  },
)

TooltipTrigger.displayName = "TooltipTrigger"
