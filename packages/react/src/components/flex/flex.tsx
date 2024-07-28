"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"

export interface FlexOptions {
  align?: SystemStyleObject["alignItems"]
  justify?: SystemStyleObject["justifyContent"]
  wrap?: SystemStyleObject["flexWrap"]
  direction?: SystemStyleObject["flexDirection"]
  basis?: SystemStyleObject["flexBasis"]
  grow?: SystemStyleObject["flexGrow"]
  shrink?: SystemStyleObject["flexShrink"]
  inline?: boolean
}

export interface FlexProps extends HTMLChakraProps<"div", FlexOptions> {}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  function Flex(props, ref) {
    const {
      direction,
      align,
      justify,
      wrap,
      basis,
      grow,
      shrink,
      inline,
      ...rest
    } = props

    return (
      <chakra.div
        ref={ref}
        {...rest}
        css={{
          display: inline ? "inline-flex" : "flex",
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
          flexBasis: basis,
          flexGrow: grow,
          flexShrink: shrink,
          ...props.css,
        }}
      />
    )
  },
)
