import { useColorMode } from "@chakra-ui/color-mode"
import { css, StyleObjectOrFn } from "@chakra-ui/css"
import { Dict, get, StringOrNumber } from "@chakra-ui/utils"
import { getComponentDefaults, getComponentStyles } from "./component"
import { useTheme } from "./theme-provider"

export function useChakra<T extends Dict = Dict>() {
  const [colorMode, setColorMode] = useColorMode()
  const theme = useTheme() as T
  return { colorMode, setColorMode, theme }
}

interface UseComponentStyleProps {
  size?: string
  variant?: string
  colorScheme?: string
  themeKey: string
}

export function useComponentStyle(props: UseComponentStyleProps) {
  const { size, variant, colorScheme, themeKey } = props
  const { theme, colorMode } = useChakra()
  return getComponentStyles(
    { variant, size, theme, colorScheme, colorMode },
    { themeKey },
  )
}

export function useThemeDefaultProps(themeKey: string) {
  const theme = useTheme()
  return getComponentDefaults(theme, themeKey)
}

export function useCss(styles: StyleObjectOrFn) {
  const theme = useTheme()
  return css(styles)(theme)
}

export function useToken(
  scale: string,
  token: StringOrNumber,
  fallback?: StringOrNumber,
) {
  const theme = useTheme()
  const path = `${scale}.${token}`
  return get(theme, path, fallback ?? token)
}
