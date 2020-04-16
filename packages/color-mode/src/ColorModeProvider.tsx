import { __DEV__, noop } from "@chakra-ui/utils"
import * as React from "react"
import { ColorMode } from "./color-mode.utils"
import { useColorModeState } from "./color-mode.hook"

export { ColorMode }

type ColorModeContext = [ColorMode, () => void]

export const ColorModeContext = React.createContext<ColorModeContext>([
  "light",
  noop,
])

if (__DEV__) {
  ColorModeContext.displayName = "ColorModeContext"
}

export const useColorMode = () => React.useContext(ColorModeContext)

export interface ColorModeProviderProps {
  value?: ColorMode
  children?: React.ReactNode
}

export const ColorModeProvider: React.FC = props => {
  const [colorMode, setColorMode] = useColorModeState({
    config: { useSystemColorMode: true },
  })

  const toggle = () => setColorMode(colorMode === "light" ? "dark" : "light")

  const context = [colorMode, toggle] as ColorModeContext

  return <ColorModeContext.Provider value={context} {...props} />
}

if (__DEV__) {
  ColorModeProvider.displayName = "ColorModeProvider"
}

export const DarkMode: React.FC = props => (
  <ColorModeContext.Provider value={["dark", noop]} {...props} />
)

if (__DEV__) {
  DarkMode.displayName = "DarkMode"
}

export const LightMode: React.FC = props => (
  <ColorModeContext.Provider value={["light", noop]} {...props} />
)

if (__DEV__) {
  LightMode.displayName = "LightMode"
}

export function getColorModeValue<T>(lightModeValue: T, darkModeValue: T) {
  return (colorMode: ColorMode) => {
    const value = { light: lightModeValue, dark: darkModeValue }
    return value[colorMode]
  }
}

export function useColorModeValue<T>(lightModeValue: T, darkModeValue: T) {
  const [colorMode] = useColorMode()
  return getColorModeValue(lightModeValue, darkModeValue)(colorMode)
}
