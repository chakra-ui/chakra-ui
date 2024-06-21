"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface AbsoluteProps extends HTMLChakraProps<"div"> {}

export const Absolute = chakra("div", {
  base: {
    position: "absolute",
  },
})

Absolute.displayName = "Abs"
