import { objectKeys } from "@chakra-ui/utils"
import { AnimatePresence, Variants } from "framer-motion"
import type { CSSProperties } from "react"
import * as React from "react"
import { createContext } from "@chakra-ui/react-utils"
import { Portal } from "@chakra-ui/portal"
import { ToastComponent, ToastComponentProps } from "./toast.component"
import type {
  CloseAllToastsOptions,
  ToastId,
  ToastMessage,
  ToastOptions,
} from "./toast.types"
import type { UseToastOptions } from "./use-toast"
import { useToastProvider } from "./use-toast-provider"

export interface ToastMethods {
  notify: (message: ToastMessage, options?: CreateToastOptions) => ToastId
  closeAll: (options?: CloseAllToastsOptions) => void
  close: (id: ToastId) => void
  update: (
    id: ToastId,
    options: CreateToastOptions & { message?: ToastMessage },
  ) => void
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

const [ToastManagerProvider, useToastManager] = createContext<ToastMethods>({
  strict: true,
  name: "ToastManagerContext",
})

export { useToastManager }

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
  toastSpacing?: CSSProperties["margin"]
}>

/**
 * Manages the creation, and removal of toasts
 * across all corners ("top", "bottom", etc.)
 */
export const ToastProvider = React.forwardRef<ToastMethods, ToastProviderProps>(
  (props: ToastProviderProps, ref) => {
    const {
      children,
      defaultOptions,
      motionVariants,
      component: CustomToastComponent = ToastComponent,
    } = props

    const { areas, getStyle, toast } = useToastProvider({ defaultOptions })

    // attach `toast` methods to the ref of this component for `createStandaloneToast`
    React.useImperativeHandle(ref, () => toast)

    const toastList = objectKeys(areas).map((position) => {
      const toasts = areas[position]

      return (
        <ul
          role="region"
          aria-live="polite"
          key={position}
          id={`chakra-toast-manager-${position}`}
          style={getStyle(position)}
        >
          <AnimatePresence initial={false}>
            {toasts.map((toast) => (
              <CustomToastComponent
                key={toast.id}
                motionVariants={motionVariants}
                {...toast}
              />
            ))}
          </AnimatePresence>
        </ul>
      )
    })

    return (
      <ToastManagerProvider value={toast}>
        {children}
        <Portal>{toastList}</Portal>
      </ToastManagerProvider>
    )
  },
)
