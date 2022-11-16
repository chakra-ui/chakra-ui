import {
  ChakraProvider as BaseChakraProvider,
  ChakraProviderProps as BaseChakraProviderProps,
} from "@chakra-ui/provider"
import { theme as defaultTheme } from "@chakra-ui/theme"
import { ToastProvider, ToastProviderProps } from "@chakra-ui/toast"
import { omit } from "@chakra-ui/utils"

export interface ChakraBaseProviderProps extends BaseChakraProviderProps {
  /**
   * Provide defaults for `useToast()` usages for `ChakraBaseProvider`s children
   */
  toastOptions?: ToastProviderProps
}

export function ChakraBaseProvider({
  children,
  theme = defaultTheme,
  toastOptions,
  ...restProps
}: ChakraBaseProviderProps) {
  const baseTheme = omit(theme, ["components"])
  return (
    <BaseChakraProvider theme={baseTheme} {...restProps}>
      {children}
      <ToastProvider {...toastOptions} />
    </BaseChakraProvider>
  )
}
