import {
  ChakraProvider as BaseChakraProvider,
  ChakraProviderProps as BaseChakraProviderProps,
} from "@chakra-ui/provider"
import { theme as defaultTheme, baseTheme, Theme } from "@chakra-ui/theme"
import {
  ToastProvider,
  ToastProviderProps,
  ToastOptionProvider,
} from "@chakra-ui/toast"
import { Dict } from "@chakra-ui/utils"

export interface ChakraProviderProps extends BaseChakraProviderProps {
  /**
   * Provide defaults for `useToast()` usages for `ChakraProvider`s children
   */
  toastOptions?: ToastProviderProps
}

const createChakraProvider = (
  providerTheme: Theme | (Omit<Theme, "components"> & { components: Dict }),
) => {
  return function ChakraProvider({
    children,
    theme = providerTheme,
    toastOptions,
    ...restProps
  }: ChakraProviderProps) {
    return (
      <BaseChakraProvider theme={theme} {...restProps}>
        <ToastOptionProvider value={toastOptions?.defaultOptions}>
          {children}
        </ToastOptionProvider>
        <ToastProvider {...toastOptions} />
      </BaseChakraProvider>
    )
  }
}

export const ChakraProvider = createChakraProvider(defaultTheme)
export const ChakraBaseProvider = createChakraProvider(baseTheme)
