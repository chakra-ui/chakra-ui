import { Placement } from "@chakra-ui/popper"
import { ThemeDirection } from "@chakra-ui/theme"

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

/**
 * swaps 'left' with 'right (& vice-verse) when dir is 'rtl'
 */
export function getPlacementForThemeDirection(
  dir: ThemeDirection,
  placement?: string,
) {
  if (!placement || dir === "ltr") {
    return placement
  }
  // only flip for RTL
  return placement.replace(/left|right/g, (m) => {
    return m === "left" ? "right" : "left"
  })
}
