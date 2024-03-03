import { HTMLChakraProps, chakra } from "../../styled-system"

export interface EmProps extends HTMLChakraProps<"em"> {}

export const Em = chakra("em", {
  baseStyle: {
    fontStyle: "italic",
  },
})
