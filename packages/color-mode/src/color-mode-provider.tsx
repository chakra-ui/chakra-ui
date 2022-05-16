import { useUpdateEffect } from "@chakra-ui/hooks"
import { isBrowser, noop, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { ColorMode, getColorModeUtils } from "./color-mode.utils"
import { localStorageManager, StorageManager } from "./storage-manager"

type ConfigColorMode = ColorMode | "system" | undefined

export type { ColorMode, ConfigColorMode }

export interface ColorModeOptions {
  initialColorMode?: ConfigColorMode
  useSystemColorMode?: boolean
  disableTransitionOnChange?: boolean
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
  options?: ColorModeOptions
  colorModeManager?: StorageManager
}

function getTheme(manager: StorageManager, fallback?: ColorMode) {
  return manager.type === "cookie" ? manager.get(fallback) : fallback
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

  const [colorMode, rawSetColorMode] = React.useState(() =>
    getTheme(colorModeManager, defaultColorMode),
  )

  const [resolvedColorMode, setResolvedColorMode] = React.useState(() =>
    getTheme(colorModeManager, defaultColorMode),
  )

  const { getSystemTheme, setClassName, setDataset, addListener } =
    React.useMemo(
      () => getColorModeUtils({ preventTransition: disableTransitionOnChange }),
      [disableTransitionOnChange],
    )

  React.useEffect(() => {
    if (initialColorMode === "system") {
      const systemValue = getSystemTheme(defaultColorMode)
      setResolvedColorMode(systemValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (!isBrowser) return

    const managerValue = colorModeManager.get()

    if (managerValue) {
      rawSetColorMode(managerValue)
      return
    }

    const systemValue = getSystemTheme(defaultColorMode)

    if (initialColorMode === "system") {
      rawSetColorMode(systemValue)
      return
    }

    rawSetColorMode(defaultColorMode)
    //
  }, [colorModeManager, defaultColorMode, initialColorMode, getSystemTheme])

  useUpdateEffect(() => {
    setClassName(colorMode === "dark")

    if (colorMode) {
      setDataset(colorMode)
      colorModeManager.set(colorMode)
    }
  }, [colorMode])

  const toggleColorMode = React.useCallback(() => {
    rawSetColorMode((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  const setColorMode = React.useCallback(
    (value: ColorMode | "system") => {
      let resolved = value
      if (resolved === "system") {
        resolved = getSystemTheme()
      }
      rawSetColorMode(resolved)
    },
    [getSystemTheme],
  )

  React.useEffect(() => {
    if (!isBrowser) return

    const system = useSystemColorMode || initialColorMode === "system"

    if (system) {
      return addListener(rawSetColorMode)
    }
  }, [useSystemColorMode, initialColorMode, addListener])

  const resolvedValue =
    initialColorMode === "system" ? resolvedColorMode : colorMode

  // presence of `value` indicates a controlled context
  const context = React.useMemo(
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

if (__DEV__) {
  ColorModeProvider.displayName = "ColorModeProvider"
}

/**
 * Locks the color mode to `dark`, without any way to change it.
 */
export const DarkMode = (props: React.PropsWithChildren<{}>) => {
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
export const LightMode = (props: React.PropsWithChildren<{}>) => {
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
