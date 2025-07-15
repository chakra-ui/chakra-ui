"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface QuoteProps extends HTMLChakraProps<"q"> {}

export const Quote = chakra("q", {
  base: {
    fontWeight: "bold",
    lineHeight: "1.2",
  },
})
