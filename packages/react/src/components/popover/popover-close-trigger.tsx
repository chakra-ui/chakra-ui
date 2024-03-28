"use client"

import { callAllHandlers, cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverCloseTriggerProps extends HTMLChakraProps<"button"> {}

export const PopoverCloseTrigger = forwardRef<
  HTMLButtonElement,
  PopoverCloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  const api = usePopoverContext()
  const styles = usePopoverStyles()
  return (
    <chakra.button
      ref={ref}
      {...props}
      css={[styles.closeTrigger, props.css]}
      onClick={callAllHandlers(api.onClose, props.onClick)}
      className={cx("chakra-popover__close", props.className)}
    />
  )
})

PopoverCloseTrigger.displayName = "PopoverCloseTrigger"
