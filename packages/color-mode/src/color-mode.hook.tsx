import { useLatestRef } from "@chakra-ui/hooks"
import { useEffect, useState } from "react"
import {
  addListener,
  ColorMode,
  getColorScheme,
  storage,
  syncBodyClassName,
} from "./color-mode.utils"

interface Theme {
  config?: {
    initialColorMode?: ColorMode
    useSystemColorMode?: boolean
  }
}

function useSyncBodyClass(mode: string) {
  useEffect(() => {
    requestAnimationFrame(() => {
      syncBodyClassName(mode === "dark")
    })
  }, [mode])
}

function useSyncSystemColorMode(fn: Function, enabled: boolean) {
  const callback = useLatestRef(fn)
  useEffect(() => {
    if (!enabled) return
    const removeListener = addListener(callback.current)
    return () => {
      removeListener?.()
    }
  }, [callback, enabled])
}

export function useColorModeState<T extends Theme>(theme: T) {
  const [mode, setMode] = useState<ColorMode>(
    theme.config?.initialColorMode || "light",
  )

  useSyncBodyClass(mode)
  useSyncSystemColorMode(setMode, !!theme.config?.useSystemColorMode)

  useEffect(() => {
    const stored = storage.get()

    if (!stored && theme.config?.useSystemColorMode) {
      setMode(getColorScheme)
      return
    }

    if (!stored || stored === mode) return
    setMode(stored)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (mode) {
      storage.set(mode)
    }
  }, [mode])

  return [mode, setMode] as const
}
