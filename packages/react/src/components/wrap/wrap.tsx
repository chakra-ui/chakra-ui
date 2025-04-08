"use client"

import type { Assign } from "@ark-ui/react"
import { forwardRef } from "react"
import type { HTMLChakraProps, SystemStyleObject } from "../../styled-system"
import { chakra, defineStyle } from "../../styled-system"
import { cx } from "../../utils"

export interface WrapProps
  extends Assign<
    HTMLChakraProps<"div">,
    {
      justify?: SystemStyleObject["justifyContent"]
      align?: SystemStyleObject["alignItems"]
      direction?: SystemStyleObject["flexDirection"]
    }
  > {}

export const Wrap = forwardRef<HTMLDivElement, WrapProps>(
  function Wrap(props, ref) {
    const { gap = "0.5rem", justify, direction, align, ...rest } = props

    return (
      <chakra.div
        ref={ref}
        display="flex"
        flexWrap="wrap"
        justifyContent={justify}
        alignItems={align}
        flexDirection={direction}
        gap={gap}
        {...rest}
        className={cx("chakra-wrap", props.className)}
      />
    )
  },
)

Wrap.displayName = "Wrap"

/////////////////////////////////////////////////////////////////////////////////

export interface WrapItemProps extends HTMLChakraProps<"div"> {}

const itemStyle = defineStyle({
  display: "flex",
  alignItems: "flex-start",
})

export const WrapItem = forwardRef<HTMLDivElement, WrapItemProps>(
  function WrapItem(props, ref) {
    return (
      <chakra.div
        ref={ref}
        css={[itemStyle, props.css]}
        {...props}
        className={cx("chakra-wrap__listitem", props.className)}
      />
    )
  },
)
