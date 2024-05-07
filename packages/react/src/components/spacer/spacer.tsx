"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface SpacerProps extends HTMLChakraProps<"div"> {}

/**
 * A flexible flex spacer that expands along the major axis of its containing flex layout.
 * It renders a `div` by default, and takes up any available space.
 *
 * @see Docs https://chakra-ui.com/flex#using-the-spacer
 */
export const Spacer = chakra("div", {
  base: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch",
  },
})

Spacer.displayName = "Spacer"
