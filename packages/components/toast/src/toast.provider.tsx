import { AnimatePresence, Variants } from "framer-motion"
import { Portal, PortalProps } from "@chakra-ui/portal"
import { ToastComponent, ToastComponentProps } from "./toast.component"
import type {
  CloseAllToastsOptions,
  ToastId,
  ToastMessage,
  ToastOptions,
} from "./toast.types"
import type { UseToastOptions } from "./use-toast"
import { toastStore } from "./toast.store"
import { getToastListStyle } from "./toast.utils"
import { useSyncExternalStore } from "react"
import { createContext } from "@chakra-ui/react-context"

export interface ToastMethods {
  /**
   * Function to actually create a toast and add it
   * to state at the specified position
   */
  notify: (message: ToastMessage, options?: CreateToastOptions) => ToastId
  /**
   * Close all toasts at once.
   * If given positions, will only close those.
   */
  closeAll: (options?: CloseAllToastsOptions) => void
  /**
   * Requests to close a toast based on its id and position
   */
  close: (id: ToastId) => void
  /**
   * Update a specific toast with new options based on the
   * passed `id`
   */
  update: (id: ToastId, options: Omit<UseToastOptions, "id">) => void
  isActive: (id: ToastId) => boolean
}

export type CreateToastOptions = Partial<
  Pick<
    ToastOptions,
    | "status"
    | "duration"
    | "position"
    | "id"
    | "onCloseComplete"
    | "containerStyle"
  >
>

export type ToastProviderProps = React.PropsWithChildren<{
  /**
   * Default options for `useToast(options)`
   *
   * @example
   * <ToastProvider defaultOptions={{ duration: 10_000, isClosable: true }} />
   */
  defaultOptions?: UseToastOptions

  /**
   * Customize the default motion config to animate the toasts your way
   *
   * @example
   * const motionVariants =
   * <ToastProvider motionVariants={motionVariants} />
   */
  motionVariants?: Variants

  /**
   * Are you looking for a way to style the toast? Use a custom `Alert` variant in the theme.
   * This property overrides the default ToastComponent with your own implementation.
   *
   * @example
   * const CustomToastComponent = (props: ToastComponentProps) => ...
   * <ToastProvider component={CustomToastComponent} />
   *
   * @default ToastComponent
   */
  component?: React.FC<ToastComponentProps>

  /**
   * Define the margin between toasts
   *
   * @default 0.5rem
   */
  toastSpacing?: string | number
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, "appendToParentPortal" | "containerRef">
}>

/**
 * Passes default options down to be used by toast creator function
 */
export const [ToastOptionProvider, useToastOptionContext] = createContext<
  UseToastOptions | undefined
>({
  name: `ToastOptionsContext`,
  strict: false,
})

/**
 * Manages the creation, and removal of toasts
 * across all corners ("top", "bottom", etc.)
 */
export const ToastProvider = (props: ToastProviderProps) => {
  const state = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getState,
    toastStore.getState,
  )

  const {
    motionVariants,
    component: Component = ToastComponent,
    portalProps,
  } = props

  const stateKeys = Object.keys(state) as Array<keyof typeof state>
  const toastList = stateKeys.map((position) => {
    const toasts = state[position]

    return (
      <ul
        role="region"
        aria-live="polite"
        key={position}
        id={`chakra-toast-manager-${position}`}
        style={getToastListStyle(position)}
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <Component
              key={toast.id}
              motionVariants={motionVariants}
              {...toast}
            />
          ))}
        </AnimatePresence>
      </ul>
    )
  })

  return <Portal {...portalProps}>{toastList}</Portal>
}
