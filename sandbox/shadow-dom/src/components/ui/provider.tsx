"use client"

import {
  ChakraProvider,
  EnvironmentProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { ThemeProvider, type ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"
import root from "react-shadow/emotion"

const varRoot = ":host"

const config = defineConfig({
  cssVarsRoot: varRoot,
  conditions: {
    light: `${varRoot} &, .light &`,
  },
  preflight: { scope: varRoot },
  globalCss: {
    [varRoot]: defaultConfig.globalCss?.html ?? {},
  },
})

const system = createSystem(defaultConfig, config)

export function Provider(props: ThemeProviderProps) {
  const [shadow, setShadow] = useState<HTMLElement | null>(null)
  const [cache, setCache] = useState<ReturnType<typeof createCache> | null>(
    null,
  )

  useEffect(() => {
    if (!shadow?.shadowRoot || cache) return
    const emotionCache = createCache({
      key: "root",
      container: shadow.shadowRoot,
    })
    setCache(emotionCache)
  }, [shadow, cache])

  return (
    <root.div ref={setShadow}>
      {shadow && cache && (
        <EnvironmentProvider value={() => shadow.shadowRoot ?? document}>
          <CacheProvider value={cache}>
            <ChakraProvider value={system}>
              <ThemeProvider
                disableTransitionOnChange
                attribute="class"
                forcedTheme="light"
                {...props}
              />
            </ChakraProvider>
          </CacheProvider>
        </EnvironmentProvider>
      )}
    </root.div>
  )
}
