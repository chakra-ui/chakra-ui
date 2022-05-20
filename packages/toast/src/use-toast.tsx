import type { AlertStatus } from "@chakra-ui/alert"
import { ThemingProps, useChakra } from "@chakra-ui/system"
import * as React from "react"
import { MaybeFunction, runIfFn } from "@chakra-ui/utils"
import { getToastPlacement, ToastPosition } from "./toast.placement"
import type { RenderProps, ToastId, ToastOptions } from "./toast.types"
import { createRenderToast } from "./toast"
import { toastStore } from "./toast.store"

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
   * A custom icon that will be displayed by the toast.
   */
  icon?: React.ReactNode
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

type UseToastPromiseOption = Omit<UseToastOptions, "status">

/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */
export function useToast(defaultOptions?: UseToastOptions) {
  const { theme } = useChakra()

  return React.useMemo(() => {
    const normalizeToastOptions = (options?: UseToastOptions) => ({
      ...defaultOptions,
      ...options,
      position: getToastPlacement(
        options?.position ?? defaultOptions?.position,
        theme.direction,
      ),
    })

    const toast = (options?: UseToastOptions) => {
      const normalizedToastOptions = normalizeToastOptions(options)
      const Message = createRenderToast(normalizedToastOptions)
      return toastStore.notify(Message, normalizedToastOptions)
    }

    toast.update = (id: ToastId, options: Omit<UseToastOptions, "id">) => {
      toastStore.update(id, normalizeToastOptions(options))
    }

    toast.promise = <Result extends any, Err extends Error = Error>(
      promise: Promise<Result>,
      options: {
        success: MaybeFunction<UseToastPromiseOption, [Result]>
        error: MaybeFunction<UseToastPromiseOption, [Err]>
        loading: UseToastPromiseOption
      },
    ) => {
      const id = toast({
        ...options.loading,
        status: "loading",
        duration: null,
      })

      promise
        .then((data) =>
          toast.update(id, {
            status: "success",
            duration: 5_000,
            ...runIfFn(options.success, data),
          }),
        )
        .catch((error) =>
          toast.update(id, {
            status: "error",
            duration: 5_000,
            ...runIfFn(options.error, error),
          }),
        )
    }

    toast.closeAll = toastStore.closeAll
    toast.close = toastStore.close
    toast.isActive = toastStore.isActive

    return toast
  }, [defaultOptions, theme.direction])
}

export default useToast
