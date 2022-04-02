import type { AlertStatus } from "@chakra-ui/alert"
import { ThemingProps, useChakra } from "@chakra-ui/system"
import * as React from "react"
import { getToastPlacement, ToastPosition } from "./toast.placement"
import type { RenderProps, ToastId, ToastOptions } from "./toast.types"
import { useToastManager } from "./toast-provider"
import { createRenderToast } from "./toast"

export interface UseToastOptions extends ThemingProps<"Alert"> {
  /**
   * The placement of the toast
   *
   * @default "bottom"
   */
  position?: ToastPosition
  /**
   * The delay before the toast hides (in milliseconds)
   * If set to `null`, toast will never dismiss.
   *
   * @default 5000 ( = 5000ms )
   */
  duration?: ToastOptions["duration"]

  /**
   * Render a component toast component.
   * Any component passed will receive 2 props: `id` and `onClose`.
   */
  render?(props: RenderProps): React.ReactNode

  /**
   * The title of the toast
   */
  title?: React.ReactNode
  /**
   * The description of the toast
   */
  description?: React.ReactNode
  /**
   * If `true`, toast will show a close button
   */
  isClosable?: boolean
  /**
   * The status of the toast.
   */
  status?: AlertStatus
  /**
   * The `id` of the toast.
   *
   * Mostly used when you need to prevent duplicate.
   * By default, we generate a unique `id` for each toast
   */
  id?: ToastId
  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?: () => void
  /**
   * Optional style overrides for the container wrapping the toast component.
   */
  containerStyle?: React.CSSProperties
}

/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */
export function useToast(defaultOptions?: UseToastOptions) {
  const { theme } = useChakra()
  const toastContext = useToastManager()

  const normalizeToastOptions = (options?: UseToastOptions) => ({
    ...defaultOptions,
    ...options,
    position: getToastPlacement(options?.position, theme.direction),
  })

  const toast = (options?: UseToastOptions) => {
    const normalizedToastOptions = normalizeToastOptions(options)
    const Message = createRenderToast(normalizedToastOptions)
    return toastContext.notify(Message, normalizedToastOptions)
  }

  toast.close = toastContext.close
  toast.closeAll = toastContext.closeAll

  /**
   * Toasts can only be updated if they have a valid id
   */
  toast.update = (id: ToastId, options: Omit<UseToastOptions, "id">) => {
    if (!id) return

    const normalizedToastOptions = normalizeToastOptions(options)
    const Message = createRenderToast(normalizedToastOptions)

    toastContext.update(id, {
      ...normalizedToastOptions,
      message: Message,
    })
  }

  toast.isActive = toastContext.isActive

  return toast
}

export default useToast
