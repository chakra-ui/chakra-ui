import { ToastPosition, ToastOptions, ToastState, ToastId } from "./toast.types"

/**
 * Given an array of toasts for a specific position.
 * It returns the toast that matches the `id` passed
 */
export const findById = (arr: ToastOptions[], id: ToastId) =>
  arr.find((toast) => toast.id === id)

/**
 * Given the toast manager state, finds the toast that matches
 * the id and return it's position and index
 */
export function findToast(toasts: ToastState, id: ToastId) {
  const position = getToastPosition(toasts, id)

  const index = position
    ? toasts[position].findIndex((toast) => toast.id == id)
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
export const getToastPosition = (toasts: ToastState, id: ToastId) =>
  Object.values(toasts)
    .flat()
    .find((toast) => toast.id === id)?.position

/**
 * Given the toast manager state, checks if a specific toast is
 * still in the state, which means it's still visible on screen.
 */
export const isVisible = (toasts: ToastState, id: ToastId) =>
  !!getToastPosition(toasts, id)

/**
 * Get's the styles to be applied to a toast's container
 * based on it's position in the manager
 */
export function getToastStyle(position: ToastPosition): React.CSSProperties {
  const isRighty = position.includes("right")
  const isLefty = position.includes("left")

  return {
    display: "flex",
    flexDirection: "column",
    alignItems: isRighty ? "flex-end" : isLefty ? "flex-start" : "center",
  }
}
