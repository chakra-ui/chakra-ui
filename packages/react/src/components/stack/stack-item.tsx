import { chakra } from "../../styled-system"

export const StackItem = chakra(
  "div",
  {
    base: {
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0,
    },
  },
  {
    defaultProps: {
      className: "chakra-stack__item",
    },
  },
)

StackItem.displayName = "StackItem"
