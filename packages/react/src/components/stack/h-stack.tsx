import { forwardRef } from "../../styled-system"
import { Stack, StackProps } from "./stack"

/**
 * A view that arranges its children in a horizontal line.
 *
 * @see Docs https://chakra-ui.com/docs/components/stack
 */
export const HStack = forwardRef<StackProps, "div">(
  function HStack(props, ref) {
    return <Stack align="center" {...props} direction="row" ref={ref} />
  },
)

HStack.displayName = "HStack"
