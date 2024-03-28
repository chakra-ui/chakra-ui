"use client"

import { AnimatePresence } from "framer-motion"
import { forwardRef, useSyncExternalStore } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { createToastFn } from "./create-toast-fn"
import { getToastGroupStyle } from "./get-placement-style"
import { ToastContextProvider } from "./toast-context"
import { toastStore } from "./toast.store"
import { ToastOptions, ToastPlacement } from "./toast.types"

interface CreateToasterOptions {
  /**
   * The placement of the toast
   * @default "bottom"
   */
  placement: ToastPlacement
  /**
   * Render a component toast component.
   * Any component passed will receive 2 props: `id` and `onClose`.
   */
  render(props: ToastOptions): React.ReactNode
  /**
   * The delay before the toast hides (in milliseconds)
   * If set to `null`, toast will never dismiss.
   *
   * @default 5000 ( = 5000ms )
   */
  duration?: number
}

export interface ToastGroupProps extends HTMLChakraProps<"div"> {}

export const createToaster = (options: CreateToasterOptions) => {
  const { placement, render } = options
  const toaster = createToastFn(options)

  const ToastGroup = forwardRef<HTMLDivElement, ToastGroupProps>(
    function ToastGroup(props, ref) {
      const state = useSyncExternalStore(
        toastStore.subscribe,
        toastStore.getState,
        toastStore.getState,
      )

      const toasts = state[placement]

      return (
        <chakra.div
          ref={ref}
          role="region"
          aria-live="polite"
          data-placement={placement}
          aria-label={`notifications ${placement}`}
          id={`chakra-toast__group-${placement}`}
          {...props}
          style={{
            ...getToastGroupStyle(placement),
            ...props.style,
          }}
        >
          <AnimatePresence initial={false}>
            {toasts.map((toast) => (
              <ToastContextProvider key={toast.id} value={toast}>
                {render(toast)}
              </ToastContextProvider>
            ))}
          </AnimatePresence>
        </chakra.div>
      )
    },
  )

  ToastGroup.displayName = "ToastGroup"

  return [ToastGroup, toaster] as const
}
