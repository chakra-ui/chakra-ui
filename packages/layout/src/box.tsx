import {
  chakra,
  PropsOf,
  forwardRef,
  SystemStyleObject,
} from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type BoxProps = PropsOf<typeof Box>

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://chakra-ui.com/docs/layout/box
 */
export const Box = chakra.div

if (__DEV__) {
  Box.displayName = "Box"
}

/**
 * As a constraint, you can't pass size related props
 * Only `size` would be allowed
 */
type Omitted = "size" | "boxSize" | "width" | "height" | "w" | "h"

export type SquareProps = Omit<BoxProps, Omitted> & {
  /**
   * The size (width and height) of the square
   */
  size?: BoxProps["width"]
  /**
   * If `true`, the content will be centered in the square
   */
  centerContent?: boolean
}

export const Square = forwardRef<SquareProps>(function Square(props, ref) {
  const { size, centerContent = true, ...rest } = props
  const centerStyles: SystemStyleObject = centerContent
    ? { display: "flex", alignItems: "center", justifyContent: "center" }
    : {}

  return (
    <Box
      ref={ref}
      boxSize={size}
      __css={{
        ...centerStyles,
        flexShrink: 0,
        flexGrow: 0,
      }}
      {...rest}
    />
  )
})

if (__DEV__) {
  Square.displayName = "Square"
}

export const Circle = forwardRef<SquareProps>(function Circle(props, ref) {
  const { size, ...rest } = props
  return <Square size={size as any} ref={ref} borderRadius="9999px" {...rest} />
})

if (__DEV__) {
  Circle.displayName = "Circle"
}
