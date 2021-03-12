import { isNumber } from "@chakra-ui/utils"
import { Placement } from "@popperjs/core"
import type { CSSProperties } from "react"

const placements = {
  top: `2px 2px 2px 0 var(--popper-arrow-color)`,
  bottom: `-1px -1px 1px 0 var(--popper-arrow-color)`,
  right: `-1px 1px 1px 0 var(--popper-arrow-color)`,
  left: `1px -1px 1px 0 var(--popper-arrow-color)`,
}

export const getBoxShadow = (placement: Placement) => placements[placement]

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

  const styles: CSSProperties & Record<string, any> = {
    ...popperArrowStyles,
    "--popper-arrow-size": isNumber(arrowSize) ? `${arrowSize}px` : arrowSize,
    "--popper-arrow-size-half": "calc(var(--popper-arrow-size) / 2)",
    "--popper-arrow-offset": `calc(var(--popper-arrow-size-half) * -1)`,
    width: "var(--popper-arrow-size)",
    height: "var(--popper-arrow-size)",
    zIndex: -1,
  }

  if (placement.startsWith("top")) styles.bottom = "var(--popper-arrow-offset)"
  if (placement.startsWith("bottom")) styles.top = "var(--popper-arrow-offset)"
  if (placement.startsWith("left")) styles.right = "var(--popper-arrow-offset)"
  if (placement.startsWith("right")) styles.left = "var(--popper-arrow-offset)"

  return styles
}
