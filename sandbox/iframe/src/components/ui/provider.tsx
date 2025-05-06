"use client"

import { ChakraProvider, defaultSystem } from "@sh3yk0-ui/react"
import { ThemeProvider, type ThemeProviderProps } from "next-themes"

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider {...props} />
    </ChakraProvider>
  )
}
