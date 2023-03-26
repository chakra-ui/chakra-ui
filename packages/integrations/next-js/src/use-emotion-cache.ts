import emotion_createCache, { Options as CacheOptions } from "@emotion/cache"
import { useServerInsertedHTML } from "next/navigation"
import { createElement, useMemo } from "react"

export type EmotionCacheOptions = Partial<CacheOptions>

const createCache = ((emotion_createCache as any).default ??
  emotion_createCache) as typeof emotion_createCache

export function useEmotionCache(options?: EmotionCacheOptions) {
  const cache = useMemo(() => {
    const cache = createCache({ key: "css", prepend: true, ...options })
    cache.compat = true
    return cache
  }, [options])

  useServerInsertedHTML(() =>
    createElement("style", {
      key: cache.key,
      "data-emotion": `${cache.key} ${Object.keys(cache.inserted).join(" ")}`,
      dangerouslySetInnerHTML: {
        __html: Object.values(cache.inserted).join(" "),
      },
    }),
  )

  return cache
}
