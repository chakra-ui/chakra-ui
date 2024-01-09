import { PropsWithChildren } from "react"
import { EmotionCacheOptions } from "./use-emotion-cache"

/**
 * @deprecated - This component type is no longer necessary
 */
export type CacheProviderProps = PropsWithChildren<EmotionCacheOptions>

/**
 * @deprecated - This component is no longer necessary
 */
export function CacheProvider({ children }: CacheProviderProps) {
  return children
}
