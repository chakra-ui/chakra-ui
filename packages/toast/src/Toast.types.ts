export type ToastPosition =
  | "top"
  | "top-right"
  | "top-left"
  | "bottom"
  | "bottom-right"
  | "bottom-left"

export interface RenderProps {
  id: string
  onClose(): void
}

export type ToastMessage = (props: RenderProps) => React.ReactNode

export interface ToastOptions {
  message: ToastMessage
  id: string
  duration: number | null
  type: ToastType
  onRequestRemove(): void
  showing: boolean
  position: ToastPosition
}

export type ToastType = "default" | "success" | "error" | "warning"
