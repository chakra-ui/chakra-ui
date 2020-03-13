export type ToastPosition =
  | "top"
  | "top-right"
  | "top-left"
  | "bottom"
  | "bottom-right"
  | "bottom-left"

export interface Callback {
  id: string
  onClose(): void
}

export type ToastMessage =
  | React.ReactNode
  | ((callback: Callback) => React.ReactNode)
  | string

export interface ToastOptions {
  message: ToastMessage
  id: string
  duration: number | null
  type: ToastType
  onRequestRemove(): void
  onRequestClose(): void
  showing: boolean
  position: ToastPosition
}

export type ToastType = "default" | "success" | "error" | "warning"
