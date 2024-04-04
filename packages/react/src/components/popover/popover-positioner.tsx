"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverPositionerProps extends HTMLChakraProps<"div"> {}

export const PopoverPositioner = forwardRef<
  HTMLDivElement,
  PopoverPositionerProps
>(function PopoverPositioner(props, ref) {
  const api = usePopoverContext()
  const styles = usePopoverStyles()

  return (
    <chakra.div
      {...api.getPositionerProps(props, ref)}
      css={[styles.positioner, props.css]}
      className={cx("chakra-popover__positioner", props.className)}
    />
  )
})

PopoverPositioner.displayName = "PopoverPositioner"
