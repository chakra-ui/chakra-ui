import * as React from "react"
import {
  ChakraProvider as BaseChakraProvider,
  ChakraProviderProps as BaseChakraProviderProps,
} from "@chakra-ui/provider"
import { theme } from "@chakra-ui/theme"
import { ToastProvider, ToastProviderProps } from "@chakra-ui/toast"

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
    {children}
    <ToastProvider {...toastOptions} />
  </BaseChakraProvider>
)

ChakraProvider.defaultProps = {
  theme,
}
