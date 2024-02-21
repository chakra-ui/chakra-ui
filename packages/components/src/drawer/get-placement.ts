import { DrawerPlacement, LogicalPlacementMap } from "./drawer-context"

const placementMap: LogicalPlacementMap = {
  start: { ltr: "left", rtl: "right" },
  end: { ltr: "right", rtl: "left" },
}

export function getDrawerPlacement(
  placement: DrawerPlacement | undefined,
  dir: "ltr" | "rtl",
) {
  if (!placement) {
    return
  }

  if (placement === "start" || placement === "end") {
    return placementMap[placement]?.[dir]
  }

  return placement
}
