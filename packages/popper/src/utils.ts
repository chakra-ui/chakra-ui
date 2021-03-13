import { isNumber } from "@chakra-ui/utils"
import { Placement } from "@popperjs/core"
import type { CSSProperties } from "react"

export function getBoxShadow(placement: Placement) {
  if (placement.includes("top")) {
    return `1px 1px 1px 0 var(--popper-arrow-shadow-color)`
  }

  if (placement.includes("bottom")) {
    return `-1px -1px 1px 0 var(--popper-arrow-shadow-color)`
  }

  if (placement.includes("right")) {
    return `-1px 1px 1px 0 var(--popper-arrow-shadow-color)`
  }

  if (placement.includes("left")) {
    return `1px -1px 1px 0 var(--popper-arrow-shadow-color)`
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

const defaultEventListeners = {
  scroll: true,
  resize: true,
}

export function getEventListenerOptions(
  value?: boolean | Partial<typeof defaultEventListeners>,
) {
  let eventListeners: {
    enabled?: boolean
    options?: typeof defaultEventListeners
  }
  if (typeof value === "object") {
    eventListeners = {
      enabled: true,
      options: { ...defaultEventListeners, ...value },
    }
  } else {
    eventListeners = { enabled: value, options: defaultEventListeners }
  }
  return eventListeners
}
