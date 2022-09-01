import { HTMLChakraProps, chakra } from "@chakra-ui/system"

interface CircleProps extends HTMLChakraProps<"circle"> {}

export const Circle = (props: CircleProps) => (
  <chakra.circle cx={50} cy={50} r={42} fill="transparent" {...props} />
)

Circle.displayName = "Circle"
