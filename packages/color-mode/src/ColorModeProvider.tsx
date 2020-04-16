import { noop, __DEV__, merge, Dict } from "@chakra-ui/utils"
import * as React from "react"
import { createContext, FC, ReactNode, useContext } from "react"
import { useColorModeState } from "./color-mode.hook"
import { ColorMode } from "./color-mode.utils"
import { useTheme } from "@chakra-ui/system"

export { ColorMode }

type ColorModeContext = [ColorMode, () => void]

export const ColorModeContext = createContext<ColorModeContext>(["light", noop])

if (__DEV__) {
  ColorModeContext.displayName = "ColorModeContext"
}

export const useColorMode = () => useContext(ColorModeContext)

export interface ColorModeProviderProps {
  value?: ColorMode
  children?: ReactNode
}

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

export const DarkMode: FC = props => (
  <ColorModeContext.Provider value={["dark", noop]} {...props} />
)

if (__DEV__) {
  DarkMode.displayName = "DarkMode"
}

export const LightMode: FC = props => (
  <ColorModeContext.Provider value={["light", noop]} {...props} />
)

if (__DEV__) {
  LightMode.displayName = "LightMode"
}

export const getColorModeValue = (light: any, dark: any) => {
  return (colorMode: ColorMode) => (colorMode === "light" ? light : dark)
}

export const useColorModeValue = (light: any, dark: any) => {
  const [colorMode] = useColorMode()
  return getColorModeValue(light, dark)(colorMode)
}
