import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { usePopoverContext } from "./popover-context"

export interface PopoverAnchorProps extends HTMLChakraProps<"span"> {}

/**
 * PopoverAnchor is element that is used as the positioning reference
 * for the popover.
 */
export const PopoverAnchor = forwardRef<PopoverAnchorProps, "span">(
  function PopoverAnchor(props, ref) {
    const api = usePopoverContext()
    return <chakra.span {...api.getAnchorProps(props, ref)} />
  },
)

PopoverAnchor.displayName = "PopoverAnchor"
