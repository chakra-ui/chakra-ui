import { ThemeContext } from "@emotion/core"
import { Dict, merge, noop, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import useColorModeState from "./use-color-mode-state"
import type { ColorMode } from "./color-mode.utils"

export type { ColorMode }

type ColorModeContext = [ColorMode, () => void]

export const ColorModeContext = React.createContext<ColorModeContext>([
  "light",
  noop,
])

if (__DEV__) {
  ColorModeContext.displayName = "ColorModeContext"
}

/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */
export const useColorMode = () => React.useContext(ColorModeContext)

export interface ColorModeProviderProps {
  value?: ColorMode
  children?: React.ReactNode
}

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
export const ColorModeProvider: React.FC = (props) => {
  const theme = React.useContext(ThemeContext) as Dict

  const fallbackConfig = {
    useSystemColorMode: false,
    initialColorMode: "light",
  }

  const config = merge(fallbackConfig, theme.config ?? {}) as any

  const [colorMode, setColorMode] = useColorModeState(config)
  const toggle = () => setColorMode(colorMode === "light" ? "dark" : "light")

  const context = [colorMode, toggle] as ColorModeContext

  return <ColorModeContext.Provider value={context} {...props} />
}

if (__DEV__) {
  ColorModeProvider.displayName = "ColorModeProvider"
}

/**
 * Locks the color mode to `dark`, without any way to change it.
 */
export const DarkMode: React.FC = (props) => (
  <ColorModeContext.Provider value={["dark", noop]} {...props} />
)

if (__DEV__) {
  DarkMode.displayName = "DarkMode"
}

/**
 * Locks the color mode to `light` without any way to change it.
 */
export const LightMode: React.FC = (props) => (
  <ColorModeContext.Provider value={["light", noop]} {...props} />
)

if (__DEV__) {
  LightMode.displayName = "LightMode"
}

/**
 * Change value based on color mode
 *
 * @param light the light mode value
 * @param dark the dark mode value
 */
export function getColorModeValue(light: any, dark: any) {
  return (colorMode: ColorMode) => (colorMode === "light" ? light : dark)
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
export function useColorModeValue(light: any, dark: any) {
  const [colorMode] = useColorMode()
  return getColorModeValue(light, dark)(colorMode)
}
