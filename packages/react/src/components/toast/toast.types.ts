export type ToastId = string | number

export interface ToastPrivateOptions {
  /**
   * @internal
   * Whether the toast should close
   */
  requestClose?: boolean
  /**
   * @internal
   * The position of the toast
   */
  placement: ToastPlacement
}

export interface ToastPublicOptions {
  /**
   * The title of the toast
   */
  title?: React.ReactNode
  /**
   * The description of the toast
   */
  description?: React.ReactNode
  /**
   * The toast's id
   */
  id?: ToastId
  /**
   * The duration of the toast
   */
  duration?: number | null
  /**
   * The status of the toast's alert component.
   */
  status?: ToastStatus
  /**
   * Function that removes the toast from manager's state.
   */
  onRequestRemove?(): void

  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?(): void
}

export interface ToastOptions extends ToastPrivateOptions, ToastPublicOptions {}

export type ToastState = {
  [K in ToastPlacement]: ToastOptions[]
}

export interface ToastMethods {
  /**
   * Function to actually create a toast and add it
   * to state at the specified position
   */
  create: (options: ToastOptions) => ToastId
  /**
   * Close all toasts at once.
   * If given positions, will only close those.
   */
  closeAll: (placements?: ToastPlacement[]) => void
  /**
   * Requests to close a toast based on its id and position
   */
  close: (id: ToastId) => void
  /**
   * Update a specific toast with new options based on the
   * passed `id`
   */
  update: (id: ToastId, options: Omit<ToastOptions, "id">) => void
  /**
   * Check if a toast is visible based on its id
   */
  isActive: (id: ToastId) => boolean
}

export type ToastStatus =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"

export type ToastUpdateFn = (state: ToastState) => void

export type ToastPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "top"
  | "bottom"

export type ToastPlacementMap<T> = Record<ToastPlacement, T>
