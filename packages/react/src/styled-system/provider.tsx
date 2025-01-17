"use client"

import { Global } from "@emotion/react"
import { createContext } from "../create-context"
import type { SystemContext } from "./types"

const [ChakraContextProvider, useChakraContext] = createContext<SystemContext>({
  name: "ChakraContext",
  strict: true,
  providerName: "<ChakraProvider />",
})

export interface ChakraProviderProps {
  value: SystemContext
  children: React.ReactNode
}

function ChakraProvider(props: ChakraProviderProps) {
  const { value: sys, children } = props
  return (
    <ChakraContextProvider value={sys}>
      {!sys._config.disableLayers && <Global styles={sys.layers.atRule} />}
      <Global styles={sys._global} />
      {children}
    </ChakraContextProvider>
  )
}

export { ChakraProvider, useChakraContext }
