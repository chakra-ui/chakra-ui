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

export function getBorder(placement: Placement) {
  const borderDefinition = `1px solid ${cssVars.arrowShadowColor.varRef}`
  const transparentBorderDefinition = `1px solid transparent`

  if (placement.includes("top")) {
    return {
      borderBottom: borderDefinition,
      borderRight: borderDefinition,
      borderLeft: transparentBorderDefinition,
      borderTop: transparentBorderDefinition,
    }
  } else if (placement.includes("bottom")) {
    return {
      borderTop: borderDefinition,
      borderLeft: borderDefinition,
      borderRight: transparentBorderDefinition,
      borderBottom: transparentBorderDefinition,
    }
  } else if (placement.includes("right")) {
    return {
      borderBottom: borderDefinition,
      borderLeft: borderDefinition,
      borderTop: transparentBorderDefinition,
      borderRight: transparentBorderDefinition,
    }
  } else if (placement.includes("left")) {
    return {
      borderTop: borderDefinition,
      borderRight: borderDefinition,
      borderBottom: transparentBorderDefinition,
      borderLeft: transparentBorderDefinition,
    }
  }
}

const transforms: Record<string, string> = {
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
