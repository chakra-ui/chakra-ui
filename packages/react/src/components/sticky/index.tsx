"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system/index.ts"

export interface StickyProps extends HTMLChakraProps<"div"> {}

export const Sticky = chakra("div", {
  base: {
    position: "sticky",
    top: 0,
  },
})

Sticky.displayName = "Sticky"
