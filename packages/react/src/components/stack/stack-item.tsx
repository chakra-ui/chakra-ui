"use client"

import { HTMLChakraProps, chakra } from "../../styled-system"

export interface StackItemProps extends HTMLChakraProps<"div"> {}

export const StackItem = chakra("div", {
  base: {
    display: "inline-block",
    flex: "0 0 auto",
    minWidth: 0,
  },
})

StackItem.displayName = "StackItem"
