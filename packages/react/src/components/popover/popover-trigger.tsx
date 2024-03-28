"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePopoverContext } from "./popover-context"

export interface PopoverTriggerProps extends HTMLChakraProps<"button"> {}

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(function PopoverTrigger(props, ref) {
  const api = usePopoverContext()
  return <chakra.button {...api.getTriggerProps(props, ref)} />
})

PopoverTrigger.displayName = "PopoverTrigger"
