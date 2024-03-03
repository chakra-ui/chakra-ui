import { defineStyle, forwardRef } from "../../styled-system"
import { Box, BoxProps } from "./box"

/**
 * As a constraint, you can't pass size related props
 * Only `size` would be allowed
 */
type Omitted = "size" | "boxSize" | "width" | "height" | "w" | "h"

export interface SquareProps extends Omit<BoxProps, Omitted> {
  /**
   * The size (width and height) of the square
   */
  size?: BoxProps["width"]
  /**
   * If `true`, the content will be centered in the square
   *
   * @default false
   */
  centerContent?: boolean
}

export const Square = forwardRef<SquareProps, "div">(
  function Square(props, ref) {
    const { size, centerContent = true, ...rest } = props

    const styles = centerContent
      ? defineStyle({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })
      : {}

    return (
      <Box
        ref={ref}
        boxSize={size}
        css={{
          ...styles,
          flexShrink: 0,
          flexGrow: 0,
        }}
        {...rest}
      />
    )
  },
)

Square.displayName = "Square"
