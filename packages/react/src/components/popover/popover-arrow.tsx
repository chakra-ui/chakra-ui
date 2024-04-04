"use client"

import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverArrowProps extends HTMLChakraProps<"div"> {}

export function PopoverArrow(props: PopoverArrowProps) {
  const api = usePopoverContext()
  const styles = usePopoverStyles()

  return (
    <chakra.div
      {...api.getArrowProps()}
      className={cx("chakra-popover__arrow", props.className)}
    >
      <chakra.div
        className={cx("chakra-popover__arrow-inner", props.className)}
        {...api.getArrowInnerProps(props)}
        css={[styles.arrow, props.css]}
      />
    </chakra.div>
  )
}

PopoverArrow.displayName = "PopoverArrow"
