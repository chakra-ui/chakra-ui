import { createContext, useContext } from "react"
import { ColorModeContextType } from "./color-mode-types"

export const ColorModeContext = createContext({} as ColorModeContextType)

ColorModeContext.displayName = "ColorModeContext"

/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */
export function useColorMode() {
  const context = useContext(ColorModeContext)
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider")
  }
  return context
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
