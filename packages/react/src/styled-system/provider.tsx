"use client"

import { createContext } from "../create-context"
import type { SystemContext } from "./types"

const [ChakraContextProvider, useChakraContext] = createContext<SystemContext>({
  name: "ChakraContext",
  strict: true,
  providerName: "<ChakraProvider />",
})

export interface ChakraProviderProps {
  value: SystemContext

  cssFn?: (...args: any[]) => string
  children: React.ReactNode
}

function ChakraProvider(props: ChakraProviderProps) {
  const { value: sys, cssFn, children } = props

  const contextValue = cssFn ? { ...sys, css: cssFn as any } : sys

  return (
    <ChakraContextProvider value={contextValue}>
      {children}
    </ChakraContextProvider>
  )
}

export { ChakraProvider, useChakraContext }
