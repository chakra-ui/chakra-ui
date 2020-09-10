import { noop, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { ColorMode } from "./color-mode.utils"
import { useColorModeState } from "./use-color-mode-state"
import { localStorageManager, StorageManager } from "./storage-manager"

export type { ColorMode }

interface ColorModeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
}

export const ColorModeContext = React.createContext<ColorModeContextType>({
  colorMode: "light",
  toggleColorMode: noop,
})

if (__DEV__) {
  ColorModeContext.displayName = "ColorModeContext"
}

/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */
export function useColorMode() {
  return React.useContext(ColorModeContext)
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
    children,
    useSystemColorMode = false,
    defaultValue = "light",
    colorModeManager = localStorageManager,
  } = props

  const { mode, toggleColorMode } = useColorModeState({
    useSystemColorMode,
    initialColorMode: defaultValue,
    colorModeManager,
  })

  const context = {
    colorMode: value ?? mode,
    // presence of `value` indicates a controlled context
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
