import type { CSSProperties } from "react"
import { Placement } from "@popperjs/core"

export function getBoxShadow(placement: Placement, color: string) {
  if (placement.includes("top")) {
    return `2px 2px 2px 0 ${color}`
  }

  if (placement.includes("bottom")) {
    return `-1px -1px 1px 0 ${color}`
  }

  if (placement.includes("right")) {
    return `-1px 1px 1px 0 ${color}`
  }

  if (placement.includes("left")) {
    return `1px -1px 1px 0 ${color}`
  }
}

const transformEnum = {
  top: "bottom center",
  "top-start": "bottom left",
  "top-end": "bottom right",

  bottom: "top center",
  "bottom-start": "top left",
  "bottom-end": "top right",

  left: "right center",
  "left-start": "right top",
  "left-end": "right bottom",

  right: "left center",
  "right-start": "left top",
  "right-end": "left bottom",
}

export const toTransformOrigin = (placement: Placement) =>
  transformEnum[placement]

interface ArrowStyleArguments {
  arrowSize: number
  popperArrowStyles: CSSProperties
  placement: Placement
}

export const getArrowStyles = ({
  arrowSize,
  popperArrowStyles = {},
  placement,
}: ArrowStyleArguments): CSSProperties => {
  const offsetAdjust = -(arrowSize / 2)

  const bottom = placement.startsWith("top") ? offsetAdjust : undefined
  const top = placement.startsWith("bottom") ? offsetAdjust : undefined
  const left = placement.startsWith("right") ? offsetAdjust : undefined
  const right = placement.startsWith("left") ? offsetAdjust : undefined

  return {
    ...popperArrowStyles,
    zIndex: -1,
    width: arrowSize,
    height: arrowSize,
    // necessary for the correct angle of the arrow
    transform: [popperArrowStyles.transform, "rotate(45deg)"]
      .filter(Boolean)
      .join(" "),
    bottom,
    top,
    left,
    right,
  }
}
