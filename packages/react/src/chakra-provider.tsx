import * as React from "react"
import {
  ChakraProvider as BaseChakraProvider,
  ChakraProviderProps as BaseChakraProviderProps,
} from "@chakra-ui/provider"
import { theme } from "@chakra-ui/theme"
import { ToastProvider } from "@chakra-ui/toast"
import { ToastProviderProps } from "@chakra-ui/toast/src"

export interface ChakraProviderProps extends BaseChakraProviderProps {
  /**
   * Provide defaults for `useToast()` usages for `ChakraProvider`s children
   */
  toastOptions?: ToastProviderProps
}

export const ChakraProvider = ({
  children,
  toastOptions,
  ...restProps
}: ChakraProviderProps) => (
  <BaseChakraProvider {...restProps}>
    <ToastProvider {...toastOptions}>{children}</ToastProvider>
  </BaseChakraProvider>
)

ChakraProvider.defaultProps = {
  theme,
}
