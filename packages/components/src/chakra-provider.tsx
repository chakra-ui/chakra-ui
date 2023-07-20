import { Theme, baseTheme, theme as defaultTheme } from "@chakra-ui/theme"
import { Dict } from "@chakra-ui/utils"
import {
  ChakraProvider as BaseChakraProvider,
  ChakraProviderProps as BaseChakraProviderProps,
} from "./provider"
import { ToastOptionProvider, ToastProvider, ToastProviderProps } from "./toast"

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
