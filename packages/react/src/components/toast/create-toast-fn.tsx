"use client"

import { runIfFn } from "@chakra-ui/utils"
import { toastStore } from "./toast.store"
import type { ToastId, ToastOptions, ToastPublicOptions } from "./toast.types"

type ToastPromiseOptions = Omit<ToastOptions, "status" | "placement">
type MaybeFunction<T, Args extends unknown[] = []> = T | ((...args: Args) => T)

export function createToastFn(defaultOptions?: ToastOptions) {
  const normalize = (options?: Partial<ToastOptions>): ToastOptions => ({
    placement: "bottom",
    ...defaultOptions,
    ...options,
  })

  const toast = (options?: ToastPublicOptions) => {
    const opts = normalize(options)
    return toastStore.create(opts)
  }

  toast.update = (
    id: ToastId,
    options: Omit<ToastOptions, "id" | "placement">,
  ) => {
    toastStore.update(id, normalize(options))
  }

  toast.promise = <Result extends any, Err extends Error = Error>(
    promise: Promise<Result>,
    options: {
      success: MaybeFunction<ToastPromiseOptions, [Result]>
      error: MaybeFunction<ToastPromiseOptions, [Err]>
      loading: ToastPromiseOptions
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
