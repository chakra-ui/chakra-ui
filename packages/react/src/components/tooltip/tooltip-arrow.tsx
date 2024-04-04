"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"

export interface TooltipArrowProps extends HTMLChakraProps<"div"> {}

export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(
  function TooltipArrow(props, ref) {
    return (
      <chakra.div
        ref={ref}
        data-popper-arrow
        {...props}
        className={cx("chakra-tooltip__arrow", props.className)}
      >
        <chakra.div
          data-popper-arrow-inner
          className="chakra-tooltip__arrow-inner"
          css={{ bg: "inherit" }}
        />
      </chakra.div>
    )
  },
)

TooltipArrow.displayName = "TooltipArrow"
