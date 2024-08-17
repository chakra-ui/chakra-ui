import { Circle, CircleProps } from "@chakra-ui/react"

export function Blob(props: CircleProps) {
  return (
    <Circle
      size="452px"
      pos="absolute"
      opacity="0.1"
      filter="blur(250px)"
      bg="teal.500"
      mdDown={{ display: "none" }}
      {...props}
    />
  )
}
