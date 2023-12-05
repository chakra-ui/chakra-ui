import type { ToastPosition } from "./toast.placement"
import type { ToastId, ToastOptions, ToastState } from "./toast.types"

/**
 * Given an array of toasts for a specific position.
 * It returns the toast that matches the `id` passed
 */
export const findById = (arr: ToastOptions[], id: ToastId) =>
  arr.find((toast) => toast.id === id)

/**
 * Given the toast manager state, finds the toast that matches
 * the id and return its position and index
 */
export function findToast(toasts: ToastState, id: ToastId) {
  const position = getToastPosition(toasts, id)

  const index = position
    ? toasts[position].findIndex((toast) => toast.id === id)
    : -1

  return {
    position,
    index,
  }
}

/**
 * Given the toast manager state, finds the position of the toast that
 * matches the `id`
 */
export function getToastPosition(toasts: ToastState, id: ToastId) {
  for (const [position, values] of Object.entries(toasts)) {
    if (findById(values, id)) {
      return position as ToastPosition
    }
  }
}

/**
 * Given the toast manager state, checks if a specific toast is
 * still in the state, which means it is still visible on screen.
 */
export const isVisible = (toasts: ToastState, id: ToastId) =>
  !!getToastPosition(toasts, id)

/**
 * Gets the styles to be applied to a toast's container
 * based on its position in the manager
 */
export function getToastStyle(position: ToastPosition): React.CSSProperties {
  const isRighty = position.includes("right")
  const isLefty = position.includes("left")

  let alignItems = "center"
  if (isRighty) alignItems = "flex-end"
  if (isLefty) alignItems = "flex-start"

  return {
    display: "flex",
    flexDirection: "column",
    alignItems,
  }
}

/**
 * Compute the style of a toast based on its position
 */
export function getToastListStyle(
  position: ToastPosition,
): React.CSSProperties {
  const isTopOrBottom = position === "top" || position === "bottom"
  const margin = isTopOrBottom ? "0 auto" : undefined

  const top = position.includes("top")
    ? "env(safe-area-inset-top, 0px)"
    : undefined
  const bottom = position.includes("bottom")
    ? "env(safe-area-inset-bottom, 0px)"
    : undefined
  const right = !position.includes("left")
    ? "env(safe-area-inset-right, 0px)"
    : undefined
  const left = !position.includes("right")
    ? "env(safe-area-inset-left, 0px)"
    : undefined

  return {
    position: "fixed",
    zIndex: "var(--toast-z-index, 5500)",
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    margin,
    top,
    bottom,
    right,
    left,
  }
}
