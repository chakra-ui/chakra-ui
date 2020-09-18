import { isBrowser, noop, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  addListener,
  ColorMode,
  getColorScheme,
  syncBodyClassName,
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
  useSystemColorMode?: boolean
  defaultValue?: ColorMode
  colorModeManager?: StorageManager
}

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
export function ColorModeProvider(props: ColorModeProviderProps) {
  const {
    value,
    defaultValue,
    children,
    useSystemColorMode,
    colorModeManager = localStorageManager,
  } = props

  const [colorMode, rawSetColorMode] = React.useState<ColorMode>(() => {
    /**
     * Only attempt to retrieve if we're on the server. else this will
     * result in a hydration mismatch warning and result in partially invalid visuals
     */
    const stored =
      colorModeManager.type === "cookie" ? colorModeManager.get() : undefined

    if (stored) return stored

    if (isBrowser && useSystemColorMode) {
      return getColorScheme()
    }

    return defaultValue ?? "light"
  })

  React.useEffect(() => {
    /**
     * Since we cannot initially retrieve localStorage to due above mentioned
     * reasons, do so after hydration
     */
    if (colorModeManager.type === "localStorage") {
      const root = document.documentElement
      const mode = root.style.getPropertyValue(
        "--chakra-ui-color-mode",
      ) as ColorMode
      rawSetColorMode(mode)
    }
    // omitted to prevent infinite render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorModeManager])

  React.useEffect(() => {
    syncBodyClassName(colorMode === "dark")
  }, [colorMode])

  const setColorMode = React.useCallback(
    (value: ColorMode) => {
      const root = document.documentElement
      root.style.setProperty("--chakra-ui-color-mode", value)
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
    colorMode: value ?? colorMode,
    toggleColorMode: value ? noop : toggleColorMode,
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
    value={{ colorMode: "dark", toggleColorMode: noop }}
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
    value={{ colorMode: "light", toggleColorMode: noop }}
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
