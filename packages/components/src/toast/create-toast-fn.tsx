import { runIfFn } from "@chakra-ui/utils"
import {
  MaybeFunction,
  UseToastPromiseOption,
  createRenderToast,
} from "./toast"
import { getToastPlacement } from "./toast.placement"
import { toastStore } from "./toast.store"
import type { ToastId } from "./toast.types"
import type { UseToastOptions } from "./use-toast"

export function createToastFn(
  dir: "ltr" | "rtl",
  defaultOptions?: UseToastOptions,
) {
  const normalizeToastOptions = (options?: UseToastOptions) => ({
    ...defaultOptions,
    ...options,
    position: getToastPlacement(
      options?.position ?? defaultOptions?.position,
      dir,
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
          duration: 5000,
          ...runIfFn(options.success, data),
        }),
      )
      .catch((error) =>
        toast.update(id, {
          status: "error",
          duration: 5000,
          ...runIfFn(options.error, error),
        }),
      )
  }

  toast.closeAll = toastStore.closeAll
  toast.close = toastStore.close
  toast.isActive = toastStore.isActive

  return toast
}

export type CreateToastFnReturn = ReturnType<typeof createToastFn>
