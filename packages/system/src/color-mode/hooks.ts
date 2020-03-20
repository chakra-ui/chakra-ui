import { useColorMode } from "./color-mode-provider"
import { useTheme } from "../theme-provider"

export function useColorModeValue<T>(lightModeValue: T, darkModeValue: T) {
  const [colorMode] = useColorMode()
  const value = { light: lightModeValue, dark: darkModeValue }
  return value[colorMode]
}

export function useChakra<T extends object = object>() {
  const [colorMode, setColorMode] = useColorMode()
  const theme = useTheme() as T
  return { colorMode, setColorMode, theme }
}
