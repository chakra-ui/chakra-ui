"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"

export interface StatGroupProps extends HTMLChakraProps<"div"> {}

export const StatGroup = forwardRef<HTMLDivElement, StatGroupProps>(
  function StatGroup(props, ref) {
    return (
      <chakra.div
        {...props}
        ref={ref}
        role="group"
        className={cx("chakra-stat__group", props.className)}
        css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
          ...props.css,
        }}
      />
    )
  },
)

StatGroup.displayName = "StatGroup"
