import { useLatestRef } from "@chakra-ui/hooks"
import * as React from "react"
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
export function useColorModeState(options: useColorModeStateOptions = {}) {
  const {
    storageManager = localStorageManager,
    useSystemColorMode,
    initialColorMode,
  } = options

  const [mode, setMode] = React.useState<ColorMode>(initialColorMode || "light")

  useSyncBodyClass(mode)
  useSyncSystemColorMode(setMode, !!useSystemColorMode)

  React.useEffect(() => {
    const stored = storageManager.get()

    // given no persisted value
    if (!stored) {
      // and should use system
      if (useSystemColorMode) {
        setMode(getColorScheme)
      }
      // given a persisted value that deviates from the inital value
    } else if (stored !== mode) {
      setMode(stored)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageManager, useSystemColorMode])

  React.useEffect(() => {
    if (mode) {
      storageManager.set(mode)
    }
  }, [mode, storageManager])

  return [mode, setMode] as const
}
