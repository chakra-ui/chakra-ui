export type ColorMode = "light" | "dark"

export type ColorModeWithSystem = ColorMode | "system" | undefined

/**
 * @deprecated use `ColorModeWithSystem` instead
 */
export type ConfigColorMode = ColorModeWithSystem

export interface ColorModeOptions {
  initialColorMode?: ColorModeWithSystem
  useSystemColorMode?: boolean
  disableTransitionOnChange?: boolean
}

export interface ColorModeContextType {
  forced?: boolean
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (value: any) => void
}
