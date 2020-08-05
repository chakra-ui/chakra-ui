import { useLatestRef } from "@chakra-ui/hooks"
import { useEffect, useState } from "react"
import {
  addListener,
  ColorMode,
  getColorScheme,
  syncBodyClassName,
} from "./color-mode.utils"
import { StorageManager, localStorageManager } from "./storage-manager"

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

export interface ColorModeOptions {
  initialColorMode?: ColorMode
  useSystemColorMode?: boolean
}

interface useColorModeStateOptions extends ColorModeOptions {
  storageManager?: StorageManager
}

/**
 * React hook that sets up the localStorage, body className,
 * and reads from system preference
 */
export function useColorModeState<T extends useColorModeStateOptions>(
  options?: T,
) {
  const storageManager = options?.storageManager || localStorageManager

  const [mode, setMode] = useState<ColorMode>(() => {
    const stored = storageManager.get()

    if (stored) return stored

    if (options?.useSystemColorMode) {
      return getColorScheme()
    }

    return options?.initialColorMode || "light"
  })

  useSyncBodyClass(mode)
  useSyncSystemColorMode(setMode, !!options?.useSystemColorMode)

  useEffect(() => {
    if (mode) {
      storageManager.set(mode)
    }
  }, [storageManager, mode])

  return [mode, setMode] as const
}

export default useColorModeState
