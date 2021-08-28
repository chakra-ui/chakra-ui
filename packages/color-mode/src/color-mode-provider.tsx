import { isBrowser, noop, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  addListener,
  ColorMode,
  getColorScheme,
  syncBodyClassName,
  root,
} from "./color-mode.utils"
import { localStorageManager, StorageManager } from "./storage-manager"

type ConfigColorMode = ColorMode | "system" | undefined
export type { ColorMode, ConfigColorMode }

export interface ColorModeOptions {
  initialColorMode?: ConfigColorMode
  useSystemColorMode?: boolean
}

interface ColorModeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (value: any) => void
}

export const ColorModeContext = React.createContext({} as ColorModeContextType)

if (__DEV__) {
  ColorModeContext.displayName = "ColorModeContext"
}

/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */
export const useColorMode = () => {
  const context = React.useContext(ColorModeContext)
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider")
  }
  return context
}

export interface ColorModeProviderProps {
  value?: ColorMode
  children?: React.ReactNode
  options: ColorModeOptions
  colorModeManager?: StorageManager
}

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
export function ColorModeProvider(props: ColorModeProviderProps) {
  const {
    value,
    children,
    options: { useSystemColorMode, initialColorMode },
    colorModeManager = localStorageManager,
  } = props

  const defaultColorMode = initialColorMode === "dark" ? "dark" : "light"

  /**
   * Only attempt to retrieve if we're on the server. Else this will result
   * in a hydration mismatch warning and partially invalid visuals.
   *
   * Else fallback safely to `theme.config.initialColormode` (default light)
   */
  const [colorMode, rawSetColorMode] = React.useState<ColorMode | undefined>(
    colorModeManager.type === "cookie"
      ? colorModeManager.get(defaultColorMode)
      : defaultColorMode,
  )

  React.useEffect(() => {
    /**
     * Since we cannot initially retrieve localStorage to due above mentioned
     * reasons, do so after hydration.
     *
     * Priority:
     * - system color mode
     * - defined value on <ColorModeScript />, if present
     * - previously stored value
     */
    if (isBrowser && colorModeManager.type === "localStorage") {
      const mode = useSystemColorMode
        ? getColorScheme(defaultColorMode)
        : root.get() ||
          colorModeManager.get() ||
          getColorScheme(defaultColorMode)

      if (mode) {
        rawSetColorMode(mode)
      }
    }
  }, [colorModeManager, useSystemColorMode, defaultColorMode])

  React.useEffect(() => {
    const isDark = colorMode === "dark"

    syncBodyClassName(isDark)
    root.set(isDark ? "dark" : "light")
  }, [colorMode])

  const setColorMode = React.useCallback(
    (value: ColorMode, isListenerEvent = false) => {
      if (!isListenerEvent) {
        colorModeManager.set(value)
      } else if (colorModeManager.get() && !useSystemColorMode) return

      rawSetColorMode(value)
    },
    [colorModeManager, useSystemColorMode],
  )

  const toggleColorMode = React.useCallback(() => {
    setColorMode(colorMode === "light" ? "dark" : "light")
  }, [colorMode, setColorMode])

  React.useEffect(() => {
    const shouldUseSystemListener =
      useSystemColorMode || initialColorMode === "system"
    let removeListener: any
    if (shouldUseSystemListener) {
      removeListener = addListener(setColorMode)
    }
    return () => {
      if (removeListener && shouldUseSystemListener) {
        removeListener()
      }
    }
  }, [setColorMode, useSystemColorMode, initialColorMode])

  // presence of `value` indicates a controlled context
  const context = React.useMemo(
    () => ({
      colorMode: (value ?? colorMode) as ColorMode,
      toggleColorMode: value ? noop : toggleColorMode,
      setColorMode: value ? noop : setColorMode,
    }),
    [colorMode, setColorMode, toggleColorMode, value],
  )

  return (
    <ColorModeContext.Provider value={context}>
      {children}
    </ColorModeContext.Provider>
  )
}

if (__DEV__) {
  ColorModeProvider.displayName = "ColorModeProvider"
}

/**
 * Locks the color mode to `dark`, without any way to change it.
 */
export const DarkMode: React.FC = (props) => (
  <ColorModeContext.Provider
    value={{ colorMode: "dark", toggleColorMode: noop, setColorMode: noop }}
    {...props}
  />
)

if (__DEV__) {
  DarkMode.displayName = "DarkMode"
}

/**
 * Locks the color mode to `light` without any way to change it.
 */
export const LightMode: React.FC = (props) => (
  <ColorModeContext.Provider
    value={{ colorMode: "light", toggleColorMode: noop, setColorMode: noop }}
    {...props}
  />
)

if (__DEV__) {
  LightMode.displayName = "LightMode"
}

/**
 * Change value based on color mode.
 *
 * @param light the light mode value
 * @param dark the dark mode value
 *
 * @example
 *
 * ```js
 * const Icon = useColorModeValue(MoonIcon, SunIcon)
 * ```
 */
export function useColorModeValue<TLight = unknown, TDark = unknown>(
  light: TLight,
  dark: TDark,
) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}
