"use client"

import { forwardRef } from "react"
import { Box, type BoxProps } from "./box"

export interface SquareProps extends BoxProps {
  /**
   * The size (width and height) of the square
   */
  size?: BoxProps["boxSize"]
}

export const Square = forwardRef<HTMLDivElement, SquareProps>(
  function Square(props, ref) {
    const { size, ...rest } = props

    return (
      <Box
        {...rest}
        ref={ref}
        boxSize={size}
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          flexGrow: 0,
          ...props.css,
        }}
      />
    )
  },
)
