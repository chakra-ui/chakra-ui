"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface StackSeparatorProps extends HTMLChakraProps<"div"> {}

export const StackSeparator = chakra("div", {
  base: {
    borderWidth: 0,
    alignSelf: "stretch",
    borderColor: "inherit",
    width: "auto",
    height: "auto",
  },
})

StackSeparator.displayName = "StackSeparator"
