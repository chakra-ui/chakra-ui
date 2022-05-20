import { noop } from "@chakra-ui/utils"
import {
  ColorMode,
  ColorModeContext,
  ThemeProvider,
  useChakra,
} from "@chakra-ui/system"
import defaultTheme from "@chakra-ui/theme"
import * as React from "react"
import {
  CreateToastOptions,
  ToastMethods,
  ToastProvider,
  ToastProviderProps,
} from "./toast.provider"
import { ToastId, ToastMessage } from "./toast.types"
import { UseToastOptions } from "./use-toast"
import { createRenderToast } from "./toast"
import { getToastPlacement } from "./toast.placement"

const defaults: UseToastOptions = {
  duration: 5000,
  variant: "solid",
}

export interface CreateStandAloneToastParam
  extends Partial<
      ReturnType<typeof useChakra> & {
        setColorMode: (value: ColorMode) => void
        defaultOptions: UseToastOptions
      }
    >,
    Omit<ToastProviderProps, "children"> {}

export interface CallableToastMethods extends ToastMethods {
  (message: ToastMessage, options?: CreateToastOptions): void
}

export const defaultStandaloneParam: CreateStandAloneToastParam &
  Required<Omit<CreateStandAloneToastParam, keyof ToastProviderProps>> = {
  theme: defaultTheme,
  colorMode: "light",
  toggleColorMode: noop,
  setColorMode: noop,
  defaultOptions: defaults,
}

/**
 * Create a toast
 */
export function createStandaloneToast({
  theme = defaultStandaloneParam.theme,
  colorMode = defaultStandaloneParam.colorMode,
  toggleColorMode = defaultStandaloneParam.toggleColorMode,
  setColorMode = defaultStandaloneParam.setColorMode,
  defaultOptions = defaultStandaloneParam.defaultOptions,
  motionVariants,
  toastSpacing,
  component,
}: CreateStandAloneToastParam = defaultStandaloneParam) {
  const ref = React.createRef<CallableToastMethods>()

  const colorModeContextValue = { colorMode, setColorMode, toggleColorMode }
  const ToastContainer = () => (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorModeContextValue}>
        <ToastProvider
          ref={ref}
          defaultOptions={defaultOptions}
          motionVariants={motionVariants}
          toastSpacing={toastSpacing}
          component={component}
        />
      </ColorModeContext.Provider>
    </ThemeProvider>
  )

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

    return ref.current?.notify(Message, normalizedToastOptions)
  }
  /**
   * Toasts can only be updated if they have a valid id
   */
  toast.update = (id: ToastId, options: Omit<UseToastOptions, "id">) => {
    if (!id) return

    const normalizedToastOptions = normalizeToastOptions(options)
    const Message = createRenderToast(normalizedToastOptions)

    ref.current?.update(id, {
      ...normalizedToastOptions,
      message: Message,
    })
  }

  toast.notify = ref.current?.notify ?? noop
  toast.closeAll = ref.current?.closeAll ?? noop
  toast.close = ref.current?.close ?? noop
  toast.isActive = ref.current?.isActive ?? noop

  return {
    ToastContainer,
    toast,
  }
}
