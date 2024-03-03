import { HTMLChakraProps, chakra } from "../../styled-system"

export interface StackDividerProps extends HTMLChakraProps<"div"> {}

export const StackDivider = chakra(
  "div",
  {
    base: {
      borderWidth: 0,
      alignSelf: "stretch",
      borderColor: "inherit",
      width: "auto",
      height: "auto",
    },
  },
  {
    defaultProps: {
      className: "chakra-stack__divider",
    },
  },
)

StackDivider.displayName = "StackDivider"
