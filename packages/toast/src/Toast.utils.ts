import { ToastPosition, ToastOptions, ToastState } from "./Toast.types"
import { objectKeys } from "@chakra-ui/utils"

export function findById(arr: ToastOptions[], id: string) {
  return arr.find(toast => toast.id === id)
}

export function findToast(toasts: ToastState, id: string) {
  const position = getToastPosition(toasts, id)

  const index = position
    ? toasts[position].findIndex(toast => toast.id == id)
    : -1

  return {
    position,
    index,
  }
}

export function getToastPosition(toasts: ToastState, id: string) {
  let position: ToastPosition | undefined

  objectKeys(toasts).forEach(pos => {
    const found = findById(toasts[pos], id)
    if (found) position = pos
  })

  return position
}

export function addToast(toasts: ToastState, toast: ToastOptions) {
  const { position } = toast
  /**
   * - If the toast is positioned at the top edges, the
   * recent toast stacks on top of the other toasts.
   *
   * - If the toast is positioned at the bottom edges, the recent
   * toast stacks below the other toasts.
   */
  const isTop = position.includes("top")

  return {
    ...toasts,
    [position]: isTop
      ? [toast, ...toasts[position]]
      : [...toasts[position], toast],
  }
}

export function isVisible(toasts: ToastState, id: string) {
  let found: any

  Object.values(toasts).forEach(toasts => {
    found = toasts.find(toast => toast.id === id)
  })

  return !!found
}
