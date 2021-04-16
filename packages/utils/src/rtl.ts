import { Placement } from "@chakra-ui/popper"

export function flipDirection(placement: Placement): Placement {
  const LEFT_RIGHT_REGEX = /left|right|start|end/g

  return placement.replace(LEFT_RIGHT_REGEX, (m) => {
    switch (m) {
      case "left":
        return "right"
      case "right":
        return "left"
      case "start":
        return "end"
      case "end":
        return "start"
      default:
        return m
    }
  }) as Placement
}
