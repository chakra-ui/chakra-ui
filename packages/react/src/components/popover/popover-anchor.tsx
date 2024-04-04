"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePopoverContext } from "./popover-context"

export interface PopoverAnchorProps extends HTMLChakraProps<"span"> {}

/**
 * PopoverAnchor is element that is used as the positioning reference
 * for the popover.
 */
export const PopoverAnchor = forwardRef<HTMLSpanElement, PopoverAnchorProps>(
  function PopoverAnchor(props, ref) {
    const api = usePopoverContext()
    return <chakra.span {...api.getAnchorProps(props, ref)} />
  },
)

PopoverAnchor.displayName = "PopoverAnchor"
