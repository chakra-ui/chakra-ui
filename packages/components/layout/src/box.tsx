import {
  chakra,
  forwardRef,
  SystemStyleObject,
  HTMLChakraProps,
} from "@chakra-ui/system"

export interface BoxProps extends HTMLChakraProps<"div"> {}

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://chakra-ui.com/box
 */
export const Box = chakra("div")

Box.displayName = "Box"

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
   */
  centerContent?: boolean
}

export const Square = forwardRef<SquareProps, "div">(function Square(
  props,
  ref,
) {
  const { size, centerContent = true, ...rest } = props

  const styles: SystemStyleObject = centerContent
    ? { display: "flex", alignItems: "center", justifyContent: "center" }
    : {}

  return (
    <Box
      ref={ref}
      boxSize={size}
      __css={{
        ...styles,
        flexShrink: 0,
        flexGrow: 0,
      }}
      {...rest}
    />
  )
})

Square.displayName = "Square"

export const Circle = forwardRef<SquareProps, "div">(function Circle(
  props,
  ref,
) {
  const { size, ...rest } = props
  return <Square size={size} ref={ref} borderRadius="9999px" {...rest} />
})

Circle.displayName = "Circle"
