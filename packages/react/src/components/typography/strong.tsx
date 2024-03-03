import { HTMLChakraProps, chakra } from "../../styled-system"

export interface StrongProps extends HTMLChakraProps<"em"> {}

export const Strong = chakra("strong", {
  base: { fontWeight: "bold" },
})
