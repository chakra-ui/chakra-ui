import { HTMLChakraProps, chakra } from "../system"

export interface EmProps extends HTMLChakraProps<"em"> {}

export const Em = chakra("em", {
  baseStyle: {
    fontStyle: "italic",
  },
})
