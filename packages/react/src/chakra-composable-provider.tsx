import * as React from "react"
import {
  ChakraProvider as BaseChakraProvider,
  ChakraProviderProps as BaseChakraProviderProps,
} from "@chakra-ui/provider"
import { theme } from "@chakra-ui/theme"
import { ToastProvider, ToastProviderProps } from "@chakra-ui/toast"

type ChakraFeature = {
  id: string
  Provider: React.ComponentType
}

export function createToastFeature(
  toastOptions?: ToastProviderProps,
): ChakraFeature {
  return {
    id: "toast",
    Provider() {
      return <ToastProvider {...toastOptions} />
    },
  }
}

export interface ChakraComposableProviderProps extends BaseChakraProviderProps {
  features?: readonly ChakraFeature[]
}

export const ChakraComposableProvider = ({
  children,
  features = [],
  ...restProps
}: ChakraComposableProviderProps) => (
  <BaseChakraProvider {...restProps}>
    {children}
    {features.map((feature) => (
      <feature.Provider key={feature.id} />
    ))}
  </BaseChakraProvider>
)

ChakraComposableProvider.defaultProps = {
  theme,
}
