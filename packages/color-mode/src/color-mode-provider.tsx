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

export type { ColorMode }

export interface ColorModeOptions {
  initialColorMode?: ColorMode
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

  /**
   * Only attempt to retrieve if we're on the server. Else this will result
   * in a hydration mismatch warning and partially invalid visuals.
   *
   * Else fallback safely to `theme.config.initialColormode` (default light)
   */
  const [colorMode, rawSetColorMode] = React.useState<ColorMode | undefined>(
    colorModeManager.type === "cookie"
      ? colorModeManager.get(initialColorMode)
      : initialColorMode,
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
        ? getColorScheme()
        : root.get() || colorModeManager.get()

      if (mode) {
        rawSetColorMode(mode)
      }
    }
  }, [colorModeManager, useSystemColorMode])

  React.useEffect(() => {
    const isDark = colorMode === "dark"

    syncBodyClassName(isDark)
    root.set(isDark ? "dark" : "light")
  }, [colorMode])

  const setColorMode = React.useCallback(
    (value: ColorMode) => {
      colorModeManager.set(value)
      rawSetColorMode(value)
    },
    [colorModeManager],
  )

  const toggleColorMode = React.useCallback(() => {
    setColorMode(colorMode === "light" ? "dark" : "light")
  }, [colorMode, setColorMode])

  React.useEffect(() => {
    if (useSystemColorMode) {
      return addListener(setColorMode)
    }
  }, [setColorMode, useSystemColorMode])

  // presence of `value` indicates a controlled context
  const context = {
    colorMode: (value ?? colorMode) as ColorMode,
    toggleColorMode: value ? noop : toggleColorMode,
    setColorMode: value ? noop : setColorMode,
  }

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
  return colorMode === "light" ? light : dark
}
