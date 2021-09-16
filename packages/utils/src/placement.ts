export type SidePlacement = "top" | "left" | "bottom" | "right"

export type StartEndPlacement = "start" | "end"

export type CornerPlacement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export type SideAlignPlacement = `${SidePlacement}-${StartEndPlacement}`

export type AutoPlacement = "auto" | "auto-start" | "auto-end"

export type Placement =
  | StartEndPlacement
  | AutoPlacement
  | SidePlacement
  | SideAlignPlacement
  | CornerPlacement

export type LogicalPlacementOptions = {
  /**
   * The document directionality.
   */
  direction?: "ltr" | "rtl"
  /**
   * Whether to flip logical placement values (like `start` and `end`).
   * This is useful in libraries like `popper.js` where they don't
   * flip placements by default.
   */
  flipLogical?: boolean
  /**
   * Whether to preserve logical placement values (like start and end)
   * or convert them to their physical representation (like `left` and `right`).
   */
  preserveLogical?: boolean
}

function replace(v: string, rtl?: boolean) {
  if (v === "start") return rtl ? "right" : "left"
  if (v === "end") return rtl ? "left" : "right"
  return v
}

export function getPlacement<T extends Placement>(
  placement: T,
  options: LogicalPlacementOptions = {},
): T {
  const {
    direction: dir = "ltr",
    flipLogical = false,
    preserveLogical = true,
  } = options

  const rtl = dir === "rtl"
  let result = placement

  const opposites = {
    "auto-start": flipLogical ? "auto-end" : null,
    "auto-end": flipLogical ? "auto-start" : null,

    "top-left": "top-right",
    "top-start": flipLogical ? "top-end" : null,
    "top-right": "top-left",
    "top-end": flipLogical ? "top-start" : null,

    "bottom-left": "bottom-right",
    "bottom-start": flipLogical ? "bottom-end" : null,
    "bottom-right": "bottom-left",
    "bottom-end": flipLogical ? "bottom-start" : null,

    "right-start": "left-start",
    "right-end": "left-end",

    "left-start": "right-start",
    "left-end": "right-end",

    left: "right",
    right: "left",

    start: flipLogical ? "end" : null,
    end: flipLogical ? "start" : null,
  }

  if (rtl) {
    result = opposites[placement as any] ?? placement
  }

  // resolve the preserve logical option
  if (!preserveLogical) {
    result = placement.replace(/start|end/g, (value) =>
      replace(value, rtl),
    ) as T
  }

  return result
}
