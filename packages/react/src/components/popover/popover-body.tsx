"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverBodyProps extends HTMLChakraProps<"div"> {}
/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */

export const PopoverBody = forwardRef<HTMLDivElement, PopoverBodyProps>(
  function PopoverBody(props, ref) {
    const api = usePopoverContext()
    const styles = usePopoverStyles()

    return (
      <chakra.div
        {...api.getBodyProps(props, ref)}
        className={cx("chakra-popover__body", props.className)}
        css={[styles.body, props.css]}
      />
    )
  },
)

PopoverBody.displayName = "PopoverBody"
