import { ChakraComponent, chakra } from "../system"

export const StackItem: ChakraComponent<"div"> = (props) => (
  <chakra.div
    className="chakra-stack__item"
    {...props}
    __css={{
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0,
      ...props["__css"],
    }}
  />
)

StackItem.displayName = "StackItem"
