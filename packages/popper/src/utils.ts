import { Placement } from "@popperjs/core"

const toVar = (value: string, fallback?: string) => ({
  var: value,
  varRef: fallback ? `var(${value}, ${fallback})` : `var(${value})`,
})

export const cssVars = {
  arrowShadowColor: toVar("--popper-arrow-shadow-color"),
  arrowSize: toVar("--popper-arrow-size", "8px"),
  arrowSizeHalf: toVar("--popper-arrow-size-half"),
  arrowBg: toVar("--popper-arrow-bg"),
  transformOrigin: toVar("--popper-transform-origin"),
  arrowOffset: toVar("--popper-arrow-offset"),
} as const

export function getBoxShadow(placement: Placement) {
  if (placement.includes("top"))
    return `1px 1px 1px 0 var(--popper-arrow-shadow-color)`
  if (placement.includes("bottom"))
    return `-1px -1px 1px 0 var(--popper-arrow-shadow-color)`
  if (placement.includes("right"))
    return `-1px 1px 1px 0 var(--popper-arrow-shadow-color)`
  if (placement.includes("left"))
    return `1px -1px 1px 0 var(--popper-arrow-shadow-color)`
}

const transforms = {
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

export const toTransformOrigin = (placement: Placement) => transforms[placement]

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
    eventListeners = {
      enabled: value,
      options: defaultEventListeners,
    }
  }
  return eventListeners
}
