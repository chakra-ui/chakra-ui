"use client"

import { forwardRef } from "react"
import { Square, type SquareProps } from "./square"

export interface CircleProps extends SquareProps {}

export const Circle = forwardRef<HTMLDivElement, SquareProps>(
  function Circle(props, ref) {
    const { size, ...rest } = props
    return <Square size={size} ref={ref} borderRadius="9999px" {...rest} />
  },
)
