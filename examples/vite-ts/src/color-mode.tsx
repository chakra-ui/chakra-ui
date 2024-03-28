import { createContext, useContext } from "react"

type ColorMode = "light" | "dark"

interface ColorModeContextType {
  forced?: boolean
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (value: any) => void
}

const ColorModeContext = createContext({} as ColorModeContextType)
ColorModeContext.displayName = "ColorModeContext"

export function useColorMode() {
  return useContext(ColorModeContext)
}

export function useColorModeValue<TLight = unknown, TDark = unknown>(
  light: TLight,
  dark: TDark,
) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}
