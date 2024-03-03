import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { usePopoverContext } from "./popover-context"

export interface PopoverTriggerProps extends HTMLChakraProps<"button"> {}

export const PopoverTrigger = forwardRef<PopoverTriggerProps, "button">(
  (props, ref) => {
    const api = usePopoverContext()
    return <chakra.button {...api.getTriggerProps(props, ref)} />
  },
)

PopoverTrigger.displayName = "PopoverTrigger"
