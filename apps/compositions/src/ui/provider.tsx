"use client"

import { ChakraProvider, defaultSystem } from "@sh3yk0-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "compositions/ui/color-mode"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
