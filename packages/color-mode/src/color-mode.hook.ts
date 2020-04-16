import { useLatestRef } from "@chakra-ui/hooks"
import { useEffect, useState } from "react"
import {
  addListener,
  ColorMode,
  getColorScheme,
  storage,
  syncBodyClassName,
} from "./color-mode.utils"

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

interface Options {
  initialColorMode?: ColorMode
  useSystemColorMode?: boolean
}

export function useColorModeState<T extends Options>(options?: T) {
  const [mode, setMode] = useState<ColorMode>(
    options?.initialColorMode || "light",
  )

  useSyncBodyClass(mode)
  useSyncSystemColorMode(setMode, !!options?.useSystemColorMode)

  useEffect(() => {
    const stored = storage.get()

    if (!stored && options?.useSystemColorMode) {
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
