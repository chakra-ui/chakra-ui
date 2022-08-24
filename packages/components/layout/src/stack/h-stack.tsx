import { forwardRef } from "@chakra-ui/system"

import { Stack, StackProps } from "./stack"

/**
 * A view that arranges its children in a horizontal line.
 */
export const HStack = forwardRef<StackProps, "div">((props, ref) => (
  <Stack align="center" {...props} direction="row" ref={ref} />
))

HStack.displayName = "HStack"
