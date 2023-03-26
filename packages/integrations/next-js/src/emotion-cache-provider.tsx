"use client"

import { CacheProvider as EmotionCacheProvider } from "@emotion/react"
import { PropsWithChildren } from "react"
import { EmotionCacheOptions, useEmotionCache } from "./use-emotion-cache"

export type CacheProviderProps = PropsWithChildren<EmotionCacheOptions>

export function CacheProvider({
  children,
  ...cacheOptions
}: CacheProviderProps) {
  return (
    <EmotionCacheProvider value={useEmotionCache(cacheOptions)}>
      {children}
    </EmotionCacheProvider>
  )
}
