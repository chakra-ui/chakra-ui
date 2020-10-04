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
