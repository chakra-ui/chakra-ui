import { useTheme } from "@chakra-ui/system"
import { Dict, merge, noop, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { createContext, FC, ReactNode, useContext } from "react"
import { useColorModeState } from "./color-mode.hook"
import { ColorMode } from "./color-mode.utils"

export { ColorMode }

type ColorModeContext = [ColorMode, () => void]

export const ColorModeContext = createContext<ColorModeContext>(["light", noop])

if (__DEV__) {
  ColorModeContext.displayName = "ColorModeContext"
}

/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */
export const useColorMode = () => useContext(ColorModeContext)

export interface ColorModeProviderProps {
  value?: ColorMode
  children?: ReactNode
}

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
export const ColorModeProvider: FC = props => {
  const theme = useTheme() as Dict

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
export const DarkMode: FC = props => (
  <ColorModeContext.Provider value={["dark", noop]} {...props} />
)

if (__DEV__) {
  DarkMode.displayName = "DarkMode"
}

/**
 * Locks the color mode to `light` without any way to change it.
 */
export const LightMode: FC = props => (
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
export const getColorModeValue = (light: any, dark: any) => {
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
export const useColorModeValue = (light: any, dark: any) => {
  const [colorMode] = useColorMode()
  return getColorModeValue(light, dark)(colorMode)
}
