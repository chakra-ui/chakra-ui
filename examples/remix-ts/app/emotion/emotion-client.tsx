import { CacheProvider, EmotionCache } from "@emotion/react"
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { createEmotionCache } from "./emotion-cache"

export interface ClientStyleContextData {
  reset: () => void
}

export const ClientStyleContext = createContext<ClientStyleContextData>({
  reset: () => {},
})

export const useClientStyleContext = () => {
  return useContext(ClientStyleContext)
}

interface ClientCacheProviderProps {
  children: React.ReactNode
}

export function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache())

  const context = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache())
      },
    }),
    [],
  )

  return (
    <ClientStyleContext.Provider value={context}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

const useSafeLayoutEffect =
  typeof window === "undefined" ? () => {} : useLayoutEffect

export function useInjectStyles(cache: EmotionCache) {
  const styles = useClientStyleContext()
  const injectRef = useRef(true)

  useSafeLayoutEffect(() => {
    if (!injectRef.current) return

    cache.sheet.container = document.head

    const tags = cache.sheet.tags
    cache.sheet.flush()
    tags.forEach((tag) => {
      ;(cache.sheet as any)._insertTag(tag)
    })

    styles.reset()
    injectRef.current = false
  }, [])
}
