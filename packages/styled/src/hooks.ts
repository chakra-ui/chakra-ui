import * as React from "react"
import { useColorMode } from "@chakra-ui/color-mode"
import { ThemeContext } from "@emotion/core"
import { getComponentStyles } from "@chakra-ui/parser"

export function useColorModeValue<T>(lightModeValue: T, darkModeValue: T) {
  const [colorMode] = useColorMode()
  const value = { light: lightModeValue, dark: darkModeValue }
  return value[colorMode]
}

export function useChakra<Theme extends object = object>() {
  const [colorMode, setColorMode] = useColorMode()
  const theme = React.useContext(ThemeContext) as Theme
  return { colorMode, setColorMode, theme }
}

interface ComponentStyleHookProps {
  size?: string
  variant?: string
  colorScheme?: string
  themeKey: string
}

export function useComponentStyle(props: ComponentStyleHookProps) {
  const { size, variant, colorScheme, themeKey } = props
  const theme = React.useContext(ThemeContext)
  console.log(theme)
  return getComponentStyles({ variant, size, theme, colorScheme }, themeKey)
}
