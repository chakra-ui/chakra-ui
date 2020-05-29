import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import React from "react"

export type BoxProps = PropsOf<typeof Box>

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://chakra-ui.com/box
 */
export const Box = chakra.div

if (__DEV__) {
  Box.displayName = "Box"
}

/**
 * As a constraint, you can't pass size related props
 * Only `size` would be allowed
 */
type SizeProps = "size" | "boxSize" | "width" | "height" | "w" | "h"

export type SquareProps = Omit<BoxProps, SizeProps> & {
  /**
   * The size (width and height) of the square
   */
  size?: BoxProps["width"]
  /**
   * If `true`, the content will be centered in the square
   */
  centerContent?: boolean
}

export const Square = React.forwardRef(
  (props: SquareProps, ref: React.Ref<any>) => {
    const { size, centerContent = true, ...rest } = props
    const centerProps: BoxProps = centerContent
      ? { display: "flex", alignItems: "center", justifyContent: "center" }
      : {}
    return (
      <Box
        flexShrink={0}
        flexGrow={0}
        boxSize={size}
        ref={ref}
        {...centerProps}
        {...rest}
      />
    )
  },
)

if (__DEV__) {
  Square.displayName = "Square"
}

export const Circle = React.forwardRef(
  (props: SquareProps, ref: React.Ref<any>) => {
    return <Square ref={ref} borderRadius="9999px" {...props} />
  },
)

if (__DEV__) {
  Circle.displayName = "Circle"
}
