"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system/index.ts"

export interface StrongProps extends HTMLChakraProps<"strong"> {}

export const Strong = chakra("strong", {
  base: { fontWeight: "semibold" },
})

Strong.displayName = "Strong"
