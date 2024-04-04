"use client"

import { HTMLChakraProps, chakra } from "../../styled-system"

export interface CenterProps extends HTMLChakraProps<"div"> {}

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/center
 */
export const Center = chakra("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})

Center.displayName = "Center"
