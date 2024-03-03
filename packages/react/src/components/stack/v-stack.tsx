import { forwardRef } from "../../styled-system"
import { Stack, StackProps } from "./stack"

/**
 * A view that arranges its children in a vertical line.
 *
 * @see Docs https://chakra-ui.com/docs/components/stack
 */
export const VStack = forwardRef<StackProps, "div">(
  function VStack(props, ref) {
    return <Stack align="center" {...props} direction="column" ref={ref} />
  },
)
