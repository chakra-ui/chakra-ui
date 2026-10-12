"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system/index.ts"

export interface EmProps extends HTMLChakraProps<"em"> {}

export const Em = chakra("em", {
  base: {
    fontStyle: "italic",
  },
})

Em.displayName = "Em"
