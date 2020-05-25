import React from "react"
import { chakra, PropsOf, pseudoPropNames } from "@chakra-ui/system"
import { __DEV__, split } from "@chakra-ui/utils"

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
