import { ToastPosition, ToastOptions, ToastState, ToastId } from "./toast.types"
import { objectKeys } from "@chakra-ui/utils"

/**
 * Given an array of toasts for a specific position.
 * It returns the toast that matches the `id` passed
 */
export function findById(arr: ToastOptions[], id: ToastId) {
  return arr.find((toast) => toast.id === id)
}

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
export function getToastPosition(toasts: ToastState, id: ToastId) {
  let position: ToastPosition | undefined

  objectKeys(toasts).forEach((pos) => {
    const found = findById(toasts[pos], id)
    if (found) position = pos
  })

  return position
}

/**
 * Given the toast manager state, checks if a specific toast is
 * still in the state, which means it's still visible on screen.
 */
export function isVisible(toasts: ToastState, id: ToastId) {
  let found: any

  Object.values(toasts).forEach((toasts) => {
    found = toasts.find((toast) => toast.id === id)
  })

  return !!found
}

/**
 * Get's the styles to be applied to a toast's container
 * based on it's position in the manager
 */
export function getToastStyle(position: ToastPosition) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  if (position.includes("right")) {
    style.alignItems = "flex-end"
  } else if (position.includes("left")) {
    style.alignItems = "flex-start"
  }

  return style
}
