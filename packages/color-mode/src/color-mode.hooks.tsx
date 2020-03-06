import React from "react"
import { useIsomorphicEffect, useEventListener } from "@chakra-ui/hooks"
import { storage, syncBodyClassName, storageKey } from "./color-mode.utils"

export function useUpdateBodyClassName(isDark: boolean) {
  React.useEffect(() => {
    storage.set(isDark ? "dark" : "light")
    syncBodyClassName(isDark)
  }, [isDark])

  useIsomorphicEffect(() => {
    const mode = storage.get()
    syncBodyClassName(mode ? mode === "dark" : isDark)
  }, [])
}

export function useSyncBetweenTabs(fn: Function) {
  const handler = (event: StorageEvent) => {
    if (!event.newValue || event.key !== storageKey) return
    fn(event.newValue)
  }
  useEventListener("storage", handler)
}
