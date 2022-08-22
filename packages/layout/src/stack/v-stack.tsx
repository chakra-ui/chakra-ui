import { forwardRef } from "@chakra-ui/system"

import { Stack, StackProps } from "./stack"

/**
 * A view that arranges its children in a vertical line.
 */
export const VStack = forwardRef<StackProps, "div">((props, ref) => (
  <Stack align="center" {...props} direction="column" ref={ref} />
))

VStack.displayName = "VStack"
