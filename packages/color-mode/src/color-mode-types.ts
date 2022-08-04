export type ColorMode = "light" | "dark"

export type ColorModeWithSystem = ColorMode | "system" | undefined

export interface ColorModeOptions {
  initialColorMode?: ColorModeWithSystem
  useSystemColorMode?: boolean
  disableTransitionOnChange?: boolean
}

export interface ColorModeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (value: any) => void
}
