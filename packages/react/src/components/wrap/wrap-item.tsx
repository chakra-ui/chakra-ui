"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"

export interface WrapItemProps extends HTMLChakraProps<"div"> {}

export const WrapItem = forwardRef<HTMLDivElement, WrapItemProps>(
  function WrapItem(props, ref) {
    return (
      <chakra.div
        display="flex"
        alignItems="flex-start"
        ref={ref}
        {...props}
        className={cx("chakra-wrap__item", props.className)}
      />
    )
  },
)

WrapItem.displayName = "WrapItem"
