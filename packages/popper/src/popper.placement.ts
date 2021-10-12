import type { Placement } from "@popperjs/core"

type Logical =
  | "start-start"
  | "start-end"
  | "end-start"
  | "end-end"
  | "start"
  | "end"

type PlacementWithLogical = Placement | Logical

export type { Placement, PlacementWithLogical }

const logicals: Record<Logical, { ltr: Placement; rtl: Placement }> = {
  "start-start": { ltr: "left-start", rtl: "right-start" },
  "start-end": { ltr: "left-end", rtl: "right-end" },
  "end-start": { ltr: "right-start", rtl: "left-start" },
  "end-end": { ltr: "right-end", rtl: "left-end" },
  start: { ltr: "left", rtl: "right" },
  end: { ltr: "right", rtl: "left" },
}

const opposites: Partial<Record<Placement, Placement>> = {
  "auto-start": "auto-end",
  "auto-end": "auto-start",
  "top-start": "top-end",
  "top-end": "top-start",
  "bottom-start": "bottom-end",
  "bottom-end": "bottom-start",
}

export function getPopperPlacement(
  placement: PlacementWithLogical,
  dir: "ltr" | "rtl" = "ltr",
): Placement {
  const value = (logicals[placement]?.[dir] || placement) as Placement
  if (dir === "ltr") return value
  return opposites[placement] ?? value
}
