import * as React from "react"
import { ChakraProviderProps as BaseChakraProviderProps } from "@chakra-ui/provider"
import { theme } from "@chakra-ui/theme"
import { ToastProviderProps } from "@chakra-ui/toast"
import {
  ChakraComposableProvider,
  createAnimationFeature,
  createToastFeature,
} from "./chakra-composable-provider"

export interface ChakraProviderProps extends BaseChakraProviderProps {
  /**
   * Provide defaults for `useToast()` usages for `ChakraProvider`s children
   */
  toastOptions?: ToastProviderProps
}

const animationFeature = createAnimationFeature()

export const ChakraProvider = ({
  children,
  toastOptions,
  ...restProps
}: ChakraProviderProps) => {
  const toastFeature = React.useMemo(() => {
    return createToastFeature(toastOptions)
  }, [toastOptions])

  return (
    <ChakraComposableProvider
      {...restProps}
      features={[toastFeature, animationFeature]}
    >
      {children}
    </ChakraComposableProvider>
  )
}

ChakraProvider.defaultProps = {
  theme,
}
