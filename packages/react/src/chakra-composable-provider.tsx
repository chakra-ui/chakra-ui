import * as React from "react"
import {
  ChakraProvider as BaseChakraProvider,
  ChakraProviderProps as BaseChakraProviderProps,
} from "@chakra-ui/provider"
import { theme } from "@chakra-ui/theme"
import { ToastProvider, ToastProviderProps } from "@chakra-ui/toast"
import { FramerMotionProvider } from "./framer-motion-provider"
import { AnimatePresence, motion } from "framer-motion"

type ChakraFeature = {
  id: string
  Provider: React.ComponentType<React.PropsWithChildren<{}>>
}

export function createToastFeature(
  toastOptions?: ToastProviderProps,
): ChakraFeature {
  return {
    id: "toast",
    Provider(props) {
      return <ToastProvider {...props} {...toastOptions} />
    },
  }
}

export function createAnimationFeature(): ChakraFeature {
  return {
    id: "animation",
    Provider(props) {
      const methods = React.useMemo(() => ({ motion, AnimatePresence }), [])

      return <FramerMotionProvider {...props} methods={methods} />
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
    {features.reduce((prev, feature) => {
      return <feature.Provider key={feature.id}>{prev}</feature.Provider>
    }, children)}
  </BaseChakraProvider>
)

ChakraComposableProvider.defaultProps = {
  theme,
}
