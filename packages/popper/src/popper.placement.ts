import type { Placement } from "@popperjs/core"

const opposites: Partial<Record<Placement, Placement>> = {
  "auto-start": "auto-end",
  "auto-end": "auto-start",
  "top-start": "top-end",
  "top-end": "top-start",
  "bottom-start": "bottom-end",
  "bottom-end": "bottom-start",
  "right-start": "left-start",
  "right-end": "left-end",
  "left-start": "right-start",
  "left-end": "right-end",
  left: "right",
  right: "left",
}

export function getPopperPlacement(
  placement: Placement,
  dir?: "ltr" | "rtl",
): Placement {
  if (dir === "ltr") return placement
  return opposites[placement] ?? placement
}
