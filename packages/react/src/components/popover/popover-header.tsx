"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverHeaderProps extends HTMLChakraProps<"header"> {}

/**
 * PopoverHeader is the accessible header or label
 * for the popover's content, and it is first announced by screenreaders.
 */
export const PopoverHeader = forwardRef<HTMLElement, PopoverHeaderProps>(
  function PopoverHeader(props, ref) {
    const { getHeaderProps } = usePopoverContext()

    const styles = usePopoverStyles()

    return (
      <chakra.header
        {...getHeaderProps(props, ref)}
        className={cx("chakra-popover__header", props.className)}
        css={[styles.header, props.css]}
      />
    )
  },
)

PopoverHeader.displayName = "PopoverHeader"
