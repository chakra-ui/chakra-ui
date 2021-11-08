import { ToastPosition } from "./toast.placement"

export interface RenderProps {
  /**
   * The auto-generated or passed `id` of the toast
   */
  id: ToastId
  /**
   * Function to close the toast
   */
  onClose(): void
}

export type ToastMessage = (props: RenderProps) => React.ReactNode

export type ToastId = string | number

export interface ToastOptions {
  /**
   * The element or component type to render.
   * The component will be passed `id` and `onClose`
   */
  message: ToastMessage
  /**
   * The toast's id
   */
  id: ToastId
  /**
   * The duration of the toast
   */
  duration: number | null
  /**
   * The status of the toast's alert component.
   */
  status: Status
  /**
   * Function that removes the toast from manager's state.
   */
  onRequestRemove(): void
  /**
   * Whether a toast is currently in view or not
   */
  showing: boolean
  /**
   * The position of the toast
   */
  position: ToastPosition
  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?(): void
  /**
   * Internally used to queue closing a toast. Should probably not be used by
   * anyone else, but documented regardless.
   */
  requestClose?: boolean
}

export type ToastState = {
  [K in ToastPosition]: ToastOptions[]
}

export type Status = "default" | "success" | "error" | "warning" | "info"

export type UpdateFn = (state: ToastState) => void

export type CloseAllToastsOptions = {
  positions?: ToastPosition[]
}
