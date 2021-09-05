import { valueToPercent } from "@chakra-ui/utils"
import { CSSProperties } from "react"

export type Orientation = "vertical" | "horizontal"

export function orient(options: {
  orientation: Orientation
  vertical: CSSProperties
  horizontal: CSSProperties
}) {
  const { orientation, vertical, horizontal } = options
  return orientation === "vertical" ? vertical : horizontal
}

export function getTrackPercent(
  value: number,
  min: number,
  max: number,
  isReversed: boolean,
) {
  const reversedValue = max - value + min
  const trackValue = isReversed ? reversedValue : value
  const trackPercent = valueToPercent(trackValue, min, max)
  return trackPercent
}
