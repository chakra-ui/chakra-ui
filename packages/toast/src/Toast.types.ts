export type ToastPosition =
  | "top"
  | "top-right"
  | "top-left"
  | "bottom"
  | "bottom-right"
  | "bottom-left"

export interface RenderProps {
  id: ToastId
  onClose(): void
}

export type ToastMessage = (props: RenderProps) => React.ReactNode

export type ToastId = string | number

export interface ToastOptions {
  message: ToastMessage
  id: ToastId
  duration: number | null
  type: Status
  onRequestRemove(): void
  showing: boolean
  position: ToastPosition
}

export type ToastState = { [K in ToastPosition]: ToastOptions[] }

export type Status = "default" | "success" | "error" | "warning"

export type UpdateFn = (val: ToastState) => void
