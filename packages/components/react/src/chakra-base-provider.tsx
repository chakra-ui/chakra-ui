import {
  ChakraProvider as BaseChakraProvider,
  ChakraProviderProps as BaseChakraProviderProps,
} from "@chakra-ui/provider"
import { baseTheme } from "@chakra-ui/theme"
import { ToastProvider, ToastProviderProps } from "@chakra-ui/toast"

export interface ChakraBaseProviderProps extends BaseChakraProviderProps {
  /**
   * Provide defaults for `useToast()` usages for `ChakraBaseProvider`s children
   */
  toastOptions?: ToastProviderProps
}

export function ChakraBaseProvider({
  children,
  theme = baseTheme,
  toastOptions,
  ...restProps
}: ChakraBaseProviderProps) {
  return (
    <BaseChakraProvider theme={theme} {...restProps}>
      {children}
      <ToastProvider {...toastOptions} />
    </BaseChakraProvider>
  )
}
