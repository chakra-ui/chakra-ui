"use client"

/**
 * Chakra v4 Static Provider — Zero Emotion.
 *
 * In v4 static mode, the `css()` function from SystemContext is replaced
 * with one that returns class name strings (from Panda's generated runtime)
 * instead of Emotion style objects.
 *
 * Usage:
 *   import { css } from "../styled-system/css"
 *   import { ChakraProvider } from "@chakra-ui/react/static"
 *
 *   <ChakraProvider value={system} cssFn={css}>
 *     <App />
 *   </ChakraProvider>
 *
 * The `cssFn` prop is the Panda-generated `css()` function.
 * Components call `css(styles)` through context and get class names
 * instead of style objects. No Emotion involved.
 */
import { createContext } from "../create-context"
import type { SystemContext } from "./types"

const [ChakraContextProvider, useChakraContext] = createContext<SystemContext>({
  name: "ChakraContext",
  strict: true,
  providerName: "<ChakraProvider />",
})

export interface ChakraProviderProps {
  /** The system context (from createSystem()) */
  value: SystemContext
  /** Panda's generated css() function — returns class name strings */
  cssFn?: (...args: any[]) => string
  children: React.ReactNode
}

/**
 * Static ChakraProvider.
 *
 * Wraps the SystemContext with an overridden `css` function that returns
 * class names instead of style objects. No Emotion globals injected.
 */
function ChakraProvider(props: ChakraProviderProps) {
  const { value: sys, cssFn, children } = props

  // Override the css function if a static cssFn is provided
  const contextValue = cssFn ? { ...sys, css: cssFn as any } : sys

  return (
    <ChakraContextProvider value={contextValue}>
      {children}
    </ChakraContextProvider>
  )
}

export { ChakraProvider, useChakraContext }
