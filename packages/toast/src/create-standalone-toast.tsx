import { noop } from "@chakra-ui/utils"
import {
  ColorMode,
  ColorModeContext,
  ThemeProvider,
  useChakra,
} from "@chakra-ui/system"
import defaultTheme from "@chakra-ui/theme"
import * as React from "react"
import { ToastProvider, ToastProviderProps } from "./toast.provider"
import type { ToastId } from "./toast.types"
import { UseToastOptions } from "./use-toast"
import { createRenderToast } from "./toast"
import { getToastPlacement } from "./toast.placement"
import { toastStore } from "./toast.store"

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
  const colorModeContextValue = { colorMode, setColorMode, toggleColorMode }
  const ToastContainer = () => (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorModeContextValue}>
        <ToastProvider
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
    return toastStore.notify(Message, normalizedToastOptions)
  }

  toast.update = (id: ToastId, options: Omit<UseToastOptions, "id">) => {
    toastStore.update(id, normalizeToastOptions(options))
  }

  toast.closeAll = toastStore.closeAll
  toast.close = toastStore.close
  toast.isActive = toastStore.isActive

  return {
    ToastContainer,
    toast,
  }
}
