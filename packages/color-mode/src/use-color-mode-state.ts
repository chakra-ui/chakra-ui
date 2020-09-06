import { useLatestRef } from "@chakra-ui/hooks"
import * as React from "react"
import {
  addListener,
  ColorMode,
  getColorScheme,
  syncBodyClassName,
} from "./color-mode.utils"
import { StorageManager } from "./storage-manager"

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
    if (enabled) {
      return addListener(callback.current)
    }
  }, [callback, enabled])
}

export interface ColorModeOptions {
  initialColorMode?: ColorMode
  useSystemColorMode?: boolean
}

interface useColorModeStateOptions extends ColorModeOptions {
  storageManager: StorageManager
}

/**
 * React hook that sets up the localStorage, body className,
 * and reads from system preference
 */
export function useColorModeState(options: useColorModeStateOptions) {
  const { storageManager, useSystemColorMode, initialColorMode } = options

  const [mode, setMode] = React.useState<ColorMode>(initialColorMode ?? "light")

  const toggleColorMode = () => setMode(mode === "light" ? "dark" : "light")

  useSyncBodyClass(mode)
  useSyncSystemColorMode(setMode, !!useSystemColorMode)

  React.useEffect(() => {
    const stored = storageManager.get()

    const detectedMode = stored
      ? // given a previous value, use that
        stored
      : // if should detect, use that
      useSystemColorMode
      ? getColorScheme()
      : // else no change necessary
        undefined

    if (detectedMode) {
      setMode(detectedMode)
    }
  }, [storageManager, useSystemColorMode])

  React.useEffect(() => {
    if (mode) {
      storageManager.set(mode)
    }
  }, [mode, storageManager])

  return {
    mode,
    toggleColorMode,
  }
}
