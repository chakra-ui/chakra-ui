import {
  ChakraProvider as BaseChakraProvider,
  ChakraProviderProps as BaseChakraProviderProps,
} from "@chakra-ui/provider"
import { theme as defaultTheme } from "@chakra-ui/theme"
import {
  ToastOptionProvider,
  ToastProvider,
  ToastProviderProps,
} from "@chakra-ui/toast"

export interface ChakraProviderProps extends BaseChakraProviderProps {
  /**
   * Provide defaults for `useToast()` usages for `ChakraProvider`s children
   */
  toastOptions?: ToastProviderProps
}

export function ChakraProvider({
  children,
  theme = defaultTheme,
  toastOptions,
  ...restProps
}: ChakraProviderProps) {
  return (
    <BaseChakraProvider {...restProps}>
      <ToastOptionProvider
        value={{ globalOptions: toastOptions?.defaultOptions }}
      >
        {children}
      </ToastOptionProvider>
      <ToastProvider {...toastOptions} />
    </BaseChakraProvider>
  )
}
