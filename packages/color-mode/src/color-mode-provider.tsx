import { useEnvironment } from "@chakra-ui/react-env"
import { isBrowser, noop, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  addListener,
  ColorMode,
  getColorScheme,
  root,
  syncBodyClassName,
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

  const { document } = useEnvironment()

  React.useEffect(() => {
    /**
     * Since we cannot initially retrieve localStorage to due above mentioned
     * reasons, do so after hydration.
     *
     * Priority:
     * - if `useSystemColorMode` is true system-color will be used as default - initial
     * colormode is the fallback if system color mode isn't resolved
     *
     * - if `--chakra-ui-color-mode` is defined through e.g. `ColorModeScript` this
     * will be used
     *
     * - if `colorModeManager` = `localStorage` and a value is defined for
     * `chakra-ui-color-mode` this will be used
     *
     * - if `initialColorMode` = `system` system-color will be used as default -
     * initial colormode is the fallback if system color mode isn't resolved
     *
     * - if `initialColorMode` = `'light'|'dark'` the corresponding value will be used
     */
    if (isBrowser && colorModeManager.type === "localStorage") {
      const systemColorWithFallback = getColorScheme(defaultColorMode)
      if (useSystemColorMode) {
        return rawSetColorMode(systemColorWithFallback)
      }
      const rootGet = root.get()
      const colorManagerGet = colorModeManager.get()
      if (rootGet) {
        return rawSetColorMode(rootGet)
      }
      if (colorManagerGet) {
        return rawSetColorMode(colorManagerGet)
      }
      if (initialColorMode === "system") {
        return rawSetColorMode(systemColorWithFallback)
      }
      return rawSetColorMode(defaultColorMode)
    }
  }, [colorModeManager, useSystemColorMode, defaultColorMode, initialColorMode])

  React.useEffect(() => {
    const isDark = colorMode === "dark"
    syncBodyClassName(isDark, document)
    root.set(isDark ? "dark" : "light")
  }, [colorMode, document])

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
export const DarkMode: React.FC = (props) => {
  const context = React.useMemo<ColorModeContextType>(
    () => ({
      colorMode: "dark",
      toggleColorMode: noop,
      setColorMode: noop,
    }),
    [],
  )

  return <ColorModeContext.Provider value={context} {...props} />
}

if (__DEV__) {
  DarkMode.displayName = "DarkMode"
}

/**
 * Locks the color mode to `light` without any way to change it.
 */
export const LightMode: React.FC = (props) => {
  const context = React.useMemo<ColorModeContextType>(
    () => ({
      colorMode: "light",
      toggleColorMode: noop,
      setColorMode: noop,
    }),
    [],
  )

  return <ColorModeContext.Provider value={context} {...props} />
}

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
