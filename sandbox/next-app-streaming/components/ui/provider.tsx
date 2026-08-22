"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { EmotionRegistry } from "./emotion-registry"

interface ProviderProps {
  children: React.ReactNode
  withRegistry?: boolean
}

export function Provider({ children, withRegistry }: ProviderProps) {
  const inner = (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )

  if (!withRegistry) return inner

  return <EmotionRegistry>{inner}</EmotionRegistry>
}
