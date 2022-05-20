export type LogicalToastPosition =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"

export type ToastPositionWithLogical =
  | LogicalToastPosition
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"

export type ToastPosition = Exclude<
  ToastPositionWithLogical,
  LogicalToastPosition
>

type LogicalPlacementMap = Record<
  LogicalToastPosition,
  { ltr: ToastPosition; rtl: ToastPosition }
>

export function getToastPlacement(
  position: ToastPosition | undefined,
  dir: "ltr" | "rtl",
): ToastPosition | undefined {
  const computedPosition = position ?? "bottom"
  const logicals: LogicalPlacementMap = {
    "top-start": { ltr: "top-left", rtl: "top-right" },
    "top-end": { ltr: "top-right", rtl: "top-left" },
    "bottom-start": { ltr: "bottom-left", rtl: "bottom-right" },
    "bottom-end": { ltr: "bottom-right", rtl: "bottom-left" },
  }

  const logical = logicals[computedPosition as keyof typeof logicals]
  return logical?.[dir] ?? computedPosition
}
