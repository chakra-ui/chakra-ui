import { useLatestRef } from "@chakra-ui/hooks"
import { useEffect, useState } from "react"
import {
  addListener,
  ColorMode,
  getColorScheme,
  storage,
  syncBodyClassName,
} from "./color-mode.utils"

/**
 * Syncs the classname of the `<body />` based on the
 * color mode.
 *
 * @example
 *
 * If mode is 'dark', body will be `<body class="chakra-ui-light"/>`
 */
function useSyncBodyClass(mode: string) {
  useEffect(() => {
    requestAnimationFrame(() => {
      syncBodyClassName(mode === "dark")
    })
  }, [mode])
}

/**
 * Syncs the system color mode preference with localStorage and
 * internal state.
 *
 * @param fn the function to run once user changes preference
 * @param enabled whether to run this hook or not
 */
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

/**
 * React hook that sets up the localStorage, body className,
 * and reads from system preference
 */
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
