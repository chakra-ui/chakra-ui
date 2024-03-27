import { HTMLChakraProps, chakra } from "../system"

export interface StrongProps extends HTMLChakraProps<"em"> {}

export const Strong = chakra("strong", {
  baseStyle: {
    fontWeight: "bold",
  },
})
