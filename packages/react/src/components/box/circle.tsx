import { forwardRef } from "../../styled-system"
import { Square, SquareProps } from "./square"

export interface CircleProps extends SquareProps {}

export const Circle = forwardRef<SquareProps, "div">(
  function Circle(props, ref) {
    const { size, ...rest } = props
    return <Square size={size} ref={ref} borderRadius="9999px" {...rest} />
  },
)

Circle.displayName = "Circle"
