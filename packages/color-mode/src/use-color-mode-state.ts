import { useLatestRef } from "@chakra-ui/hooks"
import { isBrowser } from "@chakra-ui/utils"
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
  colorModeManager: StorageManager
}

/**
 * React hook that sets up the localStorage, body className,
 * and reads from system preference
 */
export function useColorModeState(options: useColorModeStateOptions) {
  const { colorModeManager, useSystemColorMode, initialColorMode } = options

  const [mode, setMode] = React.useState<ColorMode>(() => {
    // only attempt to retrieve if we're on the server. else this will
    // result in a hydration mismatch warning and result in partially invalid
    // visuals
    const stored =
      colorModeManager.type === "cookie" ? colorModeManager.get() : undefined

    if (stored) {
      return stored
    }

    if (useSystemColorMode && isBrowser) {
      return getColorScheme()
    }

    return initialColorMode ?? "light"
  })

  const toggleColorMode = () => setMode(mode === "light" ? "dark" : "light")

  useSyncBodyClass(mode)
  useSyncSystemColorMode(setMode, !!useSystemColorMode)

  React.useEffect(() => {
    // since we cannot initially retrieve localStorage to due above mentioned
    // reasons, do so after hydration
    if (colorModeManager.type === "localStorage") {
      const stored = colorModeManager.get()

      if (stored && stored !== mode) {
        setMode(stored)
      }
    }
    // omitted to prevent infinite render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorModeManager])

  React.useEffect(() => {
    if (mode) {
      colorModeManager.set(mode)
    }
  }, [mode, colorModeManager])

  return {
    mode,
    toggleColorMode,
  }
}
