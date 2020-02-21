import React from "react"
import { ColorModeType } from "./constants"

const isBrowser = typeof window !== "undefined"

const useIsomorphicEffect = isBrowser ? React.useLayoutEffect : React.useEffect

// Sync color mode between tabs
export function useSyncTabs(
  storageKey: string,
  callback: (mode: ColorModeType) => void,
) {
  useIsomorphicEffect(() => {
    if (!isBrowser) return
    const handleStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        if (!event.newValue) return
        callback(event.newValue as ColorModeType)
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => {
      window.removeEventListener("storage", handleStorage)
    }
  }, [callback, storageKey])
}

export default useSyncTabs
