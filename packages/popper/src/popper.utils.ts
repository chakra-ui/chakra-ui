import type { CSSProperties } from "react"
import { Placement } from "@popperjs/core"

export function getBoxShadow(placement: Placement, color?: string) {
  if (!color) return undefined

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

interface GetArrowStyleOptions {
  arrowSize: number
  popperArrowStyles?: CSSProperties
  placement: Placement
}

export const getArrowStyles = (options: GetArrowStyleOptions) => {
  const { arrowSize, popperArrowStyles = {}, placement } = options

  const styles: CSSProperties = {
    ...popperArrowStyles,
    width: arrowSize,
    height: arrowSize,
    zIndex: -1,
  }

  const offsetAdjust = -(arrowSize / 2)

  if (placement.startsWith("top")) styles.bottom = offsetAdjust
  if (placement.startsWith("bottom")) styles.top = offsetAdjust
  if (placement.startsWith("left")) styles.right = offsetAdjust
  if (placement.startsWith("right")) styles.left = offsetAdjust

  return styles
}
