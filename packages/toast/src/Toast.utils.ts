import { ToastPosition, ToastOptions, ToastState, ToastId } from "./Toast.types"
import { objectKeys } from "@chakra-ui/utils"

export function findById(arr: ToastOptions[], id: ToastId) {
  return arr.find(toast => toast.id === id)
}

export function findToast(toasts: ToastState, id: ToastId) {
  const position = getToastPosition(toasts, id)

  const index = position
    ? toasts[position].findIndex(toast => toast.id == id)
    : -1

  return {
    position,
    index,
  }
}

export function getToastPosition(toasts: ToastState, id: ToastId) {
  let position: ToastPosition | undefined

  objectKeys(toasts).forEach(pos => {
    const found = findById(toasts[pos], id)
    if (found) position = pos
  })

  return position
}

export function isVisible(toasts: ToastState, id: string) {
  let found: any

  Object.values(toasts).forEach(toasts => {
    found = toasts.find(toast => toast.id === id)
  })

  return !!found
}
