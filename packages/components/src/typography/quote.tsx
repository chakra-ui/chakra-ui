import { HTMLChakraProps, chakra } from "../system"

export interface QuoteProps extends HTMLChakraProps<"q"> {}

export const Quote = chakra("q", {
  baseStyle: {
    fontWeight: "bold",
    lineHeight: "1.2",
  },
})
