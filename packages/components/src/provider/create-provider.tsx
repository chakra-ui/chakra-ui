import { Theme } from "@chakra-ui/theme"
import { Dict } from "@chakra-ui/utils/types"
import {
  ToastOptionProvider,
  ToastProvider,
  ToastProviderProps,
} from "../toast"
import { Provider, ProviderProps } from "./provider"

export interface ChakraProviderProps extends ProviderProps {
  /**
   * Provide defaults for `useToast()` usages for `ChakraProvider`s children
   */
  toastOptions?: ToastProviderProps
}

export type ChakraProviderComponent = React.FC<ChakraProviderProps>

export const createProvider = (
  providerTheme: Theme | (Omit<Theme, "components"> & { components: Dict }),
): ChakraProviderComponent => {
  return function ChakraProvider({
    children,
    theme = providerTheme,
    toastOptions,
    ...restProps
  }: ChakraProviderProps) {
    return (
      <Provider theme={theme} {...restProps}>
        <ToastOptionProvider value={toastOptions?.defaultOptions}>
          {children}
        </ToastOptionProvider>
        <ToastProvider {...toastOptions} />
      </Provider>
    )
  }
}
