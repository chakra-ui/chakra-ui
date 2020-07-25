import { useLatestRef } from "@chakra-ui/hooks"
import * as React from "react"
import {
  addListener,
  ColorMode,
  getColorScheme,
  localStorageManager,
  syncBodyClassName,
  StorageManager,
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
  React.useEffect(() => {
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
  React.useEffect(() => {
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
  const [mode, setMode] = React.useState<ColorMode>(
    options?.initialColorMode || "light",
  )
  const storageManager = options?.storageManager || localStorageManager

  useSyncBodyClass(mode)
  useSyncSystemColorMode(setMode, !!options?.useSystemColorMode)

  React.useEffect(() => {
    const stored = storageManager.get()

    if (!stored && options?.useSystemColorMode) {
      setMode(getColorScheme)
      return
    }

    if (!stored || stored === mode) return
    setMode(stored)
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (mode) {
      storageManager.set(mode)
    }
  }, [mode])

  return [mode, setMode] as const
}

export default useColorModeState
