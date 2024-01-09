import { HTMLChakraProps, ChakraComponent, chakra } from "../system"

export interface StackDividerProps extends HTMLChakraProps<"div"> {}

export const StackDivider: ChakraComponent<"div"> = (props) => (
  <chakra.div
    className="chakra-stack__divider"
    {...props}
    __css={{
      ...props["__css"],
      borderWidth: 0,
      alignSelf: "stretch",
      borderColor: "inherit",
      width: "auto",
      height: "auto",
    }}
  />
)

StackDivider.displayName = "StackDivider"
