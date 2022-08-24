import { useSafeLayoutEffect } from "@chakra-ui/react-use-safe-layout-effect"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ColorModeContext } from "./color-mode-context"
import {
  ColorMode,
  ColorModeContextType,
  ColorModeOptions,
} from "./color-mode-types"
import { getColorModeUtils } from "./color-mode.utils"
import { localStorageManager, StorageManager } from "./storage-manager"

const noop = () => {}

export interface ColorModeProviderProps {
  value?: ColorMode
  children?: React.ReactNode
  options?: ColorModeOptions
  colorModeManager?: StorageManager
}

function getTheme(manager: StorageManager, fallback?: ColorMode) {
  return manager.type === "cookie" && manager.ssr
    ? manager.get(fallback)
    : fallback
}

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
export function ColorModeProvider(props: ColorModeProviderProps) {
  const {
    value,
    children,
    options: {
      useSystemColorMode,
      initialColorMode,
      disableTransitionOnChange,
    } = {},
    colorModeManager = localStorageManager,
  } = props

  const defaultColorMode = initialColorMode === "dark" ? "dark" : "light"

  const [colorMode, rawSetColorMode] = useState(() =>
    getTheme(colorModeManager, defaultColorMode),
  )

  const [resolvedColorMode, setResolvedColorMode] = useState(() =>
    getTheme(colorModeManager),
  )

  const { getSystemTheme, setClassName, setDataset, addListener } = useMemo(
    () => getColorModeUtils({ preventTransition: disableTransitionOnChange }),
    [disableTransitionOnChange],
  )

  const resolvedValue =
    initialColorMode === "system" && !colorMode ? resolvedColorMode : colorMode

  const setColorMode = useCallback(
    (value: ColorMode | "system") => {
      //
      const resolved = value === "system" ? getSystemTheme() : value
      rawSetColorMode(resolved)

      setClassName(resolved === "dark")
      setDataset(resolved)

      colorModeManager.set(resolved)
    },
    [colorModeManager, getSystemTheme, setClassName, setDataset],
  )

  useSafeLayoutEffect(() => {
    if (initialColorMode === "system") {
      setResolvedColorMode(getSystemTheme())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const managerValue = colorModeManager.get()

    if (managerValue) {
      setColorMode(managerValue)
      return
    }

    if (initialColorMode === "system") {
      setColorMode("system")
      return
    }

    setColorMode(defaultColorMode)
  }, [colorModeManager, defaultColorMode, initialColorMode, setColorMode])

  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedValue === "dark" ? "light" : "dark")
  }, [resolvedValue, setColorMode])

  useEffect(() => {
    if (!useSystemColorMode) return
    return addListener(setColorMode)
  }, [useSystemColorMode, addListener, setColorMode])

  // presence of `value` indicates a controlled context
  const context = useMemo(
    () => ({
      colorMode: value ?? (resolvedValue as ColorMode),
      toggleColorMode: value ? noop : toggleColorMode,
      setColorMode: value ? noop : setColorMode,
    }),
    [resolvedValue, toggleColorMode, setColorMode, value],
  )

  return (
    <ColorModeContext.Provider value={context}>
      {children}
    </ColorModeContext.Provider>
  )
}

ColorModeProvider.displayName = "ColorModeProvider"

/**
 * Locks the color mode to `dark`, without any way to change it.
 */
export function DarkMode(props: React.PropsWithChildren<{}>) {
  const context = useMemo<ColorModeContextType>(
    () => ({
      colorMode: "dark",
      toggleColorMode: noop,
      setColorMode: noop,
    }),
    [],
  )

  return <ColorModeContext.Provider value={context} {...props} />
}

DarkMode.displayName = "DarkMode"

/**
 * Locks the color mode to `light` without any way to change it.
 */
export function LightMode(props: React.PropsWithChildren<{}>) {
  const context = useMemo<ColorModeContextType>(
    () => ({
      colorMode: "light",
      toggleColorMode: noop,
      setColorMode: noop,
    }),
    [],
  )

  return <ColorModeContext.Provider value={context} {...props} />
}

LightMode.displayName = "LightMode"
